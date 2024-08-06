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
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 8;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

try {
    $stmt = $pdo->prepare("SELECT * FROM recipes WHERE title LIKE ? OR description LIKE ? OR ingredients LIKE ? OR steps LIKE ? LIMIT ? OFFSET ?");
    $searchParam = "%$search%";
    $stmt->bindParam(1, $searchParam);
    $stmt->bindParam(2, $searchParam);
    $stmt->bindParam(3, $searchParam);
    $stmt->bindParam(4, $searchParam);
    $stmt->bindParam(5, $limit, PDO::PARAM_INT);
    $stmt->bindParam(6, $offset, PDO::PARAM_INT);
    $stmt->execute();
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM recipes WHERE title LIKE ? OR description LIKE ? OR ingredients LIKE ? OR steps LIKE ?");
    $countStmt->bindParam(1, $searchParam);
    $countStmt->bindParam(2, $searchParam);
    $countStmt->bindParam(3, $searchParam);
    $countStmt->bindParam(4, $searchParam);
    $countStmt->execute();
    $total = $countStmt->fetchColumn();

    echo json_encode([
        'status' => 'success',
        'recipes' => $recipes,
        'total' => $total,
        'page' => $page,
        'pages' => ceil($total / $limit),
    ]);
} catch (PDOException $e) {
    error_log($e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}
?>
