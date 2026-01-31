<?php
// Database configuration - UPDATE THESE WITH YOUR ACTUAL CREDENTIALS
$servername = "localhost";
$username = "handpubl_landing";     // Replace with your MySQL username
$password = "handwriterspublication";     // Replace with your MySQL password
$dbname = "handpubl_landing";           // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data and sanitize it
$name = $conn->real_escape_string($_POST['name']);
$email = $conn->real_escape_string($_POST['email']);
$whatsapp = $conn->real_escape_string($_POST['whatsapp']);
$subject_area = $conn->real_escape_string($_POST['subject']);
$indexing_preference = $conn->real_escape_string($_POST['indexing']);
$additional_info = $conn->real_escape_string($_POST['message']);

// Validate WhatsApp number (10 digits)
if (!preg_match('/^\d{10}$/', $whatsapp)) {
    echo "<script>alert('Invalid WhatsApp number. Please enter exactly 10 digits.'); window.history.back();</script>";
    exit();
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Invalid email format.'); window.history.back();</script>";
    exit();
}

// Insert data into database
$sql = "INSERT INTO submissions (name, email, whatsapp, subject_area, indexing_preference, additional_info)
        VALUES ('$name', '$email', '$whatsapp', '$subject_area', '$indexing_preference', '$additional_info')";

if ($conn->query($sql) === TRUE) {
    // Success - show alert and redirect back to form
    echo "<script>
        alert('Thank you! Your response has been recorded successfully.');
        window.location.href = 'index.html'; // Redirect to your form page
    </script>";
} else {
    echo "<script>alert('Error: Could not save your data. Please try again.'); window.history.back();</script>";
}

$conn->close();
?>