<?php

ini_set('display_errors', 0);
error_reporting(0);

session_name('BOOKMARTSESSION');

session_set_cookie_params([
    'lifetime' => 86400,
    'path' => '/',
    'domain' => 'localhost',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
include "db.php";

$google_volume_id = $_GET['google_volume_id'];

if (empty($_GET['google_volume_id'])) {
    echo json_encode(["status" => "error", "message" => "Missing book ID"]);
    exit;
}

$reviews = [];
$total = 0;
$breakdown = ["1" => 0, "2" => 0, "3" => 0, "4" => 0, "5" => 0];

$stmt = $con->prepare("SELECT reviews.*, users.username FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.google_volume_id = ?");
$stmt->bind_param('s', $google_volume_id);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $total += 1;
        $breakdown[$row['rating']] += 1;

        $reviews[] = [
            "username" => $row['username'],
            "rating" => $row['rating'],
            "title" => $row['title'],
            "body" => $row['body'],
            "date" => $row['created_at'],
        ];
    }

    $average = $total > 0 ? array_sum(array_column($reviews, 'rating')) / $total : 0;

} else {
    echo json_encode([
        "status" => "success",
        "message" => "No reviews found"
    ]);
    exit;
}

echo json_encode([
    "status" => "success",
    "summary" => [
        "average" => round($average, 1),
        "total" => $total,
        "breakdown" => $breakdown
    ],
    "reviews" => $reviews
]);
exit;

?>