'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Column, Text, Input, Button, Flex, Badge } from '@once-ui-system/core';
import { AnimatedCard } from '@/components';

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters'),
  
  company: z.string()
    .max(100, 'Company name cannot exceed 100 characters')
    .optional(),
  
  subject: z.enum(['general', 'project', 'collaboration', 'job'], {
    required_error: 'Please select a subject'
  }),
  
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message cannot exceed 1000 characters'),
  
  budget: z.string().optional(),
  
  timeline: z.string().optional(),
  
  newsletter: z.boolean().default(false),
  
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions'
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'project', label: 'Project Discussion' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'job', label: 'Job Opportunity' },
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'neutral' },
  { value: 'medium', label: 'Medium', color: 'accent' },
  { value: 'high', label: 'High', color: 'danger' },
];

interface AdvancedContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export function AdvancedContactForm({ onSubmit, className }: AdvancedContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      priority: 'medium',
      newsletter: false,
      terms: false,
    },
  });

  const watchedSubject = watch('subject');
  const watchedMessage = watch('message', '');

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default API call
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmitError(null);
    reset();
  };

  if (submitted) {
    return (
      <AnimatedCard className={className}>
        <Column fillWidth gap="16" paddingY="24">
          <Text variant="heading-strong-m" onBackground="accent-strong" horizontal="center">
            Thank You!
          </Text>
          <Text variant="body-default-m" onBackground="neutral-medium" horizontal="center">
            Your message has been sent successfully. I'll get back to you within 24 hours.
          </Text>
          <Button variant="secondary" onClick={resetForm}>
            Send Another Message
          </Button>
        </Column>
      </AnimatedCard>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={className}>
      <Column fillWidth gap="20">
        {/* Personal Information */}
        <Column gap="16">
          <Text variant="heading-strong-s">Personal Information</Text>
          
          <Column gap="12">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Column gap="4">
                  <Input
                    {...field}
                    id="name"
                    placeholder="Your full name *"
                    style={{
                      borderColor: errors.name 
                        ? 'var(--danger-strong)' 
                        : touchedFields.name 
                        ? 'var(--accent-strong)' 
                        : undefined
                    }}
                  />
                  {errors.name && (
                    <Text variant="label-default-xs" onBackground="danger-strong">
                      {errors.name.message}
                    </Text>
                  )}
                </Column>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Column gap="4">
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="your.email@example.com *"
                    style={{
                      borderColor: errors.email 
                        ? 'var(--danger-strong)' 
                        : touchedFields.email 
                        ? 'var(--accent-strong)' 
                        : undefined
                    }}
                  />
                  {errors.email && (
                    <Text variant="label-default-xs" onBackground="danger-strong">
                      {errors.email.message}
                    </Text>
                  )}
                </Column>
              )}
            />

            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="company"
                  placeholder="Company/Organization (optional)"
                />
              )}
            />
          </Column>
        </Column>

        {/* Project Details */}
        <Column gap="16">
          <Text variant="heading-strong-s">Project Details</Text>
          
          <Column gap="12">
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Column gap="4">
                  <Text variant="label-default-s">Subject *</Text>
                  <Flex gap="8" wrap>
                    {subjectOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={field.value === option.value ? 'primary' : 'secondary'}
                        size="s"
                        onClick={() => field.onChange(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </Flex>
                  {errors.subject && (
                    <Text variant="label-default-xs" onBackground="danger-strong">
                      {errors.subject.message}
                    </Text>
                  )}
                </Column>
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Column gap="4">
                  <Text variant="label-default-s">Priority</Text>
                  <Flex gap="8">
                    {priorityOptions.map((option) => (
                      <Badge
                        key={option.value}
                        background={field.value === option.value ? `${option.color}-strong` : 'neutral-alpha-weak'}
                        onBackground={field.value === option.value ? `${option.color}-on-background-strong` : 'neutral-strong'}
                        paddingX="12"
                        paddingY="6"
                        style={{ cursor: 'pointer' }}
                        onClick={() => field.onChange(option.value)}
                      >
                        {option.label}
                      </Badge>
                    ))}
                  </Flex>
                </Column>
              )}
            />

            {watchedSubject === 'project' && (
              <Flex gap="12">
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="budget"
                      placeholder="Budget range (e.g., $5k-10k)"
                      style={{ flex: 1 }}
                    />
                  )}
                />

                <Controller
                  name="timeline"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="timeline"
                      placeholder="Timeline (e.g., 2-3 months)"
                      style={{ flex: 1 }}
                    />
                  )}
                />
              </Flex>
            )}
          </Column>
        </Column>

        {/* Message */}
        <Column gap="16">
          <Text variant="heading-strong-s">Message</Text>
          
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Column gap="4">
                <div style={{ position: 'relative' }}>
                  <textarea
                    {...field}
                    id="message"
                    placeholder="Tell me about your project, requirements, or any questions you have... *"
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${
                        errors.message 
                          ? 'var(--danger-strong)' 
                          : touchedFields.message 
                          ? 'var(--accent-strong)' 
                          : 'var(--neutral-alpha-weak)'
                      }`,
                      borderRadius: '8px',
                      backgroundColor: 'var(--page)',
                      color: 'var(--neutral-on-background-strong)',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                  />
                  <Text 
                    variant="label-default-xs" 
                    onBackground="neutral-weak"
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '12px',
                      backgroundColor: 'var(--page)',
                      padding: '2px 4px',
                      borderRadius: '4px',
                    }}
                  >
                    {watchedMessage.length}/1000
                  </Text>
                </div>
                {errors.message && (
                  <Text variant="label-default-xs" onBackground="danger-strong">
                    {errors.message.message}
                  </Text>
                )}
              </Column>
            )}
          />
        </Column>

        {/* Preferences */}
        <Column gap="12">
          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <Flex gap="8" vertical="center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={field.value}
                  onChange={field.onChange}
                  style={{ accentColor: 'var(--accent-strong)' }}
                />
                <Text variant="body-default-s">
                  Subscribe to newsletter for updates on new projects and blog posts
                </Text>
              </Flex>
            )}
          />

          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Column gap="4">
                <Flex gap="8" vertical="start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={field.value}
                    onChange={field.onChange}
                    style={{ 
                      accentColor: 'var(--accent-strong)',
                      marginTop: '2px',
                    }}
                  />
                  <Text variant="body-default-s">
                    I agree to the terms and conditions and privacy policy *
                  </Text>
                </Flex>
                {errors.terms && (
                  <Text variant="label-default-xs" onBackground="danger-strong">
                    {errors.terms.message}
                  </Text>
                )}
              </Column>
            )}
          />
        </Column>

        {/* Submit */}
        <Column gap="12" paddingTop="8">
          {submitError && (
            <Text variant="body-default-s" onBackground="danger-strong">
              {submitError}
            </Text>
          )}
          
          <Button
            type="submit"
            variant="primary"
            size="l"
            disabled={!isValid || isSubmitting}
            style={{ width: '100%' }}
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </Button>
        </Column>
      </Column>
    </form>
  );
}