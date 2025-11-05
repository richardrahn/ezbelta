# Contact Form Setup Guide - PHP Email Integration

Your contact form is now configured to use SiteGround's PHP mail functionality.

## Files Created

1. **contact-form.php** - Handles form submissions and sends emails
2. **js/main.js** - Updated to POST to contact-form.php
3. **contact.html** - Already has the form (no changes needed)

---

## Step 1: Configure Email Addresses

Before uploading, customize the email addresses in `contact-form.php`:

### Line 18-19 - Edit These:
```php
$to_email = 'info@ezbelta.com';      // WHERE to send form submissions
$from_email = 'noreply@ezbelta.com'; // FROM address (must be @ezbelta.com)
```

**Important:** 
- `$to_email` - This is where you'll receive contact form submissions
- `$from_email` - Must be a valid email address on your domain (@ezbelta.com)
  - You may need to create noreply@ezbelta.com in SiteGround
  - Or use an existing email like info@ezbelta.com

---

## Step 2: Upload Files to SiteGround

Upload the updated files:

1. **Log into SiteGround** → Site Tools → File Manager
2. **Navigate to** `public_html/`
3. **Upload these files:**
   - `contact-form.php` (NEW - upload to root)
   - `js/main.js` (UPDATED - replace existing in js/ folder)

**Final Structure:**
```
public_html/
├── contact-form.php     ← NEW PHP handler
├── contact.html
├── index.html
├── js/
│   └── main.js         ← UPDATED
└── (other files...)
```

---

## Step 3: Set File Permissions

Ensure correct permissions for PHP file:

1. **Right-click** `contact-form.php` in File Manager
2. **Click** "Change Permissions" or "Chmod"
3. **Set to:** `644` (rw-r--r--)
4. **Click** "Save"

---

## Step 4: Test PHP Mail Function

Before testing the form, verify PHP mail is working:

1. **Create a test file:** `test-email.php`
2. **Add this code:**

```php
<?php
$to = 'YOUR_EMAIL@ezbelta.com'; // Change to your email
$subject = 'SiteGround PHP Mail Test';
$message = 'If you receive this, PHP mail is working!';
$headers = 'From: noreply@ezbelta.com';

if (mail($to, $subject, $message, $headers)) {
    echo "SUCCESS: Test email sent! Check your inbox.";
} else {
    echo "ERROR: Failed to send email. Contact SiteGround support.";
}
?>
```

3. **Upload to** `public_html/test-email.php`
4. **Visit** `https://ezbelta.com/test-email.php` in browser
5. **Check your inbox** for test email
6. **Delete test file** after verifying

---

## Step 5: Test Contact Form

1. **Visit** `https://ezbelta.com/contact.html`
2. **Fill out the form** with test data:
   - Name: Test User
   - Email: your.email@example.com
   - Company: Test Company
   - Subject: General Inquiry
   - Message: This is a test message
3. **Click** "Send Message"
4. **Check for:**
   - Success message appears
   - Email arrives at info@ezbelta.com (or your configured address)
   - Form clears after submission

---

## Step 6: Check Email Format

The email you receive will look like this:

```
From: noreply@ezbelta.com
To: info@ezbelta.com
Subject: [Ezbelta Contact Form] General Inquiry

New contact form submission from Ezbelta.com

Name: Test User
Email: your.email@example.com
Company: Test Company
Subject: General Inquiry

Message:
This is a test message

---
Sent from: 192.168.1.1
Time: 2025-01-04 14:30:00
```

---

## Troubleshooting

### Email Not Arriving?

**1. Check Spam Folder**
- SiteGround emails sometimes go to spam initially

**2. Verify FROM Address**
- Must be a valid @ezbelta.com email
- Create noreply@ezbelta.com in SiteGround email accounts if needed

**3. Check PHP Error Logs**
- SiteGround: Site Tools → Statistics → Error Log
- Look for mail() function errors

**4. Test PHP Mail Function**
- Use the test-email.php script above
- If that doesn't work, contact SiteGround support

**5. SiteGround SMTP Settings**
Some hosts require SMTP instead of mail() function. If mail() doesn't work:
- Contact SiteGround support
- Ask about SMTP settings for PHP mail
- They may provide PHPMailer configuration

