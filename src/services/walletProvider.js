// import { SafeEventEmitterProvider } from "@web3auth/base";
import ethProvider from "./ethProvider.js";

// export interface IWalletProvider {
//   getAccounts: () => Promise<any>;
//   getBalance: () => Promise<any>;
//   signAndSendTransaction: () => Promise<any>;
//   signTransaction: () => Promise<any>;
//   signMessage: () => Promise<any>;
// }

export const getWalletProvider = (chain, provider, uiConsole) => {
  return ethProvider(provider, uiConsole);
};
