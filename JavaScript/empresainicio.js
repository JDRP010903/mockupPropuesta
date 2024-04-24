document.addEventListener('DOMContentLoaded', function() {
    initializeSectionContainers();
    addCustomStyles(); // Añadir estilos CSS

    var navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var text = e.target.textContent.trim();
            updateMainContentVisibility(text);
        });
    });
});

function initializeSectionContainers() {
    var mainContent = document.querySelector('main');
    mainContent.innerHTML = `
        <div id="welcomeContainer" class="content-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <h1>BIENVENIDO ADMINISTRADOR</h1>
            <img class="img-fluid" src="../assets/images/GNP_Seguros.svg" alt="Inovatech Solutions Logo" style="margin-top: 200px;">
        </div>
        <div id="callsContainer" class="content-container" style="display: none; flex-wrap: wrap; justify-content: flex-start; gap: 20px;"></div>
        <div id="dashboardContainer" class="content-container" style="display: none;"></div>
        <div id="capacitacionContainer" class="content-container" style="display: none;"></div>
        <div id="customersContainer" class="content-container" style="display: none;"></div>
    `;
    prepareCallsContainer();
}

// Array de nombres y apellidos para los usuarios
const nombres = [
    "Emma Hernández", "Olivia Martínez", "Ava García", "Isabella Rodríguez", "Sophia González",
    "Mia López", "Charlotte Pérez", "Amelia Sánchez", "Evelyn Ramírez", "Abigail Flores",
    "Emily Rivera", "Elizabeth Gómez", "Mila Díaz", "Ella Morales", "Avery Reyes",
    "Sofía Cruz", "Camila Ortiz", "Aria Jiménez", "Scarlett Gutiérrez", "Victoria Ruiz",
    "Madison Guzmán", "Luna Delgado", "Grace Vásquez", "Chloe Fuentes", "Penelope Torres",
    "Layla Martín", "Riley Hernández", "Zoey Alvarado", "Nora Cabrera", "Lily Domínguez",
    "Eleanor Mendoza", "Hannah Aguilar", "Lillian Villarreal", "Addison Molina", "Aubrey Ponce",
    "Ellie Rivas", "Stella Cervantes", "Natalie Luna", "Zoe Durán", "Leah Salinas",
    "Hazel Núñez", "Violeta Serrano", "Aurora Velásquez", "Savannah Marín", "Brooklyn Arroyo"
];

function prepareCustomersContainer() {
    const customersContainer = document.getElementById('customersContainer');
    customersContainer.innerHTML = '<h2 style="text-align: center; margin-bottom: 20px;"></h2>';
    
    const scrollContainer = document.createElement('div');
    scrollContainer.style.overflowY = 'auto';
    scrollContainer.style.height = 'calc(100vh - 160px)';
    scrollContainer.style.width = '100%';

    const usersContainer = document.createElement('div');
    usersContainer.style.display = 'grid';
    usersContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    usersContainer.style.gap = '10px';
    usersContainer.style.maxWidth = 'calc(100% - 20px)';
    usersContainer.style.boxSizing = 'border-box';

    nombres.forEach((nombre, i) => {
        const userRow = document.createElement('div');
        userRow.classList.add('user-row');
        userRow.style.display = 'flex';
        userRow.style.alignItems = 'center';
        userRow.style.padding = '10px';
        userRow.style.borderBottom = '1px solid #eee';
        userRow.style.backgroundColor = i % 2 === 0 ? '#f9f9f9' : '';

        const userName = document.createElement('span');
        userName.textContent = nombre + ' - ';
        userName.style.flexGrow = '1';

        const userStatus = document.createElement('span');
        userStatus.classList.add('user-status');
        userStatus.style.height = '15px';
        userStatus.style.width = '15px';
        userStatus.style.borderRadius = '50%';
        userStatus.style.marginLeft = '5px';
        userStatus.style.marginRight = '5px';
        userStatus.style.backgroundColor = i % 2 === 0 ? 'red' : 'green';

        const statusText = document.createElement('span');
        statusText.classList.add('status-text');
        statusText.textContent = i % 2 === 0 ? 'Inactivo' : 'Activo';

        userRow.appendChild(userName);
        userRow.appendChild(userStatus);
        userRow.appendChild(statusText);
        usersContainer.appendChild(userRow);
    });

    scrollContainer.appendChild(usersContainer);
    customersContainer.appendChild(scrollContainer);

    customersContainer.style.display = 'flex';
    customersContainer.style.flexDirection = 'column';
    customersContainer.style.alignItems = 'center';
    customersContainer.style.padding = '10px';
    customersContainer.style.height = 'auto';

    // Función para cambiar el estado y el color de los indicadores de estado
    setInterval(() => {
        document.querySelectorAll('.user-status').forEach((indicator, index) => {
            const isActive = indicator.style.backgroundColor === 'green';
            indicator.style.backgroundColor = isActive ? 'red' : 'green';
            const statusText = indicator.nextElementSibling;
            statusText.textContent = isActive ? 'Inactivo' : 'Activo';
        });
    }, 2000); // Cambia el estado cada 8 segundos
}


