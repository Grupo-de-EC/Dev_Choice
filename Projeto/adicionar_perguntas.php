<?php
require_once 'conexao.php';

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

        // Se for tipo seleção, adiciona as opções
        if ($tipo === 'selecao' && !empty($_POST['opcoes'])) {
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

        echo "Pergunta adicionada com sucesso!<br><a href='adicionar_pergunta.html'>Adicionar outra</a>";
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Método inválido.";
}
