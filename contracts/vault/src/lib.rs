#![no_std]

pub mod storage;

use soroban_sdk::{contract, contractimpl, token, Address, Env};
use storage::DataKey;

#[contract]
pub struct Vault;

#[contractimpl]
impl Vault {
    pub fn init(
        env: Env,
        admin: Address,
        controller: Address,
        asset: Address,
        share_token: Address,
        treasury: Address,
        deposit_cap: i128,
        fee_bps: i128,
    ) {
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Controller, &controller);
        env.storage().instance().set(&DataKey::Asset, &asset);
        env.storage().instance().set(&DataKey::ShareToken, &share_token);
        env.storage().instance().set(&DataKey::Treasury, &treasury);
        env.storage().instance().set(&DataKey::DepositCap, &deposit_cap);
        env.storage().instance().set(&DataKey::FeeBps, &fee_bps);
        env.storage().instance().set(&DataKey::TotalShares, &0_i128);
        env.storage().instance().set(&DataKey::Paused, &false);
        env.storage().instance().set(&DataKey::LastFeeTime, &env.ledger().timestamp());
    }

    pub fn deposit(env: Env, from: Address, amount: i128) -> i128 {
        from.require_auth();
        
        let paused: bool = env.storage().instance().get(&DataKey::Paused).unwrap_or(false);
        if paused { panic!("Vault is paused"); }

        let cap: i128 = env.storage().instance().get(&DataKey::DepositCap).unwrap_or(0);
        let current_assets = Self::total_assets(env.clone());
        if cap > 0 && current_assets + amount > cap {
            panic!("Deposit cap exceeded");
        }

        let asset: Address = env.storage().instance().get(&DataKey::Asset).unwrap();
        let token_client = token::Client::new(&env, &asset);
        
        // Transfer USDC to Vault
        token_client.transfer(&from, &env.current_contract_address(), &amount);

        let total_shares: i128 = env.storage().instance().get(&DataKey::TotalShares).unwrap_or(0);
        
        let shares = if total_shares == 0 || current_assets == 0 {
            amount
        } else {
            (amount * total_shares) / current_assets
        };

        let _share_token: Address = env.storage().instance().get(&DataKey::ShareToken).unwrap();
        // Since we aren't administering standard token interface ourselves, we rely on controller or token client
        // In real deploy, standard token-admin interface mints it
        // _mint shares
        let current_shares = total_shares + shares;
        env.storage().instance().set(&DataKey::TotalShares, &current_shares);

        shares
    }

    pub fn withdraw(env: Env, from: Address, shares: i128) -> i128 {
        from.require_auth();
        let paused: bool = env.storage().instance().get(&DataKey::Paused).unwrap_or(false);
        if paused { panic!("Vault is paused"); }

        let total_shares: i128 = env.storage().instance().get(&DataKey::TotalShares).unwrap_or(0);
        let current_assets = Self::total_assets(env.clone());

        let assets = (shares * current_assets) / total_shares;

        let asset: Address = env.storage().instance().get(&DataKey::Asset).unwrap();
        let token_client = token::Client::new(&env, &asset);
        
        token_client.transfer(&env.current_contract_address(), &from, &assets);

        env.storage().instance().set(&DataKey::TotalShares, &(total_shares - shares));

        assets
    }

    pub fn total_assets(env: Env) -> i128 {
        let asset: Address = env.storage().instance().get(&DataKey::Asset).unwrap();
        let token_client = token::Client::new(&env, &asset);
        token_client.balance(&env.current_contract_address())
        // In full implementation, add controller.total_deployed()
    }
}
