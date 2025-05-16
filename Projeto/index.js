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

const apiKey =
  "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"; // Substitua pela sua chave do OpenRouter

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
          "HTTP-Referer": "http://localhost/Dev_Choice/index.html", // troque para seu site real
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

// Quando a página é carregada, verifica o localStorage e exibe os dados de boas-vindas
window.addEventListener("DOMContentLoaded", function () {
  const nome = localStorage.getItem("nomeUsuario");
  const nomeProjeto = localStorage.getItem("nomeProjeto"); // Agora vamos pegar o nome do projeto
  const projeto = localStorage.getItem("tipoProjeto");
  const boasVindas = document.getElementById("boasVindas");

  // Exibe as boas-vindas com o nome e o nome do projeto
  if (nome && nomeProjeto) {
    boasVindas.innerHTML = `Bem-vindo, ${nome}<br>Seu projeto é: ${nomeProjeto}!`;
  } else if (nome) {
    boasVindas.textContent = `Bem-vindo, ${nome}!`;
  } else if (nomeProjeto) {
    boasVindas.innerHTML = `Bem-vindo ao projeto <span>${nomeProjeto}</span>!`;
  }

  // Mensagem de boas-vindas da IA (opcional)
  addMessage(
    "Olá! 👋 Eu sou a Quantika, sua assistente virtual. Estou aqui para te ajudar com dúvidas sobre programação, ferramentas e desenvolvimento. Vamos começar?",
    "bot"
  );
});

// Função para adicionar a mensagem no chat
function addMessage(text, classe) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = classe;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


  // Verifica se existem dados do formulário
  const experiencia = localStorage.getItem("experienciaUsuario");
  const tipoProjeto = localStorage.getItem("tipoProjeto");
  const objetivo = localStorage.getItem("objetivoProjeto");

  if (experiencia && tipoProjeto && objetivo) {
    const mensagemInicial = `O usuario de nível ${experiencia} escolheu ${tipoProjeto} e ele quer que o site faça ${objetivo}.`;

    // Também envia para a IA
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
        "HTTP-Referer": "http://localhost/Dev_Choice/index.html",
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

    // Limpa os dados do localStorage para não enviar novamente ao atualizar
    localStorage.removeItem("experienciaUsuario");
    localStorage.removeItem("objetivoProjeto");
  }

