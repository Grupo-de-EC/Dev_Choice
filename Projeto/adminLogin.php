<?php
session_start();
$conn = new mysqli("localhost", "root", "", "devs_choice", 3307);

// Verifica se a conexão com o banco foi bem-sucedida
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Verifica se o formulário foi enviado via POST
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Consulta para verificar o usuário admin pelo email e role
$query = "SELECT * FROM users WHERE email = ? AND role = 'admin'";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if ($admin) {
    var_dump($admin); // Verifique os dados do admin
    if ($admin && password_verify($password, $admin['password'])) {
        // Usando password_verify para segurança
        $_SESSION['admin_logged_in'] = true; // Indica que o admin está logado
        $_SESSION['role'] = 'admin';
        $_SESSION['name'] = $admin['name'];

        // Redireciona para a página do admin
        header("Location: admin.php");
        exit();
    } else {
        // Se as credenciais estiverem incorretas
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}
?>
