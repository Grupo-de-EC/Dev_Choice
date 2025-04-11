<?php
session_start();
$conn = new mysqli("localhost", "root", "", "devs_choice", 3307);

echo "adminLogin.php is working!";

// Check for DB connection error
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Look up admin user by email and role
$query = "SELECT * FROM users WHERE email = ? AND role = 'admin'";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if ($admin && $admin['password'] === $password) {
    // Login success
    $_SESSION['role'] = 'admin';
    $_SESSION['name'] = $admin['name'];

    // Redirect to admin area
    header("Location: admin.html"); // Change this to your actual admin page
    exit();
} else {
    // Login failed
    echo "Credenciais inválidas!";
}
?>
