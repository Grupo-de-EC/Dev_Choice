<?php
require_once 'conexao.php';
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
$comentario = isset($_POST['comentarios']) ? $conn->real_escape_string($_POST['comentarios']) : '';
$estrelas = isset($_POST['avaliacao']) ? (int)$_POST['avaliacao'] : 0;

if ($estrelas > 0) {
    $sql = "INSERT INTO feedbacks (comentario, estrelas) VALUES ('$comentario', $estrelas)";
    $conn->query($sql);
}

$conn->close();
header("Location: index.html");
exit();
?>
