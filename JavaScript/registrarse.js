document.addEventListener('DOMContentLoaded', function () {
    const formularioRegistro = document.getElementById('formularioRegistro');


    document.getElementById('btnRegresar').addEventListener('click', function() {
        window.history.back(); // Esto llevará al usuario a la página anterior en el historial
        // O puedes usar window.location.href = 'url_a_donde_quieras_redirigir';
    });
    

    formularioRegistro.addEventListener('submit', function (e) {
        e.preventDefault();

        

        // Aquí puedes implementar validaciones adicionales si lo deseas
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const sexo = document.getElementById('sexo').value;
        const estadoCivil = document.getElementById('estadoCivil').value;
        const curp = document.getElementById('curp').value;
        const fotoINE = document.getElementById('fotoINE').files;
        const comprobanteDomicilio = document.getElementById('comprobanteDomicilio').files;
        const antecedentesPenales = document.getElementById('antecedentesPenales').files;

        // Validar que todos los campos estén llenos (ejemplo básico)
        if (!nombre || !apellido || !fechaNacimiento || !sexo || !estadoCivil || !curp || fotoINE.length === 0 || comprobanteDomicilio.length === 0 || antecedentesPenales.length === 0) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        
        // Ejemplo de cómo podrías manejar los archivos. Necesitarás ajustar esto según cómo manejes los archivos en tu servidor.
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('fechaNacimiento', fechaNacimiento);
        formData.append('sexo', sexo);
        formData.append('estadoCivil', estadoCivil);
        formData.append('curp', curp);

        for (let i = 0; i < fotoINE.length; i++) {
            formData.append('fotoINE[]', fotoINE[i]);
        }

        formData.append('comprobanteDomicilio', comprobanteDomicilio[0]);
        formData.append('antecedentesPenales', antecedentesPenales[0]);

        // Ejemplo de envío de datos (aquí necesitarías tu URL del servidor)
        // fetch('tu_servidor_api', {
        //     method: 'POST',
        //     body: formData,
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));

        alert('Formulario enviado con éxito.');
    });
});
