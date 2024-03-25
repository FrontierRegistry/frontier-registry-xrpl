import { ADAPTER_EVENTS, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { getWalletProvider, IWalletProvider } from "./walletProvider";

// export interface IWeb3AuthContext {
//   web3Auth: Web3Auth | null;
//   provider: IWalletProvider | null;
//   isLoading: boolean;
//   user: unknown;
//   chain: string;
//   login: () => Promise<void>;
//   logout: () => Promise<void>;
//   getUserInfo: () => Promise<any>;
//   signMessage: () => Promise<any>;
//   getAccounts: () => Promise<any>;
//   getBalance: () => Promise<any>;
//   signTransaction: () => Promise<any>;
//   signAndSendTransaction: () => Promise<any>;
// }

export const Web3AuthContext = createContext({
  web3Auth: null,
  provider: null,
  isLoading: false,
  user: null,
  chain: "",
  login: async () => { },
  logout: async () => { },
  getUserInfo: async () => { },
  signMessage: async () => { },
  getAccounts: async () => { },
  getBalance: async () => { },
  signTransaction: async () => { },
  signAndSendTransaction: async () => { },
});

export function useWeb3Auth() {
  return useContext(Web3AuthContext);
}

export const Web3AuthProvider = ({ children, web3AuthNetwork, chain }) => {
  const { REACT_APP_WEB3_AUTH_CLIENT_ID } = process.env;
  const [web3Auth, setWeb3Auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setWalletProvider = useCallback(
    (web3authProvider) => {
      const walletProvider = getWalletProvider(chain, web3authProvider, uiConsole);
      setProvider(walletProvider);
    },
    [chain]
  );

  const subscribeAuthEvents = (web3auth) => {
    // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
    web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
      console.log("Yeah!, you are successfully logged in", data);
      setUser(data);
      setWalletProvider(web3auth.provider);
    });

    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log("connecting");
    });

    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log("disconnected");
      setUser(null);
    });

    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.error("some error or user has cancelled login request", error);
    });
  };

  const init = async () => {
    try {
      const currentChainConfig = CHAIN_CONFIG[chain];
      console.log("chainId: ", currentChainConfig);
      setIsLoading(true);
      const clientId = REACT_APP_WEB3_AUTH_CLIENT_ID;
      const web3AuthInstance = new Web3Auth({
        chainConfig: currentChainConfig,
        clientId,
      });
      console.log("we3auth instance: ", web3AuthInstance);
      const adapter = new OpenloginAdapter({ adapterSettings: { network: web3AuthNetwork, clientId } });
      web3AuthInstance.configureAdapter(adapter);
      subscribeAuthEvents(web3AuthInstance);
      setWeb3Auth(web3AuthInstance);
      await web3AuthInstance.initModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, [chain, web3AuthNetwork, setWalletProvider]);

  const login = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    const localProvider = await web3Auth.connect();
    setWalletProvider(localProvider);
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      const error = "web3auth not initialized yet";
      return error;
    }
    const user = await web3Auth.getUserInfo();
    return user;
  };

  const getAccounts = async () => {
    if (!provider) {
      const error = "provider not initialized yet";
      return error;
    }
    const account = await provider.getAccounts();
    return account;
  };

  const getBalance = async () => {
    if (!provider) {
      const error = "provider not initialized yet";
      return error;
    }
    const balance = await provider.getBalance();
    return balance;
  };

  const signMessage = async () => {
    if (!provider) {
      const error = "provider not initialized yet";
      return error;
    }
    const signmessage = await provider.signMessage();
    return signmessage;
  };

  const signTransaction = async () => {
    if (!provider) {
      const error = "provider not initialized yet";
      return error;
    }
    const signtransaction = await provider.signTransaction();
    return signtransaction;
  };

  const signAndSendTransaction = async () => {
    if (!provider) {
      const error = "provider not initialized yet";
      return error;
    }
    const signandsendtransaction = await provider.signAndSendTransaction();
    return signandsendtransaction;
  };

  const uiConsole = (...args) => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  };

  const contextProvider = {
    web3Auth,
    chain,
    provider,
    user,
    isLoading,
    login,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
    signTransaction,
    signAndSendTransaction,
  };
  return <Web3AuthContext.Provider value={contextProvider}>{children}</Web3AuthContext.Provider>;
};