function updateMainContentVisibility(text) {
    document.querySelectorAll('.content-container').forEach(container => {
        container.style.display = 'none';
    });

    switch(text) {
        case 'Llamadas':
            document.getElementById('callsContainer').style.display = 'flex';
            break;
        case 'Dashboard':
            document.getElementById('dashboardContainer').style.display = 'block';
            document.getElementById('dashboardContainer').innerHTML = `
                <iframe title="KPI Power BI" width="1220" height="686" src="https://app.powerbi.com/view?r=eyJrIjoiZmI3YjExMTctMGIyMi00ODg4LTg3NjQtODhjZGE3M2ZkMWEyIiwidCI6ImM2NWEzZWE2LTBmN2MtNDAwYi04OTM0LTVhNmRjMTcwNTY0NSIsImMiOjR9" frameBorder="0" allowFullScreen />
            `;
            break;
        case 'Agentes':
            prepareCustomersContainer();
            document.getElementById('customersContainer').style.display = 'flex';
            break;
        default:
            document.getElementById('welcomeContainer').style.display = 'flex'; // Mostrar pantalla de bienvenida por defecto
            break;
    }
}


// Asegúrate de incluir la nueva función `prepareCustomersContainer` en tu código y modificar `updateMainContentVisibility` como se muestra.



function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
    :root {
        --color1: #FF570A; /* International Orange */
        --color2: #1E3044; /* Cloud Burst */
        --color3: #C0C9C9; /* Heather */
        --color4: #FAFBFC; /* Athens Gray */
        --colorHover: #e14a00; 
    }


        /* Añade esto a tu bloque de estilos existente */
        #welcomeContainer h1 {
        font-size: 2rem;
        color: var(--color2);
        text-align: center;
        margin-bottom: -70px;
    }

    #welcomeContainer img {
        /* Ajusta esto según el tamaño de tu logo */
        width: 750px;
        height: auto;
    }

  
    /* Estilo para el botón de agregar empresa */
    #addCompanyButton {
        z-index: 10;
        margin-left: -50px; /* Ajusta este valor si es necesario */
        margin-top: 5px;
    }

    .add-company-container {
        display: flex;
        justify-content: flex-end; /* Alinea el botón de agregar empresa a la derecha */
        padding: 20px;
    }

    /* Estilo para el botón de agregar recursos */
    #addResourceButton {
        z-index: 10;
        margin-left: -50px; /* Ajusta este valor si es necesario */
        margin-top: 5px;
    }

    .add-resources-container {
        display: flex;
        justify-content: flex-end; /* Alinea el botón de agregar recursos a la derecha */
        padding: 20px;
    }

    /* Aumentar el margen superior del subtítulo Recursos */
    h3 {
        margin-top: 50px; /* Ajusta este valor según necesites */
        padding: 20px 0;
    }


    body, .content-container {
        background-color: var(--color4); /* Fondo blanco para todas las ventanas */
    }

    header {
        background-color: var(--color4); /* Fondo azul para la barra de navegación y sidebar */
        color: var(--color4); /* Texto blanco */
    }

    .sidebar {
        position: fixed; /* Mantiene la barra de navegación fija en su posición */
        top: 87px; /* Alinea la barra en la parte superior de la pantalla */
        left: 0; /* Alinea la barra en el lado izquierdo de la pantalla */
        width: 250px; /* Ancho de la barra de navegación */
        height: 100%; /* Altura completa de la pantalla */
        overflow-y: auto; /* Permite el desplazamiento si el contenido es más largo que la pantalla */
        background-color: #1E3044; /* Color de fondo */
        color: white; /* Color de texto */
    }
    
    /* Estilo para el contenedor principal del contenido */
    .main-content {
        margin-left: 250px; /* Desplaza el contenido principal para que no sea cubierto por la barra de navegación */
        padding: 20px; /* Espaciado interno */
        overflow-y: auto; /* Permite el desplazamiento vertical del contenido */
        height: 100vh; /* Altura de la ventana del navegador */
    }

    header h1 {
        color: var(--color1); /* Asegura que el título también sea blanco si está dentro del header */
    }

    .sidebar .nav-link {
        color: var(--color1); /* Texto blanco para los links */
        margin-bottom: 65px; /* Espacio hacia abajo para cada link */
    }

    .sidebar .nav-link:hover, .sidebar .nav-link:focus {
        background-color: var(--color2);
        color: var(--color3);
    }

    .sidebar .nav-link.active {
        background-color: var(--color2); /* Mantenemos el azul para el estado activo */
        color: var(--color4); /* Texto blanco para el estado activo */
    }
    
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }
    
    /* Personalización del botón de hamburguesa */
    .navbar-toggler {
        border: none; /* Elimina el borde predeterminado */
        outline: none; /* Elimina el contorno al hacer clic */
    }
    
    /* Estilos para el ícono de hamburguesa */
    .navbar-toggler .bi-list {
        font-size: 1.5rem; /* Ajusta el tamaño del ícono */
        color: var(--color1); /* Usa una de tus variables de color para el ícono */
    }
    
    /* Ajustes adicionales para el botón si es necesario */
    .navbar-toggler {
        padding: 6px;
        left: 10px; /* Alinea el botón a la derecha dentro del navbar */
        margin-right: 1rem; /* Agrega un margen derecho si es necesario */
    }
    
    .empresa-card {
        transition: transform 0.3s ease-in-out; /* Suaviza la transición */
    }
    
    .empresa-card:hover {
        transform: scale(1.05); /* Escala la tarjeta al 105% de su tamaño original */
    }
    
    .containerMisEmpresas img {
        max-height: 120px;
        width: auto;
        display: block; /* Centra la imagen si es más pequeña que el contenedor */
        margin: 0 auto; /* Centra la imagen horizontalmente */
        object-fit: contain; /* Asegura que la imagen se ajuste sin cortarse ni distorsionarse */
    }
    
    
    /* Oculta inicialmente el iframe */
    #empresaIframe {
        display: none;
        overflow: hidden;
    }


    /* Nuevos estilos para el modal */
    #modalOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    #modalContainer {
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        width: 50%;
        max-width: 500px;
    }

    #modalContainer h2, #modalContainer label {
        margin: 10px 0;
    }

    #modalContainer input, #modalContainer button {
        width: 100%;
        padding: 8px 10px;
        margin-bottom: 10px;
        box-sizing: border-box; /* Asegura que el padding no aumente el tamaño del elemento */
    }

    #modalContainer button {
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
    }

    #modalContainer button#closeModal {
        background-color: #dc3545;
    }

    /* Estilos para el modal de recursos */
