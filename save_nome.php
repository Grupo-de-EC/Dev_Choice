<?php
ob_start(); // Prevents header() issues
include('Conexao.php');

// Debugging: Check if PHP runs
echo "Script is running...<br>";

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "POST request received.<br>";

    // Debug: Show form data
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";

    // Get username
    $username = trim($_POST['username']);

    if (!empty($username)) {
        echo "Received username: $username <br>";  // Debug message

        $conn = conecta_servidor();

        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO usuarios (nome) VALUES (?)");

        if ($stmt === false) {
            die("SQL Preparation Error: " . $conn->error);
        }

        $stmt->bind_param("s", $username);

        if ($stmt->execute()) {
            echo "Usuário salvo com sucesso! <br>";

            // ✅ JavaScript redirect instead of header()
            echo "<script>window.location.href='index.html';</script>";
            exit();
        } else {
            die("SQL Execution Error: " . $stmt->error);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo "Nome de usuário não pode estar vazio.<br>";
    }
}
?>
