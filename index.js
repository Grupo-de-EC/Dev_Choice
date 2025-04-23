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
document.getElementById("user-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); //Evita comportamento padrão como quebrar linha
    sendMessage(); //Chama a função
  }
});

document.getElementById("contrasteBtn").addEventListener("click", () => {
  //Ativa/desativa a classe de alto contraste no body e nos elementos específicos
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
    boasVindas.innerHTML = `Bem-vindo, ${nome}<br>Seu projeto é: ${projeto}!`;
  } else if (nome) {
    boasVindas.textContent = `Bem-vindo, ${nome}!`;
  } else if (projeto) {
    boasVindas.innerHTML = `Bem-vindo ao projeto <span>${projeto}</span>!`;
  }
});

//Chat da IA
const apiKey = "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"; // Substitua pela sua chave do OpenRouter

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("Você: " + message, "user");
  input.value = "";

  try {
    const resposta = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
        "HTTP-Referer": "http://localhost/Dev_Choice/index.html", // troque para seu site real
        "X-Title": "Dev's Choice"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const dados = await resposta.json();
    const respostaIA = dados.choices[0].message.content;
    addMessage("IA: " + respostaIA, "bot");

  } catch (error) {
    addMessage("Erro ao conectar com a IA.", "bot");
    console.error(error);
  }
}

function addMessage(text, classe) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = classe;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
