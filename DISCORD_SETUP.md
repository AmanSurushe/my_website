# Discord Webhook Setup for Contact Form

This guide will help you set up Discord notifications for your contact form submissions.

## Step 1: Create a Discord Webhook

1. **Open your Discord server** where you want to receive contact form notifications
2. **Right-click on the channel** where you want messages to appear
3. **Select "Edit Channel"**
4. **Go to "Integrations" tab**
5. **Click "Create Webhook"**
6. **Give your webhook a name** (e.g., "Portfolio Contact Bot")
7. **Optionally upload an avatar** for the webhook
8. **Click "Copy Webhook URL"**

## Step 2: Add the Webhook URL to Your Environment Variables

1. **Copy the webhook URL** from Discord
2. **Add it to your `.env.local` file**:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
   ```

## Step 3: Test the Integration

1. **Restart your development server** (`npm run dev`)
2. **Go to your contact form** (`/contact`)
3. **Submit a test message**
4. **Check your Discord channel** for the notification

## Features

- **Rich embeds** with formatted contact information
- **Automatic timestamps** for each submission
- **No signup required** - visitors can contact you directly
- **Fallback protection** - if Discord fails, email still works
- **Professional formatting** with name, email, and message clearly displayed

## Troubleshooting

- Make sure the webhook URL is correct
- Ensure the Discord channel allows webhooks
- Check your environment variables are loaded
- Verify the webhook hasn't been deleted or regenerated

## Security Note

Keep your webhook URL private as it allows anyone with the URL to send messages to your Discord channel.