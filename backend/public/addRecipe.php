<?php
// Enable error reporting
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/php-error.log'); // Change this to a valid path

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();

    // Log session data
    error_log("Session Data: " . print_r($_SESSION, true)); 

    if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'chef') {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $title = $data['title'];
    $description = $data['description'];
    $ingredients = $data['ingredients'];
    $steps = $data['steps'];
    $image = $data['image'];

    // Log incoming data
    error_log("Recipe Data: " . print_r($data, true)); 

    try {
        $stmt = $pdo->prepare("INSERT INTO recipes (user_id, title, description, ingredients, steps, image) VALUES (?, ?, ?, ?, ?, ?)");
        if ($stmt->execute([$user_id, $title, $description, $ingredients, $steps, $image])) {
            echo json_encode(['status' => 'success', 'message' => 'Recipe added successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add recipe']);
        }
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
