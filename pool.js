/// Global variables

var area;
var volume;
var width;
var length;
var shortLength;
var longLength;
var shallowDepth;
var deepDepth;
var diameter;
var format;

/////////// Functions
//toggle checkbox typesSelection
function largestLength() {
  switch (format) {
    case "Round":
      return Number(diameter);
      break;
    case "Rectangular":
      return Math.hypot(width, length);
      break;
    case "Oval":
      return Number(longLength);
    default:
      return -1;
      break;
  }
}

function numberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
  $('#calculateBtn').addClass("disabled");
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
    length = $('#measureLen').val();
    width = $('#measureWid').val();
    return length*width;
}

function volumeRectangular() {
  shallowDepth = $('#measureDepS').val();
  deepDepth= $('#measureDepD').val();
  if (deepDepth === "") {
    deepDepth = shallowDepth;
  }
  return areaRectangular()*(Number(deepDepth)+Number(shallowDepth))/2
}

// Calculate Round
function areaRound() {
    diameter = $('#measureDia').val();
    return Math.PI*(Number(diameter)/2)**2
}

function volumeRound() {
  shallowDepth = $('#measureDepS').val();
  deepDepth = $('#measureDepD').val();
  if (deepDepth === "") {
    deepDepth = shallowDepth;
  }
  return areaRound()*(Number(deepDepth)+Number(shallowDepth))/2
}

// Calculate Oval
function areaOval() {
    shortLength = $('#measureSLen').val();
    longLength = $('#measureLLen').val();
    return Math.PI*(Number(shortLength)/2)*(Number(longLength/2));
}

function volumeOval() {
  shallowDepth = $('#measureDepS').val();
  deepDepthD = $('#measureDepD').val();
  if (deepDepth === "") {
    deepDepth = shallowDepth;
  }
  return areaOval()*(Number(deepDepth)+Number(shallowDepth))/2
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
  $('#formatVolume').text(numberWithCommas(Math.round(volume)*1000));
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
  $('#calculateBtn').removeClass("disabled");
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
        product.area = eval(product.area)
        product.quantity = (area / product.area);
      } else if (product.volume) {
        product.volume = eval(product.volume)
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
    this.material = material;
    this.model = model;
    this.color = color;
    this.area = area;
    this.volume = volume;
    this.type = type;
  }
}

//
let price = 99.99;
let inf = Number.MAX_SAFE_INTEGER;

