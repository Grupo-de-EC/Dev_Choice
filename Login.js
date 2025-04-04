document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();

  if (username) {
    localStorage.setItem("nomeUsuario", username);
  } else {
    alert("Por favor, insira seu nome.");
  }
});
