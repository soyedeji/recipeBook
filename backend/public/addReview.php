<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();

    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $data = json_decode(file_get_contents("php://input"), true);
    $recipe_id = $data['recipeId'];
    $comment = $data['comment'];

    try {
        $stmt = $pdo->prepare("INSERT INTO reviews (recipe_id, user_id, comment) VALUES (?, ?, ?)");
        $stmt->execute([$recipe_id, $user_id, $comment]);

        $review_id = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT reviews.*, users.username FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviewID = ?");
        $stmt->execute([$review_id]);
        $review = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['status' => 'success', 'review' => $review]);
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
