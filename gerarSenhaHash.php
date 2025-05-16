<?php
$conn = new mysqli("localhost", "root", "", "devs_choice", 3307);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Lista de admins com email e senha em texto puro
$admins = [
    ['email' => 'batatao@devschoice.com', 'senha' => 'pateta02'],
    ['email' => 'shinigami@devschoice.com', 'senha' => 'pateta01'],
    ['email' => 'fantasmaretro@devschoice.com', 'senha' => 'pateta03'],
];

$query = "UPDATE users SET password = ? WHERE email = ? AND role = 'admin'";
$stmt = $conn->prepare($query);

foreach ($admins as $admin) {
    $senha_hash = password_hash($admin['senha'], PASSWORD_DEFAULT);
    $stmt->bind_param("ss", $senha_hash, $admin['email']);
    if ($stmt->execute()) {
        echo "Senha de {$admin['email']} atualizada com sucesso!<br>";
    } else {
        echo "Erro ao atualizar {$admin['email']}: " . $stmt->error . "<br>";
    }
}

$stmt->close();
$conn->close();
?>
