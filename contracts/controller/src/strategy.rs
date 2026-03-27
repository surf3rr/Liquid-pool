use soroban_sdk::contracttype;

#[contracttype]
pub struct StrategyInfo {
    pub active: bool,
    pub allocation_bps: i128,
    pub deployed: i128,
    pub max_deployable: i128,
    pub last_harvest: u64,
}
