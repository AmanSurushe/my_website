import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugify as transliterate } from "transliteration";

import {
  Heading,
  HeadingLink,
  Text,
  InlineCode,
  CodeBlock,
  TextProps,
  MediaProps,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  List,
  ListItem,
  Line,
} from "@once-ui-system/core";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and "); // Replace & with 'and'
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-", // Replace spaces with -
  }).replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({
    children,
    ...props
  }: Omit<React.ComponentProps<typeof HeadingLink>, "as" | "id">) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink marginTop="24" marginBottom="12" as={as} id={slug} {...props}>
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  // For pre tags that contain code blocks
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;

    // Extract language from className (format: language-xxx)
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: children,
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }

  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

function createList({ children }: { children: ReactNode }) {
  return <List>{children}</List>;
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
      {children}
    </ListItem>
  );
}

function createHR() {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList as any,
  ul: createList as any,
  li: createListItem as any,
  hr: createHR as any,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

// Enhanced ReactMarkdown components using Once UI System
function createEnhancedReactMarkdownComponents() {
  return {
    h1: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children as string);
      return (
        <HeadingLink marginTop="24" marginBottom="12" as="h1" id={slug}>
          {children}
        </HeadingLink>
      );
    },
    h2: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children as string);
      return (
        <HeadingLink marginTop="24" marginBottom="12" as="h2" id={slug}>
          {children}
        </HeadingLink>
      );
    },
    h3: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children as string);
      return (
        <HeadingLink marginTop="20" marginBottom="12" as="h3" id={slug}>
          {children}
        </HeadingLink>
      );
    },
    h4: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children as string);
      return (
        <HeadingLink marginTop="20" marginBottom="12" as="h4" id={slug}>
          {children}
        </HeadingLink>
      );
    },
    h5: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children as string);
      return (
        <HeadingLink marginTop="16" marginBottom="8" as="h5" id={slug}>
          {children}
        </HeadingLink>
      );
    },
    h6: ({ children }: { children: ReactNode }) => {
      const slug = slugify(children as string);
      return (
        <HeadingLink marginTop="16" marginBottom="8" as="h6" id={slug}>
          {children}
        </HeadingLink>
      );
    },
    p: ({ children }: { children: ReactNode }) => (
      <Text
        style={{ lineHeight: "175%" }}
        variant="body-default-m"
        onBackground="neutral-medium"
        marginTop="8"
        marginBottom="12"
      >
        {children}
      </Text>
    ),
    ul: ({ children }: { children: ReactNode }) => <List>{children}</List>,
    ol: ({ children }: { children: ReactNode }) => <List>{children}</List>,
    li: ({ children }: { children: ReactNode }) => (
      <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
        {children}
      </ListItem>
    ),
    strong: ({ children }: { children: ReactNode }) => (
      <Text as="strong" weight="strong">{children}</Text>
    ),
    em: ({ children }: { children: ReactNode }) => (
      <Text as="em" style={{ fontStyle: 'italic' }}>{children}</Text>
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <Column
        paddingLeft="16"
        paddingY="12"
        marginY="16"
        style={{
          borderLeft: '4px solid var(--neutral-alpha-medium)',
          backgroundColor: 'var(--neutral-alpha-weak)',
          borderRadius: '0 6px 6px 0'
        }}
      >
        <Text 
          variant="body-default-m" 
          style={{ 
            fontStyle: 'italic',
            color: 'var(--neutral-strong)'
          }}
        >
          {children}
        </Text>
      </Column>
    ),
    code: ({ children }: { children: ReactNode }) => (
      <InlineCode>{children}</InlineCode>
    ),
    pre: ({ children }: { children: ReactNode }) => {
      // Try to extract language and code from children
      if (children && typeof children === 'object' && 'props' in children) {
        const codeElement = children as any;
        const className = codeElement.props?.className || '';
        const codeContent = codeElement.props?.children || '';
        
        if (className.startsWith('language-')) {
          const language = className.replace('language-', '');
          const label = language.charAt(0).toUpperCase() + language.slice(1);
          
          return (
            <CodeBlock
              marginTop="8"
              marginBottom="16"
              codes={[
                {
                  code: codeContent,
                  language,
                  label,
                },
              ]}
              copyButton={true}
            />
          );
        }
      }
      
      // Fallback for plain pre blocks
      return (
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '8px', 
          overflowX: 'auto', 
          marginTop: '8px',
          marginBottom: '16px',
          fontFamily: 'monospace'
        }}>
          {children}
        </div>
      );
    },
    img: ({ src, alt, ...props }: { src?: string; alt?: string; [key: string]: any }) => {
      if (!src) {
        console.error("Media requires a valid 'src' property.");
        return null;
      }
      return (
        <div style={{ 
          marginTop: '24px', 
          marginBottom: '24px',
          width: '100%'
        }}>
          <Media
            fillWidth
            aspectRatio="16 / 9"
            radius="m"
            border="neutral-alpha-weak"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
            alt={alt}
            src={src}
            style={{ 
              objectFit: 'cover',
              width: '100%',
              height: 'auto'
            }}
            {...props}
          />
          {alt && (
            <Text 
              variant="body-default-s" 
              onBackground="neutral-weak" 
              align="center"
              marginTop="8"
              style={{ fontStyle: 'italic' }}
            >
              {alt}
            </Text>
          )}
        </div>
      );
    },
    a: ({ href, children, ...props }: any) => {
      if (!href) return <span>{children}</span>;
      
      if (href.startsWith("/")) {
        return (
          <SmartLink href={href} {...props}>
            {children}
          </SmartLink>
        );
      }

      if (href.startsWith("#")) {
        return (
          <a href={href} {...props}>
            {children}
          </a>
        );
      }

      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    hr: () => (
      <Row fillWidth horizontal="center">
        <Line maxWidth="40" />
      </Row>
    ),
    table: ({ children }: { children: ReactNode }) => {
      // Parse table structure and convert to Once UI Table component
      const tableChildren = React.Children.toArray(children);
      const thead = tableChildren.find((child: any) => child?.type === 'thead');
      const tbody = tableChildren.find((child: any) => child?.type === 'tbody');
      
      if (!thead || !tbody) {
        // Fallback to basic styled table
        return (
          <div style={{ 
            overflowX: 'auto', 
            marginTop: '16px', 
            marginBottom: '16px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px'
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              {children}
            </table>
          </div>
        );
      }
      
      return (
        <div style={{ 
          overflowX: 'auto', 
          marginTop: '16px', 
          marginBottom: '16px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            {children}
          </table>
        </div>
      );
    },
    thead: ({ children }: { children: ReactNode }) => (
      <thead style={{ 
        borderBottom: '2px solid #e5e5e5',
        backgroundColor: '#f8f9fa'
      }}>
        {children}
      </thead>
    ),
    tbody: ({ children }: { children: ReactNode }) => (
      <tbody>
        {children}
      </tbody>
    ),
    tr: ({ children }: { children: ReactNode }) => (
      <tr style={{ 
        borderBottom: '1px solid #f0f0f0'
      }}>
        {children}
      </tr>
    ),
    th: ({ children }: { children: ReactNode }) => (
      <th style={{ 
        padding: '12px 16px', 
        textAlign: 'left', 
        fontWeight: '600',
        color: '#374151',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #e5e5e5'
      }}>
        <Text variant="body-default-s">
          <strong>{children}</strong>
        </Text>
      </th>
    ),
    td: ({ children }: { children: ReactNode }) => (
      <td style={{ 
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Text variant="body-default-s">
          {children}
        </Text>
      </td>
    ),
  };
}

export function CustomMDX(props: CustomMDXProps) {
  // For development, use ReactMarkdown with Once UI System components to avoid MDX processing issues
  if (process.env.NODE_ENV === 'development') {
    console.log('Using Enhanced ReactMarkdown with Once UI System for development');
    
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={createEnhancedReactMarkdownComponents() as any}
      >
        {String(props.source)}
      </ReactMarkdown>
    );
  }

  // For production, use full MDX
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}