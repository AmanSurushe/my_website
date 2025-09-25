interface ContactData {
  name: string;
  email: string;
  message: string;
}

// Base styles for consistent email design
const emailStyles = {
  container: `
    max-width: 600px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333333;
    background-color: #ffffff;
  `,
  header: `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px 20px;
    text-align: center;
    border-radius: 8px 8px 0 0;
  `,
  headerTitle: `
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  `,
  headerSubtitle: `
    margin: 5px 0 0 0;
    font-size: 14px;
    opacity: 0.9;
  `,
  content: `
    padding: 30px 20px;
    background-color: #ffffff;
  `,
  messageBox: `
    background-color: #f8f9ff;
    border: 1px solid #e1e5f2;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    border-left: 4px solid #667eea;
  `,
  infoGrid: `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin: 20px 0;
  `,
  infoItem: `
    background-color: #f8f9ff;
    padding: 15px;
    border-radius: 6px;
    border: 1px solid #e1e5f2;
  `,
  infoLabel: `
    font-weight: 600;
    color: #667eea;
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 5px;
  `,
  infoValue: `
    color: #333333;
    font-size: 14px;
  `,
  button: `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    display: inline-block;
    font-weight: 500;
    margin: 15px 0;
  `,
  footer: `
    background-color: #f8f9ff;
    padding: 20px;
    text-align: center;
    border-radius: 0 0 8px 8px;
    border-top: 1px solid #e1e5f2;
  `,
  footerText: `
    color: #666666;
    font-size: 12px;
    margin: 0;
  `,
  divider: `
    height: 1px;
    background-color: #e1e5f2;
    margin: 25px 0;
  `,
};

export function generateUserConfirmationEmail(data: ContactData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting Aman Surushe</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f5f7fa;">
      <div style="${emailStyles.container}">
        
        <!-- Header -->
        <div style="${emailStyles.header}">
          <h1 style="${emailStyles.headerTitle}">Thank You, ${data.name}!</h1>
          <p style="${emailStyles.headerSubtitle}">Your message has been received successfully</p>
        </div>
        
        <!-- Content -->
        <div style="${emailStyles.content}">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Hi <strong>${data.name}</strong>,
          </p>
          
          <p style="font-size: 14px; color: #555555; margin-bottom: 25px;">
            Thank you for reaching out! I've received your message and will get back to you within <strong>24-48 hours</strong>. 
            In the meantime, feel free to explore my portfolio or connect with me on social media.
          </p>
          
          <!-- Message Summary -->
          <div style="${emailStyles.messageBox}">
            <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 16px;">Your Message Summary:</h3>
            <div style="${emailStyles.infoGrid}">
              <div style="${emailStyles.infoItem}">
                <div style="${emailStyles.infoLabel}">From</div>
                <div style="${emailStyles.infoValue}">${data.name}</div>
              </div>
              <div style="${emailStyles.infoItem}">
                <div style="${emailStyles.infoLabel}">Email</div>
                <div style="${emailStyles.infoValue}">${data.email}</div>
              </div>
            </div>
            <div style="${emailStyles.infoLabel}">Message</div>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e1e5f2; margin-top: 5px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="${emailStyles.divider}"></div>
          
          <!-- Call to Action -->
          <div style="text-align: center;">
            <p style="color: #555555; margin-bottom: 15px;">While you wait, check out my latest work:</p>
            <a href="https://amansurushe.vercel.app" style="${emailStyles.button}">
              Visit My Portfolio
            </a>
          </div>
          
          <!-- Additional Info -->
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #bae6fd;">
            <h4 style="margin: 0 0 10px 0; color: #0369a1;">What happens next?</h4>
            <ul style="margin: 0; padding-left: 20px; color: #555555;">
              <li>I'll review your message carefully</li>
              <li>You'll hear back from me within 24-48 hours</li>
              <li>We can schedule a call if your project requires discussion</li>
            </ul>
          </div>
          
          <!-- Social Links -->
          <div style="text-align: center; margin: 25px 0;">
            <p style="color: #555555; margin-bottom: 10px;">Connect with me:</p>
            <div>
              <a href="https://linkedin.com/in/amansurushe" style="color: #667eea; text-decoration: none; margin: 0 10px;">LinkedIn</a>
              <span style="color: #cccccc;">|</span>
              <a href="https://github.com/AmanSurushe" style="color: #667eea; text-decoration: none; margin: 0 10px;">GitHub</a>
              <span style="color: #cccccc;">|</span>
              <a href="https://twitter.com/amansurushe" style="color: #667eea; text-decoration: none; margin: 0 10px;">Twitter</a>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="${emailStyles.footer}">
          <p style="${emailStyles.footerText}">
            Best regards,<br>
            <strong>Aman Surushe</strong><br>
            Software Engineer | Full Stack Developer<br>
            📍 Nagpur, Maharashtra, India
          </p>
          <div style="${emailStyles.divider}"></div>
          <p style="${emailStyles.footerText}">
            This is an automated response. Please do not reply to this email directly.<br>
            If you need immediate assistance, please contact me at: <a href="mailto:aamansurushe@gmail.com" style="color: #667eea;">aamansurushe@gmail.com</a>
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
}

