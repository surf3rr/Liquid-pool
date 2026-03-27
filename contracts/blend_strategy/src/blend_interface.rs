use soroban_sdk::{contractclient, contracttype, Address, Env};

#[contracttype]
pub struct ReserveData {
    pub supply_rate: i128,
    pub borrow_rate: i128,
    pub total_supply: i128,
    pub total_borrow: i128,
}

#[contractclient(name = "BlendPoolClient")]
pub trait BlendPoolInterface {
    fn supply(env: Env, from: Address, asset: Address, amount: i128) -> i128;
    fn withdraw(env: Env, to: Address, asset: Address, amount: i128) -> i128;
    fn get_reserve(env: Env, asset: Address) -> ReserveData;
}
