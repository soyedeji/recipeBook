<?php
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    
    require 'config.php';

    $data = json_decode(file_get_contents("php://input"), true);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $data['username'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $role = $data['role'];

        $stmt = $pdo->prepare("INSERT INTO users (username, password, firstname, lastname, role) VALUES (?, ?, ?, ?, ?)");
        if ($stmt->execute([$username, $password, $firstname, $lastname, $role])) {
            echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User registration failed']);
        }
    }
?>
