// Lista de usuarios
const usuarios = [
    { email: 'agente1@connecticall.com', tipoUsuario: 'usuario' },
    { email: 'admin1@connecticall.com', tipoUsuario: 'adminUsuario' }
];

function buscarYRedirigir() {
    const emailIngresado = document.getElementById('email').value;

    // Buscar el usuario en la lista
    const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailIngresado);

    // Redirigir según el tipo de usuario
    if (usuarioEncontrado) {
        if (usuarioEncontrado.tipoUsuario === 'usuario') {
            window.location.href = '../pages/agenteInicio.html';
        } else if (usuarioEncontrado.tipoUsuario === 'adminUsuario') {
            window.location.href = '../pages/empresaInicio.html';
        }
    } else {
        alert('Usuario no encontrado o correo electrónico incorrecto.');
    }
}
