<?php
/**
 * Ezbelta Contact Form Handler
 * Processes contact form submissions and sends emails
 */

// Security: Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Security: Set headers to prevent CORS issues
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// Configuration
$to_email = 'info@ezbelta.com'; // Change to your desired email
$from_email = 'noreply@ezbelta.com'; // Change to your domain email
$subject_prefix = '[Ezbelta Contact Form]';

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate required fields
if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'All required fields must be filled out.'
    ]);
    exit;
}

// Sanitize inputs
$name = strip_tags(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$company = isset($data['company']) ? strip_tags(trim($data['company'])) : '';
$subject = strip_tags(trim($data['subject']));
$message = strip_tags(trim($data['message']));

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

// Basic spam protection: honeypot field (add to form later if needed)
if (isset($data['website']) && !empty($data['website'])) {
    // This is a honeypot field - if filled, it's likely spam
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message!'
    ]);
    exit;
}

// Build email subject
$email_subject = $subject_prefix . ' ' . $subject;

// Build email body
$email_body = "New contact form submission from Ezbelta.com\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
if (!empty($company)) {
    $email_body .= "Company: $company\n";
}
$email_body .= "Subject: $subject\n";
$email_body .= "\nMessage:\n$message\n\n";
$email_body .= "---\n";
$email_body .= "Sent from: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "Time: " . date('Y-m-d H:i:s') . "\n";

// Build email headers
$headers = [];
$headers[] = "From: $from_email";
$headers[] = "Reply-To: $email";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// Send email
$mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try emailing us directly at info@ezbelta.com'
    ]);
}
?>
