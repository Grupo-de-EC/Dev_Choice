<?php
session_start();

$db_name = "devs_choice";
    $user = "root";
    $pass = "";
    $server = "localhost";

    $conn = mysqli_connect($server, $user, $pass, $db_name, 3307);

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
            header("Location: formulario.html");
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
