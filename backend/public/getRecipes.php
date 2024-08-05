<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true'); // Add this line

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require 'config.php';

$search = isset($_GET['search']) ? $_GET['search'] : '';

try {
    $stmt = $pdo->prepare("SELECT * FROM recipes WHERE title LIKE ? OR description LIKE ? OR ingredients LIKE ? OR steps LIKE ?");
    $searchParam = "%$search%";
    $stmt->execute([$searchParam, $searchParam, $searchParam, $searchParam]);
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['status' => 'success', 'recipes' => $recipes]);
} catch (PDOException $e) {
    error_log($e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}
?>
