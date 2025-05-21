<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: adminLogin.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil Forms</title>
    <link rel="stylesheet" href="editarPerfil.css">
</head>
<body>
<div class="form-container">
    <h2>Alterar Dados</h2>
    <form id="formAlteracao">
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome" placeholder="Digite seu nome" required>
        
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Digite seu email" required>
        
        <button type="submit">Confirmar Troca</button>
    </form>
</div>
<script src="editarPerfil.js"></script>
</body>
</html>