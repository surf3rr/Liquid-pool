import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from "@stellar/stellar-sdk/contract";
import type { u64, i128 } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CCUUAKC45XN2OCALQCLAHFNC3EBR7L6N4N5V6LS5MRBB7E6U4S6ISWXT";
    };
};
export type DataKey = {
    tag: "Admin";
    values: void;
} | {
    tag: "Vault";
    values: void;
} | {
    tag: "Asset";
    values: void;
} | {
    tag: "Keeper";
    values: void;
} | {
    tag: "Strategies";
    values: void;
} | {
    tag: "StrategyList";
    values: void;
} | {
    tag: "TotalAllocationBps";
    values: void;
} | {
    tag: "RebalanceThresholdBps";
    values: void;
} | {
    tag: "MinRebalanceInterval";
    values: void;
} | {
    tag: "LastRebalance";
    values: void;
} | {
    tag: "Paused";
    values: void;
};
export interface StrategyInfo {
    active: boolean;
    allocation_bps: i128;
    deployed: i128;
    last_harvest: u64;
    max_deployable: i128;
}
export interface Client {
    /**
     * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    init: ({ admin, vault, asset, keeper }: {
        admin: string;
        vault: string;
        asset: string;
        keeper: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a rebalance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    rebalance: ({ caller }: {
        caller: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a add_strategy transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    add_strategy: ({ strategy, allocation_bps, max_deployable }: {
        strategy: string;
        allocation_bps: i128;
        max_deployable: i128;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a total_deployed transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    total_deployed: (options?: MethodOptions) => Promise<AssembledTransaction<i128>>;
    /**
     * Construct and simulate a deposit_to_strategies transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    deposit_to_strategies: ({ amount }: {
        amount: i128;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a withdraw_from_strategies transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    withdraw_from_strategies: ({ _amount }: {
        _amount: i128;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        init: (json: string) => AssembledTransaction<null>;
        rebalance: (json: string) => AssembledTransaction<null>;
        add_strategy: (json: string) => AssembledTransaction<null>;
        total_deployed: (json: string) => AssembledTransaction<bigint>;
        deposit_to_strategies: (json: string) => AssembledTransaction<null>;
        withdraw_from_strategies: (json: string) => AssembledTransaction<null>;
    };
}
