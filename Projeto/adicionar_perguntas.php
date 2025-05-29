<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: adminLogin.php");
    exit();
}

require_once 'conexao.php';

$mensagem = "";
$redirecionar = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $texto = trim($_POST['texto'] ?? '');
    $tipo = $_POST['tipo'] ?? '';

    if (empty($texto) || empty($tipo)) {
        die("Todos os campos são obrigatórios.");
    }

    $stmt = $conn->prepare("INSERT INTO perguntas (texto, tipo) VALUES (?, ?)");
    $stmt->bind_param("ss", $texto, $tipo);

    if ($stmt->execute()) {
        $pergunta_id = $stmt->insert_id;

        if (in_array($tipo, ['multipla_escolha', 'unica_escolha']) && !empty($_POST['opcoes'])) {
            $opcoes = explode("\n", trim($_POST['opcoes']));
            $stmt_opcao = $conn->prepare("INSERT INTO opcoes (pergunta_id, texto) VALUES (?, ?)");

            foreach ($opcoes as $opcao) {
                $opcao = trim($opcao);
                if ($opcao !== '') {
                    $stmt_opcao->bind_param("is", $pergunta_id, $opcao);
                    $stmt_opcao->execute();
                }
            }
            $stmt_opcao->close();
        }

    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
    $mensagem = "Dados alterados com sucesso! Redirecionando...";
    $redirecionar = true;
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Adicionar Pergunta</title>
  <link rel="stylesheet" href="adicionar-perguntas.css">
</head>
<body>
  <div class="form-container">
    <h1>Adicionar Nova Pergunta</h1>
    <?php if ($mensagem): ?>
        <p style="color: lime; font-weight: bold;"><?= $mensagem ?></p>
    <?php endif; ?>

    <form method="POST" action="">
      <label for="texto">Texto da pergunta:</label>
      <input type="text" name="texto" id="texto" required>

      <label for="tipo">Tipo da pergunta:</label>
      <select name="tipo" id="tipo" required onchange="toggleOpcoes(this.value)">
        <option value="" disabled selected hidden>Selecione...</option>
        <option value="texto">Resposta livre</option>
        <option value="multipla_escolha">Seleção (múltipla escolha)</option>
        <option value="unica_escolha">Seleção (única escolha)</option>
      </select>


      <div id="opcoes-container" style="display: none;">
        <label>Opções (uma por linha):</label>
        <textarea name="opcoes" rows="5" placeholder="Digite cada opção em uma linha"></textarea>
      </div>

      <button type="submit">Salvar Pergunta</button>
    </form>
  </div>

  <script>
    function toggleOpcoes(tipo) {
        const tiposComOpcoes = ['multipla_escolha', 'unica_escolha'];
        document.getElementById('opcoes-container').style.display = tiposComOpcoes.includes(tipo) ? 'block' : 'none';
    }
  </script>

    <?php if ($redirecionar): ?>
        <script>
            setTimeout(() => {
                window.location.href = "admin.php";
            }, 3000); // 3 segundos
        </script>
    <?php endif; ?>
</body>
</html>