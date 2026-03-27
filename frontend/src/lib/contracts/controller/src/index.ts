import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CCUUAKC45XN2OCALQCLAHFNC3EBR7L6N4N5V6LS5MRBB7E6U4S6ISWXT",
  }
} as const

export type DataKey = {tag: "Admin", values: void} | {tag: "Vault", values: void} | {tag: "Asset", values: void} | {tag: "Keeper", values: void} | {tag: "Strategies", values: void} | {tag: "StrategyList", values: void} | {tag: "TotalAllocationBps", values: void} | {tag: "RebalanceThresholdBps", values: void} | {tag: "MinRebalanceInterval", values: void} | {tag: "LastRebalance", values: void} | {tag: "Paused", values: void};


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
  init: ({admin, vault, asset, keeper}: {admin: string, vault: string, asset: string, keeper: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a rebalance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  rebalance: ({caller}: {caller: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a add_strategy transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_strategy: ({strategy, allocation_bps, max_deployable}: {strategy: string, allocation_bps: i128, max_deployable: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a total_deployed transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  total_deployed: (options?: MethodOptions) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a deposit_to_strategies transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deposit_to_strategies: ({amount}: {amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a withdraw_from_strategies transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw_from_strategies: ({_amount}: {_amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAEaW5pdAAAAAQAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAFdmF1bHQAAAAAAAATAAAAAAAAAAVhc3NldAAAAAAAABMAAAAAAAAABmtlZXBlcgAAAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAJcmViYWxhbmNlAAAAAAAAAQAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAMYWRkX3N0cmF0ZWd5AAAAAwAAAAAAAAAIc3RyYXRlZ3kAAAATAAAAAAAAAA5hbGxvY2F0aW9uX2JwcwAAAAAACwAAAAAAAAAObWF4X2RlcGxveWFibGUAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAOdG90YWxfZGVwbG95ZWQAAAAAAAAAAAABAAAACw==",
        "AAAAAAAAAAAAAAAVZGVwb3NpdF90b19zdHJhdGVnaWVzAAAAAAAAAQAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
        "AAAAAAAAAAAAAAAYd2l0aGRyYXdfZnJvbV9zdHJhdGVnaWVzAAAAAQAAAAAAAAAHX2Ftb3VudAAAAAALAAAAAA==",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACwAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAFVmF1bHQAAAAAAAAAAAAAAAAAAAVBc3NldAAAAAAAAAAAAAAAAAAABktlZXBlcgAAAAAAAAAAAAAAAAAKU3RyYXRlZ2llcwAAAAAAAAAAAAAAAAAMU3RyYXRlZ3lMaXN0AAAAAAAAAAAAAAASVG90YWxBbGxvY2F0aW9uQnBzAAAAAAAAAAAAAAAAABVSZWJhbGFuY2VUaHJlc2hvbGRCcHMAAAAAAAAAAAAAAAAAABRNaW5SZWJhbGFuY2VJbnRlcnZhbAAAAAAAAAAAAAAADUxhc3RSZWJhbGFuY2UAAAAAAAAAAAAAAAAAAAZQYXVzZWQAAA==",
        "AAAAAQAAAAAAAAAAAAAADFN0cmF0ZWd5SW5mbwAAAAUAAAAAAAAABmFjdGl2ZQAAAAAAAQAAAAAAAAAOYWxsb2NhdGlvbl9icHMAAAAAAAsAAAAAAAAACGRlcGxveWVkAAAACwAAAAAAAAAMbGFzdF9oYXJ2ZXN0AAAABgAAAAAAAAAObWF4X2RlcGxveWFibGUAAAAAAAs=" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<null>,
        rebalance: this.txFromJSON<null>,
        add_strategy: this.txFromJSON<null>,
        total_deployed: this.txFromJSON<i128>,
        deposit_to_strategies: this.txFromJSON<null>,
        withdraw_from_strategies: this.txFromJSON<null>
  }
}