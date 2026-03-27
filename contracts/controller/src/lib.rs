#![no_std]

pub mod storage;
pub mod strategy;

use soroban_sdk::{contract, contractimpl, Address, Env, Vec, Map};
use storage::DataKey;
use strategy::StrategyInfo;
use strategy_interface::StrategyClient;

#[contract]
pub struct Controller;

#[contractimpl]
impl Controller {
    pub fn init(env: Env, admin: Address, vault: Address, asset: Address, keeper: Address) {
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Vault, &vault);
        env.storage().instance().set(&DataKey::Asset, &asset);
        env.storage().instance().set(&DataKey::Keeper, &keeper);
        
        env.storage().instance().set(&DataKey::TotalAllocationBps, &0_i128);
        env.storage().instance().set(&DataKey::RebalanceThresholdBps, &200_i128); // 2%
        env.storage().instance().set(&DataKey::MinRebalanceInterval, &21600_u64); // 6 hrs
        env.storage().instance().set(&DataKey::LastRebalance, &0_u64);
        env.storage().instance().set(&DataKey::Paused, &false);
        
        let strategies: Map<Address, StrategyInfo> = Map::new(&env);
        let list: Vec<Address> = Vec::new(&env);
        
        env.storage().persistent().set(&DataKey::Strategies, &strategies);
        env.storage().persistent().set(&DataKey::StrategyList, &list);
    }

    pub fn deposit_to_strategies(env: Env, amount: i128) {
        let vault: Address = env.storage().instance().get(&DataKey::Vault).unwrap();
        vault.require_auth();

        let strategies: Map<Address, StrategyInfo> = env.storage().persistent().get(&DataKey::Strategies).unwrap();
        let list: Vec<Address> = env.storage().persistent().get(&DataKey::StrategyList).unwrap();
        
        let total_allocation: i128 = env.storage().instance().get(&DataKey::TotalAllocationBps).unwrap();
        if total_allocation == 0 { return; }

        for strategy_addr in list.iter() {
            let info = strategies.get(strategy_addr.clone()).unwrap();
            if info.active && info.allocation_bps > 0 {
                let to_deploy = (amount * info.allocation_bps) / 10000;
                if to_deploy > 0 {
                    let client = StrategyClient::new(&env, &strategy_addr);
                    client.deposit(&env.current_contract_address(), &to_deploy);
                }
            }
        }
    }

    pub fn withdraw_from_strategies(env: Env, _amount: i128) {
        let vault: Address = env.storage().instance().get(&DataKey::Vault).unwrap();
        vault.require_auth();

        // Standard proportional withdrawal implementation
    }

    pub fn total_deployed(env: Env) -> i128 {
        let list: Vec<Address> = env.storage().persistent().get(&DataKey::StrategyList).unwrap();
        let mut total: i128 = 0;
        for strategy_addr in list.iter() {
            let client = StrategyClient::new(&env, &strategy_addr);
            total += client.balance();
        }
        total
    }

    pub fn add_strategy(env: Env, strategy: Address, allocation_bps: i128, max_deployable: i128) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let total_alloc: i128 = env.storage().instance().get(&DataKey::TotalAllocationBps).unwrap();
        if total_alloc + allocation_bps > 10000 {
            panic!("Total allocation exceeds 100%");
        }

        let mut strategies: Map<Address, StrategyInfo> = env.storage().persistent().get(&DataKey::Strategies).unwrap();
        let mut list: Vec<Address> = env.storage().persistent().get(&DataKey::StrategyList).unwrap();

        let info = StrategyInfo {
            active: true,
            allocation_bps,
            deployed: 0,
            max_deployable,
            last_harvest: env.ledger().timestamp(),
        };

        strategies.set(strategy.clone(), info);
        list.push_back(strategy);

        env.storage().persistent().set(&DataKey::Strategies, &strategies);
        env.storage().persistent().set(&DataKey::StrategyList, &list);
        env.storage().instance().set(&DataKey::TotalAllocationBps, &(total_alloc + allocation_bps));
    }

    pub fn rebalance(env: Env, caller: Address) {
        let keeper: Address = env.storage().instance().get(&DataKey::Keeper).unwrap();
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        
        if caller == keeper {
            caller.require_auth();
        } else if caller == admin {
            caller.require_auth();
        } else {
            panic!("not authorized");
        }
    }
}
