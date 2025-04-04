document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  localStorage.setItem("nomeUsuario", username);
});
