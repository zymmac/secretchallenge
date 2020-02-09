/// Global variables

var area;
var volume;

/////////// Functions
//toggle checkbox typesSelection



function clickCheckBoxTypes(obj) {
  var type = $(obj).val();
  var boolChecked = $(obj).is(":checked")
  console.log("type: " + type + ". boolChecked: "+ boolChecked );
  addOrRemove(type, boolChecked);
  initTaskVariations(type, boolChecked);
  getID();
  initTaskCards(type, boolChecked);
};

function calculateAll() {
  evaluateAreaVol();
  showProducts();
  quantify();
}

function uncheckSelections () {
    $(":checked").each(function() {
        $(this).prop("checked",false);
    });
};

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
function addAllByType() {
  for (type in objTypes) {
    addByType(type);
  }
  allProducts = Object.assign({}, objTypes)
  for (type in allProducts) {
    removeByType(type);
  }
}

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
function addOrRemove(type, boolChecked) {

  if(boolChecked) {
    addByType(type);
  } else {
    removeByType(type);
  }
  console.log(objTypes);
}

// Show type selections and display products
function showProducts() {
  // $("#jumbo-Container").css("display","block");
  $("#typesSelection").css("display","block");
}

function hideProducts() {
  // $("#jumbo-Container").css("display","none");
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
  $('#poolImage').css("display","none");
  $('#poolDimensions').css("display","none");
  $('#poolTitle').css("display","none");
  $('#tabs').css("display","none");
}

// Reset Values
function resetPage() {
  $('.form-control').val("")
  $('#resultJumbotron').css("display",'none');
  $('#poolDimensions').css("display","");
  $('#poolImage').css("display","");
  $('#poolTitle').css("display","");
  $('#tabs').css("display","");
  hideProducts();
  clearProducts();
  uncheckSelections();
}


// Clear ObjDisplay and objTypes -> start over again
function clearProducts() {
  for (type in objTypes) {
    objTypes[type] = [];
    objDisplay[type] = [];
  };
  $('#jumbo-Container').html("");
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
  constructor(name, price, url, material, model, color, area, volume, type) {
    this.name = name;
    this.price = price;
    this.url = url;
    this.area = area;
    this.model = model;
    this.material = material;
    this.color = color;
    this.volume = volume;
    this.type = type;
  }
}

//
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
listProducts.push(new Product("Bomba A", 400, "products_img/LED_Light_ABS_37_blu.png",undefined,"4 HP",undefined,undefined,24,"Filter"));

var allProducts;

// Type Object

var objTypes = {
  Lighting: [],
  Cleaning: [],
  Filter: [],
  WaterCare: [],
  Heaters: []
};

// Creating object to get unique variations to create radio form

var objVariations = {
  Lighting: {},
  Cleaning: {},
  Filter: {},
  WaterCare: {},
  Heaters: {}
};

var arrKinds = ['material',
                'model',
                'color'
                ];

//FUNCTION uniqueVariations
function uniqueVariations() {

  for (type in objVariations) {
    arrKinds.forEach(kind => {
      objVariations[type][kind] = [];
      for (productKey in allProducts[type]) {
        if(objVariations[type][kind].indexOf(allProducts[type][productKey][kind]) === -1) {
          objVariations[type][kind].push(allProducts[type][productKey][kind]);
        };
      };
    });
  };
}


function getProperties() {
    arr = $(this).prop("id").split("-");
    var x = arr.pop();
    x = x.slice(0,x.length-1);
    arr.push(x);
    arr.push($(this).val());
    return arr;
}


// task create radio forms for variations

var variationsContainer;

let createTaskKindForm = (type, kind) => {

  var p = document.createElement("p");
  p.id = "title-"+kind;

  var strong = document.createElement("strong");
  strong.innerText = kind;

  variationsContainer.appendChild(p);
  p.appendChild(strong)

  for (var i = 0; i < objVariations[type][kind].length; i++) {

    var div = document.createElement("div");
    div.className = "custom-control custom-radio custom-control-inline";

    var input = document.createElement("input");
    input.type = "radio";
    input.name = type+"-"+kind;
    input.id = type+"-"+kind+i;
    input.className = "custom-control-input";
    input.value = objVariations[type][kind][i];

    var label = document.createElement("label");
    label.className = "custom-control-label"
    label.htmlFor = input.id;
    label.innerText = objVariations[type][kind][i];

    variationsContainer.appendChild(div);
    div.appendChild(input);
    div.appendChild(label);

  }
  var br = document.createElement("br");
  variationsContainer.appendChild(br);
}