#modalOverlayResource {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Asegura que el modal esté por encima de otros elementos */
}

#modalContainerResource {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: auto; /* Ajusta este valor según el contenido */
    max-width: 600px; /* Asegura que el modal no sea demasiado grande */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Agrega una sombra para resaltar el modal */
}

#modalContainerResource h2, 
#modalContainerResource label {
    margin: 10px 0;
}

#modalContainerResource input[type="text"],
#modalContainerResource input[type="file"],
#modalContainerResource select,
#modalContainerResource button {
    width: 100%;
    padding: 8px 10px;
    margin-bottom: 10px;
    box-sizing: border-box; /* Asegura que el padding no aumente el tamaño del elemento */
    border: 1px solid #ccc;
    border-radius: 5px;
}

#modalContainerResource button {
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
}

#modalContainerResource button#closeModalResource {
    background-color: #dc3545;
}

#modalContainerResource button#addModalResource {
    background-color: #28a745;
}


#callsContainer {
    display: flex; /* Mantiene el estilo flex que ya tenías */
    flex-wrap: wrap; /* Permite que los elementos se envuelvan */
    justify-content: flex-start; /* Alinea los elementos al inicio */
    gap: 20px; /* Mantiene el espacio entre los elementos */
    overflow-y: auto; /* Habilita el desplazamiento vertical */
    max-height: calc(100vh - 100px); /* Establece una altura máxima para activar el desplazamiento */
    margin-top: 20px; /* Ajusta según sea necesario para no superponer la barra de navegación */
}

#dashboardContainer {
    display: block;
    width: 100%;
    overflow-x: hidden; /* Previene el desplazamiento horizontal */
    text-align: center; /* Centra el iframe si es más pequeño que el contenedor */
}



    
/* Estilos para dispositivos móviles (teléfonos) */
@media (max-width: 600px) {
    #welcomeContainer h1 {
        font-size: 1.5rem; /* Tamaño de fuente más pequeño */
        margin-bottom: 20px; /* Menos margen inferior */
    }

    #welcomeContainer img {
        width: 90%; /* Imagen más pequeña y responsiva */
        height: auto;
    }

    #dashboardContainer iframe {
        width: 100%; /* Ajusta el iframe al ancho del dispositivo */
        height: auto; /* Altura automática para mantener la relación de aspecto */
        min-height: 500px; /* Altura mínima para asegurar visibilidad */
    }

    .sidebar {
        position: static; /* La barra lateral se convierte en parte del flujo de la página */
        width: 100%; /* Ocupa el ancho completo de la pantalla */
        top: auto;
        left: auto;
    }

    .main-content {
        margin-left: 0; /* El contenido principal ya no se desplaza para dejar espacio a la barra lateral */
        padding: 10px; /* Menos padding para aprovechar mejor el espacio */
    }

    #addCompanyButton, #addResourceButton {
        margin-left: 0; /* Ajusta la posición del botón */
    }
}

