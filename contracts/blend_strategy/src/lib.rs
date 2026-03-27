#![no_std]

pub mod blend_interface;

use soroban_sdk::{contract, contractimpl, Address, Env};

#[contract]
pub struct BlendStrategy;

#[contractimpl]
impl BlendStrategy {
    pub fn init(env: Env, admin: Address, controller: Address, asset: Address, blend_pool: Address, b_token: Address) {
        env.storage().instance().set(&soroban_sdk::symbol_short!("Admin"), &admin);
        env.storage().instance().set(&soroban_sdk::symbol_short!("Control"), &controller);
        env.storage().instance().set(&soroban_sdk::symbol_short!("Asset"), &asset);
        env.storage().instance().set(&soroban_sdk::symbol_short!("BlendPool"), &blend_pool);
        env.storage().instance().set(&soroban_sdk::symbol_short!("BToken"), &b_token);
    }
    
    // In a full implementation, you would implement StrategyInterface trait
}
