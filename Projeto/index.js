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

  /////////////////////////
  window.addEventListener("DOMContentLoaded", function () {
    const nome = localStorage.getItem("nomeUsuario");
    const projeto = localStorage.getItem("tipoProjeto");
    const boasVindas = document.getElementById("boasVindas");

    boasVindas.innerHTML = '';  // Limpa antes de adicionar

    if (nome) {
      const nomeUsuarioEl = document.createElement('div');
      nomeUsuarioEl.textContent = `Bem-vindo, ${nome}!`;
      boasVindas.appendChild(nomeUsuarioEl);
    }

    if (projeto) {
      const nomeProjeto = localStorage.getItem('nomeProjeto');
      const projetoEl = document.createElement('div'); // <=== crie o elemento
      projetoEl.textContent = `Seu projeto é: ${nomeProjeto}`;
      projetoEl.style.marginTop = '4px';
      projetoEl.style.fontWeight = 'bold';
      boasVindas.appendChild(projetoEl);
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

function addMessageGradualmente(text, classe) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = classe;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  let i = 0;

  const interval = setInterval(() => {
    const char = text.charAt(i);

    if (char === '\n') {
      div.innerHTML += '<br>';
    } else {
      // Para evitar problemas com tags HTML, você pode escapar caracteres especiais se precisar.
      div.innerHTML += char;
    }

    i++;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    if (i >= text.length) clearInterval(interval);
  }, 20);
}

window.addEventListener("DOMContentLoaded", function () {
  addMessage(
    "Olá! 👋 Eu sou a Quantika, sua assistente virtual. Estou aqui para te ajudar com dúvidas sobre programação, nesse exato momento estou analisando seu formulário, então peço que aguarde um pouco.",
    "bot"
  );
});

function addMessage(text, classe) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = classe;

  // Formatar texto: quebra de linha e listas simples
  const formattedText = text
    .replace(/\n/g, '<br>')                 // Quebra de linha
    .replace(/(\d+)\.\s/g, '<br>$1. ')     // Lista numerada
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')// Negrito (opcional)
    .replace(/\*(.*?)\*/g, '<i>$1</i>');   // Itálico (opcional)

  div.innerHTML = formattedText;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

window.addEventListener("DOMContentLoaded", function () {
  // Nova parte para pegar as respostas salvas no localStorage e enviar para IA
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Anônimo';
  const respostasJSON = localStorage.getItem('respostas_' + nomeUsuario);

  if (respostasJSON) {
    const respostas = JSON.parse(respostasJSON);
    let mensagemParaIA = "O usuário respondeu ao formulário com os seguintes dados:\n";

    for (const [perguntaId, resposta] of Object.entries(respostas)) {
      mensagemParaIA += `Pergunta ${perguntaId}: `;
      if (Array.isArray(resposta)) {
        mensagemParaIA += resposta.join(", ");
      } else {
        mensagemParaIA += resposta;
      }
      mensagemParaIA += "\n";
    }

    mensagemParaIA += "\nResponda de forma clara, detalhada e organizada, como um guia passo a passo para o projeto.";
    mensagemParaIA += " Use parágrafos e listas numeradas para facilitar a leitura, mas não insira tags HTML, só texto puro.";
    mensagemParaIA += " Seja direto, indicando exatamente o que deve ser feito e como.";

    const messagesDiv = document.getElementById("messages");

    // Cria e mostra o indicador "Quantika está pensando..."
    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "bot";
    thinkingDiv.id = "typingIndicator";
    thinkingDiv.textContent = "Quantika está pensando...";
    messagesDiv.appendChild(thinkingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

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
        messages: [{ role: "user", content: mensagemParaIA }],
      }),
    })
    .then(res => res.json())
    .then(dados => {
      const respostaIA = dados.choices[0].message.content;

      // Remove o indicador "Quantika está pensando..."
      thinkingDiv.remove();

      // Mostra a resposta da Quantika com animação gradual
      addMessageGradualmente("Quantika: " + respostaIA, "bot");

      localStorage.removeItem('respostas_' + nomeUsuario); // Remove para não repetir
    })
    .catch(err => {
      thinkingDiv.remove();
      addMessage("Erro ao conectar com a IA.", "bot");
      console.error(err);
    });
  }
});

