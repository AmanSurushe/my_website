import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailServiceConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

// Configuration from environment variables
const defaultConfig: EmailServiceConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

export class EmailService {
  private config: EmailServiceConfig;

  constructor(config?: Partial<EmailServiceConfig>) {
    this.config = { ...defaultConfig, ...config };
  }

  async sendContactForm(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
    try {
      // Prepare the email parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'aamansurushe@gmail.com',
        subject: `New Contact Form Message from ${formData.name}`,
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams,
        this.config.publicKey
      );

      if (response.status === 200) {
        return { success: true };
      } else {
        return { success: false, error: 'Failed to send email' };
      }
    } catch (error) {
      console.error('Email sending error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Initialize EmailJS (call this once in your app)
  static initialize(publicKey: string): void {
    emailjs.init(publicKey);
  }
}

// Create a default instance
export const emailService = new EmailService();