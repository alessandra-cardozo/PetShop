document.addEventListener('DOMContentLoaded', function() {
    fetch('./dados/produtos.json')
        .then(response => response.json())
        .then(products => {
            const carouselItemsContainer = document.getElementById("carouselItems");

           
            for (let i = 0; i < products.length; i += 2) {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("carousel-item");
                if (i === 0) itemDiv.classList.add("active"); 
                
               
                const rowDiv = document.createElement("div");
                rowDiv.classList.add("row", "text-center", "mt-4");

            
                const col1 = document.createElement("div");
                col1.classList.add("col-md-6", "text-center");
                col1.innerHTML = `
                    <img src="${products[i].image}"  alt="${products[i].name}">
                    <h5>${products[i].name}</h5>
                    <p>${products[i].price}</p>
                `;
                rowDiv.appendChild(col1);

                
                if (i + 1 < products.length) {
                    const col2 = document.createElement("div");
                    col2.classList.add("col-md-6", "text-center");
                    col2.innerHTML = `
                        <img src="${products[i + 1].image}" alt="${products[i + 1].name}">
                        <h5>${products[i + 1].name}</h5>
                        <p>${products[i + 1].price}</p>
                    `;
                    rowDiv.appendChild(col2);
                }

                itemDiv.appendChild(rowDiv);
                carouselItemsContainer.appendChild(itemDiv);
            }
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});
