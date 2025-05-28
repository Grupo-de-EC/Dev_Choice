<?php
require_once 'conexao.php';

$perguntas = [];
$sql = "SELECT p.id, p.texto AS pergunta_texto, p.tipo, o.id AS opcao_id, o.texto AS opcao_texto
        FROM perguntas p
        LEFT JOIN opcoes o ON p.id = o.pergunta_id
        ORDER BY p.id, o.id";
$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $pid = $row['id'];
        if (!isset($perguntas[$pid])) {
            $perguntas[$pid] = [
                'texto' => $row['pergunta_texto'],
                'tipo' => $row['tipo'],
                'opcoes' => []
            ];
        }
        if ($row['opcao_id']) {
            $perguntas[$pid]['opcoes'][$row['opcao_id']] = $row['opcao_texto'];
        }
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Formulário Dinâmico</title>
  <link rel="stylesheet" href="formulario1.css" />
</head>
<body>
  <div class="form-container">
    <h2>Responda o formulário abaixo</h2>
    <form id="devForm" method="POST" action="salvar_respostas.php">
      <?php foreach ($perguntas as $pid => $pergunta): ?>
        <fieldset>
          <legend><?= htmlspecialchars($pergunta['texto']) ?></legend>

          <?php if ($pergunta['tipo'] === 'texto'): ?>
            <input type="text" name="resposta[<?= $pid ?>]" required>
          
          <?php elseif ($pergunta['tipo'] === 'unica_escolha'): ?>
            <div class="options-container">
              <?php foreach ($pergunta['opcoes'] as $oid => $opcao): ?>
                <label class="option-label">
                  <input type="radio" name="resposta[<?= $pid ?>]" value="<?= htmlspecialchars($oid) ?>" required>
                  <?= htmlspecialchars($opcao) ?>
                </label>
              <?php endforeach; ?>
            </div>

          <?php elseif ($pergunta['tipo'] === 'multipla_escolha'): ?>
            <div class="options-container">
              <?php foreach ($pergunta['opcoes'] as $oid => $opcao): ?>
                <label class="option-label">
                  <input type="checkbox" name="resposta[<?= $pid ?>][]" value="<?= htmlspecialchars($oid) ?>">
                  <?= htmlspecialchars($opcao) ?>
                </label>
              <?php endforeach; ?>
            </div>

          <?php else: ?>
            <p>Tipo de pergunta não suportado.</p>
          <?php endif; ?>
        </fieldset>
      <?php endforeach; ?>
      <button type="submit">Enviar</button>
    </form>
  </div>
<script src="formulario.js"></script>
</body>
</html>
