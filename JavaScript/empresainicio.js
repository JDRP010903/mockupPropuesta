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
            document.getElementById('capacitacionContainer').innerHTML = `
            <div class="add-company-container" style="padding: 20px;">
                <button id="addCompanyButton" class="button" style="padding: 10px 15px; cursor: pointer; border: none; border-radius: 5px; background-color: #007bff; color: white;">+ Agregar Empresa</button>
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
                                    <img src="https://inovatechsolutions.com/wp-content/uploads/2021/09/Copia20de20LOGO-INOVATECH-CON-TRANSPARENCIA_preview1.png" class="card-img-top img-fluid" alt="Logo de Empresa 1">
                                    <div class="card-body">
                                        <h5 class="card-title">Innovatech Solutions</h5>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div class="col">
                            <div class="card h-100 empresa-card" style="cursor:pointer;">
                                <img src="https://media.licdn.com/dms/image/C4E0BAQEp-BsxqvUJMw/company-logo_200_200/0/1631300857214?e=2147483647&v=beta&t=GmvQrdpCpDYFLyPXTSjszjCj1BH3C_oIGAaIbQG9I6E" class="card-img-top img-fluid" alt="Logo de Empresa 1">
                                <div class="card-body">
                                    <h5 class="card-title">Datawise Analytics</h5>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card h-100 empresa-card" style="cursor:pointer;">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEVnogb///9joABdnQBamwBkoQBgnwD2+vByqChcnQBXmgB1qTH5+/V8rjewzI7i7Nbs8uPo8N6ox4mmxoHM3rn9/vrc6M6PuF2KtlW0z5aVvGe50p7B16nU48S40Zv2+fHI3LKav29rpBaMt1eox4OBsESfwnbL3baFs0uSumJOlgDT48F9rj6ZvmxvpyNuphVwrYrAAAAUwUlEQVR4nO1caZuiMBImJxCRQwUPQLxv8f//u60KoNjdo/Y1s89u3g/Tg5JQlVTqRssyMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMPgShPjXFPwuKKPO/zCLQqrdzCa7z7AoqGSMSfprRP0kpOyHhHi+fHmEkNw5j2d5ns2tj0cJ6bL/Fu4F29iExFPxMoOCLcYRqeH13Q/v8IN4/69ZpNLl3GVlAnTOFuzVYUD9tmIuSjSf/ruhVKYxfLF9ec5fAeXraWAXUQakBF335SNI5VRv3XYJy8MZDt+92St37+EtweWnaf4MhLsLGjkrNp84MWwNR5aEfaseo4DF/G6vBNNLsF3Lf6mbqYuCFudjJDc5vD7Q3VRLcj2z4hKTuG1KBR/ALcfy3+oZNiqAzjlXc72J65eJYT7uDm/rJDe4E1PBc5h6yf+tbXXHqFuEFCXIGzD5spmgS1Qs92eWzQiZ3DhkIBzRHyzI3wKVsMpkDzqewX92HULGrxLEQXdm/P4zmRJyvnLI4QwG//QAAkUdsH7RBZiiOzyDsIf9l6UUzu5b+bvjUMJsAfvHDI7AUg30KjNQCUMGJ/LVsbgkgWLW3YKgvWhMu7jAGfzHHjybgISmSpMjPWJ3QZnOPnBK/gA0FFE8b7PIjoSM6g9Y8t44/mUwVPar6iSJde2ZvH5sJKpSEnbaA1w4m/UHqGn9j5eLun9Hdhlah01tn+lZM5hYn3i0dPaT092KCGE39pB2YbaPHTU5TAbdv6BgtYj2Gl0oHGQw/dzaCkrvz5m2ONWUKiLxx8tVPWr56yzKETxmfFP2dDnzre8KD5rIo944dNb2HzMB+jYHG/zbITYt4zfuPmXfX1X0w6c4DV3/WWfJjGSHMclfV2lfowXUZvTj3pQLXsOQor8dEvtPk9MNCZUsyOVXN9EFrV58Rqu8BDQ5pIRZ3eyBfyskeAUQhbzsPH0FcvMrZx2dgFBWMpr9WQjBefXE6E+a9kcg0Fg/IOGrkKBAZgw2CWT0oV0tSOjE9i/6O+hthOrn5+UQO4GLgzI6euTM0BOEkR5Z/JrDQ9ESPiThqxPDvELL6hPfj3Yw2PZ/i0UUIjLgz2/8LEBJgn62VEjiZ0ecyjFmp86/w6LsQdjzGxOjrZhKBgHU/KkSE2pMimL4Oxxy7xOB/A0vJLRh4pE8gT/6ghIDvz37pewNWor49XxhM0qszk9Whe7BxjLUNq84ZCBJg18yFyz6whbqQOvJqXEhhp6pFQRk7yiX9fNanMv+m7zjjwE13adPIR1iOPDYCdEOzVJoZVMNkszVIwSbZvhXlt1SNs49nZPgdzxTzIZtn00tqNCU1bQKF5W7171ugRB6O6lq8YyrUHDwBk/omFIuNukxTxmmFLd6dRgm9cLsUu0cyPQdh5S5XP3EpgpweZ+kRCnj5RADdRp4C/1BiQymV1UDUchpInQAlt1YxKWbLTHGhIfITVLlDOZUYGYDJFyc6qx6plM7cA5vbptg1nkW2F6y+D6HGMGFH3tUtIrN2ToDhmB98VzhtslTgSKq6kFMzI8gjxsqSo9Et1VXqEltDCmo7OMINHgEdhAZhFAJgiZvd5pvY1IMmY6hjqzhr7uNK+4n39eumO6bfSgMcgn7RtUEK0hFtqZgsLRGcvea2ErNCEmnWGgJ/IUW3VuShkJEXYwx7OVLXcw4wr/xSHJdmgIDyQIy44IyC3y6lAvwHCs6BCuPumCCg+j3XVVU5puPFkrOiUf5EMnarhWjLvgFUwXPhyUJRtrf1K4I0jEWXFIakPjUElLgBCx+rgRWKoIMSz0DUCwDUmDmmGFEWj3YXRcksCCCrGJlmuIZPx6Bw+An4jlOPjZXtBuTHInz/AUYYoG5/i0HyU1wz0G0V7iduDvBEHU/tYCF4Y1BIQrc6njR1RuIVdbMYViYiR0I/ENX0LDxhak4knARa5FkO1zTI8p9uPmJ9LjOAn3gkqIC8obwmEwXf6mCHSmoJbs25hvx8KZS186KM0dJYo6tN+a2Qkt9jvxOU6QbY9IHRNTrHsbaPsGmLZtcMU9JJeK6ekVsTGNO2I/k/9Hv8N7HTUKCJAFT9gmJFuyEG3GWfA53r7kmP+ciQIcdF0C4K9QktWmrUub6uEVOxV8wwftQi9qlwrSqJzFZvLnuuZrpQ+f69YIcT6o5Ot9NhvWBjfd7KDFgBH9SmzmJ2gioVSipEZ0vKXKYYCFmNcEODdbR9dReZc6t8UKA/UNFQXbabmanyuGEM2hf0MkhNsgnmIcZK2v6BeiDyNWpBvh2eqsvCim+p06Rw/jtHgqVaFWW425QNbcrS6ZAxQ0OPih1zSGokf0ZfElGM/29Vxl9cAIhQqicngFsibcRjdvCbVugZMNuUV3GKEKyaBiB540tnYSey5t4Uj7zPtXmUk93SxeglJI3M9AF7E4Etk2Bq+LucRumEOJd4D+rQwa7KCTsA5pAn4RcoDa1gZUBeiQSziP2JmBdB6JCWJtNy1GhaomrVaUr6CG6OX4QhHuwi/BcwVsWwu3cWaBXWRXidL0X60FaLd6+1SXgAM7FjjGpraG9g8WNUrRmCYlAc7raQbFzEl3GaA2P6IABscLdxyRFljhabP9QlyI1D5LJfdUdsNP5xRNchE0JnYM1LN+kvsGxgeNhd69SSjuvJQFEacd22VwpG9OI14FCuthJEFnAZTqehTq1LySocvsys3Ye2L60L4e1PogT5M8+u1IbSxdUYlW60kIaSo5GoicU50rs/GMl7WjYKcOyWxyQut0Gk3E7jie0ryiIGIX1UE4Gy3S80eYmMXkpRGZ56t5auLQWsbsuCI5AB1P7V7kqSYOZhUKH672F/UwK8gY20GSJLh4gNGJV6UoL6Y5W1Sgw8WF9c64PhbJGSHxkXYBkHZnC4QXdzPC2wfl0cXbzca7ledLSEZyMdt4r+Thu70S7Aqa7W9IO+F+LUaYZADmTdbcJWGm9xqPqcrx8y9+GarGSs+pyVJlENPdHrp3NK+Jg7HDc26LQTmcKWnKEjiBjqH7A7ZDn+s7aKbV79C4+cxYqfiWYdsN929trRM4Ow2riYgTLKha5HearslGD8pQlue+4TTyQ9zeRHW0nV7Xnbo7Jdl6HG1pItSFg3XEehVGyXS3BsxM6+6aRnJioas72LEXPEXlhG++6IMF09N7kc/JKsCHHoWqzyJZxa1PiaWWKIBbkbusJ2GsHl3ID62AnSyWxKYy15oF47nqJ8VHd7QXj8MamTZGuA4/EYdatSyTUGujHrqrzKPlonM2yab8LD3975ASYmpfy4oIm0UgAPYy5LlIlF1mzdJFvPXGVpFyU1rOMkRv9KSKDhbDKhbxV7SCSmPTOi6s0UilxOVorB9dIK3NlZ+AtXjMYbFzEYRQEUQTiswFBY3S08f3V2XFfytc8fYo4ZQ+C6jfDBX2QtaN8nyVAJxAbFmRmverfSG6NJvPzZL/fjAOUEHgK4AeCsRrih5pm5M4L0/5kODlvJkvnc0kNimDWcKlO3uo3y1rfAZjJuVpPHFdT+4VFkxMShbbovNwy87fhRv4hB2/ubafVqwDWTupwTA/h8vvZkN+BZy0LpUTxYRbiOWQvVzuZ+Cr6pXLBt3HxwFEUO7n6YvEUODyAJy3Yr7dBfBWuvYfQuKCrL2bDhUM6B3mQwT/uuP4z6DwuD0zJr0oplgq2/azI/3G74AMwnwz6afH1kg16m9lSM0jBS/s+XPpjU1XdPKybJtv9N2RMyMphFGyT2M/hAeywvojh/7ZdFIVXwMfwBy6DDYMI+ggf6w88/FPgXfDfalSoJymePyvydaAEFP5IVZHl4abjPMZiHh9702McDK3ScTrevpOkC/hbpPFgfIxJ0HW68zBRY88/OSVEU0k6JtuE7MtyWJxO3h5GLbqDOEh7WQwjH6MzTMIXndBXQDehujAMrv8MWpI1xAiM9ovEYnKSwyHOXR2clzG4gckJfKTLIVrFEASAqxuslQonElNwoLS9wWrGJAfWSg7RhoXZ3odwy8PsByumLN/45ElwKbOpa81LoF75sa/2eU83dMk0oe5gRQUTwomJvyfZCQsq4M2Ljq1kmmPepCD5aqZG3oAiY5OO3EUPC3qCRiSxPkhzfp3DeY8U2UP3VG5XKqlKJcwJEqdQ3VJnU5mQqa44yLQg/hA5LHQlUCAbUqeUrZMKhhnE1laV4eCd8CGHdBKT3Cp+jkOQUm4d04cc0nN4SO1qowWfenbalNcs96jtlRznlgp94tBexaFjN1kW4Q7jKK9yuzwMg0O2ffywYXg5DI4/aKfhgHjJkyQP39pZ0DwU8/zTJk6Hc6j5FokXZ2oT23ZVHWbRub6dT0g8qXdE9uwsjJ4QxDRBX2XnI8iF8zSEkuvVLcND2ZgEHZdJybt2E35JB4J1aTm0Tlmc4okLcadrZWRwuc4vd73l0/jxFYI+iRcWTNCWZRJskXnhbJwm8eZemm4pdbmzw3ScBnF+avtN9Adj7V+FkPzkp+n5QeqD8t00nQ7Zf69f+AwCcx8P76BP7zAw+H+EThxWeHZAPkgKYt7x/TD5+pz3tHx49ze7oenEv+JsPfQahOW/rb+6zsb331kzeptyNfpEsEOX/bfMUJct1t8LKrgdhxWwfDV9ZFbF6W1vtNjq8nd0TwI9kXrK0MP608ummgVvHXA2yuN21fcDyCe+nJBko1wNzrrHh/2Fsk/uCeBRvGeKrd50UckekbyaU4l9QbovboEQxb0vLGROkv5o/WgQBDOPWaTLFgHikHgP/Hc2CO++BU4WIKBCRcHdQ9ix1c4mS/LYhb9BdMj9DyuoJO7yJw4PD5845HLabiaVGanfp5Stgg+VuigFk93HoG4SIMfC9e4DLWm391TFW6a7/mgtTzj37f11rCXhOQaVROe3JgksRML1rrqxogddw6p7UN5+RcQlT4oQLGmvv6t3iXLHz7JsXlcO1WgWhdHs5FqkfzeZG2EzrFDpmwTr4u4+QXxZnheS76dbmNC1+jD3qtJpQPk5zWb+hcnxhrJZUYdXUqTZiHJYQdSjlHeQnj2n6y3W3vk+G8zSEYQywlVd0lEPlQdtB7p0oTtZ1wFWgEHxTOAr2Q1JkKVHj6S7Ny+1yjHZM8qydv+apQW/vHHs9ogjVwQ7GcPExQqoBxoIdJqLDGJLG16lB3gyj6pML2UQf59ZWXqpVS4EW0cVPXaZgoixvYdjYhJQ0Y0CoC6YPWBROOTcZEgoc+xICrYh+UlyDoEAGVI5IrkDQRGjM3KM37wvyULSH0L0d/8AIFs1U0o2x8r8IEzI+MJciJ/CpeCcObk+nRGZWy53LzOSwuoJ3c2pe8pSKesGsTPfkGMH6Rl6IQgcHZKjA4qMjknGRsdtYW+PjxLEdEK6NU6bAdkKISfYiidwgRckUh0yq2N3HpDg7dv1KkID82Z+EPyynnPnB/ieLQ+J14UjBOuZVw1A1A3JQkVFVewV6kjiBd3pRA/IBP62iCj3KVnuJ2JIfF7lER3diGznFUEqDEGAlJ2phxa33RxBSKaoWECsXn/JcyKjoHkJEWzFvUKhbF6QjL7zc1i7AyVeKkssYqI7TUHpNqkOENzRmJQ1bXRNIgaqGTifEG+iqtTINlTg5MSzJvfBEzg3J312LJ39cPG12/ljj4IHyaJTYzgj4YJlBW8cLlAhy1vPN4jH3esGshuRdFG38ba4FF2yceopT5sAlgVG6t54+Nth9dxsSSbx+KrkFmBS2TE8gPSOmx/30XYAzvpNv2bEgbU4VoV9MRzpfrnHL2IKQcbsmgHlO5Id4mTVq7FKvCy8EgG6u+1bsCFJ6h/iEc629Q3dAB3NnFJtyYn55KRbTfKi38zdy4h/ox22oi95OOsTm5yvT8TuRvjwes22nitkQopBbyc5RSdWpu/6DN9wuL7rm1JBcCGYfW9wDG9dsDIt2i0Rw1vvuvRJS1Rl5rXsj7iQvkq0pyAEZv6viFr+g1a/kmDDY6DfVqg+Q9XdcgK0rhVuP8BjUGW1WPLEo4Gz1f5pH5bkE7K45pnB9sS3t2dY2JpMSHtwXTw4ES0V5EZ37ygLMjkUeh9Az0xaeXQ3uFUBQbsoOiIzMIQLElYs4bHE91tarYhgURYLS7rCWaaxPoAsfuhJox92l0dWZLy6cUjFZVG3wVq6V6o1Gerga35pfveGkrrzbWGvHVG9RABO2fAmvhceXjkUIk5cOfW0bzMnlWphOawb3d84ZFOyUxH6aGjZSnwd452f9w53fpjg4GfOr5RTC/SDPWiaJa2CtMr78naIaEnaPgw8tP0TO7DzfFL5PLCH1/XigX3Ir6+pKrSOYGT0s3hWvbzH0feD2SZNanIHFkXFDcHKBl7hzJcPFQ04df1G0UAk68OVVds/WGSwN2xAOrpxmy3AxaF36qSu4rGuF7Z5AjNgNTtF3TIhoJ7taqREC6bnhnm7rE8mTNtdOcDXNRrvCnvKHQreln45gXtRNcbFt6QZHghNHtOaXWZPMv2gepeNwd+nBXZ3womYXZRSVo+EQOOFeGe4ukxJMGsfNny5YM45REcpGfRJy9dh29BpfIj+gIQd6gb1AQaJDXYwm5yHZC3x9QOfKeVu4C/w5DTGCP4XMQE3ozTBUgZdGOPMSAZqFYxHjuSBAkFxdYNngUXaMs1hZYj0+1UxvleBi0Xx9Qi4KvyDfdceIC456LPAJuHkkEQt3mXL3nvJBF3na/jEJkXVSznQgQJNqqsZCKYLxug6xQYOtswqH5FtYk1BOKQo5LqtEweNsRGVP32PsGysfcexmh+FkNZ+1dus61ZOKtf9Xn8HnkunvBsK7qM/2053krJtr/2Y65SdUugqt9W5pgAoHcFsoyZZwjqb3mppMeE44KW125th+8pOTY9Y9nqbLqwJNmsL5mzSDAZVjzw9zc3flHfrQ0wutZrb6w6390mopmvw/gczWlM2rxa0mjbvM8LXPJa4zzdVBe07eq7z3E3xv/4jowYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGP4P/AEtdRj2lx/aJAAAAAElFTkSuQmCC" class="card-img-top" alt="Logo de Empresa 1">
                                <div class="card-body">
                                    <h5 class="card-title">Casa Verde B&B</h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `;
            
            document.getElementById('capacitacionContainer').style.display = 'block';

            document.getElementById('addCompanyButton').addEventListener('click', function() {
                // Crear el fondo oscuro del modal
                var modalOverlay = document.createElement('div');
                modalOverlay.id = 'modalOverlay';
                
                // Crear el contenedor del modal
                var modalContainer = document.createElement('div');
                modalContainer.id = 'modalContainer';
                
                // Agregar campos y botón al modal
                modalContainer.innerHTML = `
                    <h2>Agregar Empresa</h2>
                    <label for="companyNameModal">Ingresa nombre de la empresa:</label>
                    <input type="text" id="companyNameModal" placeholder="Nombre de la empresa"><br>
                    <label for="companyImageModal">Inserta imagen empresa:</label>
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
