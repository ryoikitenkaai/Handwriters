<?php
// Database configuration
$servername = "localhost";
$username = "handpubl_landing";
$password = "handwriterspublication";
$dbname = "handpubl_landing";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch submissions
$sql = "SELECT id, name, email, whatsapp, subject_area, indexing_preference, submission_date 
        FROM submissions ORDER BY submission_date DESC";
$result = $conn->query($sql);

$submissions = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $submissions[] = array(
            $row['id'],
            $row['name'],
            $row['email'],
            $row['whatsapp'],
            $row['subject_area'],
            $row['indexing_preference'],
            $row['submission_date']
        );
    }
}

// Return as JSON
header('Content-Type: application/json');
echo json_encode($submissions);

$conn->close();
?>