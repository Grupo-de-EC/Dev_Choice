// Função que pega o que o usuário digitou e mostra na tela após o clique no botão
function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim(); // Remove espaços extras

  if (text !== "") {
    // Pega a área onde as mensagens são mostradas
    const messagesDiv = document.getElementById("messages");
    const msg = document.createElement("div");
    msg.className = "message"; // Define a classe para o CSS
    msg.textContent = text; // Coloca o texto na div
    messagesDiv.appendChild(msg);
    input.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}
document.getElementById("contrasteBtn").addEventListener("click", function () {
  // Altera a classe do body para ativar ou desativar o contraste
  document.body.classList.toggle("alto-contraste");
});
