document.getElementById('devForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nomeProjeto = document.getElementById('nomeProjeto').value.trim();
  if (!nomeProjeto) {
    alert('O nome do projeto é obrigatório!');
    return;
  }

  const tipo = document.getElementById('tipoProjeto').value;
  const experiencia = document.getElementById('experiencia').value;
  const objetivo = document.getElementById('objetivo').value.trim();

  // Armazenar no localStorage
  localStorage.setItem('nomeProjeto', nomeProjeto);
  localStorage.setItem('tipoProjeto', tipo);
  localStorage.setItem('experienciaUsuario', experiencia);
  localStorage.setItem('objetivoProjeto', objetivo);
  window.location.href = "index.html";
});

document.getElementById('devForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const tipo = document.getElementById('tipoProjeto').value;
  const nomeProjeto = document.getElementById('nomeProjeto').value.trim();
  const experiencia = document.getElementById('experiencia').value;
  const objetivo = document.getElementById('objetivo').value.trim();

  // Salva dados no localStorage para recuperar no index
  localStorage.setItem('tipoProjeto', tipo);
  localStorage.setItem('nomeProjeto', nomeProjeto);
  localStorage.setItem('experienciaUsuario', experiencia);
  localStorage.setItem('objetivoProjeto', objetivo);

  // Redireciona para index.html
  window.location.href = 'index.html';
});
