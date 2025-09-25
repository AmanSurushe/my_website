# 📝 Blog Writing Guide

**Complete guide for writing beautiful blogs with our enhanced MDX system**

## 📋 Quick Start Checklist

- ✅ **Frontmatter**: Title, summary, publishedAt, tag, image, images[], team[]
- ✅ **Hero Image**: Add featured image in frontmatter
- ✅ **Content Structure**: Use headings, tables, code blocks, lists
- ✅ **Images**: Full-width with captions
- ✅ **Professional Layout**: Automatic hero section, sidebar, reading time

---

## 🎨 Frontmatter Template

```yaml
---
title: "Your Amazing Blog Title"
summary: "Compelling description that will appear in hero section and meta tags"
publishedAt: "2024-12-20"
tag: "Category" # Optional: Tools, Tutorial, Guide, etc.
image: "/images/blog/featured-image.png" # Hero image
images:
  - "/images/blog/image1.png"
  - "/images/blog/image2.png"
team: [] # Leave empty unless multiple authors
---
```

## 🏗️ Blog Structure Components

### 1. **Headings & Navigation**
```markdown
## Main Section (H2) - Shows in Table of Contents
### Subsection (H3) - Shows in Table of Contents  
#### Minor Section (H4)
##### Small Detail (H5)
###### Fine Print (H6)
```

**Result**: Auto-generates slugified IDs for navigation, appears in sidebar TOC.

### 2. **Tables** (Professional Styling)
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| More     | Content  | Here     |
```

**Features**:
- ✅ Professional borders and styling
- ✅ Responsive design
- ✅ Alternating row colors
- ✅ Mobile-friendly horizontal scroll

### 3. **Code Blocks** (Syntax Highlighted)
```markdown
\`\`\`javascript
const example = "Beautiful syntax highlighting";
console.log(example);
\`\`\`

\`\`\`bash
npm install amazing-package
\`\`\`

\`\`\`python
def hello_world():
    print("Perfect code formatting!")
\`\`\`
```

**Features**:
- ✅ Syntax highlighting for 50+ languages
- ✅ Copy button
- ✅ Language labels
- ✅ Professional styling

### 4. **Inline Code**
```markdown
Use `<leader>ff` to find files in LazyVim.
Press `npm install` to install packages.
```

**Result**: Styled inline code with proper background and padding.

### 5. **Images** (Enhanced Display)
```markdown
![Image Caption](image-url.png)
```

**Features**:
- ✅ Full-width responsive images
- ✅ 16:9 aspect ratio optimization
- ✅ Captions below images
- ✅ Rounded corners and borders
- ✅ Mobile-optimized sizing

### 6. **Lists** (Styled)
```markdown
- ✅ Feature one
- ✅ Feature two  
- ✅ Feature three

1. **Step One**: Description here
2. **Step Two**: More details
3. **Step Three**: Final step
```

**Features**:
- ✅ Proper spacing and indentation
- ✅ Professional styling
- ✅ Nested list support

### 7. **Links** (Smart Routing)
```markdown
[Internal Link](/blog/other-post)
[External Link](https://example.com)
[Anchor Link](#section-heading)
```

**Features**:
- ✅ Internal links use Next.js routing
- ✅ External links open in new tab
- ✅ Anchor links for same-page navigation

### 8. **Text Formatting**
```markdown
**Bold text** for emphasis
*Italic text* for subtle emphasis
***Bold and italic*** for strong emphasis

> Quote blocks for important information
```

### 9. **Horizontal Rules**
```markdown
---
```

**Result**: Styled divider line centered on page.

## 🎯 Blog Layout Features

### **Automatic Hero Section**
- ✅ **Large title** from frontmatter
- ✅ **Subtitle** from summary
- ✅ **Reading time** (auto-calculated)
- ✅ **Publication date** (formatted)
- ✅ **Tag badge** (if provided)
- ✅ **Author avatar** (if team provided)

### **Featured Image Section**
- ✅ **Full-width hero image** (if provided in frontmatter)
- ✅ **Professional styling** with borders and radius
- ✅ **Responsive sizing** for all devices

### **Desktop Sidebar**
- ✅ **Table of Contents** (auto-generated from headings)
- ✅ **Article Info** (date, reading time, word count, tag)
- ✅ **Sticky positioning** (follows scroll)
- ✅ **Hidden on mobile** for better UX

### **Mobile Optimization**
- ✅ **Responsive layout** adapts to screen size
- ✅ **Touch-friendly** navigation
- ✅ **Optimized images** for mobile loading
- ✅ **Collapsible sidebar** content

## 📱 Responsive Breakpoints

| Device | Max Width | Layout |
|--------|-----------|--------|
| **Mobile** | 768px | Single column, no sidebar |
| **Tablet** | 1024px | Two columns, sidebar visible |
| **Desktop** | 1200px+ | Full layout with sticky sidebar |

## 🎨 Visual Design System

### **Typography Scale**
- `display-strong-l` - Main title (hero)
- `display-strong-s` - Section headings
- `body-default-l` - Hero description
- `body-default-m` - Body text
- `body-default-s` - Metadata, captions
- `label-default-s` - Tags, labels

