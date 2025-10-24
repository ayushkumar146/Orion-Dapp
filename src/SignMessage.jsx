// Import the ed25519 cryptography functions (used for verifying digital signatures)
// ed25519 is the algorithm Solana uses to sign messages & transactions securely
import { ed25519 } from '@noble/curves/ed25519';

// Import useWallet() hook — lets you talk to the connected Solana wallet
// It gives you functions like signMessage() and your publicKey
import { useWallet } from '@solana/wallet-adapter-react';

// Import bs58 — this library helps convert binary data into Base58 format
// Base58 is a short, human-readable way of showing keys or signatures (like Solana addresses)
import bs58 from 'bs58';

// Import React so we can define a React component
import React from 'react';


// Define a React component named SignMessage
export function SignMessage() {

    // Destructure 'publicKey' and 'signMessage' from the connected wallet
    // publicKey → wallet's address
    // signMessage → wallet function that lets you sign any text message securely
    const { publicKey, signMessage } = useWallet();


    // Define an async function that runs when user clicks "Sign Message" button
    async function onClick() {

        // If no wallet is connected, stop here and show an error
        if (!publicKey) throw new Error('Wallet not connected!');

        // If wallet doesn’t support signing (some wallets can’t), show an error
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        
        // Get the message the user typed in the input box
        const message = document.getElementById("message").value;

        // Convert that message (a string) into bytes using TextEncoder
        // Solana wallets sign byte data, not plain text
        const encodedMessage = new TextEncoder().encode(message);

        // Ask the wallet to sign the message bytes
        // The wallet will pop up a window asking user’s permission to sign
        const signature = await signMessage(encodedMessage);

        // Verify that the signature is actually valid using the wallet's public key
        // ed25519.verify() checks: "Was this message really signed by this wallet?"
        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
            throw new Error('Message signature invalid!');

        // If verification succeeds, show an alert with the Base58 version of the signature
        // bs58.encode() makes the signature easy to read and copy
        alert('success', `Message signature: ${bs58.encode(signature)}`);
    };


    // Return JSX (the UI) for typing message and signing it
    return (
        <div>
            {/* Input box where user types a message */}
            <input id="message" type="text" placeholder="Message" />

            {/* Button that triggers onClick() to sign message */}
            <button onClick={onClick}>
                Sign Message
            </button>
        </div>
    );
};

// Simple “10-year-old” Explanation

// Imagine your Solana wallet is your superpower pen 🖋️
// When you sign a message:

// You don’t change the message.

// You just stamp it with your secret mark (signature) 🕵️‍♂️

// Anyone with your public key can check and say, “Yep, that’s really from you!”

// Here’s what happens step-by-step:

// You type a message (e.g. “Hello, Solana!”).

// The wallet turns that message into bytes (machine-readable).

// You click Sign Message, your wallet pops up asking “Do you approve?”

// Wallet signs it using your private key (kept secret).

// Your app checks if the signature is real using ed25519.verify().

// If it’s valid, it shows a success alert with the signature in Base58 format (short readable code).

// 🧾 TL;DR Summary
// Term	Meaning
// useWallet()	Connects to the user’s wallet
// signMessage()	Asks the wallet to digitally sign a message
// ed25519	Algorithm that checks if a signature is real
// bs58.encode()	Makes the signature short & human-readable
// TextEncoder()	Turns text → bytes
// alert()	Pops up success message on screen


// Excellent question, Ayush 🔥 — and this is actually one of the **most important security concepts** in blockchain development.
// Let’s break it down **super simply — like you’re 10 years old**, then build up to the real-world reason.

// ---

// ## 🧠 Imagine this:

// You are **Ayush**, and you have a **special pen** 🖊️ that only **you** can use.
// Whatever you write with that pen, everyone can see —

// > “Oh yeah, that’s Ayush’s handwriting! Only his pen can make that mark.”

// That’s exactly what **signing a message** means in crypto.

// ---

// ## 💡 The basic idea

// * You have a **private key** → your secret pen 🖋️
// * You have a **public key** → your visible signature (like your name) 👤

// When you **sign** something with your private key,
// anyone can use your **public key** to verify:

// > “Yes, this was really signed by Ayush — and nobody else.”

// ---

// ## 🧩 In the context of Solana (or any blockchain)

// Your **wallet** has:

// * a **private key** (secret, stays with wallet only)
// * a **public key** (your wallet address — shared openly)

// When you use:

// ```js
// const signature = await signMessage(encodedMessage);
// ```

// You are saying:

// > “I, the owner of this wallet, approve this message.”

// The wallet creates a unique cryptographic signature for that exact message —
// like a digital fingerprint that **cannot be faked or reused**.

// ---

// ## 💥 Why is signing a message important?

// | Reason                                | Explanation (like a story)                                                                                                                        |
// | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
// | ✅ **Proof of ownership**              | It proves that *you really control* the wallet. Example: a DApp can ask you to sign a message to log in — no need for a password.                 |
// | 🔒 **Security**                       | You never give away your private key — you just sign messages. The wallet keeps the key safe and only gives out signatures.                       |
// | 🪪 **Authentication**                 | When a website or DApp wants to make sure it’s *you*, not someone pretending, it asks you to sign a random message. Only your wallet can do that. |
// | 🧾 **Non-transactional verification** | You can prove your identity **without sending any tokens or paying gas** — it’s free verification!                                                |
// | 🧰 **Used in DeFi, NFTs, and DApps**  | Signing is used in login systems, verifying bids, minting NFTs, or confirming actions on-chain or off-chain.                                      |

// ---

// ## ⚙️ Example in the real world

// Let’s say you visit a Solana DApp like **Magic Eden** or **Phantom wallet site**.

// They may show a popup:

// > “Sign this message to verify it’s you.”

// You click **Sign**, your wallet pops up, and signs it.

// The website now knows:

// > “This person really owns wallet `8zYx...F3jK`.”

// No password needed.
// No email.
// No risk of leaking private keys.

// You just **prove ownership** safely.

// ---

// ## 🧠 Summary in one line

// > ✍️ **Signing a message proves you are you — without revealing your secret key.**

// It’s like digitally saying “Yes, I agree” in a way no one can forge.

// ---

// Would you like me to show a **small real-life use case** — for example,
// how signing a message lets a DApp **log users in without any username or password** (just the wallet)?
