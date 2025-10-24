// Import both hooks from the Solana React wallet adapter
// useWallet() → lets us access the user's connected wallet
// useConnection() → gives access to the Solana blockchain network (devnet/testnet/mainnet)
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// Import tools from Solana's core JavaScript SDK (web3.js)
// LAMPORTS_PER_SOL → used to convert SOL ↔ lamports (1 SOL = 1,000,000,000 lamports)
// PublicKey → represents a Solana wallet address
// SystemProgram → built-in program that can transfer SOL between wallets
// Transaction → used to create and send transactions on the blockchain
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";


// Define a React component called SendTokens
// This will render a small form that allows users to send SOL to another wallet
export function SendTokens() {
    // Get the user's connected wallet info
    const wallet = useWallet();

    // Get connection to the Solana blockchain (used to send transactions)
    const { connection } = useConnection();

    // Define an async function that runs when the user clicks "Send"
    async function sendTokens() {
        // Get the receiver's wallet address from the input box with id="to"
        let to = document.getElementById("to").value;

        // Get how much SOL to send from the input box with id="amount"
        let amount = document.getElementById("amount").value;

        // Create a new empty transaction object
        const transaction = new Transaction();

        // Add an instruction to this transaction
        // SystemProgram.transfer() creates an instruction that tells Solana:
        // "Move X lamports from sender → receiver"
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,      // Sender (your connected wallet)
            toPubkey: new PublicKey(to),       // Receiver (convert entered address to a PublicKey object)
            lamports: amount * LAMPORTS_PER_SOL, // Convert SOL amount to lamports
        }));

        // Ask the wallet to sign and send this transaction to the blockchain
        await wallet.sendTransaction(transaction, connection);

        // Show a popup message confirming the transfer
        alert("Sent " + amount + " SOL to " + to);
    }

    // Return the UI — two input boxes and a send button
    return (
        <div>
            {/* Input box for receiver’s wallet address */}
            <input id="to" type="text" placeholder="To" />

            {/* Input box for amount of SOL to send */}
            <input id="amount" type="text" placeholder="Amount" />

            {/* Button that triggers sendTokens() when clicked */}
            <button onClick={sendTokens}>Send</button>
        </div>
    );
}

// Simple explanation (like a story)

// Imagine your wallet is your piggy bank, and Solana is a big digital money highway 🛣️

// You type your friend’s wallet address in the “To” box.

// You type how much SOL you want to send.

// When you click Send, your wallet signs a digital letter saying:

// “Hey Solana, move 2 SOL from me to my friend!”

// The SystemProgram.transfer() is the Solana post office that handles this letter.

// The transaction travels across the network, and once confirmed, your friend gets the SOL.

// Finally, you see a popup: “Sent 2 SOL to your friend’s address.”

// 🧾 TL;DR Summary
// Item	What it does
// useWallet()	Gets your wallet info (who’s sending)
// useConnection()	Talks to the blockchain
// Transaction()	Creates a package to send instructions
// SystemProgram.transfer()	Says “move SOL from A → B”
// wallet.sendTransaction()	Signs and sends the transaction
// PublicKey(to)	Converts the receiver’s address into a blockchain-readable form
// LAMPORTS_PER_SOL	Converts SOL into lamports (tiny units)