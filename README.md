# Stratis

Stratis is a crypto focused web application built with Next.js and TypeScript. The project includes a simple Ethereum smart contract (Hardhat) and a Sanity content studio for storing submitted projects. Users can sign in with Google or GitHub via NextAuth and purchase grid space through MetaMask.

## Prerequisites

- Node.js 18 or later
- npm
- MetaMask browser extension for interaction with the Ethereum network

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

### Building for Production

To create an optimized production build run:

```bash
npm run build
npm start
```

### Hardhat

A sample contract is located in the `contracts` folder and can be tested with Hardhat. Use the commands below if you want to interact with the smart contract:

```bash
npx hardhat test      # run contract tests
npx hardhat node      # start a local Ethereum node
npx hardhat run scripts/deploy.js
```

### Environment Variables

Create a `.env.local` file in the project root and provide the following variables when needed:

```
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_SANITY_PROJECT_ID="<your sanity project id>"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="<sanity token>"
GOOGLE_CLIENT_ID="<google client id>"
GOOGLE_CLIENT_SECRET="<google client secret>"
GITHUB_ID="<github client id>"
GITHUB_SECRET="<github client secret>"
NEXT_PUBLIC_MYACCOUNT="<ethereum address to receive funds>"
```

## License

This project is provided as-is without any warranty.
