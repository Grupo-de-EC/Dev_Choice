<?php
require_once 'conexao.php';

$redirecionar = false;
$mensagem = '';

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comentario = isset($_POST['comentarios']) ? $conn->real_escape_string($_POST['comentarios']) : '';
    $estrelas = isset($_POST['avaliacao']) ? (int)$_POST['avaliacao'] : 0;

    if ($estrelas > 0) {
        $sql = "INSERT INTO feedbacks (comentario, estrelas) VALUES ('$comentario', $estrelas)";
        if ($conn->query($sql) === TRUE) {
            $mensagem = "Enviado com sucesso! Você será redirecionado em 3 segundos...";
            $redirecionar = true;
        } else {
            $mensagem = "Erro ao salvar feedback: " . $conn->error;
        }
    } else {
        $mensagem = "Por favor, selecione uma avaliação (estrelas).";
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Feedback</title>
    <link rel="stylesheet" href="questionarioSatisfacao.css" />
</head>
<body>
    <div class="form-container">
        <h2>Feedback sobre o site</h2>
        
        <?php if ($mensagem): ?>
            <p style="color: green; font-weight: bold;"><?php echo $mensagem; ?></p>
        <?php endif; ?>

        <?php if (!$redirecionar): ?>
            <form action="" method="POST">
                <label for="comentarios">O que você achou do nosso site?</label>
                <textarea id="comentarios" name="comentarios" rows="4" placeholder="Digite seus comentários..."></textarea>
                
                <div class="stars" id="starRating">
                    <input type="radio" id="estrela5" name="avaliacao" value="1">
                    <label for="estrela5" data-value="1">⭐</label>
                    <input type="radio" id="estrela4" name="avaliacao" value="2">
                    <label for="estrela4" data-value="2">⭐</label>
                    <input type="radio" id="estrela3" name="avaliacao" value="3">
                    <label for="estrela3" data-value="3">⭐</label>
                    <input type="radio" id="estrela2" name="avaliacao" value="4">
                    <label for="estrela2" data-value="4">⭐</label>
                    <input type="radio" id="estrela1" name="avaliacao" value="5">
                    <label for="estrela1" data-value="5">⭐</label>
                </div>

                <button type="submit">Enviar Feedback</button>
            </form>
        <?php endif; ?>
    </div>

    <?php if ($redirecionar): ?>
        <script>
            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
        </script>
    <?php endif; ?>

    <script src="questionarioSatisfacao.js"></script>
</body>
</html>