import * as Vault from "vault";
import * as Controller from "controller";
import { signTransaction, isConnected } from "@stellar/freighter-api";

export const STREAMS_CONFIG = {
  rpcUrl: process.env.NEXT_PUBLIC_TESTNET_RPC || "https://soroban-testnet.stellar.org",
  networkPassphrase: process.env.NEXT_PUBLIC_TESTNET_PASSPHRASE || "Test SDF Network ; September 2015",
  vaultId: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ID || "",
  controllerId: process.env.NEXT_PUBLIC_CONTROLLER_CONTRACT_ID || "",
};

export const vaultClient = new Vault.Client({
  ...Vault.networks.testnet,
  rpcUrl: STREAMS_CONFIG.rpcUrl,
  allowHttp: true,
});

export const controllerClient = new Controller.Client({
  ...Controller.networks.testnet,
  rpcUrl: STREAMS_CONFIG.rpcUrl,
  allowHttp: true,
});

export async function signAndSend(assembledTransaction: any) {
  const connected = await isConnected();
  if (!connected) throw new Error("Wallet not connected");

  // Assembling signer for the client
  return await assembledTransaction.signAndSend({
    signTransaction: async (xdr: string) => {
      const signedTransaction = await signTransaction(xdr, {
        network: "TESTNET",
        networkPassphrase: STREAMS_CONFIG.networkPassphrase,
      });
      return signedTransaction;
    },
  });
}
