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

const nome = localStorage.getItem("nomeUsuario");
if (nome) {
  document.getElementById("boasVindas").textContent = `Bem-vindo, ${nome}!`;
}
