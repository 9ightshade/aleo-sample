# Aleo Testnet dApp Guide

A minimal, production-ready frontend dApp for interacting with the Aleo Testnet.

## Overview

This dApp allows users to execute deployed Leo programs on the Aleo Testnet by providing a private key and calling program functions directly from the browser.

## Technical Stack

- **React** (via Vite)
- **JavaScript** (ES6+)
- **@aleohq/sdk** (v0.6.9) - Official Aleo SDK
- **Vite** with WASM support

## File Structure

```
src/
├── App.jsx                         # Main application logic
├── App.css                         # Application styles
├── aleoClient.js                   # Aleo SDK integration layer
├── components/
│   ├── ExecuteForm.jsx            # Form for private key input
│   └── TransactionStatus.jsx      # Transaction result display
└── main.jsx                        # Application entry point
```

## Installation Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React and React DOM
- @aleohq/sdk for Aleo blockchain interaction
- vite-plugin-wasm and vite-plugin-top-level-await for WASM support
- Development dependencies (Vite, ESLint, etc.)

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Enter Private Key**: Input your Aleo private key in the form (development mode only - never use production keys in a frontend app)

2. **Execute Program**: Click the "Execute Program" button to execute the deployed Leo program

3. **View Results**:
   - On success: Transaction ID is displayed with a link to the Aleo Explorer
   - On error: Error message is shown with details

## Program Configuration

The dApp is pre-configured to execute the following program:

- **Program Name**: `simple_counter.aleo`
- **Function**: `increment_public`
- **Input**: `1u64`
- **Fee**: `0.1` credits
- **Network**: Aleo Testnet (`https://api.explorer.aleo.org/v1/testnet`)

To modify these settings, edit the constants in `src/App.jsx`:

```javascript
const PROGRAM_NAME = 'simple_counter.aleo';
const FUNCTION_NAME = 'increment_public';
const INPUTS = ['1u64'];
const FEE = 0.1;
```

## How Aleo Execution Works Internally

### Zero-Knowledge Proof Generation

When you execute a Leo program on Aleo, the following process occurs:

1. **Account Creation**: The SDK creates an Account object from your private key, which is used to sign transactions and prove ownership.

2. **Program Manager Initialization**: A ProgramManager is instantiated with:
   - Network URL (Aleo Testnet endpoint)
   - Account credentials for signing

3. **Zero-Knowledge Proof Generation**:
   - The SDK compiles the program function call into a zero-knowledge circuit
   - Input values are used to generate a cryptographic proof that the computation was executed correctly
   - This proof is generated **locally in your browser** using WebAssembly
   - The proof demonstrates that you know inputs that satisfy the program's constraints without revealing the inputs themselves

4. **Transaction Broadcasting**:
   - The generated proof, along with the program ID, function name, and fee are packaged into a transaction
   - The transaction is signed with your private key
   - The signed transaction is broadcast to the Aleo Testnet via the network client

5. **Blockchain Validation**:
   - Aleo validators verify the zero-knowledge proof
   - If valid, the transaction is included in a block
   - The program execution is recorded on-chain with complete privacy

### Key Benefits

- **Privacy**: Input values and computation details remain private
- **Verifiability**: Anyone can verify the proof without re-executing the program
- **Efficiency**: Proofs are succinct and quick to verify
- **Decentralization**: No trusted third party is required

## Code Architecture

### `aleoClient.js`

Handles all Aleo SDK interactions:

- **Dynamic Import**: The SDK is loaded asynchronously to avoid build-time issues with WebAssembly
- **Account Management**: Creates Aleo accounts from private keys
- **Program Execution**: Manages the full execution lifecycle

```javascript
export const executeProgram = async (privateKey, programName, functionName, inputs, fee) => {
  // Dynamically load Aleo SDK
  const { Account, ProgramManager } = await loadAleoSDK();

  // Create account from private key
  const account = new Account({ privateKey });

  // Initialize program manager and set account
  const programManager = new ProgramManager(TESTNET_URL, null, null);
  programManager.setAccount(account);

  // Execute program and return transaction ID
  return await programManager.execute(programName, functionName, inputs, fee);
};
```

### `ExecuteForm.jsx`

Presentational component for user input:

- Private key input (password field)
- Program configuration display
- Execute button with loading state

### `TransactionStatus.jsx`

Displays execution results:

- Success: Shows transaction ID and explorer link
- Error: Shows error message with details

### `App.jsx`

Main application logic:

- State management (loading, transaction ID, errors)
- Execution handler with error boundaries
- Component composition

## Build Configuration

The project uses custom Vite configuration to support Aleo SDK's WebAssembly requirements:

```javascript
{
  plugins: [
    wasm(),              // WASM support
    topLevelAwait(),     // Top-level await support
    react()
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'es'     // ES modules for top-level await
      }
    }
  }
}
```

## Security Considerations

**WARNING**: This implementation is for **development and demonstration purposes only**.

- Never use production private keys in a browser-based application
- Private keys are entered in plain text (use secure key management in production)
- For production applications, use:
  - Wallet adapters (Leo Wallet, Puzzle Wallet)
  - Browser extension wallets
  - Hardware wallet integration

## Troubleshooting

### Build Errors

If you encounter build errors related to WebAssembly or top-level await:

1. Ensure `vite-plugin-wasm` and `vite-plugin-top-level-await` are installed
2. Verify the Vite config has the correct plugin order
3. Check that `build.target` is set to `'esnext'`

### Runtime Errors

Common issues:

- **Invalid Private Key**: Ensure the private key format is correct (starts with `APrivateKey1...`)
- **Insufficient Credits**: Ensure the account has enough credits to pay the fee
- **Network Issues**: Check that the Aleo Testnet is accessible
- **Program Not Deployed**: Verify the program exists on the testnet

## References

- [Aleo Official Documentation](https://developer.aleo.org/)
- [Aleo SDK Documentation](https://developer.aleo.org/sdk/typescript/overview)
- [Leo Language Guide](https://developer.aleo.org/leo/)
- [Aleo Explorer](https://explorer.aleo.org/)

## License

This project is provided as-is for educational purposes.
