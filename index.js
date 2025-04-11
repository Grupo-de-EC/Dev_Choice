function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (text !== "") {
    const messagesDiv = document.getElementById("messages");
    const msg = document.createElement("div");
    msg.className = "message";
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    input.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

document.getElementById("contrasteBtn").addEventListener("click", () => {
  // Ativa/desativa a classe de alto contraste no body e nos elementos específicos
  document.body.classList.toggle("alto-contraste");
  document.querySelector(".navbar").classList.toggle("alto-contraste");
  document.querySelector(".btn-contrast").classList.toggle("alto-contraste");
  document.querySelector("footer").classList.toggle("alto-contraste");
  document.querySelector("#input-area").classList.toggle("alto-contraste");
});

window.addEventListener("DOMContentLoaded", function () {
  const nome = localStorage.getItem("nomeUsuario");
  const projeto = localStorage.getItem("tipoProjeto");

  const boasVindas = document.getElementById("boasVindas");

  if (nome && projeto) {
    boasVindas.innerHTML = `Bem-vindo, ${nome},${projeto}!`;
  } else if (nome) {
    boasVindas.textContent = `Bem-vindo, ${nome}!`;
  } else if (projeto) {
    boasVindas.textContent = `Bem-vindo ao projeto ${projeto}!`;
  }
});

