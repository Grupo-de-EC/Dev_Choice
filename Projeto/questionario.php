<?php
$conn = new mysqli("localhost", "root", "", "devs_choice", 3307);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Busca todas perguntas com opções
$query = "SELECT * FROM perguntas";
$perguntas_result = $conn->query($query);

// Cria um array para armazenar perguntas e opções
$perguntas = [];

while ($pergunta = $perguntas_result->fetch_assoc()) {
    $pergunta_id = $pergunta['id'];
    $pergunta['opcoes'] = [];

    // Busca opções dessa pergunta
    $stmt = $conn->prepare("SELECT * FROM opcoes WHERE pergunta_id = ?");
    $stmt->bind_param("i", $pergunta_id);
    $stmt->execute();
    $opcoes_result = $stmt->get_result();
    
    while ($opcao = $opcoes_result->fetch_assoc()) {
        $pergunta['opcoes'][] = $opcao;
    }

    $perguntas[] = $pergunta;
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Questionário Dev's Choice</title>
    <link rel="stylesheet" href="questionario.css">
</head>
<body>
    <div class="form-container">
        <h2>Responda o Questionário</h2>

        <form action="salvar_respostas.php" method="POST">
            <label>Seu nome:</label><br>
            <input type="text" name="usuario" required><br><br>

            <?php foreach ($perguntas as $pergunta): ?>
                <div class="pergunta">
                    <label><?= htmlspecialchars($pergunta['texto']) ?></label><br>

                    <?php if ($pergunta['tipo'] === 'texto'): ?>
                        <input type="text" name="respostas[<?= $pergunta['id'] ?>]"><br><br>

                    <?php elseif ($pergunta['tipo'] === 'multipla_escolha'): ?>
                        <?php foreach ($pergunta['opcoes'] as $opcao): ?>
                            <input type="checkbox" name="respostas[<?= $pergunta['id'] ?>][]" value="<?= htmlspecialchars($opcao['texto']) ?>"> <?= htmlspecialchars($opcao['texto']) ?><br>
                        <?php endforeach; ?>
                        <br>

                    <?php elseif ($pergunta['tipo'] === 'unica_escolha'): ?>
                        <?php foreach ($pergunta['opcoes'] as $opcao): ?>
                            <input type="radio" name="respostas[<?= $pergunta['id'] ?>]" value="<?= htmlspecialchars($opcao['texto']) ?>"> <?= htmlspecialchars($opcao['texto']) ?><br>
                        <?php endforeach; ?>
                        <br>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>

            <button type="submit">Enviar Respostas</button>
        </form>
    </div>
</body>
</html>
