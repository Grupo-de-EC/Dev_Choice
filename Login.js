document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita envio padrão

  const nomeUsuario = document.getElementById("username").value.trim();
  if (nomeUsuario) {
    localStorage.setItem("nomeUsuario", nomeUsuario);
    window.location.href = "Index.html";
  }
});
