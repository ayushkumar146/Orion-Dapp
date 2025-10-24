// Import React and useMemo (a React hook to remember values so they don’t recalculate every time)
import React, { useMemo } from 'react';
import './App.css';
// These two are main Solana React hooks that give access to the blockchain connection and wallet
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

// This helps us connect to different Solana networks like Devnet, Testnet, Mainnet
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// These are UI buttons provided by Solana wallet adapter
// - WalletModalProvider = enables pop-up modal for choosing wallet
// - WalletMultiButton = button to connect wallet
// - WalletDisconnectButton = button to disconnect wallet
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

// clusterApiUrl gives us the RPC endpoint (like the network link) for Devnet/Testnet/Mainnet
import { clusterApiUrl } from '@solana/web3.js';

// This imports the default Solana wallet adapter button styles
import '@solana/wallet-adapter-react-ui/styles.css';

// Import your two custom React components
import { SendTokens } from './SendTokens';
import { SignMessage } from './SignMessage';

// The main App component that combines everything
function App() {
  // Choose which Solana network you want to connect to (Devnet = for testing)
  const network = WalletAdapterNetwork.Devnet;

  // useMemo remembers the cluster URL so it doesn’t re-run every render
  // clusterApiUrl(network) returns something like "https://api.devnet.solana.com"
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Return the full UI wrapped inside the Solana wallet context providers
  return (
      // ConnectionProvider gives access to Solana network (like opening a pipe to blockchain)

      <ConnectionProvider endpoint={endpoint}>

          {/*
            WalletProvider makes wallet features available (like connect, disconnect, sign, send)
            wallets = [] means no preconfigured wallets (uses default)
            autoConnect = automatically reconnects previously used wallet
          */}
          <WalletProvider wallets={[]} autoConnect>

              {/*
                WalletModalProvider enables the popup modal UI for selecting wallets
              */}
              <WalletModalProvider>

                {/* Simple header with Connect and Disconnect buttons */}
                      <div className="app-heading"> Orion Dapp</div>

                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  {/* Button that lets user connect a Solana wallet (e.g. Phantom) */}
                  <WalletMultiButton />
                  {/* Button to disconnect the wallet */}
                  <WalletDisconnectButton />
                </div>

                {/* You can uncomment below if you made those components */}
                {/* <RequestAirdrop /> */}
                {/* <ShowSolBalance /> */}

                {/* Your message signing feature */}
                <div className="card"><SignMessage /></div>
                

                {/* Your token sending feature */}
                <div className="card"><SendTokens /></div>
                

              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

// Export the App component as the default so React can render it
export default App;

// 💡 Quick Summary (like a 10-year-old version)

// 🧠 ConnectionProvider → connects your app to Solana’s Devnet (like Wi-Fi for blockchain).

// 💼 WalletProvider → lets you connect a crypto wallet (like Phantom).

// 💬 WalletModalProvider → gives you pop-up buttons to connect/disconnect.

// 🪙 SignMessage → allows signing messages to prove who you are.

// 💸 SendTokens → allows sending SOL to another address.

// 🌐 endpoint → is just the Devnet’s URL your app uses to talk to Solana.