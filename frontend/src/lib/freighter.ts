import { requestAccess, getPublicKey, signTransaction, isConnected } from "@stellar/freighter-api";

export async function connectWallet() {
  const connected = await isConnected();
  if (!connected) {
    throw new Error("Freighter wallet not detected. Please install the extension.");
  }
  
  const publicKey = await requestAccess();
  if (!publicKey) {
    throw new Error("User denied access to the wallet.");
  }
  
  return publicKey;
}

export async function getUserPublicKey() {
  return await getPublicKey();
}

export async function signWithFreighter(xdr: string, network: string, networkPassphrase: string) {
  return await signTransaction(xdr, {
    network,
    networkPassphrase,
  });
}
