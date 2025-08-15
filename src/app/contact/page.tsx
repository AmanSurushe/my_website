'use client';

import { useState } from 'react';
import { Heading, Column, Text, Input, Button, Flex, Meta, Schema } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";

const contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact – ${person.name}`,
  description: `Get in touch with ${person.name}`,
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send email using Nodemailer API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Column maxWidth="s" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={contact.path}
        title={contact.title}
        description={contact.description}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s" gap="12">
          <Heading as="h1" variant="display-strong-l">
            Get in Touch
          </Heading>
          <Text variant="heading-default-xl" onBackground="neutral-weak">
            I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </Text>
        </Column>

        {submitted ? (
          <Column fillWidth gap="16" paddingY="24">
            <Heading as="h2" variant="heading-strong-m" onBackground="accent-strong">
              Thank you for your message!
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-medium">
              I'll get back to you as soon as possible.
            </Text>
            <Button 
              variant="secondary" 
              onClick={() => {
                setSubmitted(false);
                setError(null);
              }}
            >
              Send another message
            </Button>
          </Column>
        ) : (
          <form onSubmit={handleSubmit}>
            <Column fillWidth gap="16" paddingY="24">
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--neutral-alpha-weak)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--page)',
                    color: 'var(--neutral-on-background-strong)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                />
              </div>

              {error && (
                <Text variant="body-default-s" onBackground="danger-strong">
                  {error}
                </Text>
              )}
              
              <Flex horizontal="start" paddingTop="8">
                <Button
                  type="submit"
                  variant="primary"
                  size="m"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Flex>
            </Column>
          </form>
        )}

        <Column fillWidth gap="16" paddingTop="24">
          <Text variant="heading-strong-s" onBackground="neutral-strong">
            Other ways to reach me:
          </Text>
          <Flex direction="column" gap="8">
            <Text variant="body-default-m">
              <strong>Email:</strong> {person.email}
            </Text>
            <Text variant="body-default-m">
              <strong>Location:</strong> Nagpur, Maharashtra, India
            </Text>
            <Text variant="body-default-m">
              <strong>Languages:</strong> {person.languages.join(', ')}
            </Text>
          </Flex>
        </Column>
      </Column>
    </Column>
  );
}