import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendDiscordNotification } from '@/lib/discord';
import { generateUserConfirmationEmail, generateNotificationEmail } from '@/lib/emailTemplates';

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
      subject: `🔔 New Contact Form Message from ${name}`,
      html: generateNotificationEmail({ name, email, message }),
      replyTo: email,
    };

    // Auto-reply email to the sender
    const mailOptionsToSender = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '✨ Thank you for contacting Aman Surushe!',
      html: generateUserConfirmationEmail({ name, email, message }),
    };

    // Send both emails and Discord notification
    await Promise.all([
      transporter.sendMail(mailOptionsToYou),
      transporter.sendMail(mailOptionsToSender),
      sendDiscordNotification({ name, email, message }),
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