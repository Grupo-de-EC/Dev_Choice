
  
function editarQuestionario() {
    alert("Função para editar questionários ainda será implementada.");
}

function atualizarIA() {
    alert("A IA foi atualizada com sucesso!");
}
  
function editarPerfil() {
    window.location.href = "editarPerfil.php";
}
console.log("Dados recebidos:", dadosEstrelas);

  // Gráfico de Satisfação com dados do PHP
const ctx = document.getElementById("graficoSatisfacao").getContext("2d");
new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["1 Estrela", "2 Estrelas", "3 Estrelas", "4 Estrelas", "5 Estrelas"],
      datasets: [{
        label: "Quantidade de Avaliações",
        data: dadosEstrelas,
        backgroundColor: "#3b82f6"
    }]
  },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
          title: {
            display: true,
            text: 'Quantidade de Comentários'
        }
      }
    }
  }
});
  

function editarPerfil() {
  window.location.href = "editarPerfil.php";
}