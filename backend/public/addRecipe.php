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
    $user_id = $data['user_id'];
    $title = $data['title'];
    $description = $data['description'];
    $ingredients = $data['ingredients'];
    $steps = $data['steps'];
    $image = $data['image'];

    $stmt = $pdo->prepare("INSERT INTO recipes (user_id, title, description, ingredients, steps, image) VALUES (?, ?, ?, ?, ?, ?)");
    if ($stmt->execute([$user_id, $title, $description, $ingredients, $steps, $image])) {
        echo json_encode(['status' => 'success', 'message' => 'Recipe added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add recipe']);
    }
}
?>
