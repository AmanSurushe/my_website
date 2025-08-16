# 🚀 Deployment Guide: GitHub Actions → Vercel

This guide will help you set up automated deployment from GitHub to Vercel using GitHub Actions.

## 🎉 Recent Updates (Latest)

**✅ Vercel Build Issues Fixed!** All major deployment problems have been resolved:

- **Fixed `vercel.json` configuration** - Removed incorrect `outputDirectory`
- **Fixed TypeScript compilation** - Removed `ignoreBuildErrors` and fixed all hidden errors  
- **Fixed component type issues** - Resolved invalid props and template literal types
- **Fixed i18n configuration** - Proper locale handling
- **Updated deployment workflow** - Enhanced with proper error handling

Your deployments should now work seamlessly! 🚀

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
     - Framework Preset: **Next.js**
     - Build Command: **`npm run build`**
     - Output Directory: **Leave EMPTY** (Vercel auto-detects for Next.js)
     - Install Command: **`npm install`** (default)

2. **Get Vercel project details:**
   - Go to your project settings
   - Copy the **Project ID** and **Org ID** from the General tab

## ⚠️ Important: Build Configuration

**DO NOT** set `"outputDirectory": "out"` in `vercel.json` unless you're using static export (`next export`). This portfolio uses standard Next.js build output.

✅ **Correct Configuration:**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build"
}
```

❌ **Incorrect Configuration:**
```json
{
  "framework": "nextjs", 
  "buildCommand": "npm run build",
  "outputDirectory": "out"  // Remove this line!
}
```

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
- ✅ Node.js 20 setup with npm caching
- ✅ Dependency installation and build verification
- ✅ Automatic Vercel deployment
- ✅ Separate preview and production environments
- ✅ TypeScript strict compilation (no ignoreBuildErrors)
- ✅ Build artifact optimization

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

### Environment Variables 

**Required for Contact Form:**
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Optional:**
```bash
NEXT_PUBLIC_GA_ID=your_google_analytics_id
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_app_password
PAGE_ACCESS_PASSWORD=your_password
```

**How to add in Vercel:**
1. Go to Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development
3. Values should match your `.env.example` file

## Monitoring and Troubleshooting

### Check Deployment Status:
1. **GitHub Actions**: Repository → Actions tab
2. **Vercel Dashboard**: Project → Deployments tab

### Common Issues & Solutions:

#### 🔴 Build Failures
**Problem**: TypeScript compilation errors or build failures
**Solution**: 
- Never use `ignoreBuildErrors: true` in `next.config.js` (Vercel ignores this)
- Fix all TypeScript errors locally first
- Run `npm run build` locally to verify

#### 🔴 Wrong Output Directory  
**Problem**: Build succeeds locally but fails on Vercel
**Solution**: Remove `"outputDirectory": "out"` from `vercel.json` unless using static export

#### 🔴 Component Type Errors
**Problem**: Invalid props like `horizontal` on Text/Heading components
**Solution**: Use `style={{ textAlign: 'center' }}` instead of `horizontal="center"`

#### 🔴 Dynamic Color Template Literals
**Problem**: TypeScript errors with `background={\`${color}-strong\`}`
**Solution**: Create helper functions with proper type assertions

#### 🔴 Environment Variables
**Problem**: Missing environment variables
**Solution**: Verify secrets are set correctly in Vercel dashboard

#### 🔴 Token Permission Issues
**Problem**: Git push fails with workflow scope error  
**Solution**: Update GitHub Personal Access Token with `workflow` scope

#### 🔴 React 19 Compatibility Issues
**Problem**: Build fails with React 19 compatibility errors
**Solution**: 
- React 19 is experimental but currently working
- If issues arise, downgrade to React 18: `npm install react@18 react-dom@18`

#### 🔴 Next.js Version Conflicts
**Problem**: Version mismatch between Next.js and dependencies
**Solution**: Ensure compatibility between Next.js 15.x and all dependencies

#### 🔴 i18n Configuration Errors
**Problem**: Locale handling issues or missing translations
**Solution**: Verify `src/i18n/config.ts` returns both `locale` and `messages`

### Useful Commands:
```bash
# Test build locally (without ignoreBuildErrors)
npm run build

# Check for TypeScript errors
npm run lint

# Check for specific TypeScript issues
npx tsc --noEmit

# Install Vercel CLI for local testing
npm i -g vercel
vercel dev

# Debug build issues
npm run build 2>&1 | tee build.log

# Check package versions for conflicts
npm list --depth=0

# Update GitHub token in git remote
git remote set-url origin https://NEW_TOKEN@github.com/username/repo.git

# Force clean install if needed
rm -rf node_modules package-lock.json && npm install
```

### Build Validation Checklist:
- [ ] `npm run build` succeeds locally
- [ ] No TypeScript compilation errors (`npx tsc --noEmit`)
- [ ] All component props are valid (no `horizontal` props on Text/Heading)
- [ ] No dynamic template literal type issues
- [ ] Environment variables documented in `.env.example`
- [ ] All dependencies compatible with Next.js 15.x
- [ ] React 19 working (or downgraded to 18 if needed)
- [ ] i18n configuration returning proper types

## Production Checklist

### Pre-Deployment:
- [ ] ✅ Build successful locally (`npm run build`)
- [ ] ✅ No TypeScript errors (`npx tsc --noEmit`)
- [ ] ✅ All linting issues resolved (`npm run lint`)
- [ ] ✅ No `ignoreBuildErrors` in `next.config.js`
- [ ] ✅ Correct `vercel.json` configuration (no wrong `outputDirectory`)

### GitHub Configuration:
- [ ] GitHub secrets configured (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] Personal Access Token has `workflow` scope
- [ ] Repository push successful

### Vercel Configuration:
- [ ] Vercel project connected
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured (optional)

### Deployment Verification:
- [ ] Preview deployment working
- [ ] Production deployment successful  
- [ ] No build errors in Vercel logs
- [ ] Contact form functional (if EmailJS configured)
- [ ] All pages loading correctly
- [ ] No console errors in browser
- [ ] Performance metrics acceptable

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review Vercel deployment logs
3. Verify all secrets and configuration
4. Test build locally first

---

## Quick Reference

### Most Common Fix (90% of issues):
```bash
# Remove outputDirectory from vercel.json if present
# Ensure next.config.js has NO ignoreBuildErrors: true
# Run npm run build locally first
```

### Emergency Rollback:
```bash
# If React 19 causes issues
npm install react@18 react-dom@18 @types/react@18 @types/react-dom@18

# If build still fails, check:
1. Remove any outputDirectory from vercel.json
2. Fix all TypeScript errors shown in build
3. Replace horizontal="center" with style={{textAlign:'center'}}
```

### Contact for Complex Issues:
- Check GitHub Actions logs first
- Review Vercel deployment logs  
- Verify environment variables are set
- Test build locally before deploying

---

**Next Steps**: After successful deployment, consider setting up:
- Custom domain
- Analytics integration  
- Performance monitoring
- CDN configuration