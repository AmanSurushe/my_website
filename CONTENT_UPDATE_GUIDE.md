# Portfolio Content Update Guide

## 🎯 Purpose
This guide helps you keep your portfolio content fresh, recruiter-friendly, and up-to-date with your latest achievements.

## 📍 Main Content File
**Location:** `src/resources/content.js`

## 🔄 Regular Update Schedule
- **Monthly:** Update current role achievements and metrics
- **Quarterly:** Review and enhance all content sections
- **When job searching:** Ensure all content is current and impactful

## 📊 Content Sections to Update

### 1. Personal Information (Lines 55-79)
```javascript
const person = {
  firstName: "Aman",
  lastName: "Surushe", 
  role: "Software Engineer", // Update current title
  avatar: "/images/avatar.jpg", // Update profile photo
  location: "Nagpur, India", // Update if you relocate
  languages: ["English", "Hindi", "Marathi"], // Add new languages
  // Update social links and contact info
}
```

### 2. Introduction Section (Lines 131-145)
**Key Elements to Update:**
- Years of experience (currently "3+ years")
- Latest impressive metrics
- Current key technologies
- Recent major achievements

**Example Updates:**
- Change "1.2+ billion messages" to current volume
- Update performance improvement percentages
- Add new technology expertise

### 3. Work Experience (Lines 149-213)
**For Current Role:**
- Update timeframe (change "Present" date when you leave)
- Add new project achievements with metrics
- Include latest technologies used
- Quantify business impact

**Adding New Positions:**
```javascript
{
  company: "New Company Name",
  timeframe: "Month Year - Present",
  role: "Your Job Title",
  achievements: [
    <>
      <strong>🎯 Project Name:</strong> Brief description with <strong>quantified impact</strong>
    </>,
    // Add 3-4 key achievements
  ],
  images: [], // Add project screenshots if relevant
},
```

### 4. Education Section (Lines 215-224)
**Important Updates:**
- Line 221: Replace `[UPDATE_YOUR_CGPA]` with your actual CGPA
- Add new certifications to Professional Certifications
- Include relevant online courses or bootcamps

### 5. Technical Skills (Lines 229-273)
**Keep Current With:**
- New programming languages learned
- Latest frameworks and tools
- Updated proficiency levels
- Recent project applications

### 6. Key Achievements (Lines 275-300)
**Update Metrics Regularly:**
- System performance numbers
- User base served
- Efficiency improvements
- Cost savings achieved

## 💡 Recruiter-Friendly Writing Tips

### Use Strong Action Verbs
- ✅ "Architected", "Optimized", "Delivered", "Reduced", "Improved"
- ❌ "Worked on", "Helped with", "Assisted in"

### Include Quantifiable Results
- ✅ "Reduced processing time by 45%"
- ❌ "Improved system performance"

### Show Business Impact
- ✅ "Saving $50K annually in operational costs"
- ❌ "Made the system more efficient"

### Use Technical Keywords
Include relevant keywords that recruiters and ATS systems look for:
- Programming languages you use
- Frameworks and technologies
- Methodologies (Agile, DevOps, etc.)
- Industry-specific terms

## 🚨 Common Mistakes to Avoid

1. **Outdated Metrics:** Don't keep old numbers if you have better current ones
2. **Vague Descriptions:** Always quantify impact when possible
3. **Too Technical:** Balance technical details with business value
4. **Missing Keywords:** Ensure job-relevant technologies are mentioned
5. **Inconsistent Formatting:** Maintain consistent structure across sections

## 📈 Content Performance Indicators

### Good Signs Your Content Is Working:
- Recruiters mention specific projects from your portfolio
- Interview questions reference your quantified achievements
- You get contacted for roles matching your highlighted skills

### Time to Update When:
- You haven't updated in 3+ months
- You've completed major projects
- You've learned significant new technologies
- Your role or responsibilities have changed

## 🛠 Technical Update Process

1. **Edit the file:** `src/resources/content.js`
2. **Test locally:** Run `npm run dev` to preview changes
3. **Commit changes:** Use descriptive commit messages
4. **Deploy:** Push to your hosting platform

## 📝 Content Templates

### New Achievement Template:
```javascript
{
  title: "🎯 [Impact Category]",
  metric: "[Impressive Number/Percentage]",
  description: "Brief description of what you accomplished and its business value"
}
```

### New Work Experience Achievement:
```javascript
<>
  <strong>📊 [Project/System Name]:</strong> [Action verb] [technology/system] 
  resulting in <strong>[quantified benefit]</strong> and [additional impact].
</>
```

## 🔍 SEO and Discoverability

### Include Keywords For:
- Your target job titles
- Technologies you want to work with
- Industry buzzwords relevant to your field
- Location-based terms if relevant

### Meta Information:
Update the meta descriptions in each section to improve search engine visibility and social media sharing.

---

**Remember:** Your portfolio is a living document. Regular updates keep it relevant and show continuous growth in your career!