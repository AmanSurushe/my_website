# **Aman Surushe - Portfolio & Blog**

Full-Stack Engineer passionate about building scalable solutions with React.js, Node.js, and modern web technologies.

🌐 **Live Site**: aman.surushe.com  
📧 **Contact**: aamansurushe@gmail.com  
🔗 **GitHub**: [AmanSurushe](https://github.com/AmanSurushe)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAmanSurushe%2Fmy_website)

---

## **🚀 Quick Start**

```bash
# 1. Clone the repository
git clone https://github.com/AmanSurushe/my_website.git
cd my_website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your configuration (see Environment Setup below)

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

---

## **✨ Features**

### **Portfolio Highlights**
- **3+ years** Full-Stack development experience
- **Real-time systems** with Asterisk and voice communications
- **Scale**: Managed systems processing **1.2+ billion WhatsApp messages**
- **Performance**: Redis caching, monitoring with Prometheus/Grafana

### **Technical Stack**
- **Frontend**: React.js, Next.js 15, TypeScript, Once UI, Framer Motion
- **Backend**: Node.js, Express.js, RESTful APIs
- **Databases**: MySQL, MongoDB, Redis
- **DevOps**: Git workflows, performance monitoring
- **Email**: Nodemailer with Gmail SMTP
- **Analytics**: Google Analytics integration

### **Website Features**
- ✅ **Contact Form** with Nodemailer integration and auto-reply
- ✅ **GitHub Integration** with dynamic repository showcase
- ✅ **PWA Support** with service worker and offline functionality
- ✅ **Multi-language** support (English, Hindi, Marathi)
- ✅ **Performance Optimized** with caching and security headers
- ✅ **SEO Ready** with automatic schema and open-graph images
- ✅ **Responsive Design** optimized for all devices

---

## **⚙️ Environment Setup**

### **Required Environment Variables**

Create `.env.local` file with the following:

```bash
# Contact Form (Nodemailer with Gmail)
GMAIL_USER=aamansurushe@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Page Protection (optional)
PAGE_ACCESS_PASSWORD=your_password
```

### **Gmail Setup for Contact Form**

The contact form uses **Nodemailer** with Gmail SMTP for reliable email delivery:

#### **Step 1: Enable Gmail App Passwords**
1. Go to [Gmail Security Settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)

#### **Step 2: Generate App Password**
1. Select app: **Mail**
2. Select device: **Other (Custom name)**
3. Enter: **Portfolio Contact Form**
4. Copy the **16-character password** (keep spaces as shown)

#### **Step 3: Add to Environment**
```bash
GMAIL_USER=aamansurushe@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop  # Your actual app password
```

#### **Contact Form Features**
- ✅ **Server-side processing** (secure)
- ✅ **Auto-reply to visitors** (professional touch)
- ✅ **Email validation** (spam prevention)
- ✅ **HTML formatting** (beautiful emails)
- ✅ **Error handling** (user-friendly messages)

### **Google Analytics Setup**

1. Create account at [Google Analytics](https://analytics.google.com/)
2. Set up property for your website
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Add to environment variables

**Benefits:**
- 📊 Track visitor behavior and popular content
- 🌍 Geographic and device analytics
- 📈 Monitor contact form submissions and project views
- 🔍 Understand traffic sources and user engagement

---

## **🚀 Deployment**

### **✅ Recent Deployment Fixes**
All major Vercel deployment issues have been resolved:
- ✅ Fixed `vercel.json` configuration (removed incorrect `outputDirectory`)
- ✅ Fixed TypeScript compilation (removed `ignoreBuildErrors`)
- ✅ Resolved component type issues and template literal errors
- ✅ Single region deployment for free plan compatibility

### **Vercel Deployment (Recommended)**

#### **Quick Deploy**
1. Click the "Deploy with Vercel" button above
2. Import from your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy automatically

#### **Manual Vercel Setup**
1. **Import Project**: Go to [Vercel Dashboard](https://vercel.com/dashboard) → New Project
2. **Configure Build Settings**:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: **Leave EMPTY** (auto-detected)
   - **Install Command**: `npm install`

⚠️ **Critical**: Never set `"outputDirectory": "out"` unless using static export

#### **Environment Variables in Vercel**
Go to Project Settings → Environment Variables and add:
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD` 
- `NEXT_PUBLIC_GA_ID` (optional)
- `PAGE_ACCESS_PASSWORD` (optional)

### **GitHub Actions + Vercel (Automated)**

For automated deployment with GitHub Actions:

#### **Step 1: Configure GitHub Secrets**

**Option A: Environment Secrets (Recommended)**
Go to Repository → Settings → Environments → **Production** → Add secret

**Option B: Repository Secrets**  
Go to Repository → Settings → Secrets and Variables → Actions → **New repository secret**

Add these 3 secrets:

1. **VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Secret: Your Vercel token (get from Step 2 below)

2. **VERCEL_ORG_ID** 
   - Name: `VERCEL_ORG_ID`
   - Secret: Your organization ID (get from Step 2 below)

3. **VERCEL_PROJECT_ID**
   - Name: `VERCEL_PROJECT_ID` 
   - Secret: Your project ID (get from Step 2 below)

#### **Step 2: Get Vercel Details**
1. **Create token**: Go to [Vercel Account Settings](https://vercel.com/account/tokens) → Create Token
2. **Get IDs**: Go to your Vercel project → Settings → General
   - Copy **Project ID** and **Team ID** (org ID)

#### **GitHub Actions Features**
- ✅ **Preview deployments** on pull requests
- ✅ **Production deployments** on main branch pushes
- ✅ **Build validation** with TypeScript checking
- ✅ **Mumbai region** deployment for optimal India performance
- ✅ Node.js 20 setup with npm caching
- ✅ TypeScript strict compilation

### **Deployment Configuration**

#### **Vercel Configuration (`vercel.json`)**
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["bom1"],  // Mumbai region for India
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

- **Security Headers**: CSP, XSS protection, etc.
- **API Routes**: Configured for sitemap, robots.txt, RSS
- **Function Timeout**: 10 seconds for API routes

---

## **📝 Content Management**

### **Main Content File**
All content is managed in: `src/resources/content.js`

### **Regular Updates**
- **Monthly**: Update achievements and metrics
- **Quarterly**: Review all content sections
- **Job Searching**: Ensure everything is current

### **Key Sections to Update**

#### **Personal Information** (Lines 55-79)
```javascript
const person = {
  firstName: "Aman",
  lastName: "Surushe",
  role: "Software Engineer", // Update current title
  avatar: "/images/avatar.jpg",
  location: "Nagpur, India",
  languages: ["English", "Hindi", "Marathi"]
}
```

#### **Work Experience** (Lines 149-213)
- Update current role timeframe
- Add new achievements with metrics
- Include latest technologies
- Quantify business impact

#### **Technical Skills** (Lines 229-273)
- New languages and frameworks
- Updated proficiency levels
- Recent project applications

### **Content Best Practices**
- ✅ Use action verbs (Architected, Optimized, Delivered)
- ✅ Include quantifiable results (Reduced by 45%)
- ✅ Show business impact (Saved $50K annually)
- ✅ Include relevant keywords for ATS systems

---

## **🛠 Development**

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # Check TypeScript errors
```

### **Build Validation**
```bash
# Test build locally (must succeed before deployment)
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Debug build issues
npm run build 2>&1 | tee build.log

# Check package versions for conflicts
npm list --depth=0

# Force clean install if needed
rm -rf node_modules package-lock.json && npm install
```

### **Configuration Files**
- **Next.js**: `next.config.js` (main config)
- **TypeScript**: `tsconfig.json`
- **Once UI**: `src/resources/once-ui.config.js`
- **Vercel**: `vercel.json`

---

## **🔧 Troubleshooting**

### **Common Build Issues & Solutions**

#### **🔴 Build Failures**
**Problem**: TypeScript compilation errors or build failures
**Solution**: 
- Never use `ignoreBuildErrors: true` in `next.config.js` (Vercel ignores this)
- Fix all TypeScript errors locally first
- Run `npm run build` locally to verify

#### **🔴 Wrong Output Directory**
**Problem**: Build succeeds locally but fails on Vercel
**Solution**: Remove `"outputDirectory": "out"` from `vercel.json` unless using static export

#### **🔴 Component Type Errors**
**Problem**: Invalid props like `horizontal` on Text/Heading components
**Solution**: Use `style={{ textAlign: 'center' }}` instead of `horizontal="center"`

#### **🔴 Dynamic Color Template Literals**
**Problem**: TypeScript errors with `background={\`${color}-strong\`}`
**Solution**: Create helper functions with proper type assertions

#### **🔴 Multi-Region Deployment Error**
**Problem**: "Deploying Serverless Functions to multiple regions is restricted"
**Solution**: Use single region `"regions": ["bom1"]` for free Hobby plan

#### **🔴 Token Permission Issues**
**Problem**: Git push fails with workflow scope error  
**Solution**: Update GitHub Personal Access Token with `workflow` scope
```bash
git remote set-url origin https://NEW_TOKEN@github.com/username/repo.git
```

#### **🔴 React 19 Compatibility Issues**
**Problem**: Build fails with React 19 compatibility errors
**Solution**: 
- React 19 is experimental but currently working
- If issues arise, downgrade: `npm install react@18 react-dom@18 @types/react@18 @types/react-dom@18`

#### **🔴 i18n Configuration Errors**
**Problem**: Locale handling issues or missing translations
**Solution**: Verify `src/i18n/config.ts` returns both `locale` and `messages`

### **Other Common Issues**

#### **Contact Form Issues**
- **Not receiving emails**: Check spam folder, verify App Password
- **Form errors**: Restart server after environment changes
- **Gmail issues**: Ensure 2-Step Verification is enabled

#### **Performance Issues**
- Clear build cache: `rm -rf .next`
- Clean install: `rm -rf node_modules package-lock.json && npm install`
- Check for dependency conflicts: `npm list --depth=0`

### **Quick Emergency Fixes**

#### **Most Common Fix (90% of deployment issues)**
```bash
# 1. Remove outputDirectory from vercel.json if present
# 2. Ensure next.config.js has NO ignoreBuildErrors: true
# 3. Run npm run build locally first
# 4. Replace horizontal="center" with style={{textAlign:'center'}}
```

#### **Emergency React Rollback**
```bash
# If React 19 causes issues, downgrade to React 18
npm install react@18 react-dom@18 @types/react@18 @types/react-dom@18
```

---

## **🏗 Architecture**

### **Project Structure**
```
src/
├── app/                    # Next.js 15 App Router
│   ├── (routes)/          # Page components
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utilities and analytics
├── resources/             # Content and configuration
└── utils/                 # Helper functions
```

### **Key Components**
- **Contact Form**: `src/app/contact/page.tsx` + `src/app/api/contact/route.ts`
- **GitHub Integration**: `src/utils/github.ts` + `src/components/Repositories.tsx`
- **Analytics**: `src/lib/analytics.ts` + `src/components/Analytics.tsx`
- **Content**: `src/resources/content.js`

---

## **📊 Analytics & Tracking**

The site includes comprehensive tracking:
- **Page views** on all routes
- **Contact form submissions** (success/failure)
- **Project and blog views**
- **Search queries** and results
- **GitHub repository interactions**

---

## **🌍 Internationalization**

Supports multiple languages:
- **English** (default)
- **Hindi** (हिन्दी)
- **Marathi** (मराठी)

Translation files: `src/i18n/messages/`

---

## **📋 Production Checklist**

### **Pre-Deployment Checklist**
- [ ] ✅ Build successful locally (`npm run build`)
- [ ] ✅ No TypeScript errors (`npx tsc --noEmit`)
- [ ] ✅ All linting issues resolved (`npm run lint`)
- [ ] ✅ No `ignoreBuildErrors` in `next.config.js`
- [ ] ✅ Correct `vercel.json` configuration (no wrong `outputDirectory`)
- [ ] ✅ All component props valid (no `horizontal` props on Text/Heading)
- [ ] ✅ No dynamic template literal type issues
- [ ] ✅ Environment variables configured
- [ ] ✅ Contact form tested
- [ ] ✅ All dependencies compatible with Next.js 15.x
- [ ] ✅ React 19 working (or downgraded to 18 if needed)

### **GitHub Configuration**
- [ ] GitHub secrets configured (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] Personal Access Token has `workflow` scope
- [ ] Repository push successful

### **Vercel Configuration**
- [ ] Vercel project connected
- [ ] Environment variables set in Vercel dashboard
- [ ] Single region deployment (`bom1` for Mumbai)
- [ ] Custom domain configured (optional)

### **Deployment Verification**
- [ ] Preview deployment working
- [ ] Production deployment successful  
- [ ] No build errors in Vercel logs
- [ ] Contact form functional (Gmail configured)
- [ ] All pages loading correctly
- [ ] No console errors in browser
- [ ] Performance metrics acceptable

---

## **📄 License & Credits**

Built with [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) by Once UI.  
Distributed under CC BY-NC 4.0 License.

**Template Credits:**
- [Once UI](https://once-ui.com) design system
- Original authors: Lorant Toth, Zsofia Komaromi

---

## **🤝 Contact & Connect**

- 📧 **Email**: [aamansurushe@gmail.com](mailto:aamansurushe@gmail.com)
- 💼 **LinkedIn**: [Connect with me](https://linkedin.com/in/aman-surushe)
- 🐙 **GitHub**: [@AmanSurushe](https://github.com/AmanSurushe)
- 🌐 **Portfolio**: [aman.surushe.com](https://aman.surushe.com)

---

## **🆘 Support**

If you encounter issues:
1. **Check GitHub Actions logs** for deployment errors
2. **Review Vercel deployment logs** for build failures
3. **Test build locally** first (`npm run build`)
4. **Use troubleshooting section** above for common solutions

---

⭐ **Star this repo if you find it useful!**