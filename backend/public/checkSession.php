<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'success', 'user' => ['id' => $_SESSION['user_id'], 'role' => $_SESSION['role']]]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No active session']);
}
?>
