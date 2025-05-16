<?php
// Iniciar a sessão
session_start();

// Destruir todas as variáveis de sessão
session_unset();

// Destruir a sessão
session_destroy();

// Retorna um comando para o JavaScript
echo '<script type="text/javascript">
        window.close();
        window.location.href = "/Dev_Choice/Projeto/Login.html";
      </script>';
exit();
?>
