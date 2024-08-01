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
    $recipe_id = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $ingredients = $_POST['ingredients'];
    $steps = $_POST['steps'];

    $image = isset($_FILES['image']) ? $_FILES['image']['name'] : null;

    // Handle image upload
    if ($image) {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($image);
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to move uploaded file.']);
            exit;
        }
    }

    try {
        if ($image) {
            $stmt = $pdo->prepare("UPDATE recipes SET title = ?, description = ?, ingredients = ?, steps = ?, image = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$title, $description, $ingredients, $steps, $image, $recipe_id, $user_id]);
        } else {
            $stmt = $pdo->prepare("UPDATE recipes SET title = ?, description = ?, ingredients = ?, steps = ? WHERE id = ? AND user_id = ?");
            $stmt->execute([$title, $description, $ingredients, $steps, $recipe_id, $user_id]);
        }

        if ($stmt->rowCount() > 0) {
            $stmt = $pdo->prepare("SELECT * FROM recipes WHERE id = ?");
            $stmt->execute([$recipe_id]);
            $recipe = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode(['status' => 'success', 'recipe' => $recipe]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update recipe']);
        }
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Database error']);
    }
}
?>
