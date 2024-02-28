document.querySelectorAll('.empresa-card').forEach(card => {
    card.addEventListener('click', function() {
        // Obtener la URL de la empresa desde el atributo de datos
        const empresaUrl = this.getAttribute('data-empresa-url');

        // Obtener el iframe
        const iframe = document.getElementById('empresaIframe');

        // Configurar la URL del iframe y expandirlo
        iframe.src = empresaUrl;
        iframe.style.height = "500px"; // Establece la altura deseada
        iframe.style.display = "block"; // Asegúrate de que el iframe sea visible

        // Desplazarse suavemente hacia el iframe
        iframe.scrollIntoView({ behavior: 'smooth' });
    });
});
