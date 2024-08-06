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

function isImage($file) {
    $imageMimes = ['image/jpeg', 'image/png', 'image/gif'];
    return in_array($file['type'], $imageMimes);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();

    if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'chef') {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $ingredients = $_POST['ingredients'];
    $steps = $_POST['steps'];

    $imageName = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
        if (isImage($_FILES['image'])) {
            $imageTmpPath = $_FILES['image']['tmp_name'];
            $imageName = uniqid() . '-' . $_FILES['image']['name'];
            $imagePath = __DIR__ . '/uploads/' . $imageName; // Correct path
            if (!move_uploaded_file($imageTmpPath, $imagePath)) {
                echo json_encode(['status' => 'error', 'message' => 'Failed to move uploaded file.']);
                exit;
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Uploaded file is not a valid image.']);
            exit;
        }
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO recipes (user_id, title, description, ingredients, steps, image) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$user_id, $title, $description, $ingredients, $steps, $imageName]);
        $newRecipeId = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE id = ?");
        $stmt->execute([$newRecipeId]);
        $newRecipe = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['status' => 'success', 'recipe' => $newRecipe]);
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