// listProducts.push(new Product(name, price, "products_img/, material, model, color, area, volume, type));
listProducts.push(new Product("Algaecide", 5.45, "products_img/algaecide_1l.png", undefined, undefined, undefined, undefined, (1 / 0.02), "WaterCare"));
listProducts.push(new Product("Algaecide", 21.99, "products_img/algaecide_5l.png", undefined, undefined, undefined, undefined, (5 / 0.02), "WaterCare"));
listProducts.push(new Product("All-in-one Pool Care Kit", 8.99, "products_img/all_in_one_pool_care_kit.png", undefined, undefined, undefined, "area", undefined, "WaterCare"));
listProducts.push(new Product("Chlorine", 40, "products_img/chlorine_granular_10kg.jpg", undefined, undefined, undefined, undefined, (10 / 0.36), "WaterCare"));
listProducts.push(new Product("Chlorine", 12, "products_img/chlorine_tablets_200g.jpg", undefined, undefined, undefined, undefined, (0.2 / 0.36), "WaterCare"));
listProducts.push(new Product("Control Box RGB", 54.95, "products_img/control_box_RGB.png", undefined, undefined, "RGB", "area", undefined, "Lighting"));
listProducts.push(new Product("Flocculant", 4.90, "products_img/flocculant_1l.png", undefined, undefined, undefined, undefined, (1 / 0.02), "WaterCare"));
listProducts.push(new Product("Flocculant", 23.15, "products_img/flocculant_5l.jpg", undefined, undefined, undefined, undefined,(5 / 0.02), "WaterCare"));
listProducts.push(new Product("Handle Brush", 10, "products_img/handle_brush_plastic.png", "plastic", undefined, undefined, "area", undefined, "Cleaning"));
listProducts.push(new Product("Hose", 1.99, "products_img/hose.png", undefined, undefined, undefined, "area / Math.hypot(largestLength()+1, deepDepth)", undefined, "Cleaning"));
listProducts.push(new Product("Leaf Skimmer", 8.79, "products_img/leaf_skimmer_metal.png", "plastic", undefined, undefined, "area", undefined, "Cleaning"));
listProducts.push(new Product("Leaf Skimmer", 12.95, "products_img/leaf_skimmer_metal.png", "aluminium alloy", undefined, undefined, "area", undefined, "Cleaning"));
listProducts.push(new Product("LED Light", 45, "products_img/LED_pool_light_LED37_RGB_abs.png", "ABS", "LED 37", "RGB", 4, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 55, "products_img/LED_pool_light_61pratic_RGB_abs.png", "ABS", "61 Pratic", "RGB", 6, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 40, "products_img/LED_pool_light_LED37_blue_abs.png", "ABS", "LED 37", "blue", 4, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 46, "products_img/LED_pool_light_LED37_blue_stainless.png", "stainless steel", "LED 37", "blue", 4, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 49, "products_img/LED_pool_light_LED37_RGB_stainless.png", "stainless steel", "LED 37", "RGB", 4, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 60, "products_img/LED_pool_light_LED70_blue_abs.png", "ABS", "LED 70", "blue", 7, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 65, "products_img/LED_pool_light_LED70_RGB_abs.png", "ABS", "LED 70", "RGB", 7, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 69, "products_img/LED_pool_light_LED70_RGB_stainless.jpg", "stainless steel", "LED 70", "RGB", 7, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 75, "products_img/LED_pool_light_LED130_RGB_abs.png", "ABS", "LED 130", "RGB", 9, undefined, "Lighting"));
listProducts.push(new Product("LED Light", 60, "products_img/LED_pool_light_mega_white_abs.png", "ABS", "Mega LED", "white", 8, undefined, "Lighting"));
listProducts.push(new Product("Sand Filter", 90, "products_img/sand_filter_DFR11.png", undefined, undefined, undefined, undefined, "if(volume<17.6){volume}else{Infinity}", "Filter"));
listProducts.push(new Product("Sand Filter", 98, "products_img/sand_filter_DFR12.png", undefined, undefined, undefined, undefined, "if(volume<21.6){volume}else{Infinity}", "Filter"));
listProducts.push(new Product("Sand Filter", 109, "products_img/sand_filter_DFR15.png", undefined, undefined, undefined, undefined, "if(volume<32){volume}else{Infinity}", "Filter"));
listProducts.push(new Product("Sand Filter", 119, "products_img/sand_filter_DFR19.png", undefined, undefined, undefined, undefined, "if(volume<56){volume}else{Infinity}", "Filter"));
listProducts.push(new Product("Sand Filter", 129, "products_img/sand_filter_DFR22.png", undefined, undefined, undefined, undefined, "if(volume<78.4){volume}else{Infinity}", "Filter"));
listProducts.push(new Product("Sand Filter", 140, "products_img/sand_filter_DFR24.png", undefined, undefined, undefined, undefined, "if(volume<88){volume}else{Infinity}", "Filter"));
listProducts.push(new Product("Solar Controller", 42, "products_img/solar_controller.jpg", undefined, undefined, undefined, "area", undefined, "Heaters"));
listProducts.push(new Product("Solar Panels", 10, "products_img/solar_panels.jpg", undefined, undefined, undefined, 3, undefined, "Heaters"));
listProducts.push(new Product("Solar Pool Cover", 4, "products_img/solar_pool_cover_black_4mil.png", undefined, "4mil", "black", 1, undefined, "Heaters"));
listProducts.push(new Product("Solar Pool Cover", 7, "products_img/solar_pool_cover_black_8mil.jpg", undefined, "8mil", "black", 1, undefined, "Heaters"));
listProducts.push(new Product("Solar Pool Cover", 4, "products_img/solar_pool_cover_blue_4mil.jpg", undefined, "4mil", "blue", 1, undefined, "Heaters"));
listProducts.push(new Product("Solar Pool Cover", 7, "products_img/solar_pool_cover_blue_8mil.jpg", undefined, "8mil", "blue", 1, undefined, "Heaters"));
listProducts.push(new Product("Telescopic Pole", 3, "products_img/telescopic_pole.png", undefined, undefined, undefined, "area / Math.hypot(largestLength() + 1,deepDepth)", undefined, "Cleaning"));
listProducts.push(new Product("Vacuum Head", 12, "products_img/vacuum_head_3wheels.jpg", undefined, undefined, undefined, "if(area<1250){area}else{Infinity}" , undefined, "Cleaning"));
listProducts.push(new Product("Vacuum Head", 39, "products_img/vacuum_head_16wheel_olympic.jpg", undefined, undefined, undefined, "area", undefined, "Cleaning"));
listProducts.push(new Product("Water Pump", 250, "products_img/water_pump_pf17.png", undefined, undefined, undefined, undefined, "if(volume<147.2){volume}else{Infinity}", "Filter"));
listProducts.push(new Product("Water Pump", 300, "products_img/water_pump_pf22.png", undefined, undefined, undefined, undefined, "if(volume<260.8){volume}else{Infinity}", "Filter"));





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
    console.log("type: "+ type + ". boolean: " + boolChecked)
    if(!boolChecked){
    $('#card-Container-'+type).remove();
  } else {
    // for (type in objTypes) {
      $('#card-Container-'+type).html("");
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
        console.log("inside getID. Type :" + type);
        initTaskCards(type, true);
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
