var listProducts = {
  Lighting: [{
              title: "Led Light - Blue",
              price: "Price 40€",
              src: "products_img/LED_Light_ABS_37_blu.png"
            },
            {
              title: "Led Light - RGB",
              price: "Price 30€",
              src: "products_img/LED_Light_ABS_37_rgb.png"
            }],
    Solar: [{
              title: "Control Box - RGB",
              price: "Price 90€",
              src: "products_img/Control_Box_RGB.png"
            },
            {
              title: "Led Light - RGB",
              price: "Price 30€",
              src: "products_img/LED_Light_ABS_37_rgb.png"
            }]
      };



var jumboContainer;
var cardContainer;

let createTaskJumbo = (tag) => {

  console.log(tag)

  let divJumbo = document.createElement('div');
  divJumbo.className = "jumbotron"

  var title = document.createElement("h1");
  title.innerText = tag;
  title.className = "mb-4"

  let cardDeck = document.createElement("div");
  cardDeck.className = "card-deck";

  let row = document.createElement("div");
  row.className = "row";
  row.id = "card-Container-"+tag

  jumboContainer.appendChild(divJumbo);
  divJumbo.appendChild(title);
  divJumbo.appendChild(cardDeck);
  cardDeck.appendChild(row);

}

let createTaskCard = (arrTag) => {


    let grid = document.createElement('div');
    grid.className = 'col col-6 col-sm-4 col-md-3 col-lg-2 mb-3';

    let card = document.createElement('div');
    card.className = 'card';

    let image = document.createElement('img');
    image.src = arrTag.src;
    image.className = 'card-img-top';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = arrTag.title;
    title.className = 'card-title';

    let price = document.createElement('p');
    price.innerText = arrTag.price;
    price.className = 'card-text';


    cardContainer.appendChild(grid);
    grid.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(price);

}

// let resetCardContainer = () => {
//
//   let.divId = document.createElement('div');
//   divId.className = "row";
//   divId.id = "card-Container"
//
// }

let initListOfProducts = () => {
    // Delete All Cards
    $('#card-Container').html("");
    // Create cards from listProducts
    jumboContainer = document.getElementById('jumbo-Container');
    for (tag in listProducts) {
      console.log(tag);
      createTaskJumbo(tag);
      var arrProductsofTag = listProducts[tag];
      arrProductsofTag.forEach((arrTag) => {
      cardContainer = document.getElementById('card-Container-'+tag);
      createTaskCard(arrTag);
      });
    }

};

initListOfProducts();
