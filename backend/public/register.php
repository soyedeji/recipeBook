<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require 'config.php';

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($data['username']) ? sanitizeInput($data['username']) : null;
    $email = isset($data['email']) ? filter_var(sanitizeInput($data['email']), FILTER_VALIDATE_EMAIL) : null;
    $password = isset($data['password']) ? $data['password'] : null;
    $confirmPassword = isset($data['confirmPassword']) ? $data['confirmPassword'] : null;
    $firstname = isset($data['firstname']) ? sanitizeInput($data['firstname']) : null;
    $lastname = isset($data['lastname']) ? sanitizeInput($data['lastname']) : null;
    $role = isset($data['role']) ? sanitizeInput($data['role']) : 'foodie';

    if (!$username || !$email || !$password || !$confirmPassword || !$firstname || !$lastname || !$role) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }

    if ($password !== $confirmPassword) {
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match']);
        exit;
    }

    // hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, firstname, lastname, role) VALUES (?, ?, ?, ?, ?, ?)");
        if ($stmt->execute([$username, $email, $hashedPassword, $firstname, $lastname, $role])) {
            echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to register user']);
        }
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Database error']);
    }
}
?>
