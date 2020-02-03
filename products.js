var tasks = [{
        "title": "Led Light",
        "price": "Price 40€",
        "src": "products_img/LED_Light_ABS_37_blu.png"
    },
    {
        "title": "Central",
        "price": "Price 30€",
        "src": "products_img/LED_Light_ABS_37_blu.png"
    }
];

let cardContainer;

let createTaskCard = (task) => {

    // let row = document.createElement('div')
    // row.className = 'row'

    let grid = document.createElement('div');
    grid.className = 'col col-6 col-sm-4 col-md-3 col-lg-2 mb-3';

    let card = document.createElement('div');
    card.className = 'card';

    let image = document.createElement('img');
    image.src = task.src;
    image.className = 'card-img-top';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = task.title;
    title.className = 'card-title';

    let price = document.createElement('p');
    price.innerText = task.price;
    price.className = 'card-text';


    card.appendChild(image);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    card.appendChild(cardBody);
    grid.appendChild(card);
    // row.appendChild(grid)
    cardContainer.appendChild(grid);

}

let initListOfTasks = () => {
    if (cardContainer) {
        document.getElementById('card-Container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.getElementById('card-Container');
    tasks.forEach((task) => {
        createTaskCard(task);
    });
};

initListOfTasks();
