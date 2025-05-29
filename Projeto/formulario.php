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

// Mapeamento de IDs das opções da pergunta 2 para nomes de kits
$mapa_opcoes_pergunta2 = [
  1 => 'web',
  2 => 'mobile',
  3 => 'desktop',
  4 => 'iot',
  5 => 'jogo',
  6 => 'analise',
  7 => 'outros'
];


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
    <form id="devForm">
      <?php foreach ($perguntas as $pid => $pergunta): ?>
        <fieldset>
          <legend><?= htmlspecialchars($pergunta['texto']) ?></legend>

          <?php if ($pergunta['tipo'] === 'texto'): ?>
            <input type="text" name="resposta[<?= $pid ?>]" required>
          
          <?php elseif ($pergunta['tipo'] === 'unica_escolha'): ?>
            <div class="options-container">
              <?php foreach ($pergunta['opcoes'] as $oid => $opcao): ?>
                <label class="option-label">
                <?php $inputName = ($pid == 2) ? 'web' : $pid;
                ?>
                <input type="radio" name="resposta[<?= $inputName ?>]" value="<?= htmlspecialchars($opcao) ?>" required>

                  <?= htmlspecialchars($opcao) ?>
                </label>
              <?php endforeach; ?>
            </div>

          <?php elseif ($pergunta['tipo'] === 'multipla_escolha'): ?>
            <div class="options-container">
              <?php foreach ($pergunta['opcoes'] as $oid => $opcao): ?>
                <label class="option-label">
                  <input type="checkbox" name="resposta[<?= $pid ?>][]" value="<?= htmlspecialchars($opcao) ?>">
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

<script>
  document.getElementById('devForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const respostas = {};
    const form = e.target;

    for (const fieldset of form.querySelectorAll('fieldset')) {
      const legend = fieldset.querySelector('legend').innerText;
      const inputs = fieldset.querySelectorAll('input');
      let respostaPergunta = null;

      if (inputs[0].type === 'text') {
        const val = inputs[0].value.trim();
        if (!val) {
          alert(`Por favor, responda a pergunta: "${legend}"`);
          return;
        }
        respostaPergunta = val;

      } else if (inputs[0].type === 'radio') {
        respostaPergunta = null;
        inputs.forEach(input => {
          if(input.checked) respostaPergunta = input.value;
        });
        if (!respostaPergunta) {
          alert(`Por favor, responda a pergunta: "${legend}"`);
          return;
        }

      } else if (inputs[0].type === 'checkbox') {
        respostaPergunta = [];
        inputs.forEach(input => {
          if(input.checked) respostaPergunta.push(input.value);
        });
        if (respostaPergunta.length === 0) {
          alert(`Por favor, responda a pergunta: "${legend}"`);
          return;
        }
      }

      respostas[legend] = respostaPergunta;
    }
    const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Anônimo';
    localStorage.setItem('respostas_' + nomeUsuario, JSON.stringify(respostas));
    
    alert('Respostas salvas localmente!');
    window.location.href = 'index.php';
  });
</script>
</body>
</html>
