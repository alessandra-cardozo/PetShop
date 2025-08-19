document.addEventListener('DOMContentLoaded', function() {
    fetch('./dados/servicos.json')
        .then(response => response.json())
        .then(data => {
            const servicesContainer = document.getElementById('servicesContainer');
            data.forEach(service => {
                const card = `
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card h-100">
                            <img src="${service.image}" class="card-img-top" alt="${service.name}" />
                            <div class="card-body">
                                <h5 class="card-title">${service.name}</h5>
                                <p class="card-text">${service.description}</p>
                                 ${service.name === 'Tele-Busca' ? 
                                '<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#teleBuscaModal">Agendar</button>' : 
                                '<button class="btn btn-primary">Saiba Mais</button>'
                            }
                            </div>
                        </div>
                    </div>
                `;
                servicesContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error loading the services:', error));
});