localStorage.removeItem("experienciaUsuario");
localStorage.removeItem("objetivoProjeto");

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
      { nome: 'HTML', link: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML', icone: '/Devs_Choice/Imagens/html.png' },
      { nome: 'CSS', link: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS', icone: '/Devs_Choice/Imagens/css.png' },
      { nome: 'JavaScript', link: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript', icone: '/Devs_Choice/Imagens/js.png' },
      { nome: 'React', link: 'https://reactjs.org/', icone: '/Devs_Choice/Imagens/react.png' },
      { nome: 'Node.js', link: 'https://nodejs.org/en/', icone: '/Devs_Choice/Imagens/node.png' }
    ],
    mobile: [
      { nome: 'React Native', link: 'https://reactnative.dev/', icone: '/Devs_Choice/Imagens/react.png' },
      { nome: 'Flutter', link: 'https://flutter.dev/', icone: '/Devs_Choice/Imagens/flutter.png' },
      { nome: 'Swift', link: 'https://developer.apple.com/swift/', icone: '/Devs_Choice/Imagens/swift.png' },
      { nome: 'Kotlin', link: 'https://kotlinlang.org/', icone: '/Devs_Choice/Imagens/kotlin.png' }
    ],
    desktop: [
      { nome: 'Electron', link: 'https://www.electronjs.org/', icone: '/Devs_Choice/Imagens/electron.png' },
      { nome: 'C#', link: 'https://learn.microsoft.com/dotnet/csharp/', icone: '/Devs_Choice/Imagens/csharp.png' },
      { nome: 'JavaFX', link: 'https://openjfx.io/', icone: '/Devs_Choice/Imagens/java.png' },
      { nome: 'Python Tkinter', link: 'https://docs.python.org/3/library/tkinter.html', icone: '/Devs_Choice/Imagens/python.png' }
    ],
    iot: [
      { nome: 'ArduinoIDE(ESP32)', link: 'https://www.espressif.com/en/products/socs/esp32', icone: '/Devs_Choice/Imagens/arduino.png' },
      { nome: 'ArduinoIDE', link: 'https://www.arduino.cc/', icone: '/Devs_Choice/Imagens/arduino.png' },
      { nome: 'Raspberry Pi', link: 'https://www.raspberrypi.org/', icone: '/Devs_Choice/Imagens/raspberrypi.png' },
      { nome: 'MQTT', link: 'https://mqtt.org/', icone: '/Devs_Choice/Imagens/mqtt.png' }
    ],
    jogo: [
      { nome: 'Unity', link: 'https://unity.com/', icone: '/Devs_Choice/Imagens/unity.png' },
      { nome: 'Unreal Engine', link: 'https://www.unrealengine.com/', icone: '/Devs_Choice/Imagens/unreal.png' },
      { nome: 'Godot', link: 'https://godotengine.org/', icone: '/Devs_Choice/Imagens/godot.png' },
      { nome: 'Blender', link: 'https://www.blender.org/', icone: '/Devs_Choice/Imagens/blender.png' }
    ],
    analise: [
      { nome: 'Python', link: 'https://www.python.org/', icone: '/Devs_Choice/Imagens/python.png' },
      { nome: 'Pandas', link: 'https://pandas.pydata.org/', icone: '/Devs_Choice/Imagens/pandas.png' },
      { nome: 'Jupyter', link: 'https://jupyter.org/', icone: '/Devs_Choice/Imagens/jupyter.png' },
      { nome: 'TensorFlow', link: 'https://www.tensorflow.org/', icone: '/Devs_Choice/Imagens/tensorflow.png' } 
    ],
    outros: [
      { nome: 'Git', link: 'https://git-scm.com/', icone: '/Devs_Choice/Imagens/git.png' },
      { nome: 'Docker', link: 'https://www.docker.com/', icone: '/Devs_Choice/Imagens/docker.png' },
      { nome: 'APIs', link: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Introduction', icone: '/Devs_Choice/imagens/apis.png' },
      { nome: 'GitHub', link: 'https://github.com/', icone: '/Devs_Choice/Imagens/github.png' }
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

