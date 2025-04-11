// Simulação de feedbacks
const feedbacks = [
    "Excelente experiência!",
    "Achei o sistema fácil de usar.",
    "Poderia ter mais opções.",
    "A IA me ajudou bastante!",
  ];
  
  const lista = document.getElementById("lista-feedbacks");
  feedbacks.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    lista.appendChild(li);
  });
  
  function editarQuestionario() {
    alert("Função para editar questionários ainda será implementada.");
  }
  
  function atualizarIA() {
    alert("A IA foi atualizada com sucesso!");
  }
  
  function editarPerfil() {
    alert("Você pode alterar seu nome ou email aqui.");
  }
  
  // Gráfico de satisfação com Chart.js
  const ctx = document.getElementById("graficoSatisfacao").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
      datasets: [{
        label: "Nível de Satisfação",
        data: [80, 90, 75, 88],
        backgroundColor: "#007bff"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  