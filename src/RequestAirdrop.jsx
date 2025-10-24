// Import React Solana wallet hook — gives access to the connected wallet (like Phantom)
import { useWallet } from "@solana/wallet-adapter-react";

// Import React Solana connection hook — gives access to the Solana blockchain connection
import { useConnection } from "@solana/wallet-adapter-react";

// Import constant to convert between SOL and lamports (1 SOL = 1,000,000,000 lamports)
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


// Define a React component named "RequestAirdrop"
export function RequestAirdrop() {
    // Get wallet info (like publicKey) using the useWallet hook
    const wallet = useWallet();

    // Get connection object to interact with Solana blockchain
    const { connection } = useConnection();

    // Define an async function (because blockchain calls take time)
    async function requestAirdrop() {
        // Read the amount entered by user in the input box
        let amount = document.getElementById("amount").value;

        // Request Solana devnet to send free SOL (airdrop) to the user's wallet
        // Convert SOL → lamports before sending (Solana only understands lamports)
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);

        // Show an alert box confirming the airdrop
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }

    // Return JSX (HTML-like code) to show input box and button on the webpage
    return (
        <div>
            <br/><br/> {/* Adds some vertical space on the screen */}
            
            {/* Input box for typing how much SOL to airdrop */}
            <input id="amount" type="text" placeholder="Amount" />
            
            {/* Button that calls the requestAirdrop() function when clicked */}
            <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
    );
}

// useWallet() → knows which wallet is connected

// useConnection() → lets you talk to Solana blockchain

// LAMPORTS_PER_SOL → converts between SOL and lamports

// connection.requestAirdrop() → gives you free SOL on devnet

// <input> + <button> → makes the UI for entering amount and requesting