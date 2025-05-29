<?php
session_start();
require_once 'conexao.php';

// Verificar conexão com o banco de dados
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

    // Verificação do campo nome
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

    // Tentar com cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Ignorar validação SSL

    $verify = curl_exec($ch);

    if ($verify === false) {
        die("Erro ao acessar a API do reCAPTCHA: " . curl_error($ch));
    }

    curl_close($ch);


    $captcha_success = json_decode($verify);

    if (!$captcha_success || !$captcha_success->success) {
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
        echo "Erro na preparação da query: " . $conn->error;
    }

    $conn->close();
}
?>