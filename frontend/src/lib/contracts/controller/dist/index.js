import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAEaW5pdAAAAAQAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAFdmF1bHQAAAAAAAATAAAAAAAAAAVhc3NldAAAAAAAABMAAAAAAAAABmtlZXBlcgAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAJcmViYWxhbmNlAAAAAAAAAQAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAMYWRkX3N0cmF0ZWd5AAAAAwAAAAAAAAAIc3RyYXRlZ3kAAAATAAAAAAAAAA5hbGxvY2F0aW9uX2JwcwAAAAAACwAAAAAAAAAObWF4X2RlcGxveWFibGUAAAAAAAsAAAAA",
            "AAAAAAAAAAAAAAAOdG90YWxfZGVwbG95ZWQAAAAAAAAAAAABAAAACw==",
            "AAAAAAAAAAAAAAAVZGVwb3NpdF90b19zdHJhdGVnaWVzAAAAAAAAAQAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAAYd2l0aGRyYXdfZnJvbV9zdHJhdGVnaWVzAAAAAQAAAAAAAAAHX2Ftb3VudAAAAAALAAAAAA==",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACwAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAFVmF1bHQAAAAAAAAAAAAAAAAAAAVBc3NldAAAAAAAAAAAAAAAAAAABktlZXBlcgAAAAAAAAAAAAAAAAAKU3RyYXRlZ2llcwAAAAAAAAAAAAAAAAAMU3RyYXRlZ3lMaXN0AAAAAAAAAAAAAAASVG90YWxBbGxvY2F0aW9uQnBzAAAAAAAAAAAAAAAAABVSZWJhbGFuY2VUaHJlc2hvbGRCcHMAAAAAAAAAAAAAAAAAABRNaW5SZWJhbGFuY2VJbnRlcnZhbAAAAAAAAAAAAAAADUxhc3RSZWJhbGFuY2UAAAAAAAAAAAAAAAAAAAZQYXVzZWQAAA==",
            "AAAAAQAAAAAAAAAAAAAADFN0cmF0ZWd5SW5mbwAAAAUAAAAAAAAABmFjdGl2ZQAAAAAAAQAAAAAAAAAOYWxsb2NhdGlvbl9icHMAAAAAAAsAAAAAAAAACGRlcGxveWVkAAAACwAAAAAAAAAMbGFzdF9oYXJ2ZXN0AAAABgAAAAAAAAAObWF4X2RlcGxveWFibGUAAAAAAAs="]), options);
        this.options = options;
    }
    fromJSON = {
        init: (this.txFromJSON),
        rebalance: (this.txFromJSON),
        add_strategy: (this.txFromJSON),
        total_deployed: (this.txFromJSON),
        deposit_to_strategies: (this.txFromJSON),
        withdraw_from_strategies: (this.txFromJSON)
    };
}
