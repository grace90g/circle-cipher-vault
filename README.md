# Circle Cipher Vault

A revolutionary privacy-first lending circle platform built with FHE (Fully Homomorphic Encryption) technology. Unlike traditional lending circles, Circle Cipher Vault ensures complete privacy of individual contribution amounts while maintaining transparency in fund distribution and community trust.

## What Makes Us Different

### 🔐 **True Privacy with FHE**
- **Individual amounts are completely encrypted** - No one, not even the platform, can see your contribution amounts
- **Zero-knowledge proofs** ensure fair distribution without revealing sensitive financial data
- **Homomorphic encryption** allows calculations on encrypted data without decryption

### 🌐 **Decentralized & Trustless**
- **Smart contracts** handle all fund distribution automatically
- **No central authority** controls your funds or personal information
- **Blockchain transparency** for public operations while keeping private data encrypted

### 🤝 **Community-First Approach**
- **Reputation system** based on encrypted contribution history
- **Verified communities** with trust scores and member verification
- **Fair rotation algorithms** ensure everyone gets their turn without bias

### ⚡ **Modern Web3 Integration**
- **Multi-wallet support** via RainbowKit (MetaMask, WalletConnect, Coinbase, etc.)
- **Sepolia testnet** for safe testing and development
- **Gas-optimized** smart contracts for cost-effective transactions

## Key Features

- **Private & Secure**: Your contribution amounts are encrypted using FHE technology
- **Community Driven**: Build trust with verified community members
- **Blockchain Secured**: Smart contracts ensure automatic and transparent fund distribution
- **Fair Distribution**: Algorithm ensures complete fairness without revealing individual amounts
- **Multi-Chain Ready**: Built for future expansion to multiple blockchain networks

## How We Compare

| Feature | Traditional Lending Circles | Circle Cipher Vault |
|---------|----------------------------|-------------------|
| **Privacy** | ❌ All amounts visible to all members | ✅ Individual amounts completely encrypted |
| **Trust** | ❌ Requires blind trust in other members | ✅ Blockchain-verified with reputation system |
| **Transparency** | ❌ Manual tracking, prone to errors | ✅ Smart contract automation |
| **Security** | ❌ Centralized, single point of failure | ✅ Decentralized, no single point of failure |
| **Fairness** | ❌ Human bias in rotation selection | ✅ Algorithm-based fair rotation |
| **Accessibility** | ❌ Limited to local communities | ✅ Global, 24/7 accessible |
| **Cost** | ❌ High overhead and manual processes | ✅ Low gas fees, automated processes |

## Technologies

This project is built with:

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Blockchain**: Solidity, FHE (Fully Homomorphic Encryption)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Network**: Sepolia Testnet
- **Privacy**: Zama FHE Library for encrypted computations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/grace90g/circle-cipher-vault.git
cd circle-cipher-vault
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Smart Contract

The project includes FHE-enabled smart contracts that ensure:
- Encrypted contribution amounts
- Fair distribution algorithms
- Transparent fund management
- Community verification systems

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@circleciphervault.com or join our Discord community.

## Roadmap

- [ ] Multi-chain support
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Integration with DeFi protocols
- [ ] Governance token implementation