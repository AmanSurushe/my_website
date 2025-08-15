import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your regular password)
      },
    });

    // Email content for you (the recipient)
    const mailOptionsToYou = {
      from: process.env.GMAIL_USER,
      to: 'aamansurushe@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This message was sent via your portfolio contact form at ${new Date().toLocaleString()}
        </p>
      `,
      replyTo: email,
    };

    // Auto-reply email to the sender
    const mailOptionsToSender = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Aman Surushe',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for your message. I have received your inquiry and will get back to you as soon as possible.</p>
        
        <h3>Your message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <p>Best regards,<br>
        Aman Surushe<br>
        Software Engineer</p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">
          This is an automated response. Please do not reply to this email directly.
        </p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptionsToYou),
      transporter.sendMail(mailOptionsToSender),
    ]);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}