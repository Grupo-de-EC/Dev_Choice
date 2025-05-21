<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: adminLogin.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "devs_choice", 3307);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$mensagem = "";
$redirecionar = false;

$mensagem = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $novoNome = $_POST['nome'];
    $novoEmail = $_POST['email'];
    $emailAntigo = $_SESSION['email'];

    $stmt = $conn->prepare("UPDATE users SET name = ?, email = ? WHERE email = ?");
    $stmt->bind_param("sss", $novoNome, $novoEmail, $emailAntigo);

    if ($stmt->execute()) {
        $_SESSION['name'] = $novoNome;
        $_SESSION['email'] = $novoEmail;
        $mensagem = "Dados alterados com sucesso! Redirecionando...";
        $redirecionar = true;
    } else {
        $mensagem = "Erro ao atualizar: " . $conn->error;
    }
}

$nomeAtual = $_SESSION['name'];
$emailAtual = $_SESSION['email'];
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Editar Perfil</title>
    <link rel="stylesheet" href="editarPerfil.css">
</head>
<body>
<div class="form-container">
    <h2>Alterar Dados</h2>

    <?php if ($mensagem): ?>
        <p style="color: lime; font-weight: bold;"><?= $mensagem ?></p>
    <?php endif; ?>

    <form id="formAlteracao" method="POST" action="editarPerfil.php">
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome" value="<?= htmlspecialchars($nomeAtual) ?>" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" value="<?= htmlspecialchars($emailAtual) ?>" required>

        <button type="submit">Confirmar Troca</button>
    </form>
</div>
<?php if ($redirecionar): ?>
<script>
    setTimeout(() => {
        window.location.href = "admin.php";
    }, 3000); // 3 segundos
</script>
<?php endif; ?>

</body>
</html>
