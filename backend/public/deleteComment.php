<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['role']) && $_SESSION['role'] === 'chef') {
        $commentID = $data['commentID'];

        $stmt = $pdo->prepare("DELETE FROM reviews WHERE reviewID = ?");
        if ($stmt->execute([$commentID])) {
            echo json_encode(['status' => 'success', 'message' => 'Comment deleted successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete comment']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    }
}
?>
