document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const tipoProjeto = document.querySelector("input[type='text']").value.trim();
  localStorage.setItem("nomeProjeto", nomeProjeto);

  window.location.href = "index.html";
});
