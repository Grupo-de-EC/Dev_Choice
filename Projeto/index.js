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

  // Adiciona o indicador de "Digitando..."
  const messagesDiv = document.getElementById("messages");
  const typingDiv = document.createElement("div");
  typingDiv.className = "bot";
  typingDiv.id = "typingIndicator";
  typingDiv.textContent = "Quantika está pensando...";
  messagesDiv.appendChild(typingDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

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

    // Remove o "Digitando..."
    typingDiv.remove();

    // Mostra a resposta da Quantika com animação gradual e formatação
    addMessageGradualmente("Quantika: " + respostaIA, "bot");

  } catch (error) {
    typingDiv.remove(); // Remove mesmo que dê erro
    addMessage("Erro ao conectar com a IA.", "bot");
    console.error(error);
  }
}

function addMessageGradualmente(text, classe) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = classe;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Formatar texto: quebra de linha e listas
  const formattedText = text
    .replace(/\n/g, '<br>')                 // Quebra de linha
    .replace(/(\d+)\.\s/g, '<br>$1. ')     // Lista numerada
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')// Negrito (opcional)
    .replace(/\*(.*?)\*/g, '<i>$1</i>');   // Itálico (opcional)

  let i = 0;
  const interval = setInterval(() => {
    div.innerHTML += formattedText.charAt(i);
    i++;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    if (i >= formattedText.length) clearInterval(interval);
  }, 20); // 20ms por letra
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

  // Formatar texto: quebra de linha e listas
  const formattedText = text
    .replace(/\n/g, '<br>')                 // Quebra de linha
    .replace(/(\d+)\.\s/g, '<br>$1. ')     // Lista numerada
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')// Negrito (opcional)
    .replace(/\*(.*?)\*/g, '<i>$1</i>');   // Itálico (opcional)

  div.innerHTML = formattedText;
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

  async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;
  
    addMessage("Você: " + message, "user");
    input.value = "";
  
    // Adiciona o indicador de "Digitando..."
    const messagesDiv = document.getElementById("messages");
    const typingDiv = document.createElement("div");
    typingDiv.className = "bot";
    typingDiv.id = "typingIndicator";
    typingDiv.textContent = "Quantika está pensando...";
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
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
  
      // Remove o "Digitando..." antes de mostrar a resposta
      typingDiv.remove();
  
      // Mostra a resposta da Quantika com animação gradual
      addMessageGradualmente("Quantika: " + respostaIA, "bot");
  
    } catch (error) {
      typingDiv.remove(); // Remove mesmo que dê erro
      addMessage("Erro ao conectar com a IA.", "bot");
      console.error(error);
    }
  }


//Kit

window.addEventListener('DOMContentLoaded', () => {
  const tipo = localStorage.getItem('tipoProjeto');
  const miniMessages = document.getElementById('mini-messages');

  const kits = {
    web: [
      { nome: 'HTML', link: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML', icone: '/Devs_Choice/imagens/html.png' },
      { nome: 'CSS', link: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS', icone: '/Devs_Choice/imagens/css.png' },
      { nome: 'JavaScript', link: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript', icone: '/Devs_Choice/imagens/js.png' },
      { nome: 'React', link: 'https://reactjs.org/', icone: '/Devs_Choice/imagens/react.png' },
      { nome: 'Node.js', link: 'https://nodejs.org/en/', icone: '/Devs_Choice/imagens/node.png' }
    ],
    mobile: [
      { nome: 'React Native', link: 'https://reactnative.dev/', icone: '/Devs_Choice/imagens/react.png' },
      { nome: 'Flutter', link: 'https://flutter.dev/', icone: '/Devs_Choice/imagens/flutter.png' },
      { nome: 'Swift', link: 'https://developer.apple.com/swift/', icone: '/Devs_Choice/imagens/swift.png' },
      { nome: 'Kotlin', link: 'https://kotlinlang.org/', icone: '/Devs_Choice/imagens/kotlin.png' }
    ],
    desktop: [
      { nome: 'Electron', link: 'https://www.electronjs.org/', icone: '/Devs_Choice/imagens/electron.png' },
      { nome: 'C#', link: 'https://learn.microsoft.com/dotnet/csharp/', icone: '/Devs_Choice/imagens/csharp.png' },
      { nome: 'JavaFX', link: 'https://openjfx.io/', icone: '/Devs_Choice/imagens/java.png' },
      { nome: 'Python Tkinter', link: 'https://docs.python.org/3/library/tkinter.html', icone: '/Devs_Choice/imagens/python.png' }
    ],
    iot: [
      { nome: 'ArduinoIDE(ESP32)', link: 'https://www.espressif.com/en/products/socs/esp32', icone: '/Devs_Choice/imagens/arduino.png' },
      { nome: 'ArduinoIDE', link: 'https://www.arduino.cc/', icone: '/Devs_Choice/imagens/arduino.png' },
      { nome: 'Raspberry Pi', link: 'https://www.raspberrypi.org/', icone: '/Devs_Choice/imagens/raspberrypi.png' },
      { nome: 'MQTT', link: 'https://mqtt.org/', icone: '/Devs_Choice/imagens/mqtt.png' }
    ],
    jogo: [
      { nome: 'Unity', link: 'https://unity.com/', icone: '/Devs_Choice/imagens/unity.png' },
      { nome: 'Unreal Engine', link: 'https://www.unrealengine.com/', icone: '/Devs_Choice/imagens/unreal.png' },
      { nome: 'Godot', link: 'https://godotengine.org/', icone: '/Devs_Choice/imagens/godot.png' },
      { nome: 'Blender', link: 'https://www.blender.org/', icone: '/Devs_Choice/imagens/blender.png' }
    ],
    analise: [
      { nome: 'Python', link: 'https://www.python.org/', icone: '/Devs_Choice/imagens/python.png' },
      { nome: 'Pandas', link: 'https://pandas.pydata.org/', icone: '/Devs_Choice/imagens/pandas.png' },
      { nome: 'Jupyter', link: 'https://jupyter.org/', icone: '/Devs_Choice/imagens/jupyter.png' },
      { nome: 'TensorFlow', link: 'https://www.tensorflow.org/', icone: '/Devs_Choice/imagens/tensorflow.png' } 
    ],
    outros: [
      { nome: 'Git', link: 'https://git-scm.com/', icone: '/Devs_Choice/imagens/git.png' },
      { nome: 'Docker', link: 'https://www.docker.com/', icone: '/Devs_Choice/imagens/docker.png' },
      { nome: 'APIs', link: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Introduction', icone: '/Devs_Choice/imagens/apis.png' },
      { nome: 'GitHub', link: 'https://github.com/', icone: '/Devs_Choice/imagens/github.png' }
    ]
  };

  if (tipo && kits[tipo]) {
    const itens = kits[tipo];
    const listaLinks = itens.map(item => 
      `<li><img src="${item.icone}" width="32" height="32" alt="${item.nome}"> 
      <a href="${item.link}" target="_blank">${item.nome}</a></li>`
    ).join('');

    miniMessages.innerHTML = `
      <p><strong>Kit ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}:</strong></p>
      <ul>${listaLinks}</ul>
    `;
  } else {
    miniMessages.innerHTML = '<p><em>Sem kits carregados ainda...</em></p>';
  }
});


