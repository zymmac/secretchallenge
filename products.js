var listProducts = [{
        "title": "Led Light - Blue",
        "price": "Price 40€",
        "src": "products_img/LED_Light_ABS_37_blu.png"
    },
    {
        "title": "Led Light - RGB",
        "price": "Price 30€",
        "src": "products_img/LED_Light_ABS_37_rgb.png"
      },
      {
          "title": "Control Box - RGB",
          "price": "Price 90€",
          "src": "products_img/Control_Box_RGB.png"
        },
        {
            "title": "Led Light - RGB",
            "price": "Price 30€",
            "src": "products_img/LED_Light_ABS_37_rgb.png"
    }
];

let cardContainer;

let createTaskCard = (listProducts) => {


    let grid = document.createElement('div');
    grid.className = 'col col-6 col-sm-4 col-md-3 col-lg-2 mb-3';

    let card = document.createElement('div');
    card.className = 'card';

    let image = document.createElement('img');
    image.src = listProducts.src;
    image.className = 'card-img-top';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = listProducts.title;
    title.className = 'card-title';

    let price = document.createElement('p');
    price.innerText = listProducts.price;
    price.className = 'card-text';


    card.appendChild(image);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    card.appendChild(cardBody);
    grid.appendChild(card);
    cardContainer.appendChild(grid);

}

let initListOfProducts = () => {
    if (cardContainer) {
        document.getElementById('card-Container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.getElementById('card-Container');
    listProducts.forEach((listProducts) => {
        createTaskCard(listProducts);
    });
};

initListOfProducts();
