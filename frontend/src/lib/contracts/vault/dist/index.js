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
        contractId: "CCDL63P3AHW6QGGY7JMEQ2D7IJX4Y4F5R6CO7HMMFWWVGSZMHAOXERG7",
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
        super(new ContractSpec(["AAAAAAAAAAAAAAAEaW5pdAAAAAcAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAKY29udHJvbGxlcgAAAAAAEwAAAAAAAAAFYXNzZXQAAAAAAAATAAAAAAAAAAtzaGFyZV90b2tlbgAAAAATAAAAAAAAAAh0cmVhc3VyeQAAABMAAAAAAAAAC2RlcG9zaXRfY2FwAAAAAAsAAAAAAAAAB2ZlZV9icHMAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAHZGVwb3NpdAAAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAAId2l0aGRyYXcAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGc2hhcmVzAAAAAAALAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAAMdG90YWxfYXNzZXRzAAAAAAAAAAEAAAAL",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACgAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAKQ29udHJvbGxlcgAAAAAAAAAAAAAAAAAFQXNzZXQAAAAAAAAAAAAAAAAAAApTaGFyZVRva2VuAAAAAAAAAAAAAAAAAAtUb3RhbFNoYXJlcwAAAAAAAAAAAAAAAApEZXBvc2l0Q2FwAAAAAAAAAAAAAAAAAAZGZWVCcHMAAAAAAAAAAAAAAAAAC0xhc3RGZWVUaW1lAAAAAAAAAAAAAAAACFRyZWFzdXJ5AAAAAAAAAAAAAAAGUGF1c2VkAAA="]), options);
        this.options = options;
    }
    fromJSON = {
        init: (this.txFromJSON),
        deposit: (this.txFromJSON),
        withdraw: (this.txFromJSON),
        total_assets: (this.txFromJSON)
    };
}
