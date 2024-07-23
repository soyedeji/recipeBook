<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $data['id'];

    $stmt = $pdo->prepare("DELETE FROM recipes WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(['status' => 'success', 'message' => 'Recipe deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete recipe']);
    }
}
?>
