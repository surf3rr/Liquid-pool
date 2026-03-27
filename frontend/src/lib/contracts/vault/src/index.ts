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
    contractId: "CCDL63P3AHW6QGGY7JMEQ2D7IJX4Y4F5R6CO7HMMFWWVGSZMHAOXERG7",
  }
} as const

export type DataKey = {tag: "Admin", values: void} | {tag: "Controller", values: void} | {tag: "Asset", values: void} | {tag: "ShareToken", values: void} | {tag: "TotalShares", values: void} | {tag: "DepositCap", values: void} | {tag: "FeeBps", values: void} | {tag: "LastFeeTime", values: void} | {tag: "Treasury", values: void} | {tag: "Paused", values: void};

export interface Client {
  /**
   * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init: ({admin, controller, asset, share_token, treasury, deposit_cap, fee_bps}: {admin: string, controller: string, asset: string, share_token: string, treasury: string, deposit_cap: i128, fee_bps: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a deposit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deposit: ({from, amount}: {from: string, amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a withdraw transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw: ({from, shares}: {from: string, shares: i128}, options?: MethodOptions) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a total_assets transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  total_assets: (options?: MethodOptions) => Promise<AssembledTransaction<i128>>

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
      new ContractSpec([ "AAAAAAAAAAAAAAAEaW5pdAAAAAcAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAKY29udHJvbGxlcgAAAAAAEwAAAAAAAAAFYXNzZXQAAAAAAAATAAAAAAAAAAtzaGFyZV90b2tlbgAAAAATAAAAAAAAAAh0cmVhc3VyeQAAABMAAAAAAAAAC2RlcG9zaXRfY2FwAAAAAAsAAAAAAAAAB2ZlZV9icHMAAAAACwAAAAA=",
        "AAAAAAAAAAAAAAAHZGVwb3NpdAAAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAAAs=",
        "AAAAAAAAAAAAAAAId2l0aGRyYXcAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGc2hhcmVzAAAAAAALAAAAAQAAAAs=",
        "AAAAAAAAAAAAAAAMdG90YWxfYXNzZXRzAAAAAAAAAAEAAAAL",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACgAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAKQ29udHJvbGxlcgAAAAAAAAAAAAAAAAAFQXNzZXQAAAAAAAAAAAAAAAAAAApTaGFyZVRva2VuAAAAAAAAAAAAAAAAAAtUb3RhbFNoYXJlcwAAAAAAAAAAAAAAAApEZXBvc2l0Q2FwAAAAAAAAAAAAAAAAAAZGZWVCcHMAAAAAAAAAAAAAAAAAC0xhc3RGZWVUaW1lAAAAAAAAAAAAAAAACFRyZWFzdXJ5AAAAAAAAAAAAAAAGUGF1c2VkAAA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<null>,
        deposit: this.txFromJSON<i128>,
        withdraw: this.txFromJSON<i128>,
        total_assets: this.txFromJSON<i128>
  }
}