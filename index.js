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
console.log("Nome recuperado do localStorage:", nome);
if (nome) {
  document.getElementById("boasVindas").textContent = `Bem-vindo, ${nome}!`;
}

  //Nome do projeto em cima da pagina do index
window.addEventListener("DOMContentLoaded", function () {
  const projeto = localStorage.getItem("tipoProjeto");
  if (projeto) {
    const boasVindas = document.getElementById("boasVindas");
    const spanProjeto = document.createElement("span");
    spanProjeto.textContent = projeto;
    spanProjeto.style.color = "#007bff";
    spanProjeto.style.fontWeight = "bold";
    spanProjeto.style.textTransform = "capitalize";

    const paragrafo = document.createElement("p");
    paragrafo.appendChild(spanProjeto);
    paragrafo.style.textAlign = "center";
    paragrafo.style.marginTop = "10px";
    paragrafo.style.fontSize = "2rem";
    paragrafo.style.fontWeight = "bold";
    paragrafo.style.fontFamily = "Arial, sans-serif";
    paragrafo.style.textShadow = "2px 2px 5px rgba(0, 123, 255, 0.5)";

    boasVindas.insertAdjacentElement("afterend", paragrafo);
  }
});
