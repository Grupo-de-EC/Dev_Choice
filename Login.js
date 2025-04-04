document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  localStorage.setItem("nomeUsuario", username);
});

document.querySelector("button[type='button']").addEventListener("click", function () {
  const nomeUsuario = document.getElementById("username").value.trim();
  if (nomeUsuario) {
      localStorage.setItem("nomeUsuario", nomeUsuario);
      window.location.href = "Index.html";
  }
});
