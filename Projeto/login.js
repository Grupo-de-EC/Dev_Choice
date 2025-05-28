document.getElementById("loginForm").addEventListener("submit", function (e) {
  const nomeUsuario = document.getElementById("username").value.trim();
  if (nomeUsuario) {
    localStorage.setItem("nomeUsuario", nomeUsuario);
    window.location.href = "formulario.php";
  }
});
