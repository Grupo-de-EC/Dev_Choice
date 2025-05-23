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
document
  .getElementById("user-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

document.getElementById("contrasteBtn").addEventListener("click", () => {
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

//Botão Tela Cheia Do Chat

document.getElementById("fullscreenBtn").addEventListener("click", () => {
  const chatContainer = document.getElementById("chat-container");
  
  if (!document.fullscreenElement) {
    chatContainer.requestFullscreen().catch(err => {
      console.error(`Erro ao ativar tela cheia: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

//Chat da IA

const apiKey ="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"; // Substitua pela sua chave do OpenRouter

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("Você: " + message, "user");
  input.value = "";

  try {
    const resposta = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
          "HTTP-Referer": "http://localhost/Devs_Choice/Projeto/index.html",
          "X-Title": "Dev's Choice",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    const dados = await resposta.json();
    const respostaIA = dados.choices[0].message.content;
    addMessage("Quantika: " + respostaIA, "bot");
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

window.addEventListener("DOMContentLoaded", function () {
  const nome = localStorage.getItem("nomeUsuario");
  const nomeProjeto = localStorage.getItem("nomeProjeto");
  const projeto = localStorage.getItem("tipoProjeto");
  const boasVindas = document.getElementById("boasVindas");

  if (nome && nomeProjeto) {
    boasVindas.innerHTML = `Bem-vindo, ${nome}<br>Seu projeto é: ${nomeProjeto}!`;
  } else if (nome) {
    boasVindas.textContent = `Bem-vindo, ${nome}!`;
  } else if (nomeProjeto) {
    boasVindas.innerHTML = `Bem-vindo ao projeto <span>${nomeProjeto}</span>!`;
  }

  addMessage(
    "Olá! 👋 Eu sou a Quantika, sua assistente virtual. Estou aqui para te ajudar com dúvidas sobre programação, nesse exato momento estou analisando seu formulário, então peço que aguarde um pouco.",
    "bot"
  );
});

function addMessage(text, classe) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = classe;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

  const experiencia = localStorage.getItem("experienciaUsuario");
  const tipoProjeto = localStorage.getItem("tipoProjeto");
  const objetivo = localStorage.getItem("objetivoProjeto");

  if (experiencia && tipoProjeto && objetivo) {
    const mensagemInicial = `O usuario de nível ${experiencia} escolheu ${tipoProjeto} e ele quer que o site faça ${objetivo}.`;

    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
        "HTTP-Referer": "http://localhost/Devs_Choice/Projeto/index.html",
        "X-Title": "Dev's Choice",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: mensagemInicial }],
      }),
    })
    .then((res) => res.json())
    .then((dados) => {
      const respostaIA = dados.choices[0].message.content;
      addMessage("Quantika: " + respostaIA, "bot");
    })
    .catch((err) => {
      addMessage("Erro ao conectar com a IA.", "bot");
      console.error(err);
    });

    localStorage.removeItem("experienciaUsuario");
    localStorage.removeItem("objetivoProjeto");
  }

  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
    alert("Não é possível voltar para a página anterior. Faça login novamente.");
  };
