document.getElementById('formAlteracao').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    console.log('Novo Nome:', nome);
    console.log('Novo Email:', email);
    alert('Dados alterados com sucesso!');
    document.getElementById('formAlteracao').reset();
});