// Toggle variations
function removeVariations(type, kind, variation) {

  for (var i = 0; i < objTypes[type].length; i++) {
    if (objTypes[type][i][kind] !== variation) {
      objTypes[type].splice(i, 1);
      i = i - 1
    }
  }
}


// Create Cards of Products

var jumboContainer;
var cardContainer;

let createTaskJumbo = (type) => {

  let divJumbo = document.createElement('div');
  divJumbo.className = "jumbotron";
  divJumbo.id = "jumbo-"+type;

  var title = document.createElement("h1");
  title.innerText = type;
  title.className = "mb-2";

  var spanVariations = document.createElement('span');
  spanVariations.id = "variations-"+type;

  let cardDeck = document.createElement("div");
  cardDeck.className = "card-deck";

  let row = document.createElement("div");
  row.className = "row";
  row.id = "card-Container-"+type

  jumboContainer.appendChild(divJumbo);
  divJumbo.appendChild(title);
  divJumbo.appendChild(spanVariations);
  divJumbo.appendChild(cardDeck);
  cardDeck.appendChild(row);

}

let createTaskCard = (product) => {


    let grid = document.createElement('div');
    grid.className = 'col col-6 col-sm-4 col-md-3 col-lg-2 mb-3';

    let card = document.createElement('div');
    card.className = 'card';

    let image = document.createElement('img');
    image.src = product.url;
    image.className = 'card-img-top';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = product.name;
    title.className = 'card-title';

    let price = document.createElement('p');
    price.innerText = Math.ceil(product.quantity)+"x "+ product.price+"€";
    price.className = 'card-text';


    cardContainer.appendChild(grid);
    grid.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(price);

}

let initTaskVariations = (type, boolChecked) => {
    // Delete All Cards
    if(!boolChecked){
    $('#jumbo-'+type).remove();
    } else {
    // Create cards from listProducts
    jumboContainer = document.getElementById('jumbo-Container');
    // for (type in allProducts) {
      // if (allProducts[type].length > 0) {
        createTaskJumbo(type);
        arrKinds.forEach(kind => {
          variationsContainer = document.getElementById("variations-"+type)
          if(objVariations[type][kind].length > 1) {

            createTaskKindForm(type, kind);
          };
        });
      // }
    // }
  }
};

let initTaskCards = (type, boolChecked) => {
    if(!boolChecked){
    $('#card-Container-'+type).remove();
  } else {
    // for (type in objTypes) {
      if (objTypes[type].length > 0) {
        var arrProductsinType = objTypes[type];
        arrProductsinType.forEach((product) => {
        cardContainer = document.getElementById('card-Container-'+type);
        createTaskCard(product);
        });
      }
    // }
  }
};


function getID() {
  $(document).ready(function() {
    $(':radio').click(function() {
        var variation = $(this).attr('value');
        tempArr = $(this).attr("id").split("-")
        var kind = tempArr[1].slice(0,tempArr[1].length - 1)
        var type = tempArr[0]
        objDisplay[type][kind] = variation;
        console.log(objDisplay);
        iterateRemoveVariations(type);
        initTaskCards(type);
      });
  });
}

var objDisplay = {
  Lighting: {},
  Cleaning: {},
  Filter: {},
  WaterCare: {},
  Heaters: {}
};

function iterateRemoveVariations(type) {
  objTypes[type] = allProducts[type].slice(0, allProducts[type].length);
  for (key in objDisplay[type]) {
    var kind = key
    var variation = objDisplay[type][key]
    removeVariations(type, kind, variation)
  }
}

addAllByType();
uniqueVariations();

function showStates() {
  console.log(objTypes);
  console.log(allProducts);
  console.log(objVariations);
  console.log(objDisplay);
}
showStates();