export function generateNotificationEmail(data: ContactData): string {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f5f7fa;">
      <div style="${emailStyles.container}">
        
        <!-- Header -->
        <div style="${emailStyles.header}">
          <h1 style="${emailStyles.headerTitle}">🔔 New Contact Message</h1>
          <p style="${emailStyles.headerSubtitle}">Someone just reached out through your portfolio</p>
        </div>
        
        <!-- Content -->
        <div style="${emailStyles.content}">
          <p style="font-size: 16px; margin-bottom: 25px;">
            You have received a new message from your portfolio contact form.
          </p>
          
          <!-- Contact Information -->
          <div style="${emailStyles.messageBox}">
            <h3 style="margin: 0 0 20px 0; color: #333333; font-size: 18px;">Contact Details</h3>
            
            <div style="${emailStyles.infoGrid}">
              <div style="${emailStyles.infoItem}">
                <div style="${emailStyles.infoLabel}">👤 Name</div>
                <div style="${emailStyles.infoValue}"><strong>${data.name}</strong></div>
              </div>
              <div style="${emailStyles.infoItem}">
                <div style="${emailStyles.infoLabel}">📧 Email</div>
                <div style="${emailStyles.infoValue}">
                  <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a>
                </div>
              </div>
              <div style="${emailStyles.infoItem}">
                <div style="${emailStyles.infoLabel}">📅 Received</div>
                <div style="${emailStyles.infoValue}">${timestamp}</div>
              </div>
              <div style="${emailStyles.infoItem}">
                <div style="${emailStyles.infoLabel}">📊 Status</div>
                <div style="${emailStyles.infoValue}">
                  <span style="background-color: #22c55e; color: white; padding: 3px 8px; border-radius: 12px; font-size: 12px;">New</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Message Content -->
          <div style="background-color: #ffffff; border: 1px solid #e1e5f2; border-radius: 8px; padding: 25px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h4 style="margin: 0 0 15px 0; color: #333333;">💬 Message:</h4>
            <div style="background-color: #f8f9ff; padding: 20px; border-radius: 6px; border: 1px solid #e1e5f2; font-size: 15px; line-height: 1.6;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div style="text-align: center; margin: 30px 0;">
            <h4 style="color: #333333; margin-bottom: 15px;">Quick Actions:</h4>
            <div>
              <a href="mailto:${data.email}?subject=Re: Your message from my portfolio&body=Hi ${data.name},%0D%0A%0D%0AThank you for reaching out through my portfolio..." 
                 style="${emailStyles.button}; margin: 5px;">
                📧 Reply via Email
              </a>
              <a href="https://amansurushe.vercel.app/contact" 
                 style="${emailStyles.button}; margin: 5px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);">
                🌐 View Contact Form
              </a>
            </div>
          </div>
          
          <!-- Response Guidelines -->
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #fbbf24;">
            <h4 style="margin: 0 0 10px 0; color: #92400e;">⏱️ Response Reminder</h4>
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              Remember to respond within 24-48 hours to maintain your professional reputation. 
              Consider the context and urgency of the message when prioritizing your response.
            </p>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="${emailStyles.footer}">
          <p style="${emailStyles.footerText}">
            This notification was sent from your portfolio contact form.<br>
            <strong>amansurushe.vercel.app</strong><br>
            Generated on ${timestamp}
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
}