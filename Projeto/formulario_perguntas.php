<?php
require_once 'conexao.php';

$sql = "SELECT p.id AS pergunta_id, p.texto AS pergunta_texto, p.tipo, o.id AS opcao_id, o.texto AS opcao_texto
        FROM perguntas p
        LEFT JOIN opcoes o ON p.id = o.pergunta_id
        ORDER BY p.id, o.id";

$result = $conn->query($sql);

$perguntas = [];

while ($row = $result->fetch_assoc()) {
    $id = $row['pergunta_id'];

    if (!isset($perguntas[$id])) {
        $perguntas[$id] = [
            'id' => $id,
            'texto' => $row['pergunta_texto'],
            'tipo' => $row['tipo'],
            'opcoes' => []
        ];
    }

    if ($row['opcao_id']) {
        $perguntas[$id]['opcoes'][] = [
            'id' => $row['opcao_id'],
            'texto' => $row['opcao_texto']
        ];
    }
}

header('Content-Type: application/json');
echo json_encode(array_values($perguntas));
