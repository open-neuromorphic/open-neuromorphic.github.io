---
title: "Submit to Open Neuromorphic Review"
description: "Complete guide for authors submitting papers to Open Neuromorphic Review (ONR) via OpenReview. Learn about requirements, field specifications, and best practices."
showTableOfContents: true
---

Welcome to the submission guide for **Open Neuromorphic Review (ONR)**! This page provides comprehensive instructions for preparing and submitting your work through the OpenReview platform.

## Before You Begin

### OpenReview Profile Requirement

**All authors must have an existing OpenReview profile** before submission. Author IDs must be in the format `~FirstName_LastName1` (matching the regex pattern `~.*`).

If you don't have an OpenReview profile yet:
1. Visit [OpenReview.net](https://openreview.net)
2. Create an account using your institutional email
3. Complete your profile information
4. Wait for profile activation (usually automatic)

## Submission Fields

Below is a complete list of all fields required for your ONR submission, in the order they appear in the submission form.

### 1. Title

- **Type:** Text input
- **Required:** Yes
- **Maximum length:** 250 characters
- **Formatting:** Supports TeX formulas using `$...$` for inline math or `$$...$$` for display math

**Example:**
```
Efficient Training of Spiking Neural Networks via $\alpha$-STDP
```

**Tips:**
- Keep it concise and descriptive
- Use TeX formulas sparingly for mathematical notation
- Avoid special characters that may cause rendering issues

### 2. Abstract

- **Type:** Textarea
- **Required:** Yes
- **Maximum length:** 5000 characters
- **Formatting:** Supports TeX formulas using `$...$` or `$$...$$`

**Tips:**
- Clearly state your research question and main contributions
- Include key results and implications
- Use TeX for mathematical notation when necessary
- Stay within the character limit while being comprehensive

### 3. Authors

- **Type:** Comma-separated list
- **Required:** Yes
- **Visibility:** Hidden from public view (internal use only)
- **Format:** Full names separated by commas

**Example:**
```
Jane Smith, John Doe, Alice Johnson
```

**Tips:**
- List all authors in the order they should appear
- Use full names consistently with OpenReview profiles
- Double-check spelling and ordering

### 4. Author IDs

- **Type:** Comma-separated list
- **Required:** Yes
- **Format:** Each ID must match an OpenReview profile in the format `~FirstName_LastName1`
- **Validation:** Must match regex pattern `~.*`

**Example:**
```
~Jane_Smith1, ~John_Doe1, ~Alice_Johnson1
```

**Important:**
- The number and order of author IDs must match the authors list
- Each ID must correspond to an existing OpenReview profile
- Use the exact profile ID format from OpenReview (including numbers if duplicates exist)

### 5. PDF

- **Type:** File upload
- **Required:** Yes
- **Format:** PDF only (`.pdf`)
- **Maximum size:** 50 MB

**Requirements:**
- Must be a properly formatted PDF document
- Should include all figures, tables, and references
- Must be readable and professionally formatted

**Tips:**
- Test your PDF before submission to ensure all elements render correctly
- Keep file size reasonable (compress images if needed, but maintain quality)
- Ensure all fonts are embedded

### 6. Submission Length

- **Type:** Radio button selection
- **Required:** Yes
- **Options:**
  - "Regular submission (≤12 pages of main content)"
  - "Long submission (>12 pages)"

**Clarification:**
- **Main content** refers to the body of the paper (excluding references, appendices, and supplementary materials)
- Count only the core paper pages when selecting your category
- Regular submissions are encouraged for most work
- Long submissions are appropriate for comprehensive studies requiring extended discussion

### 7. Supplementary Material (Optional)

- **Type:** File upload
- **Required:** No
- **Allowed formats:** `.zip` or `.pdf`
- **Maximum size:** 100 MB
- **Visibility:** Visible to reviewers and public after submission

**Requirements:**
- Must be anonymized (no author-identifying information)
- Must be self-contained (reviewers should not need external resources)
- Should enhance the main submission without being essential for understanding

**Appropriate supplementary material includes:**
- Additional experimental results
- Extended proofs or derivations
- Code implementations
- Dataset descriptions
- Video demonstrations
- Extended figures or tables

**Tips:**
- Organize `.zip` files with clear directory structure
- Include a README file explaining the contents
- Test that all files can be opened and viewed correctly
- Ensure anonymization is complete (check metadata, file names, and content)

### 8. Previous ONR Submission URL (Optional)

- **Type:** Text input (URL)
- **Required:** No (only if this is a revision)
- **Format:** Must match pattern `https://openreview.net/forum?id=.*`

**When to use:**
- If you are resubmitting a previously reviewed paper
- If you are submitting a revised version after initial feedback

**Example:**
```
https://openreview.net/forum?id=abc123xyz
```

### 9. Changes Since Last Submission (Optional)

- **Type:** Textarea
- **Required:** No (only if you provided a previous submission URL)
- **Formatting:** Supports Markdown and TeX formulas

**Purpose:**
- Explain what has changed since your previous submission
- Help reviewers understand improvements and addressed feedback

**Example:**
```markdown
## Major Changes
- Revised Section 3.2 to address reviewer concerns about methodology
- Added 5 new experiments (Table 2) demonstrating scalability
- Updated related work section with recent publications

## Minor Changes
- Fixed typos throughout
- Improved figure quality (Figures 3-5)
- Clarified notation in equations 7-9
```

**Tips:**
- Be specific about changes made
- Reference reviewer comments if applicable
- Use bullet points or sections for clarity
- Highlight significant improvements

### 10. Competing Interests

- **Type:** Textarea
- **Required:** Yes
- **Default:** Enter "N/A" if none

**Purpose:**
To disclose any conflicts of interest that might influence the review process.

**What to disclose:**
- Financial interests (funding, employment, consulting)
- Personal relationships with potential reviewers
- Institutional affiliations that may create conflicts
- Any other circumstances that could affect objectivity

**Example (with interests):**
```
This work was funded by Company X. Author A is employed by Company X. 
Author B has a consulting relationship with Organization Y, which 
works in a related research area.
```

**Example (no interests):**
```
N/A
```

**Tips:**
- Be transparent and complete
- Use "N/A" only if you genuinely have no competing interests
- When in doubt, disclose rather than omit

### 11. Human Subjects Reporting

- **Type:** Textarea
- **Required:** Yes
- **Default:** Enter "N/A" if not applicable

**Purpose:**
To document compliance with ethical standards for research involving human subjects.

**When applicable:**
- Studies involving human participants
- Research using human-derived data
- User studies or surveys
- Any research requiring IRB approval

**What to include (if applicable):**
- IRB approval information (institution, protocol number)
- Informed consent procedures
- Data protection and privacy measures
- Participant rights and protections

**Example (applicable):**
```
This study was approved by the University Ethics Committee 
(Protocol #2023-456). All participants provided written informed 
consent. Data was anonymized and stored securely according to 
GDPR requirements.
```

**Example (not applicable):**
```
N/A
```

**Tips:**
- Use "N/A" for purely computational or hardware-only studies
- Be thorough if human subjects are involved
- Include all relevant approval documentation

## Hidden System Fields

The following fields are automatically set by the system and are not visible or editable by authors:

- **venue:** Automatically set to "Submitted to ONR"
- **venueid:** Automatically set to "ONR/Submitted"

These fields help organize and track submissions within the OpenReview system.

## Submission Checklist

Before submitting, ensure you have:

- [ ] Created OpenReview profiles for all authors
- [ ] Prepared a title (≤250 characters) with properly formatted TeX if needed
- [ ] Written an abstract (≤5000 characters) summarizing your work
- [ ] Listed all authors with their full names (comma-separated)
- [ ] Collected all author IDs in OpenReview profile format (`~FirstName_LastName1`)
- [ ] Prepared your PDF (≤50 MB, properly formatted)
- [ ] Selected the appropriate submission length category
- [ ] Prepared supplementary materials if needed (≤100 MB, anonymized, `.zip` or `.pdf`)
- [ ] Noted the previous submission URL if this is a revision
- [ ] Documented changes since last submission if applicable
- [ ] Disclosed any competing interests (or entered "N/A")
- [ ] Addressed human subjects reporting requirements (or entered "N/A")
- [ ] Verified all information for accuracy and completeness

## Frequently Asked Questions

### How do I find my OpenReview profile ID?

1. Log in to OpenReview
2. Click on your name in the top-right corner
3. Your profile ID will be in the URL: `https://openreview.net/profile?id=~Your_Name1`
4. The part after `id=` is your profile ID (e.g., `~Your_Name1`)

### What counts as "main content" for submission length?

Main content includes:
- Introduction, methodology, results, discussion, and conclusion sections
- Figures and tables within these sections
- Inline citations

Main content does NOT include:
- References/bibliography
- Appendices
- Supplementary materials
- Acknowledgments (if placed after references)

### Can I update my submission after submitting?

This depends on the submission deadline and review phase. Check the OpenReview submission page for your paper to see if revisions are allowed. Generally:
- Before the deadline: Yes, you can revise
- After the deadline: Only if explicitly permitted by the review system

### What if my paper is exactly 12 pages?

Choose "Regular submission (≤12 pages of main content)" since 12 pages falls within the regular submission category.

### Should I anonymize my PDF?

Check the current ONR submission guidelines on the OpenReview site. Many review systems require anonymization during the review process. If anonymization is required:
- Remove author names and affiliations
- Remove or anonymize acknowledgments
- Be careful with citations to your own work
- Check PDF metadata for identifying information

### What file formats are acceptable for supplementary materials?

Only `.zip` and `.pdf` files are accepted. If you have other formats:
- Bundle them into a `.zip` archive
- Convert them to PDF if appropriate
- Ensure everything is accessible to reviewers

## Getting Help

If you encounter issues or have questions:

- **OpenReview Support:** Contact OpenReview directly through their support system
- **ONR Organizers:** Check the submission page on OpenReview for contact information
- **Technical Issues:** Report problems with the OpenReview platform to their technical support team

## Additional Resources

- [OpenReview Documentation](https://docs.openreview.net/)
- [OpenReview Author Guide](https://docs.openreview.net/getting-started/creating-a-submission)
- [Open Neuromorphic Community Discord](https://discord.gg/openneuromorphic)

---

*This guide reflects the current OpenReview invitation schema for ONR submissions. Requirements may be updated; always check the OpenReview submission form for the most current information.*
