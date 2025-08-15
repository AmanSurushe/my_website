# 🚀 Deployment Guide: GitHub Actions → Vercel

This guide will help you set up automated deployment from GitHub to Vercel using GitHub Actions.

## Prerequisites

- GitHub repository with your portfolio code
- Vercel account
- Portfolio project imported to Vercel

## Step 1: Set up Vercel Project

1. **Import your project to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `out` (if using static export)

2. **Get Vercel project details:**
   - Go to your project settings
   - Copy the **Project ID** and **Org ID** from the General tab

## Step 2: Generate Vercel Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Create a new token with appropriate scope
3. Copy the token (you won't see it again!)

## Step 3: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these repository secrets:

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here
VERCEL_PROJECT_ID=your_project_id_here
```

## Step 4: Verify Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is configured to:

- **Preview Deployments**: Triggered on pull requests
- **Production Deployments**: Triggered on pushes to main branch

### Workflow Features:
- ✅ Node.js 18 setup with npm caching
- ✅ Dependency installation and build verification
- ✅ Automatic Vercel deployment
- ✅ Separate preview and production environments

## Step 5: Test the Deployment

1. **Test Preview Deployment:**
   - Create a new branch
   - Make a small change
   - Open a pull request
   - Check GitHub Actions tab for deployment status

2. **Test Production Deployment:**
   - Merge the pull request to main
   - Check GitHub Actions for production deployment

## Deployment Configuration

### Vercel Configuration (`vercel.json`)
- **Regions**: Optimized for Asia-Pacific (Mumbai, Singapore)
- **Security Headers**: CSP, XSS protection, etc.
- **API Routes**: Configured for sitemap, robots.txt, RSS
- **Function Timeout**: 10 seconds for API routes

### Environment Variables (if needed)
Add environment variables in Vercel dashboard:
- Project Settings → Environment Variables
- Add for Production, Preview, and Development

## Monitoring and Troubleshooting

### Check Deployment Status:
1. **GitHub Actions**: Repository → Actions tab
2. **Vercel Dashboard**: Project → Deployments tab

### Common Issues:
- **Build failures**: Check build logs in GitHub Actions
- **Environment variables**: Verify secrets are set correctly
- **Domain issues**: Check custom domain configuration in Vercel

### Useful Commands:
```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint

# Install Vercel CLI for local testing
npm i -g vercel
vercel dev
```

## Production Checklist

- [ ] GitHub secrets configured
- [ ] Vercel project connected
- [ ] Custom domain configured (optional)
- [ ] Environment variables set
- [ ] Build successful locally
- [ ] Preview deployment working
- [ ] Production deployment successful

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review Vercel deployment logs
3. Verify all secrets and configuration
4. Test build locally first

---

**Next Steps**: After successful deployment, consider setting up:
- Custom domain
- Analytics integration
- Performance monitoring
- CDN configuration