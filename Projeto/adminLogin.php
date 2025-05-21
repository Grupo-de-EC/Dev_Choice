<?php
session_start();
$conn = new mysqli("localhost", "root", "", "devs_choice", 3307);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$query = "SELECT * FROM users WHERE email = ? AND role = 'admin'";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if ($admin) {
    var_dump($admin); 
    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['role'] = 'admin';
        $_SESSION['name'] = $admin['name'];
        $_SESSION['email'] = $admin['email'];

        header("Location: admin.php");
        exit();
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}
?>
