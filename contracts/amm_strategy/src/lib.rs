#![no_std]

pub mod amm_interface;

use soroban_sdk::{contract, contractimpl, Address, Env};

#[contract]
pub struct AmmStrategy;

#[contractimpl]
impl AmmStrategy {
    pub fn init(env: Env, admin: Address, controller: Address, asset: Address, amm_pool: Address, pool_share_token: Address) {
        env.storage().instance().set(&soroban_sdk::symbol_short!("Admin"), &admin);
        env.storage().instance().set(&soroban_sdk::symbol_short!("Control"), &controller);
        env.storage().instance().set(&soroban_sdk::symbol_short!("Asset"), &asset);
        env.storage().instance().set(&soroban_sdk::symbol_short!("AmmPool"), &amm_pool);
        env.storage().instance().set(&soroban_sdk::symbol_short!("PoolShare"), &pool_share_token);
    }
}
