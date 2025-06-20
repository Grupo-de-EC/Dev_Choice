<?php
session_start();
require_once 'conexao.php';

$name = $_POST['name'];

$query = "SELECT * FROM users WHERE name=? AND role='user'";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $name);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    $_SESSION['role'] = 'user';
    $_SESSION['name'] = $user['name'];
    echo "Login efetuado com sucesso! Bem vindo, " . htmlspecialchars($user['name']);
} else {
    echo "Usuário não encontrado!";
}
?>
