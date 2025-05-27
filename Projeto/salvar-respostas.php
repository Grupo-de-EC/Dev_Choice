<?php
require_once 'conexao.php';
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$usuario = $_POST['usuario'];
$respostas = $_POST['respostas']; 

foreach ($respostas as $pergunta_id => $resposta) {
    if (is_array($resposta)) {
        foreach ($resposta as $resposta_texto) {
            $stmt = $conn->prepare("INSERT INTO respostas (usuario, pergunta_id, resposta) VALUES (?, ?, ?)");
            $stmt->bind_param("sis", $usuario, $pergunta_id, $resposta_texto);
            $stmt->execute();
        }
    } else {
        $stmt = $conn->prepare("INSERT INTO respostas (usuario, pergunta_id, resposta) VALUES (?, ?, ?)");
        $stmt->bind_param("sis", $usuario, $pergunta_id, $resposta);
        $stmt->execute();
    }
}
$conn->close();
exit();
?>