<?php
session_start();
require_once 'conexao.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

    // Verificação do campo de nome
    if (empty($name)) {
        die("Nome é um requisito.");
    }

    // Verificação do reCAPTCHA
    $secretKey = '6LeRLU0rAAAAAKKTzKSpquP7ajiB6HEPG-XqE4k5'; // Substitua por sua chave secreta
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ],
    ];

    $context  = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    $captcha_success = json_decode($verify);

    if (!$captcha_success->success) {
        die("Falha na verificação do reCAPTCHA. Tente novamente.");
    }

    // Inserção no banco de dados
    $sql = "INSERT INTO users (name) VALUES (?)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("s", $name);

        if ($stmt->execute()) {
            header("Location: formulario.php");
            exit();
        } else {
            echo "Erro durante o registro: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Falhou: " . $conn->error;
    }

    $conn->close();
}
?>
