document.getElementById('devForm').addEventListener('submit', function(e) {
  const perguntas = this.querySelectorAll('fieldset');

  for (const pergunta of perguntas) {
    const legend = pergunta.querySelector('legend').innerText;
    const inputs = pergunta.querySelectorAll('input');

    if (inputs.length === 0) continue;
    let respostaValida = false;
    const tipoInput = inputs[0].type;

    if (tipoInput === 'text') {
      if (inputs[0].value.trim() !== '') {
        respostaValida = true;
      }
    } else if (tipoInput === 'radio') {
      for (const input of inputs) {
        if (input.checked) {
          respostaValida = true;
          break;
        }
      }
    } else if (tipoInput === 'checkbox') {
      for (const input of inputs) {
        if (input.checked) {
          respostaValida = true;
          break;
        }
      }
    }

    if (!respostaValida) {
      alert(`Por favor, responda a pergunta: "${legend}"`);
      e.preventDefault();
      return;
    }
  }
});
