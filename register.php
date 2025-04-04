<?php
session_start();

$host = "localhost";
$user = "root";
$password = "";
$database = "devs_choice"; 

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';

    if (empty($name)) {
        die("Nome é um requisito.");
    }


    $sql = "INSERT INTO users (name) VALUES (?)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("s", $name);

        if ($stmt->execute()) {
            header("Location: index.html");
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
