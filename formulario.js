document.getElementById('devForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Aqui você pode coletar os dados se quiser usar depois
  const tipo = document.getElementById('tipoProjeto').value;
  const experiencia = document.getElementById('experiencia').value;
  const objetivo = document.getElementById('objetivo').value.trim();

  // Apenas redireciona para index.html
  window.location.href = "index.html";
});
