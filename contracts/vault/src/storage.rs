use soroban_sdk::contracttype;

#[contracttype]
pub enum DataKey {
    Admin,
    Controller,
    Asset,
    ShareToken,
    TotalShares,
    DepositCap,
    FeeBps,
    LastFeeTime,
    Treasury,
    Paused,
}
