# SiteGround Upload Guide - Ezbelta Main Website

This guide will walk you through uploading your new Ezbelta website to SiteGround hosting.

## Overview
- **Domain:** ezbelta.com
- **Hosting:** SiteGround
- **Files Location:** `public_html/` folder in your ezbelta dev project
- **Goal:** Replace "Under development" page with your new site

---

## Part 1: Prepare Your Files

### Step 1: Review Your Files
- [ ] Navigate to your project folder: `dev-projects/ezbelta/public_html/`
- [ ] Verify you have the following structure:

```
public_html/
├── index.html          ✓ Homepage
├── privacy.html        ✓ Privacy policy
├── terms.html          ✓ Terms of service
├── contact.html        ✓ Contact page
├── css/
│   └── style.css       ✓ Custom styles
├── images/
│   └── Ezbelta3.svg    ✓ Logo
└── js/
    └── main.js         ✓ JavaScript functionality
```

### Step 2: Test Locally (Optional but Recommended)
- [ ] Open `index.html` in your web browser
- [ ] Click through all links (Products, About, Contact, Privacy, Terms)
- [ ] Verify logo displays correctly
- [ ] Test contact form (it will show success but won't actually send)
- [ ] Check responsive design (resize browser window)

---

## Part 2: Access SiteGround File Manager

### Step 3: Log Into SiteGround
- [ ] Go to [SiteGround Login](https://login.siteground.com/)
- [ ] Enter your credentials
- [ ] Click **Login**

### Step 4: Navigate to Site Tools
- [ ] From the dashboard, click **Websites**
- [ ] Find `ezbelta.com` in your websites list
- [ ] Click **Site Tools** button

### Step 5: Open File Manager
- [ ] In Site Tools left sidebar, find the **Files** section
- [ ] Click **File Manager**
- [ ] Wait for the file manager interface to load

---

## Part 3: Backup Existing Files (Safety First!)

### Step 6: Create Backup of Current Site
- [ ] In File Manager, navigate to `public_html` folder
- [ ] You should see the "Under development" files
- [ ] Select all files (checkbox at top or Ctrl/Cmd+A)
- [ ] Click **Compress** or **Download** (gear icon)
- [ ] Choose **ZIP** format
- [ ] Name it `backup-under-development-[today's date].zip`
- [ ] Click **Compress** or **Download**
- [ ] Store the backup safely (you can delete it later)

---

## Part 4: Clear Out Old Files

### Step 7: Delete Current Files
- [ ] Still in `public_html` folder
- [ ] Select all existing files and folders
  - **EXCEPT:** Do NOT delete `.htaccess` file (if present)
  - **EXCEPT:** Do NOT delete `cgi-bin` folder (if present)
- [ ] Click **Delete** (trash icon)
- [ ] Confirm deletion

### Step 8: Verify Clean Slate
- [ ] Ensure `public_html` is mostly empty
- [ ] Should only have `.htaccess` and possibly `cgi-bin`
- [ ] If you see a `default.html` or `index.html`, delete it

---

## Part 5: Upload Your New Website

### Step 9: Upload Files via File Manager

**Option A: Upload Individual Files**
- [ ] Click **Upload** button in File Manager
- [ ] Navigate to your local `public_html` folder
- [ ] Select all files: `index.html`, `privacy.html`, `terms.html`, `contact.html`
- [ ] Click **Open** to upload
- [ ] Wait for upload to complete

**Option B: Upload as ZIP (Faster for Multiple Files)**
- [ ] On your computer, compress the contents of `public_html/` into a ZIP file
  - **Important:** Compress the *contents*, not the folder itself
  - Inside the ZIP should be: index.html, css/, images/, js/, etc.
- [ ] In SiteGround File Manager, click **Upload**
- [ ] Select your ZIP file
- [ ] Wait for upload to complete
- [ ] Right-click the ZIP file
- [ ] Click **Extract**
- [ ] Confirm extraction
- [ ] Delete the ZIP file after extraction

### Step 10: Upload Folders
- [ ] Create folders if not already created:
  - [ ] Click **Create Folder** → Name it `css`
  - [ ] Click **Create Folder** → Name it `images`
  - [ ] Click **Create Folder** → Name it `js`
- [ ] Navigate into `css` folder
- [ ] Click **Upload** and upload `style.css`
- [ ] Go back to `public_html`
- [ ] Navigate into `images` folder
- [ ] Click **Upload** and upload `Ezbelta3.svg`
- [ ] Go back to `public_html`
- [ ] Navigate into `js` folder
- [ ] Click **Upload** and upload `main.js`

---

## Part 6: Verify File Structure

### Step 11: Check File Structure on Server
Your `public_html` folder should now look like:

```
public_html/
├── .htaccess (if present - leave it)
├── index.html
├── privacy.html
├── terms.html
├── contact.html
├── css/
│   └── style.css
├── images/
│   └── Ezbelta3.svg
└── js/
    └── main.js
```

- [ ] Verify all files are present
- [ ] Verify folders are correctly named (lowercase)
- [ ] Verify no extra files or duplicates

### Step 12: Check File Permissions
- [ ] Right-click on `index.html`
- [ ] Click **Change Permissions** or **Chmod**
- [ ] Ensure permissions are set to **644** (rw-r--r--)
- [ ] Repeat for all HTML files
- [ ] For folders (`css`, `images`, `js`), permissions should be **755** (rwxr-xr-x)

---

## Part 7: Test Your Live Website

### Step 13: Visit Your Website
- [ ] Open a new browser tab
- [ ] Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- [ ] Visit `https://ezbelta.com`
- [ ] Your new homepage should load!

### Step 14: Test All Pages
- [ ] Click **Products** → Should scroll to products section
- [ ] Click **About** → Should scroll to about section
- [ ] Click **Contact** → Should open contact page
- [ ] On contact page, verify:
  - [ ] Form displays correctly
  - [ ] All fields are present
  - [ ] Submit button works (shows success message)
- [ ] Click **Privacy Policy** in footer
- [ ] Verify privacy policy page loads
- [ ] Click **Terms of Service** in footer
- [ ] Verify terms page loads
- [ ] Click logo to return to homepage

### Step 15: Test Links to A3
- [ ] On homepage, click **Launch A3** button
- [ ] Should open `https://a3.ezbelta.com` in new tab
- [ ] Verify A3 app loads correctly

### Step 16: Test Mobile Responsiveness
- [ ] On your phone, visit `https://ezbelta.com`
- [ ] Or in desktop browser, open Developer Tools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
- [ ] Test at different screen sizes:
  - [ ] Mobile (375px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1920px)
- [ ] Verify navigation works
- [ ] Verify cards stack properly on mobile

---

## Part 8: Configure Contact Form (Optional)

The contact form currently shows a success message but doesn't actually send emails. To make it functional:

### Option A: Use a Form Service (Recommended)

**Formspree (Free tier available):**
- [ ] Go to [Formspree.io](https://formspree.io/)
- [ ] Sign up for free account
- [ ] Create new form
- [ ] Copy the form endpoint URL
- [ ] In SiteGround File Manager, edit `js/main.js`
- [ ] Find the comment `// TODO: Replace this with your actual form submission endpoint`
- [ ] Replace with:
```javascript
const response = await fetch('YOUR_FORMSPREE_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```
- [ ] Save the file
- [ ] Test the contact form

**Other Options:**
- [ ] Basin.io
- [ ] Getform.io
- [ ] Form.io
- [ ] Netlify Forms (if you move to Netlify)

### Option B: Configure SiteGround Email Form
- [ ] Contact SiteGround support
- [ ] Ask them to help set up a PHP mail script
- [ ] They can provide a simple contact form handler

### Option C: Create API Endpoint in A3 App
- [ ] Add `/api/contact` endpoint to A3 SaaS app
- [ ] Have it send emails via your email service
- [ ] Update `main.js` to POST to `https://a3.ezbelta.com/api/contact`

---

## Part 9: Set Up Email (Optional)

### Step 17: Configure Contact Email Addresses
You mentioned using SiteGround email for Ezbelta. Make sure these addresses exist:

- [ ] `info@ezbelta.com` - General inquiries
- [ ] `support@ezbelta.com` - Support requests
- [ ] `privacy@ezbelta.com` - Privacy questions
- [ ] `legal@ezbelta.com` - Legal matters

**To create email accounts:**
- [ ] In SiteGround Site Tools
- [ ] Go to **Email** → **Accounts**
- [ ] Click **Create Email Account**
- [ ] Create each email address
- [ ] Set up forwarding or access via webmail/IMAP

---

## Part 10: SEO and Performance Optimization

### Step 18: Add Favicon (Optional)
- [ ] Create a favicon.ico file (16x16 or 32x32 pixels)
- [ ] Upload to `public_html` root
- [ ] Or add this to `<head>` of all HTML files:
```html
<link rel="icon" type="image/svg+xml" href="/images/Ezbelta3.svg">
```

### Step 19: Add Robots.txt (Optional)
- [ ] In File Manager, create new file: `robots.txt`
- [ ] Add content:
```
User-agent: *
Allow: /

Sitemap: https://ezbelta.com/sitemap.xml
```
- [ ] Save file

### Step 20: Create Sitemap (Optional)
- [ ] Use a sitemap generator tool
- [ ] Or create manually: `sitemap.xml`
- [ ] Upload to `public_html` root
- [ ] Submit to Google Search Console

### Step 21: Enable Gzip Compression
- [ ] In SiteGround Site Tools
- [ ] Go to **Speed** → **Caching**
- [ ] Enable **GZIP Compression**
- [ ] Enable **Static Content caching**

### Step 22: Install SSL Certificate (Should Already Be Done)
- [ ] In Site Tools, go to **Security** → **SSL Manager**
- [ ] Verify SSL certificate is installed for ezbelta.com
- [ ] Should show "Let's Encrypt" certificate
- [ ] Enable **HTTPS Enforce** to redirect HTTP to HTTPS

---

## Part 11: Maintenance and Updates

### Step 23: Bookmark Important Pages
- [ ] SiteGround Login: https://login.siteground.com/
- [ ] File Manager: (via Site Tools → Files → File Manager)
- [ ] Email Accounts: (via Site Tools → Email → Accounts)

### Step 24: Making Future Updates

**To update content:**
- [ ] Edit files locally in your `dev-projects/ezbelta/public_html/` folder
- [ ] Test changes locally
- [ ] Log into SiteGround File Manager
- [ ] Navigate to the file you want to update
- [ ] Click file → **Edit** or **Code Editor**
- [ ] Make changes
- [ ] Click **Save**
- [ ] Refresh your website to see changes

**Or:**
- [ ] Edit locally
- [ ] Upload updated file via File Manager (will replace existing)
- [ ] Refresh website

### Step 25: Keep Local Backup
- [ ] Always keep your local files as the master copy
- [ ] Make changes locally first
- [ ] Then upload to SiteGround
- [ ] Consider using Git for version control

---

## Troubleshooting

### Website Shows 404 Error?
- [ ] Ensure `index.html` is in `public_html` root (not in a subfolder)
- [ ] Check file name is exactly `index.html` (lowercase)
- [ ] Clear browser cache and try again

### Images Not Loading?
- [ ] Check image paths in HTML files
- [ ] Should be: `images/Ezbelta3.svg` (no leading slash for relative paths)
- [ ] Or: `/images/Ezbelta3.svg` (with leading slash for absolute paths)
- [ ] Verify image file uploaded correctly
- [ ] Check file name matches exactly (case-sensitive on Linux)

### CSS Not Applied?
- [ ] Check `style.css` is in `css/` folder
- [ ] Verify HTML files link to `css/style.css`
- [ ] Clear browser cache
- [ ] Check file uploaded successfully

### Contact Form Not Working?
- [ ] Check browser console for JavaScript errors (F12)
- [ ] Verify `main.js` is in `js/` folder and linked correctly
- [ ] Form currently just shows success message - needs integration (see Part 8)

### HTTPS Not Working?
- [ ] In SiteGround Site Tools → Security → SSL Manager
- [ ] Verify SSL certificate is active
- [ ] Enable HTTPS Enforce
- [ ] Wait a few minutes for changes to propagate

---

## Customization Guide

### Update Business Information

**In privacy.html:**
- [ ] Line ~230: Update email address
- [ ] Add your physical address if required by law

**In terms.html:**
- [ ] Line ~180: Add your state/jurisdiction
- [ ] Line ~210: Update email address
- [ ] Review all legal terms with your attorney

**In contact.html:**
- [ ] Update email addresses
- [ ] Add phone number if desired
- [ ] Customize contact form fields

### Update Product Cards

**In index.html:**
- [ ] Find the "Coming Soon" product cards (around line ~100)
- [ ] Replace "Product Name" with actual product names
- [ ] Update descriptions
- [ ] Change colors (purple-500, green-500) to match branding
- [ ] When product launches, update button:
```html
<a href="https://product.ezbelta.com" class="...">
    Launch Product →
</a>
```

### Update Branding Colors
Current color scheme uses Tailwind's blue (blue-600). To change:

**Option 1: Use Tailwind's built-in colors**
- Replace `blue-600` with `purple-600`, `green-600`, etc.

**Option 2: Customize in style.css**
- Add custom color variables
- Update throughout the site

---

## Completion Checklist

- [ ] All files uploaded to SiteGround
- [ ] File structure matches expected structure
- [ ] Homepage loads at https://ezbelta.com
- [ ] All navigation links work
- [ ] Privacy policy page accessible
- [ ] Terms of service page accessible
- [ ] Contact page accessible and form displays
- [ ] Logo displays correctly
- [ ] Link to A3 app works
- [ ] Mobile responsive design tested
- [ ] SSL certificate active (HTTPS works)
- [ ] Email addresses created (optional)
- [ ] Contact form configured (optional)
- [ ] Favicon added (optional)

---

## Next Steps

After your site is live, consider:

1. **Analytics**
   - [ ] Add Google Analytics
   - [ ] Or use privacy-focused alternative (Plausible, Fathom)

2. **SEO**
   - [ ] Submit sitemap to Google Search Console
   - [ ] Submit to Bing Webmaster Tools
   - [ ] Optimize meta descriptions

3. **Marketing**
   - [ ] Add social media links
   - [ ] Create blog section (future)
   - [ ] Add newsletter signup

4. **Monitoring**
   - [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
   - [ ] Monitor site performance (Google PageSpeed Insights)

---

## Quick Reference

**SiteGround Login:** https://login.siteground.com/

**Important Paths:**
- Public root: `public_html/`
- Images: `public_html/images/`
- Styles: `public_html/css/`
- Scripts: `public_html/js/`

**Important Files:**
- Homepage: `index.html`
- Privacy: `privacy.html`
- Terms: `terms.html`
- Contact: `contact.html`

**File Permissions:**
- HTML files: 644
- Folders: 755
- .htaccess: 644

---

**Estimated Time:** 30-45 minutes for complete upload and testing

**Last Updated:** January 2025

---

## Support

If you encounter issues:
1. Check SiteGround documentation: https://www.siteground.com/kb/
2. Contact SiteGround support (24/7 chat available)
3. Review browser console for JavaScript errors (F12)
4. Check SiteGround error logs (Site Tools → Statistics → Error Log)