/* Estilos para tablets y dispositivos con pantallas de tamaño intermedio */
@media (min-width: 601px) and (max-width: 1024px) {
    #welcomeContainer h1 {
        font-size: 1.75rem; /* Un tamaño intermedio para tablets */
    }

    #welcomeContainer img {
        width: 80%; /* Tamaño adaptativo para la imagen */
    }

    #dashboardContainer iframe {
        width: 100%; /* Asegura que el iframe se ajuste al ancho del contenedor */
        height: auto; /* Altura ajustable automáticamente */
        min-height: 400px; /* Ajusta la altura mínima para tablets */
    }


    .sidebar {
        width: 200px; /* Una barra lateral más estrecha para tablets */
    }

    .main-content {
        margin-left: 200px; /* Ajusta el margen izquierdo para el nuevo ancho de la barra lateral */
        padding: 15px;
    }
}
    
    `;
    document.head.appendChild(style);
}


function prepareCallsContainer() {
    let callCount = 0;
    setInterval(() => {
        callCount++;
        addCall(callCount);
    }, 5000); // Simula la llegada de nuevas llamadas cada 5 segundos
}

function addCall(callCount) {
    var callsContainer = document.getElementById('callsContainer');
    if (callsContainer && callsContainer.style.display !== 'none') {
        callsContainer.innerHTML += createCallWindow(callCount);
        initializeEmotionChange(`emoji${callCount}`);
        startTimer(`timer${callCount}`, callCount);
    }
}

function createCallWindow(id) {
    const emotions = ['😊', '😢', '😠', '😐']; // Lista de emociones
    return `
        <div id="callWindow${id}" class="window" style="width: 380px; background-color: #1E3044; padding: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); border-radius: 8px;">
            <div style="float: left; width: 48%; margin-bottom: 50px;">
                <div class="header" style="font-size: 16px; color: #C0C9C9; margin-bottom: 50px; font-weight: bold;">Llamada entrante ${id}</div>
                <div class="content" style="margin-bottom: 50px; color: #C0C9C9; font-size: 14px;">¿Deseas atender la llamada?</div>
                <button class="button answer-button" style="padding: 10px 15px; cursor: pointer; border: none; border-radius: 5px; background-color: #007bff; color: white; font-size: 14px; transition: background-color 0.3s ease;">Ingresar llamada</button>
            </div>
    
            <div class="info-window" style="float: right; width: 48%; display: flex; flex-wrap: wrap; gap: 10px;">
                <div class="info-box" style="flex: 1 1 48%; padding: 10px; background: #f2f2f2; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <div class="info-icon" id="emoji${id}">${emotions[Math.floor(Math.random() * emotions.length)]}</div>
                    <div class="info-text">Emociones</div>
                </div>
                <div class="info-box" style="flex: 1 1 48%; padding: 10px; background: #f2f2f2; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <div class="info-icon">⏰</div>
                    <div class="info-text" id="timer${id}">0:00</div>
                </div>
                <div class="info-box" style="flex: 1 1 48%; padding: 10px; background: #f2f2f2; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <div class="info-icon">📄</div>
                <div class="info-text">Requerimiento del cliente</div>
            </div>
            <div class="info-box" style="flex: 1 1 48%; padding: 10px; background: #f2f2f2; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <div class="info-icon">👤</div>
                <div class="info-text">Asesor call center</div>
            </div>
        </div>
        <div style="clear: both;"></div>
    </div>
            </div>
            <div style="clear: both;"></div>
        </div>
    `;
}

function initializeEmotionChange(emojiId) {
    const emotions = ['😊', '😢', '😠', '😐'];
    setInterval(() => {
        const emojiElement = document.getElementById(emojiId);
        if (emojiElement) {
            emojiElement.textContent = emotions[Math.floor(Math.random() * emotions.length)];
        }
    }, 5000); // Cambia la emoción cada 5 segundos
}

function startTimer(timerId, windowId) {
    let seconds = 0;
    setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timerElement = document.getElementById(timerId);
        if (timerElement) {
            timerElement.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }, 1000); // Actualiza el tiempo cada segundo
}