### **Spacing System**
- `gap="8"` - Small spacing (8px)
- `gap="16"` - Medium spacing (16px) 
- `gap="24"` - Large spacing (24px)
- `gap="32"` - Extra large spacing (32px)
- `gap="40"` - Section spacing (40px)

### **Color Tokens**
- `neutral-weak` - Light backgrounds
- `neutral-medium` - Borders, subtle text
- `neutral-strong` - Main text
- `neutral-alpha-weak` - Transparent overlays

## ✅ Best Practices

### **Content Structure**
1. **Start with compelling intro** (2-3 sentences)
2. **Use clear headings** for navigation
3. **Include tables** for data/comparisons
4. **Add code examples** with proper syntax
5. **Use images** to break up text
6. **End with clear conclusion**

### **Image Guidelines**
- **Format**: PNG, JPG, WebP
- **Size**: Max 2MB for fast loading
- **Dimensions**: 1920x1080 for hero images
- **Alt text**: Always provide descriptive alt text
- **Location**: Store in `/public/images/blog/`

### **Writing Style**
- **Clear and concise** sentences
- **Use active voice** when possible
- **Include examples** for technical content
- **Add visual breaks** every 2-3 paragraphs
- **Use bullet points** for lists and features

### **SEO Optimization**
- **Title**: 50-60 characters, include main keyword
- **Summary**: 150-160 characters, compelling description
- **Headings**: Use H2-H6 hierarchy for structure
- **Images**: Include alt text for accessibility
- **Links**: Add relevant internal/external links

## 🚀 Quick Examples

### **Tutorial Blog Structure**
```markdown
## Prerequisites
- List requirements here

## Step-by-Step Guide
### Step 1: Setup
Code example here

### Step 2: Configuration
Table with options

### Step 3: Testing
Image showing results

## Troubleshooting
Common issues and solutions

## Conclusion
Summary and next steps
```

### **Feature Comparison Table**
```markdown
| Feature | Option A | Option B | Option C |
|---------|----------|----------|----------|
| Speed | ⚡ Fast | 🐌 Slow | ⚡ Fast |
| Price | $10/mo | $5/mo | $15/mo |
| Support | ✅ 24/7 | ❌ Email only | ✅ 24/7 |
```

## 🎯 File Naming Convention

```
/src/app/blog/posts/
├── blog-title-with-dashes.mdx
├── another-great-post.mdx
└── comprehensive-guide-example.mdx
```

**Rules**:
- Use lowercase
- Separate words with dashes
- Keep URLs under 50 characters
- Use descriptive names

## 💡 Pro Tips

1. **Reading Time**: Automatically calculated at ~200 words/minute
2. **SEO**: All metadata automatically generated from frontmatter
3. **Navigation**: Heading IDs auto-generated for anchor links
4. **Images**: Use descriptive filenames for better SEO
5. **Performance**: Images are automatically optimized and lazy-loaded
6. **Accessibility**: Alt text and semantic HTML are built-in

---

## 🎨 Example Blog Template

```markdown
---
title: "Complete Guide to Amazing Feature"
summary: "Learn how to master this amazing feature with practical examples and pro tips for developers."
publishedAt: "2024-12-20"
tag: "Tutorial"
image: "/images/blog/feature-guide.png"
images:
  - "/images/blog/feature-guide.png"
  - "/images/blog/feature-demo.png"
team: []
---

This comprehensive guide will teach you everything about Amazing Feature, from basic setup to advanced techniques.

## What You'll Learn

- ✅ Basic setup and configuration
- ✅ Advanced techniques and optimization  
- ✅ Real-world examples and use cases
- ✅ Common pitfalls and how to avoid them

## Prerequisites

Before we begin, ensure you have:

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| npm | 9+ | Package management |
| Git | 2.40+ | Version control |

## Step 1: Basic Setup

Let's start with the basic installation:

\`\`\`bash
npm install amazing-feature
cd your-project
npm run setup
\`\`\`

![Setup Process](setup-screenshot.png)

## Step 2: Configuration

Configure your settings:

\`\`\`javascript
const config = {
  feature: "enabled",
  optimization: true,
  debug: false
};
\`\`\`

## Advanced Techniques

Now that you have the basics working, let's explore advanced features:

### Performance Optimization

- **Enable caching** for faster loading
- **Minimize bundle size** with tree shaking
- **Use lazy loading** for images

### Best Practices

> **Pro Tip**: Always test your configuration in a development environment before deploying to production.

## Troubleshooting

Common issues and solutions:

### Issue: Feature not working
**Solution**: Check your configuration file and ensure all dependencies are installed.

### Issue: Slow performance  
**Solution**: Enable optimization flags in your config.

## Conclusion

You've successfully learned how to implement Amazing Feature! Key takeaways:

- ✅ Proper setup is crucial for success
- ✅ Configuration options provide flexibility
- ✅ Performance optimization is essential
- ✅ Testing prevents production issues

**Next Steps**: Try building a real project with these concepts!
```

---

**🎉 Ready to write amazing blogs!** Use this guide as your reference for creating professional, beautiful content that works perfectly with our enhanced blog system.