<?php
function conecta_servidor() {
    $db_name = "devs_choice";
    $user = "root";
    $pass = "";
    $server = "localhost";

    $conn = mysqli_connect($server, $user, $pass, $db_name, 3307);

    if (!$conn) {
        die("Conexão falhou: " . mysqli_connect_error());
    }

    error_log("Conexão bem-sucedida!");
    return $conn;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste de Conexão</title>
</head>
<body>
    <h1>Conexão com o banco de dados</h1>
    <p>Conexão bem-sucedida com o banco de dados!</p>
</body>
</html>
