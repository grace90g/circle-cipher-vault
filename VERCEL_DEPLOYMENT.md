# Vercel Deployment Guide for Circle Cipher Vault

This guide provides step-by-step instructions for deploying the Circle Cipher Vault application to Vercel.

## Prerequisites

- GitHub account with access to the `grace90g/circle-cipher-vault` repository
- Vercel account (free tier available)
- Environment variables configured

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "New Project" on the dashboard
3. Import the `grace90g/circle-cipher-vault` repository
4. Click "Import" to proceed

### 2. Configure Project Settings

1. **Project Name**: `circle-cipher-vault` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### 3. Environment Variables Configuration

Click "Environment Variables" and add the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

**Important**: Make sure to add these variables for all environments (Production, Preview, Development).

### 4. Build Configuration

1. **Build Command**: `npm run build`
2. **Output Directory**: `dist`
3. **Install Command**: `npm install`
4. **Node.js Version**: 18.x (recommended)

### 5. Domain Configuration (Optional)

1. Go to the project dashboard
2. Click on "Settings" tab
3. Navigate to "Domains"
4. Add your custom domain if desired
5. Configure DNS settings as instructed by Vercel

### 6. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete
3. Your application will be available at the provided Vercel URL

## Post-Deployment Configuration

### 1. Smart Contract Deployment

Before the application can fully function, you need to deploy the smart contract:

1. Deploy the `CircleCipherVault.sol` contract to Sepolia testnet
2. Update the contract address in `src/lib/contract.ts`
3. Redeploy the frontend application

### 2. Contract Address Update

After deploying the smart contract:

1. Copy the deployed contract address
2. Update `CIRCLE_CIPHER_VAULT_ADDRESS` in `src/lib/contract.ts`
3. Commit and push the changes
4. Vercel will automatically redeploy

### 3. Verification

Test the deployed application:

1. Visit your Vercel URL
2. Connect a wallet (MetaMask, Rainbow, etc.)
3. Try creating a lending circle
4. Verify all functionality works as expected

## Environment-Specific Configurations

### Production Environment

- Use production RPC URLs
- Set up proper error monitoring
- Configure analytics if needed
- Set up proper CORS policies

### Preview Environment

- Use testnet configurations
- Enable debug logging
- Test with small amounts

### Development Environment

- Use local development settings
- Enable hot reloading
- Use test accounts

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables Not Loading**
   - Ensure variables are set for the correct environment
   - Check variable names match exactly
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL accessibility
   - Ensure proper network configuration

4. **Contract Interaction Failures**
   - Verify contract is deployed
   - Check contract address is correct
   - Ensure user has sufficient testnet ETH

### Performance Optimization

1. **Enable Vercel Analytics**
   - Go to project settings
   - Enable Vercel Analytics
   - Monitor performance metrics

2. **Configure Caching**
   - Set up proper cache headers
   - Use Vercel's edge functions if needed
   - Optimize static assets

3. **Monitor Build Times**
   - Use Vercel's build logs
   - Optimize dependencies
   - Consider build caching

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Regularly rotate API keys

2. **CORS Configuration**
   - Configure proper CORS policies
   - Restrict access to necessary domains
   - Use HTTPS in production

3. **Smart Contract Security**
   - Audit smart contracts before deployment
   - Use proper access controls
   - Implement proper error handling

## Monitoring and Maintenance

1. **Set up Monitoring**
   - Use Vercel Analytics
   - Monitor error rates
   - Set up alerts for critical issues

2. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Test updates in preview environment

3. **Backup Strategy**
   - Regular database backups (if applicable)
   - Version control for all code changes
   - Document configuration changes

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Documentation](https://wagmi.sh/)

## Contact

For deployment issues or questions:
- Email: support@circleciphervault.com
- GitHub Issues: [Create an issue](https://github.com/grace90g/circle-cipher-vault/issues)
- Discord: Join our community server

---

**Note**: This deployment guide assumes you have the necessary permissions and access to the GitHub repository and Vercel account. Make sure to follow all security best practices when deploying to production.
