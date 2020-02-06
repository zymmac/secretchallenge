/// Global variables

var area;
var volume;

/////////// Functions

// Change Active Tab
$(function() {
   $(".tab").click(function() {
      // remove classes from all
      $(".tab").removeClass("active");
      // add class to the one we clicked
      $(this).addClass("active");
   });
});

  // Add or Remove Products to listProducts by tag
function addByType(type) {
  for (var i = 0; i < listProducts.length; i++) {
    if (listProducts[i].type === type) {
      objTypes[type].push(listProducts[i])
    }
  }
}

function removeByType(type) {
  objTypes[type] = [];
}

  // Checkbox OnChange addByType or removeByType functions if checked
function addOrRemove(obj) {
  var type = $(obj).val();
  if($(obj).is(":checked")) {
    addByType(type);
  } else {
    removeByType(type);
  }
  console.log(objTypes);
}

// Show type selections and display products
function showProducts() {
  $("#jumbo-Container").css("display","block");
  $("#typesSelection").css("display","block");
}

function hideProducts() {
  $("#jumbo-Container").css("display","none");
  $("#typesSelection").css("display","none");
}

/////// Show/Hide Form Inputs

// Show/Hide Rectangular
function activeRectangular() {
$('.form-group').css("display","none");
$('.form-group.Rectangular').css("display","block");
$('.form-group.Depth').css("display","block");
$('#calculateBtn').attr("href", "#Rectangular")
$('#poolImage').attr("src", "poolRectangular.png")
}

// Show/Hide Round
function activeRound() {
$('.form-group').css("display","none");
$('.form-group.Round').css("display","block");
$('.form-group.Depth').css("display","block");
$('#calculateBtn').attr("href", "#Round")
$('#poolImage').attr("src", "poolRound.png")
}

// Show/Hide Oval
function activeOval() {
$('.form-group').css("display","none");
$('.form-group.Oval').css("display","block");
$('.form-group.Depth').css("display","block");
$('#calculateBtn').attr("href", "#Oval")
$('#poolImage').attr("src", "poolOval.png")
}

// Calculate Area and Volume

// Calculate Rectangular
function areaRectangular() {
    var Len = $('#measureLen').val();
    var Wid = $('#measureWid').val();
    return Len*Wid;
}

function volumeRectangular() {
  var DepS = $('#measureDepS').val();
  var DepD = $('#measureDepD').val();
  if (DepD === "") {
    DepD = DepS;
  }
  return areaRectangular()*(Number(DepD)+Number(DepS))/2
}

// Calculate Round
function areaRound() {
    var Dia = $('#measureDia').val();
    return Math.PI*(Number(Dia)/2)**2
}

function volumeRound() {
  var DepS = $('#measureDepS').val();
  var DepD = $('#measureDepD').val();
  if (DepD === "") {
    DepD = DepS;
  }
  return areaRound()*(Number(DepD)+Number(DepS))/2
}

// Calculate Oval
function areaOval() {
    var SLen = $('#measureSLen').val();
    var LLen = $('#measureLLen').val();
    return Math.PI*(Number(SLen)/2)*(Number(LLen/2));
}

function volumeOval() {
  var DepS = $('#measureDepS').val();
  var DepD = $('#measureDepD').val();
  if (DepD === "") {
    DepD = DepS;
  }
  return areaOval()*(Number(DepD)+Number(DepS))/2
}

//////// Results

// Volume and Area
function evaluateAreaVol() {
  format = $('#calculateBtn').attr('href').slice(1);
  areaFunc = 'area'+ format + '()';
  volumeFunc = 'volume' + format + '()';
  $('#formatText').text(format);

  area = eval(areaFunc);
  volume = eval(volumeFunc);

  $('#formatArea').text((Math.round(area)*100)/100);
  $('#formatVolume').text(Math.round(volume)*1000);
  $('#resultJumbotron').css("display",'block');
}

// Reset Values
function resetValues() {
  $('.form-control').val("")
  $('#resultJumbotron').css("display",'none');
}

// Calculate quantities

function quantify() {

    for (productKey in listProducts){
      product = listProducts[productKey];
      if (product.area) {
        product.quantity = (area / product.area);
      } else if (product.volume) {
        product.quantity = (volume / product.volume);
      };
    };
};

//Products
var listProducts = [];

class Product {
  constructor(name, price, url, material, size, color, area, volume, type) {
    this.name = name;
    this.price = price;
    this.url = url;
    this.area = area;
    this.size = size;
    this.material = material;
    this.color = color;
    this.volume = volume;
    this.type = type;
  }

  createVariations(key,arr) {
    this[key] = arr[0];
    for (var i = 1; i < arr.length; i++) {
      var newVariation = Object.create(this);
      newVariation[key] = arr[i];
      listProducts.push(newVariation);
    }
  }
}

listProducts.push(new Product("Led Light", 40, "products_img/LED_Light_ABS_37_blu.png","ABS","37 LED", "blue",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 45, "products_img/LED_Light_ABS_37_blu.png","Stainless steel","37 LED", "blue",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 40, "products_img/LED_Light_ABS_37_blu.png","ABS","37 LED", "RGB",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 45, "products_img/LED_Light_ABS_37_blu.png","Stainless steel","37 LED", "RGB",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 60, "products_img/LED_Light_ABS_37_blu.png","ABS","70 LED", "blue",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 65, "products_img/LED_Light_ABS_37_blu.png","Stainless steel","70 LED", "blue",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 60, "products_img/LED_Light_ABS_37_blu.png","ABS","70 LED", "RGB",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 65, "products_img/LED_Light_ABS_37_blu.png","Stainless steel","70 LED", "RGB",6,undefined,"Lighting"));
listProducts.push(new Product("Plastico Bolha", 10, "products_img/LED_Light_ABS_37_blu.png","Plastico","300 micra", "blue",1,undefined,"Heaters"));
listProducts.push(new Product("Bomba A", 300, "products_img/LED_Light_ABS_37_blu.png",undefined,"2 HP",undefined,undefined,24,"Filter"));

// Type Object

var objTypes = {
  Lighting: [],
  Cleaning: [],
  Filter: [],
  WaterCare: [],
  Heaters: []
};

// Create Cards of Products

var jumboContainer;
var cardContainer;

let createTaskJumbo = (type) => {

  let divJumbo = document.createElement('div');
  divJumbo.className = "jumbotron"

  var title = document.createElement("h1");
  title.innerText = type;
  title.className = "mb-2"

  let cardDeck = document.createElement("div");
  cardDeck.className = "card-deck";

  let row = document.createElement("div");
  row.className = "row";
  row.id = "card-Container-"+type

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
    image.src = arrTag.url;
    image.className = 'card-img-top';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = arrTag.name;
    title.className = 'card-title';

    let price = document.createElement('p');
    price.innerText = arrTag.quantity+"x "+ arrTag.price+"€";
    price.className = 'card-text';


    cardContainer.appendChild(grid);
    grid.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(price);

}

let initListOfProducts = () => {
    // Delete All Cards
    $('#jumbo-Container').html("");
    // Create cards from listProducts
    jumboContainer = document.getElementById('jumbo-Container');
    for (type in objTypes) {
      if (objTypes[type].length > 0) {
        createTaskJumbo(type);
        var arrProductsinType = objTypes[type];
        arrProductsinType.forEach((arrTag) => {
        cardContainer = document.getElementById('card-Container-'+type);
        createTaskCard(arrTag);
        });
      }
    }
};

initListOfProducts();
