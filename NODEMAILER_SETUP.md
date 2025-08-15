# Nodemailer Setup Guide

Your contact form is now using **Nodemailer** with Gmail SMTP for reliable email delivery to **aamansurushe@gmail.com**!

## 🚀 Quick Setup (3 minutes)

### Step 1: Enable Gmail App Passwords
1. Go to your Gmail account: https://myaccount.google.com/
2. Click **"Security"** in the left sidebar
3. Enable **"2-Step Verification"** if not already enabled
4. Search for **"App passwords"** or go to: https://myaccount.google.com/apppasswords

### Step 2: Generate App Password
1. Click **"Select app"** → Choose **"Mail"**
2. Click **"Select device"** → Choose **"Other (Custom name)"**
3. Enter: **"Portfolio Contact Form"**
4. Click **"Generate"**
5. **Copy the 16-character password** (example: `abcd efgh ijkl mnop`)

### Step 3: Configure Environment Variables
1. Create `.env.local` file in your project root:

```bash
# Gmail Configuration for Contact Form
GMAIL_USER=aamansurushe@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

2. Replace `abcd efgh ijkl mnop` with your actual App Password
3. **Important**: Keep the spaces in the App Password as shown by Gmail

### Step 4: Restart Your Server
```bash
npm run dev
```

## ✅ Test Your Setup

1. Go to http://localhost:3001/contact
2. Fill out and submit the form
3. Check **aamansurushe@gmail.com** for:
   - ✅ **New contact message** (from the visitor)
   - ✅ **Auto-reply confirmation** (sent to the visitor)

## 📧 What Happens When Someone Contacts You

### Email to You (aamansurushe@gmail.com):
```
Subject: New Contact Form Message from John Doe

New Contact Form Submission

From: John Doe
Email: john@example.com

Message:
Hi Aman, I saw your portfolio and would like to discuss...

---
This message was sent via your portfolio contact form at 1/15/2024, 3:45:20 PM
```

### Auto-reply to Visitor:
```
Subject: Thank you for contacting Aman Surushe

Hi John Doe,

Thank you for your message. I have received your inquiry 
and will get back to you as soon as possible.

Your message:
Hi Aman, I saw your portfolio and would like to discuss...

Best regards,
Aman Surushe
Software Engineer
```

## 🛡️ Security & Features

### ✅ **Advantages of Nodemailer:**
- ✅ **Server-side processing** (more secure)
- ✅ **No third-party dependencies** (EmailJS not needed)
- ✅ **Auto-reply feature** (professional touch)
- ✅ **Email validation** (prevents spam)
- ✅ **HTML formatting** (beautiful emails)
- ✅ **Error handling** (user-friendly messages)
- ✅ **Free** (Gmail SMTP is free)

### 🔒 **Security Features:**
- App Password (not your main Gmail password)
- Server-side email sending (credentials never exposed to browser)
- Input validation and sanitization
- Rate limiting friendly

## 🔧 Troubleshooting

**"Failed to send email" error:**
- Check your App Password (must be 16 characters with spaces)
- Verify 2-Step Verification is enabled on Gmail
- Ensure `.env.local` file exists and has correct variables
- Restart the dev server after changing environment variables

**Not receiving emails:**
- Check spam/promotions folder in Gmail
- Verify GMAIL_USER matches your actual Gmail address
- Test the App Password in Gmail settings

**App Password not available:**
- You must enable 2-Step Verification first
- App passwords only work with personal Gmail accounts (not Google Workspace)

## 🚀 Production Deployment

For production, set these environment variables on your hosting platform:
- **GMAIL_USER**: `aamansurushe@gmail.com`  
- **GMAIL_APP_PASSWORD**: `your_16_character_password`

**Popular hosting platforms:**
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables  
- **Railway**: Variables tab in your project

---

## 📁 Code Structure

- **API Route**: `src/app/api/contact/route.ts` (server-side email sending)
- **Contact Page**: `src/app/contact/page.tsx` (form UI)
- **Environment**: `.env.local` (your credentials)

**Need help?** Your Nodemailer setup is complete and ready to go! 🎉