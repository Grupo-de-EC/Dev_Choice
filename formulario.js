document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const tipoProjeto = document
      .querySelector("input[type='text']")
      .value.trim();
    localStorage.setItem("tipoProjeto", tipoProjeto);

    window.location.href = "questionario.php";
  });
