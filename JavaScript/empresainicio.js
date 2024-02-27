document.addEventListener('DOMContentLoaded', function() {
    initializeSectionContainers(); // Inicializa contenedores de sección

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
    // Prepara el contenedor de llamadas para recibir llamadas
    prepareCallsContainer();
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
            document.getElementById('dashboardContainer').innerHTML = '<h2>VENTANA DASHBOARD</h2>';
            document.getElementById('dashboardContainer').style.display = 'block';
            break;
        case 'Capacitacion':
            document.getElementById('capacitacionContainer').innerHTML = '<h2>VENTANA CAPACITACION</h2>';
            document.getElementById('capacitacionContainer').style.display = 'block';
            break;
        case 'Customers':
            document.getElementById('customersContainer').innerHTML = '<h2>VENTANA CUSTOMERS</h2>';
            document.getElementById('customersContainer').style.display = 'block';
            break;
        // Considera agregar un caso default si es necesario
    }
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
