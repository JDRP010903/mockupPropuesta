// Lista de usuarios
const usuarios = [
    { email: 'agente1@gnp.com', tipoUsuario: 'usuario' },
    { email: 'admin1@gnp.com', tipoUsuario: 'adminUsuario' }
];

function buscarYRedirigir() {
    const emailIngresado = document.getElementById('emailLogin').value;

    // Buscar el usuario en la lista
    const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailIngresado);

    // Redirigir según el tipo de usuario
    if (usuarioEncontrado) {
        if (usuarioEncontrado.tipoUsuario === 'usuario') {
            window.location.href = './agenteInicio.html';
        } else if (usuarioEncontrado.tipoUsuario === 'adminUsuario') {
            window.location.href = './empresaInicio.html';
        }
    } else {
        alert('Usuario no encontrado o correo electrónico incorrecto.');
    }
}
