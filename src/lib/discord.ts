interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function sendDiscordNotification(contactData: ContactMessage): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('Discord webhook URL not configured');
    return;
  }

  try {
    const embed = {
      title: "🔔 New Contact Form Message",
      color: 0x5865f2, // Discord blurple color
      fields: [
        {
          name: "👤 From",
          value: contactData.name,
          inline: true
        },
        {
          name: "📧 Email",
          value: contactData.email,
          inline: true
        },
        {
          name: "💬 Message",
          value: contactData.message.length > 1024 
            ? contactData.message.substring(0, 1021) + "..."
            : contactData.message,
          inline: false
        }
      ],
      footer: {
        text: `Portfolio Contact Form • ${new Date().toLocaleString()}`
      },
      timestamp: new Date().toISOString()
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
        username: "Portfolio Bot",
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png"
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }

    console.log('Discord notification sent successfully');
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
    // Don't throw error to avoid breaking the email functionality
  }
}