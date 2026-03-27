#![no_std]
use soroban_sdk::{contractclient, Address, Env};

/// Trait every strategy adapter must implement.
/// Equivalent to IStrategy.sol
#[contractclient(name = "StrategyClient")]
pub trait StrategyInterface {
    /// The asset (token) this strategy accepts — USDC contract address
    fn asset(env: Env) -> Address;

    /// Deposit `amount` of asset into the strategy.
    /// Caller must have approved this contract to transfer `amount`.
    /// Returns units deposited (may differ from amount after fees).
    fn deposit(env: Env, from: Address, amount: i128) -> i128;

    /// Withdraw `amount` of asset from the strategy to `to`.
    /// Returns actual amount received.
    fn withdraw(env: Env, to: Address, amount: i128) -> i128;

    /// Withdraw all assets from strategy to `to`.
    /// Returns actual amount received.
    fn withdraw_all(env: Env, to: Address) -> i128;

    /// Current total asset balance held by this strategy contract.
    fn balance(env: Env) -> i128;

    /// Estimated annual yield in basis points (100 = 1%).
    fn estimated_apy(env: Env) -> i128;

    /// Emergency: drain all assets to controller. Admin only.
    fn emergency_exit(env: Env, to: Address);
}
