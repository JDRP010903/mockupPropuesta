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
        <div id="callsContainer" class="content-container" style="display: none; flex-wrap: wrap; justify-content: flex-start; gap: 20px;"></div>
        <div id="dashboardContainer" class="content-container" style="display: none;"></div>
        <div id="capacitacionContainer" class="content-container" style="display: none;"></div>
        <div id="customersContainer" class="content-container" style="display: none;"></div>
    `;
    prepareCallsContainer();
    // No es necesario llamar a prepareCustomersContainer() aquí ya que se llama cuando es necesario mostrar la sección
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
    customersContainer.innerHTML = '<h2 style="text-align: center; margin-bottom: 20px;">AGENTES REGISTRADOS</h2>';
    
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
                <h2>VENTANA DASHBOARD</h2>
                <iframe title="KPI Power BI" width="1450" height="686" src="https://app.powerbi.com/view?r=eyJrIjoiZmI3YjExMTctMGIyMi00ODg4LTg3NjQtODhjZGE3M2ZkMWEyIiwidCI6ImM2NWEzZWE2LTBmN2MtNDAwYi04OTM0LTVhNmRjMTcwNTY0NSIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>
            `;
            break;
        case 'Capacitacion':
            prepareCapacitacionContainer();
            document.getElementById('capacitacionContainer').style.display = 'block';
            break;
        case 'Customers':
            prepareCustomersContainer();
            document.getElementById('customersContainer').style.display = 'flex';
            break;
    }
}


// Asegúrate de incluir la nueva función `prepareCustomersContainer` en tu código y modificar `updateMainContentVisibility` como se muestra.



function prepareCapacitacionContainer() {
    const capacitacionContainer = document.getElementById('capacitacionContainer');
    capacitacionContainer.innerHTML = `
    <div class="add-company-container" style="padding: 20px;">
    <button id="addCompanyButton" class="button" style="padding: 10px 15px; cursor: pointer; border: none; border-radius: 5px; background-color: #007bff; color: white;">+ Agregar Capacitación</button>
</div>
<div class="company-form-container" style="display: none; padding: 20px;">
    <input type="text" id="companyName" placeholder="Nombre de la empresa" style="margin-bottom: 10px; padding: 5px; width: calc(100% - 10px);"/>
    <input type="file" id="companyImage" style="margin-bottom: 10px;"/>
    <button id="saveCompanyButton" class="button" style="padding: 10px 15px; cursor: pointer; border: none; border-radius: 5px; background-color: #28a745; color: white;">Guardar Empresa</button>
</div>
<div class="row row-cols-1 row-cols-md-3 g-4 containerMisEmpresas">
            <!-- Tarjetas de Empresa -->
            <div class="col">
                    <div class="card h-100 empresa-card">
                        <div class="card-body">
                            <h5 class="card-title">CAPACITACIÓN 1</h5>
                            <h6 class="card-title">Webinar conferencia</h6>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col">
                <div class="card h-100 empresa-card" style="cursor:pointer;">
                    <div class="card-body">
                        <h5 class="card-title">CAPACITACIÓN 2</h5>
                        <h6 class="card-title">Solución de problemas</h6>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="card h-100 empresa-card" style="cursor:pointer;">
                    <div class="card-body">
                        <h5 class="card-title">CAPACITACIÓN 3</h5>
                        <h6 class="card-title">Certificado técnico informático</h6>
                    </div>
                </div>
            </div>

        </div>
    </div>
    `;
    document.getElementById('addCompanyButton').addEventListener('click', function() {
        // Crear el fondo oscuro del modal
        var modalOverlay = document.createElement('div');
        modalOverlay.id = 'modalOverlay';
        
        // Crear el contenedor del modal
        var modalContainer = document.createElement('div');
        modalContainer.id = 'modalContainer';
        
        // Agregar campos y botón al modal
        modalContainer.innerHTML = `
            <h2>Agregar Capacitación Inovatech Solution</h2>
            <label for="companyNameModal">Ingresa nombre de la capacitación:</label>
            <input type="text" id="companyNameModal" placeholder="Nombre de la capacitacion"><br>
            <label for="companyImageModal">Inserta material del Curso:</label>
            <input type="file" id="companyImageModal"><br>
            <label for="companyImageModal">Inserta la durabilidad del curso</label>
            <input type="text" id="companyNameModal" placeholder="Durabilidad del curso"><br>
            <label for="companyImageModal">Inserta certificado del curso (no obligatorio):</label>
            <input type="file" id="companyImageModal"><br>
            <button id="closeModal">Cerrar</button>
            <button id="addModal">Agregar</button>
        `;
        
        // Añadir el contenedor del modal al fondo oscuro
        modalOverlay.appendChild(modalContainer);
        
        // Añadir el modal al body
        document.body.appendChild(modalOverlay);
        
        // Evento para cerrar el modal
        document.getElementById('closeModal').addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
    });
}

function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
    :root {
        --color1: #edf6f9;
        --color2: #83c5be;
        --color3: #006d77;
        --colorHover: #00444a;
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



    .sidebar {
        background-color: var(--color1);
    }
    
    .sidebar .nav-link {
        color: var(--color3);
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }
    
    .sidebar .nav-link:hover, .sidebar .nav-link:focus {
        background-color: var(--colorHover);
        color: var(--color1);
    }
    
    .sidebar .nav-link.active {
        background-color: var(--color2);
        color: var(--color1);
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
    
    
    @media (min-width: 400px) {
        .navbar-toggler {
            padding: 8px;
            left: 1000px; /* Alinea el botón a la derecha dentro del navbar */
            margin-right: 1rem; /* Agrega un margen derecho si es necesario */
        }
    }
    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
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
        <div id="callWindow${id}" class="window" style="width: 380px; background-color: #ffffff; padding: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); border-radius: 8px;">
            <div style="float: left; width: 48%;">
                <div class="header" style="font-size: 16px; color: #333; margin-bottom: 10px;">Llamada entrante ${id}</div>
                <div class="content" style="margin-bottom: 10px;">¿Deseas atender la llamada?</div>
                <button class="button answer-button" style="padding: 5px 10px; cursor: pointer; border: none; border-radius: 5px; background-color: #007bff; color: white;">Contestar</button>
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
