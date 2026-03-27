use soroban_sdk::contracttype;

#[contracttype]
pub enum DataKey {
    Admin,
    Vault,
    Asset,
    Keeper,
    Strategies,
    StrategyList,
    TotalAllocationBps,
    RebalanceThresholdBps,
    MinRebalanceInterval,
    LastRebalance,
    Paused,
}
