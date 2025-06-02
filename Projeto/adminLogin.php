<?php
session_start();
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: admin.php");
    exit();
}

require_once 'conexao.php';

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

function exibirErroLogin() {
    ?>
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Erro no Login</title>
        <link rel="stylesheet" href="adminLogin.css"> 
    </head>
    <body>
     <div class="login-container">
        <h2>Erro no Login</h2>
        <div class="error-message">Usuário ou Senha Incorretos!</div>
        <a href="adminLogin.html" class="btn-voltar">Voltar ao Login</a>
     </div>
    </body>
    </html>
    <?php
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $query = "SELECT * FROM users WHERE email = ? AND role = 'admin'";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $admin = $result->fetch_assoc();

    if ($admin) {
        if (password_verify($password, $admin['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['role'] = 'admin';
            $_SESSION['name'] = $admin['name'];
            $_SESSION['email'] = $admin['email'];

            header("Location: admin.php");
            exit();
        } else {
            exibirErroLogin();
        }
    } else {
        exibirErroLogin();
    }
}
?>