### Form Submission Errors

**JavaScript Console Errors:**
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Submit form
4. Look for errors

**Common Issues:**
- 404 Error: contact-form.php not uploaded or wrong location
- 500 Error: PHP syntax error or permissions issue
- CORS Error: Not an issue with same-domain PHP

### Success Message Shows But No Email

**Possible Causes:**
1. PHP mail() function blocked by host
2. FROM email not validated
3. TO email address typo
4. Mail server rate limiting

**Solution:**
- Contact SiteGround support: "PHP mail() function not sending emails"
- They can check server mail logs
- May need to enable/configure mail function

---

## Security Features Included

✅ **POST-only requests** - Blocks GET requests
✅ **Input sanitization** - Strips HTML tags and malicious code
✅ **Email validation** - Ensures valid email format
✅ **Honeypot field support** - Add 'website' field to catch spam bots
✅ **IP logging** - Records sender IP for security
✅ **CORS headers** - Proper content-type and security headers

---

## Optional Enhancements

### Add Spam Protection

Add a honeypot field to `contact.html` (invisible to users):

```html
<!-- Add inside the form, make it hidden with CSS -->
<input type="text" name="website" style="display:none;" tabindex="-1" autocomplete="off">
```

Bots will fill this field; legitimate users won't see it. Already handled in PHP!

### Add Email Notifications to Multiple Recipients

Edit `contact-form.php` line 18:

```php
$to_email = 'info@ezbelta.com, support@ezbelta.com, sales@ezbelta.com';
```

### Customize Email Subject Prefix

Edit `contact-form.php` line 20:

```php
$subject_prefix = '[Ezbelta Contact]'; // Change to your preference
```

### Add Auto-Reply to Sender

Add this code after the main mail() call in contact-form.php:

```php
// Send auto-reply to customer
$auto_reply_subject = "Thank you for contacting Ezbelta";
$auto_reply_body = "Dear $name,\n\nThank you for your message. We'll get back to you soon!\n\nBest regards,\nThe Ezbelta Team";
$auto_reply_headers = "From: $from_email\r\nReply-To: $to_email";
mail($email, $auto_reply_subject, $auto_reply_body, $auto_reply_headers);
```

---

## SiteGround Email Setup

If you haven't created SiteGround email accounts yet:

1. **Site Tools** → **Email** → **Accounts**
2. **Create these accounts:**
   - `info@ezbelta.com` - Main contact
   - `support@ezbelta.com` - Support inquiries
   - `noreply@ezbelta.com` - No-reply/automated emails
3. **Set up forwarding** if desired (forward to your main email)
4. **Configure email client** (Gmail, Outlook, etc.) or use webmail

---

## Testing Checklist

- [ ] Configured email addresses in contact-form.php
- [ ] Uploaded contact-form.php to public_html/
- [ ] Uploaded updated main.js to public_html/js/
- [ ] Set permissions on contact-form.php (644)
- [ ] Created noreply@ezbelta.com email account
- [ ] Tested PHP mail with test-email.php
- [ ] Submitted test form at ezbelta.com/contact.html
- [ ] Received test email in inbox
- [ ] Verified email format and content
- [ ] Deleted test-email.php file
- [ ] Form shows success message
- [ ] Form clears after submission

---

## Support

**If PHP mail doesn't work:**
1. Contact SiteGround support (24/7 chat)
2. Say: "PHP mail() function not working, need SMTP configuration"
3. They'll help configure PHPMailer or SMTP settings

**Alternative:** If SiteGround can't get mail() working, we can switch to:
- Formspree (5 minutes to set up)
- SendGrid API (requires API key)
- SMTP with PHPMailer (more complex)

---

## File Locations

**Local (Your Computer):**
```
ezbelta/public_html/
├── contact-form.php
├── contact.html
└── js/main.js
```

**SiteGround Server:**
```
public_html/
├── contact-form.php
├── contact.html
└── js/main.js
```

---

**Created:** January 2025  
**Status:** Ready to upload and test  
**Estimated Setup Time:** 15-30 minutes
