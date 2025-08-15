# EmailJS Setup Guide

Your contact form is ready to send emails to **aamansurushe@gmail.com**! Follow these steps to complete the setup.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up with your Gmail (aamansurushe@gmail.com) 
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, click **"Add New Service"**
2. Choose **"Gmail"** 
3. Click **"Connect Account"** and authorize with aamansurushe@gmail.com
4. Copy the **Service ID** (example: `service_abc123`)

### Step 3: Create Email Template  
1. Click **"Create New Template"**
2. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Message: {{message}}

---
This message was sent via your portfolio contact form.
Reply directly to: {{from_email}}
```

3. Set template variables:
   - `from_name` - Sender's name
   - `from_email` - Sender's email  
   - `message` - The message content
4. Copy the **Template ID** (example: `template_xyz789`)

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"** 
2. Copy your **Public Key** (example: `user_abc123xyz`)

### Step 5: Add to Your Project
1. Create `.env.local` file in your project root:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_abc123xyz
```

2. Replace the example IDs with your actual values
3. Restart your dev server: `npm run dev`

## ✅ Test Your Setup

1. Go to http://localhost:3001/contact
2. Fill out the form and submit
3. Check aamansurushe@gmail.com for the message!

## 📧 What Happens

When someone submits your contact form:
- ✅ Email sent to: **aamansurushe@gmail.com**
- ✅ Subject: "New Contact Form Message from [Name]"
- ✅ Contains: Name, email, and message
- ✅ You can reply directly to their email

## 🛡️ Security

- EmailJS handles all email delivery
- No server required on your end  
- Environment variables keep credentials secure
- Free tier: 200 emails/month (more than enough)

## 🔧 Troubleshooting

**Form shows error message:**
- Check your environment variables
- Verify Service ID, Template ID, and Public Key
- Make sure Gmail service is connected

**Not receiving emails:**
- Check spam folder
- Verify template variables match the code
- Test with EmailJS dashboard first

---

**Need help?** The contact form code is in `src/app/contact/page.tsx` and email service is in `src/utils/emailService.ts`.