use soroban_sdk::{contractclient, Address, Env};

#[contractclient(name = "SorobanAmmClient")]
pub trait SorobanAmmInterface {
    fn deposit(env: Env, to: Address, desired_a: i128, min_a: i128, desired_b: i128, min_b: i128) -> (i128, i128);
    fn withdraw(env: Env, to: Address, share_amount: i128, min_a: i128, min_b: i128) -> (i128, i128);
    fn get_reserves(env: Env) -> (i128, i128);
    fn share_id(env: Env) -> Address;
}
