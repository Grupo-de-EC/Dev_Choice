<?php
// Código para processar o formulário
$conn = new mysqli("localhost", "root", "", "devs_choice");
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$usuario = $_POST['usuario'];
$respostas = $_POST['respostas']; // Respostas do questionário

// Salvar respostas no banco de dados (exemplo de código para salvar)
// Vamos assumir que você já tem lógica para salvar as respostas

foreach ($respostas as $pergunta_id => $resposta) {
    // Se for uma resposta única ou múltipla
    if (is_array($resposta)) {
        foreach ($resposta as $resposta_texto) {
            // Salve cada opção marcada no banco (por exemplo, para múltipla escolha)
            $stmt = $conn->prepare("INSERT INTO respostas (usuario, pergunta_id, resposta) VALUES (?, ?, ?)");
            $stmt->bind_param("sis", $usuario, $pergunta_id, $resposta_texto);
            $stmt->execute();
        }
    } else {
        // Para resposta de texto
        $stmt = $conn->prepare("INSERT INTO respostas (usuario, pergunta_id, resposta) VALUES (?, ?, ?)");
        $stmt->bind_param("sis", $usuario, $pergunta_id, $resposta);
        $stmt->execute();
    }
}

$conn->close();
exit();
?>
