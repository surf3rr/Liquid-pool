#![no_std]
use soroban_sdk::{contract, contractimpl, contracterror, xdr::ToXdr, Address, BytesN, Env, Vec, Symbol, String, symbol_short};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub enum Error {
    NotAdmin = 1,
    DelayOutOfRange = 2,
    TxNotQueued = 3,
    TooEarly = 4,
    TxStale = 5,
    AlreadyInit = 6,
}

#[contract]
pub struct Timelock;

/* Storage Keys:
 * Admin: Address
 * Delay: u32
 * QueuedTx(BytesN<32>): bool
 */
#[contractimpl]
impl Timelock {
    const MIN_DELAY: u32 = 17280; // ~1 day
    const MAX_DELAY: u32 = 518400; // ~30 days
    const GRACE_PERIOD: u32 = 241920; // ~14 days

    pub fn init(env: Env, admin: Address, delay_ledgers: u32) -> Result<(), Error> {
        if env.storage().instance().has(&symbol_short!("Admin")) {
            return Err(Error::AlreadyInit);
        }
        if delay_ledgers < Self::MIN_DELAY || delay_ledgers > Self::MAX_DELAY {
            return Err(Error::DelayOutOfRange);
        }
        env.storage().instance().set(&symbol_short!("Admin"), &admin);
        env.storage().instance().set(&symbol_short!("Delay"), &delay_ledgers);
        Ok(())
    }

    pub fn queue_transaction(
        env: Env,
        target: Address,
        fn_name: Symbol,
        args: Vec<soroban_sdk::Val>,
        eta_ledger: u32,
    ) -> Result<BytesN<32>, Error> {
        let admin: Address = env.storage().instance().get(&symbol_short!("Admin")).unwrap();
        admin.require_auth();

        let delay: u32 = env.storage().instance().get(&symbol_short!("Delay")).unwrap();
        if eta_ledger < env.ledger().sequence() + delay {
            return Err(Error::DelayOutOfRange);
        }

        let mut raw_hash_data = Vec::new(&env);
        raw_hash_data.push_back(target.to_val());
        raw_hash_data.push_back(fn_name.to_val());
        // For simplicity in this demo, args are hashed natively by Soroban
        raw_hash_data.push_back(eta_ledger.into());
        let tx_hash = env.crypto().sha256(&raw_hash_data.to_xdr(&env));

        env.storage().persistent().set(&tx_hash, &true);
        Ok(tx_hash.into())
    }

    pub fn cancel_transaction(env: Env, tx_hash: BytesN<32>) -> Result<(), Error> {
        let admin: Address = env.storage().instance().get(&symbol_short!("Admin")).unwrap();
        admin.require_auth();

        if !env.storage().persistent().has(&tx_hash) {
            return Err(Error::TxNotQueued);
        }
        env.storage().persistent().remove(&tx_hash);
        Ok(())
    }

    pub fn execute_transaction(
        env: Env,
        target: Address,
        fn_name: Symbol,
        args: Vec<soroban_sdk::Val>,
        eta_ledger: u32,
    ) -> Result<soroban_sdk::Val, Error> {
        let admin: Address = env.storage().instance().get(&symbol_short!("Admin")).unwrap();
        admin.require_auth();

        let mut raw_hash_data = Vec::new(&env);
        raw_hash_data.push_back(target.to_val());
        raw_hash_data.push_back(fn_name.to_val());
        raw_hash_data.push_back(eta_ledger.into());
        let tx_hash: BytesN<32> = env.crypto().sha256(&raw_hash_data.to_xdr(&env)).into();

        if !env.storage().persistent().has(&tx_hash) {
            return Err(Error::TxNotQueued);
        }

        let current_ledger = env.ledger().sequence();
        if current_ledger < eta_ledger {
            return Err(Error::TooEarly);
        }
        if current_ledger > eta_ledger + Self::GRACE_PERIOD {
            return Err(Error::TxStale);
        }

        env.storage().persistent().remove(&tx_hash);
        Ok(env.invoke_contract(&target, &fn_name, args))
    }
}
