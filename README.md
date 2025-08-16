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

### **Vercel (Recommended)**

#### **Quick Deploy**
1. Click the "Deploy with Vercel" button above
2. Import from your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy automatically

#### **Manual Setup**
1. Import project to [Vercel Dashboard](https://vercel.com/dashboard)
2. Configure build settings:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (auto-detected)
3. Add environment variables in Project Settings
4. Deploy

#### **Environment Variables in Vercel**
Go to Project Settings → Environment Variables and add:
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD` 
- `NEXT_PUBLIC_GA_ID` (optional)
- `PAGE_ACCESS_PASSWORD` (optional)

### **GitHub Actions + Vercel**

Automated deployment is configured with GitHub Actions:

#### **Required GitHub Secrets**
Go to Repository → Settings → Secrets and add:
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id  
VERCEL_PROJECT_ID=your_project_id
```

#### **Get Vercel Details**
1. Create token at [Vercel Account Settings](https://vercel.com/account/tokens)
2. Get Project ID and Org ID from Project Settings → General

#### **Deployment Features**
- ✅ **Preview deployments** on pull requests
- ✅ **Production deployments** on main branch pushes
- ✅ **Build validation** with TypeScript checking
- ✅ **Mumbai region** deployment for optimal India performance

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
```

### **Configuration Files**
- **Next.js**: `next.config.js` (main config)
- **TypeScript**: `tsconfig.json`
- **Once UI**: `src/resources/once-ui.config.js`
- **Vercel**: `vercel.json`

---

## **🔧 Troubleshooting**

### **Common Build Issues**

#### **✅ Vercel Deployment Fixed**
Recent fixes ensure smooth deployment:
- ✅ Removed incorrect `outputDirectory` from vercel.json
- ✅ Fixed TypeScript compilation errors
- ✅ Resolved component prop issues
- ✅ Single region deployment for free plan

#### **Contact Form Issues**
- **Not receiving emails**: Check spam folder, verify App Password
- **Form errors**: Restart server after environment changes
- **Gmail issues**: Ensure 2-Step Verification is enabled

#### **Build Failures**
- **TypeScript errors**: Never use `ignoreBuildErrors: true`
- **Component errors**: Replace `horizontal="center"` with `style={{textAlign:'center'}}`
- **Dynamic colors**: Use helper functions instead of template literals

### **Performance Issues**
- Clear build cache: `rm -rf .next`
- Clean install: `rm -rf node_modules package-lock.json && npm install`
- Check for dependency conflicts: `npm list --depth=0`

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

### **Pre-Deployment**
- [ ] ✅ `npm run build` succeeds locally
- [ ] ✅ No TypeScript errors (`npx tsc --noEmit`)
- [ ] ✅ Environment variables configured
- [ ] ✅ Contact form tested
- [ ] ✅ Content updated and current

### **Deployment**
- [ ] GitHub secrets configured
- [ ] Vercel environment variables set
- [ ] Build successful in production
- [ ] All features working as expected

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

⭐ **Star this repo if you find it useful!**