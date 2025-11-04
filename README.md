# Ezbelta Main Website

This is the main marketing and hub website for Ezbelta products.

## About

Ezbelta develops intelligent business solutions powered by AI. This website serves as:
- Main landing page showcasing all Ezbelta products
- Hub for routing to product subdomains (a3.ezbelta.com, etc.)
- Host for legal pages (Privacy Policy, Terms of Service)
- Contact portal for inquiries

## Project Structure

```
ezbelta/
├── public_html/              # Production-ready files (upload to SiteGround)
│   ├── index.html           # Homepage
│   ├── privacy.html         # Privacy Policy
│   ├── terms.html           # Terms of Service
│   ├── contact.html         # Contact page
│   ├── css/
│   │   └── style.css        # Custom styles
│   ├── images/
│   │   └── Ezbelta3.svg     # Logo
│   └── js/
│       └── main.js          # JavaScript functionality
├── SITEGROUND_UPLOAD_GUIDE.md  # Step-by-step upload instructions
└── README.md                # This file
```

## Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** (via CDN) - Utility-first CSS framework
- **Vanilla JavaScript** - No frameworks, lightweight and fast
- **SiteGround Hosting** - Shared hosting with SSL

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern, clean UI with Tailwind CSS
- ✅ Product showcase cards
- ✅ Privacy Policy (comprehensive, customizable)
- ✅ Terms of Service (comprehensive, customizable)
- ✅ Contact form (ready to integrate with email service)
- ✅ Smooth scrolling navigation
- ✅ SEO-friendly structure
- ✅ Fast loading (static HTML)
- ✅ Accessible (semantic HTML, focus states)

## Getting Started

### Local Testing

1. Open `public_html/index.html` in your browser
2. Navigate through all pages
3. Test all links and functionality

### Deploying to SiteGround

Follow the comprehensive guide: `SITEGROUND_UPLOAD_GUIDE.md`

**Quick Steps:**
1. Log into SiteGround
2. Navigate to Site Tools → Files → File Manager
3. Go to `public_html/` folder
4. Delete existing files (backup first!)
5. Upload all files from your local `public_html/` folder
6. Visit https://ezbelta.com to verify

## Customization

### Update Content

**Business Information:**
- Edit `privacy.html` - Update contact information
- Edit `terms.html` - Update legal jurisdiction and contact info
- Edit `contact.html` - Update email addresses

**Product Cards:**
- Edit `index.html` - Find product cards section
- Replace "Coming Soon" cards with actual products
- Update descriptions, colors, and links

**Branding:**
- Replace `images/Ezbelta3.svg` with your logo
- Update colors in HTML files (search for `blue-600`)
- Modify `css/style.css` for custom styling

### Contact Form Integration

The contact form is ready but needs backend integration:

**Option 1: Form Service (Easiest)**
- Sign up for Formspree.io, Basin.io, or similar
- Get form endpoint URL
- Edit `js/main.js` and replace the TODO with actual endpoint
- Test submission

**Option 2: PHP Script**
- Contact SiteGround support for PHP mail script
- They can provide simple form handler

**Option 3: API Endpoint**
- Create `/api/contact` endpoint in A3 app
- Update `main.js` to POST to that endpoint

## Maintenance

### Making Updates

1. Edit files locally in `public_html/` folder
2. Test changes in browser
3. Upload updated files to SiteGround
4. Clear browser cache and verify changes

### Version Control (Optional)

Consider using Git:
```bash
cd ezbelta
git init
git add .
git commit -m "Initial commit"
```

## Current Setup

- **Live URL:** https://ezbelta.com
- **Hosting:** SiteGround
- **SSL:** Let's Encrypt (auto-renewed)
- **Email:** SiteGround email accounts
- **Products:**
  - A3 - Affiliate Analytics (https://a3.ezbelta.com)
  - More products coming soon...

## File Sizes

All files are lightweight for fast loading:
- index.html: ~12KB
- privacy.html: ~20KB
- terms.html: ~19KB
- contact.html: ~11KB
- style.css: ~2KB
- main.js: ~3KB
- Ezbelta3.svg: ~6KB

**Total size: ~73KB** (excluding Tailwind CSS loaded from CDN)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- ✅ Static HTML - instant loading
- ✅ Tailwind CSS via CDN (cached globally)
- ✅ Minimal JavaScript
- ✅ Optimized images (SVG logo)
- ✅ No external dependencies except Tailwind CDN

## Security

- ✅ HTTPS enforced
- ✅ No database (static site)
- ✅ No user authentication
- ✅ Form validation client-side
- ✅ External links open in new tab with `rel="noopener noreferrer"`

## SEO

Current SEO features:
- Semantic HTML5 markup
- Meta descriptions on all pages
- Descriptive page titles
- Alt text for images
- Clean URL structure

**To improve:**
- Add robots.txt
- Add sitemap.xml
- Submit to Google Search Console
- Add structured data (Schema.org)
- Add Open Graph tags for social sharing

## Future Enhancements

Potential additions:
- [ ] Blog section
- [ ] Newsletter signup
- [ ] Customer testimonials
- [ ] FAQ page
- [ ] Video demos
- [ ] Live chat integration
- [ ] Analytics dashboard
- [ ] A/B testing

## Support

**Website Issues:**
- Check SITEGROUND_UPLOAD_GUIDE.md troubleshooting section
- Contact SiteGround support: https://www.siteground.com/support

**Content Updates:**
- Edit HTML files locally
- Upload via SiteGround File Manager

**Technical Questions:**
- Refer to this README
- Check code comments in HTML/CSS/JS files

## License

Proprietary - © 2025 Ezbelta. All rights reserved.

## Credits

- **Design & Development:** Custom built for Ezbelta
- **CSS Framework:** Tailwind CSS
- **Hosting:** SiteGround
- **SSL:** Let's Encrypt
