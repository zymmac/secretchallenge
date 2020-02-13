/////////////////////// VARIABLES AND CONSTANTS ///////////////////
/// CONSTANTS
let arrKinds = [
  'material',
  'model',
  'color'
];

let arrTypes = [
  'Lighting',
  'Cleaning',
  'Filter',
  'WaterCare',
  'Heaters',
]
/// GLOBAL VARIABLES
// Math
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
// Variations
var getVariation;
var getKind;
var getSubtype;
var getType;


/// OBJECTS AND ARRAYS
var objAllProducts = {};
var objDisplay = {};
var objVariations = {};

var arrListProducts = [];

//////////////////////////////// CLASSES /////////////////////////////////////

class Product {
  constructor(name, price, url, material, model, color, area, volume, type, subtype) {
    this.name = name;
    this.price = price;
    this.url = url;
    this.material = material;
    this.model = model;
    this.color = color;
    this.area = area;
    this.volume = volume;
    this.type = type;
    this.subtype = subtype;
  }
}

/////////////////////////////// FUNCTIONS ////////////////////////////////////

/////////////////// MATH FUNCTIONS //////////////////////////////////////

function largestLength() {
  switch (format) {
    case "Round":
      return Number(diameter);
      break;
    case "Rectangular":
      return Math.hypot(width, length);
      break;
    case "Oval":
      return Number(Math.max(longLength,shortLength));
    default:
      return -1;
      break;
  }
}

function shortestLengthToCenter() {
  switch (format) {
    case "Round":
      return Number(diameter/2);
      break;
    case "Rectangular":
      return Number(Math.min(width, length) / 2);
      break;
    case "Oval":
      return Number(Math.min(longLength, shortLength) / 2);
    default:
      return -1;
      break;
  }
}

function averageDepth() {
  shallowDepth = $('#measureDepS').val();
  deepDepth= $('#measureDepD').val();
  if (deepDepth === "") {
    deepDepth = shallowDepth;
  }
  return (Number(deepDepth)+Number(shallowDepth))/2
}

////////////// Calculate Rectangular/////////////
function areaRectangular() {
    length = $('#measureLen').val();
    width = $('#measureWid').val();
    return length * width;
}

function volumeRectangular() {
  return areaRectangular() * averageDepth();
}

/////////// Calculate Round///////////////////////
function areaRound() {
    diameter = $('#measureDia').val();
    return Math.PI*(Number(diameter)/2)**2
}

function volumeRound() {
  return areaRound() * averageDepth();
}

////////// Calculate Oval///////////////////////
function areaOval() {
    shortLength = $('#measureSLen').val();
    longLength = $('#measureLLen').val();
    return Math.PI*(Number(shortLength)/2)*(Number(longLength/2));
}

function volumeOval() {
  return areaOval() * averageDepth();
}

function evaluateAreaVol() {
  format = $('#calculateBtn').attr('href').slice(1);
  area = eval('area'+ format + '()');
  volume = eval('volume' + format + '()');
}

//////////// Number format /////////////////////
function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//////////////////////////// INTERACTIVITY /////////////////////////
////////// Dimensions Form ////////////

///TABS////

$(function() {
  // Change Active Tab. No need to call it.
   $(".tab").click(function() {
      // remove classes from all
      $(".tab").removeClass("active");
      // add class to the one we clicked
      $(this).addClass("active");
   });
});

function activeRectangular() {
  $('.form-group').css("display","none");
  $('.form-group.Rectangular').css("display","block");
  $('.form-group.Depth').css("display","block");
  $('#calculateBtn').attr("href", "#Rectangular")
  $('#poolImage').attr("src", "poolRectangular.png")
}

function activeRound() {
  $('.form-group').css("display","none");
  $('.form-group.Round').css("display","block");
  $('.form-group.Depth').css("display","block");
  $('#calculateBtn').attr("href", "#Round")
  $('#poolImage').attr("src", "poolRound.png")
}

function activeOval() {
  $('.form-group').css("display","none");
  $('.form-group.Oval').css("display","block");
  $('.form-group.Depth').css("display","block");
  $('#calculateBtn').attr("href", "#Oval")
  $('#poolImage').attr("src", "poolOval.png")
}

/// BUTTONS ///
function calculateButton() {
  evaluateAreaVol();
  displayResults();
  showCheckboxTypes();
  quantify();
  // Disable calculate button
  $('#calculateBtn').addClass("disabled");
}

function resetButton() {
  // Clear all text inputs
  $('.form-control').val("")
  // Clear all result jumbotrons
  $('#jumbo-Container').html("");
  hideResults();
  hideCheckboxTypes();
  uncheckSelections();
  // reset product objects and variables
  resetVariables();
  // Enable calculate button
  $('#calculateBtn').removeClass("disabled");
}

function displayResults() {
  // Text from Results
  $('#formatText').text(format);
  $('#formatArea').text((Math.round(area)*100)/100);
  $('#formatVolume').text(numberWithCommas(Math.round(volume)*1000));
  // Show resultJumbotron
  $('#resultJumbotron').css("display",'block');
  // Hide Dimensions Form
  $('#poolImage').css("display","none");
  $('#poolDimensions').css("display","none");
  $('#poolTitle').css("display","none");
  $('#tabs').css("display","none");
}

function hideResults() {
  // Clear Text from Results
  $('#formatText').text("");
  $('#formatArea').text("");
  $('#formatVolume').text("");
  // Hide resultJumbotron
  $('#resultJumbotron').css("display",'none');
  // Show Dimensions Form (default css: display: "block";)
  $('#poolImage').css("display","");
  $('#poolDimensions').css("display","");
  $('#poolTitle').css("display","");
  $('#tabs').css("display","");
}

function showCheckboxTypes() {
  $("#typesSelection").css("display","block");
}

function hideCheckboxTypes() {
  $("#typesSelection").css("display","none");
}

function clickCheckBoxTypes(obj) {
  // Runs when user clicks checkbox from types
  var type = $(obj).val();
  var boolChecked = $(obj).is(":checked")
  // Will display products if checked or clear if unchecked
  fillObjDisplay();
  initTaskJumbo(type, boolChecked);
  if (boolChecked) {
    initTaskVariations(type);
    initTaskCards(type);
    setOnClickRadioFunc();
  } else{
    uncheckRadioSelections(type);
    uniqueVariations(type);
  }
}


function setOnClickRadioFunc() {
  // get attributes from radio input clicked and store in variables get+[type, kind and variation]
  $(document).ready(function() {
    $(':radio').click(function() {
      getVariation = $(this).attr('value');
      tempArr = $(this).attr("id").split("-");
      getKind = tempArr[2].slice(0,tempArr[2].length - 1);
      getType = tempArr[0];
      getSubtype = tempArr[1];
      console.log("clicked in "+getVariation);
      variationSelectedByRadio();
      fillObjDisplay();
      refreshTaskCards(getType, getSubtype);
    });
  });
}



function uncheckSelections () {
  // Clear ALL user selections (checkbox and radio inputs)
    $(":checked").each(function() {
        $(this).prop("checked",false);
    });
};

function uncheckRadioSelections(type) {
  var name = $(":radio:checked").prop("name")
  if (!name) {return}
  if (type === name.slice(0,type.length)) {
    $(":radio:checked").each(function() {
        $(this).prop("checked",false);
    });
  };
};




function resetVariables() {
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
}

//////////////////// ARRAYS AND OBJECTS /////////////////////////////////

function structureObj(obj, structure) {
  arrListProducts.forEach(product => {
    type = product.type;
    subtype = product.subtype;
    if(!obj.hasOwnProperty(type)) {
      obj[type] = {};
    }
    if(!obj[type].hasOwnProperty(subtype)) {
      if(structure === "{}") {
       obj[type][subtype] = {};
     } else {
        obj[type][subtype] = [];
      }
    };
  });
};

function structureObjVariations() {
  structureObj(objVariations, "{}");
  arrKinds.forEach(kind => {
    for (type in objVariations) {
      for (subtype in objVariations[type]) {
        objVariations[type][subtype][kind] = [];
      }
    }
  });
  objVariations = JSON.parse(JSON.stringify(objVariations));
}



function fillObjAllProducts() {
  structureObj(objAllProducts,"[]");
  arrListProducts.forEach(product => {
    type = product.type;
    subtype = product.subtype;
    objAllProducts[type][subtype].push(product);
  });
  // console.log(objAllProducts);
};




function fillObjVariations() {
  structureObjVariations();
  uniqueVariations();
  objVariations = JSON.parse(JSON.stringify(objVariations));
}


function fillObjDisplay() {
  objDisplay = {};
  structureObj(objDisplay,"[]");

  for (type in objAllProducts) {
    for (subtype in objAllProducts[type]) {
      objAllProducts[type][subtype].forEach(product => {
        var add = true;
        arrKinds.forEach((kind, i) => {
          variation = product[kind];
          add = add * ( (!variation) || (objVariations[type][subtype][kind].indexOf(variation) > -1) )
        });
        if(add) {
          objDisplay[type][subtype].push(product);
        }
      });
    };
  };
  // objDisplay = JSON.parse(JSON.stringify(objDisplay));
};



function initObjects() {
  fillObjAllProducts();
  fillObjVariations();
  fillObjDisplay();
}


function quantify() {
  // Calculate quantities and add to attr arrListProducts.quantity
  for (i in arrListProducts){
    product = arrListProducts[i];
    if (product.area) {
      product.area = eval(product.area)
      product.quantity = (area / product.area);
    } else if (product.volume) {
      product.volume = eval(product.volume)
      product.quantity = (volume / product.volume);
    };
  };
};

//FUNCTION uniqueVariations
function uniqueVariations(type) {
  if(type === undefined) {
    console.log("Undefined");
    arrListProducts.forEach(product => {
      type = product.type;
      subtype = product.subtype;
      arrKinds.forEach(kind => {
        // console.log(product.name+ " - "+ kind + ": " + product[kind]);
        variation = product[kind];
        if (objVariations[type][subtype][kind].indexOf(variation) === -1) {
          objVariations[type][subtype][kind].push(variation);
        };
      });
    });
  } else {

    for (subtype in objAllProducts[type]) {

      objVariations[type][subtype] = {};
      arrKinds.forEach(kind => {
        objVariations[type][subtype][kind] = [];
        objAllProducts[type][subtype].forEach(product => {
          variation = product[kind];
          if (objVariations[type][subtype][kind].indexOf(variation) === -1) {
            objVariations[type][subtype][kind].push(variation);
          };
        });
      });
    }
  };
};

function variationSelectedByRadio() {
  objVariations[getType][getSubtype][getKind] = getVariation;
}




//Products


// arrListProducts.push(new Product(name, price, "products_img/, material, model, color, area, volume, type));
arrListProducts.push(new Product("Algaecide", 5.45, "products_img/algaecide_1l.png", undefined, undefined, undefined, undefined, (1 / 0.02), "WaterCare","Algaecide"));
arrListProducts.push(new Product("Algaecide", 21.99, "products_img/algaecide_5l.png", undefined, undefined, undefined, undefined, (5 / 0.02), "WaterCare", "Algaecide"));
arrListProducts.push(new Product("All-in-one Pool Care Kit", 8.99, "products_img/all_in_one_pool_care_kit.png", undefined, undefined, undefined, "area", undefined, "WaterCare", "Kit"));
arrListProducts.push(new Product("Chlorine", 40, "products_img/chlorine_granular_10kg.jpg", undefined, undefined, undefined, undefined, (10 / 0.36), "WaterCare", "Chlorine"));
arrListProducts.push(new Product("Chlorine", 12, "products_img/chlorine_tablets_200g.jpg", undefined, undefined, undefined, undefined, (0.2 / 0.36), "WaterCare", "Chlorine"));
arrListProducts.push(new Product("Control Box RGB", 54.95, "products_img/control_box_RGB.png", undefined, undefined, "RGB", "area", undefined, "Lighting", "control Box"));
arrListProducts.push(new Product("Flocculant", 4.90, "products_img/flocculant_1l.png", undefined, undefined, undefined, undefined, (1 / 0.02), "WaterCare", "Flocculant"));
arrListProducts.push(new Product("Flocculant", 23.15, "products_img/flocculant_5l.jpg", undefined, undefined, undefined, undefined,(5 / 0.02), "WaterCare", "Flocculant"));
arrListProducts.push(new Product("Handle Brush", 10, "products_img/handle_brush_plastic.png", "plastic", undefined, undefined, "area", undefined, "Cleaning", "Brush"));
arrListProducts.push(new Product("Hose", 1.99, "products_img/hose.png", undefined, undefined, undefined, "area / Math.hypot(largestLength()+1, deepDepth)", undefined, "Cleaning", "Hose"));
arrListProducts.push(new Product("Leaf Skimmer", 8.79, "products_img/leaf_skimmer_metal.png", "plastic", undefined, undefined, "area", undefined, "Cleaning", "Skimmer"));
arrListProducts.push(new Product("Leaf Skimmer", 12.95, "products_img/leaf_skimmer_metal.png", "aluminium alloy", undefined, undefined, "area", undefined, "Cleaning", "Skimmer"));
arrListProducts.push(new Product("LED Light", 45, "products_img/LED_pool_light_LED37_RGB_abs.png", "ABS", "LED 37", "RGB", 4, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 55, "products_img/LED_pool_light_61pratic_RGB_abs.png", "ABS", "61 Pratic", "RGB", 6, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 40, "products_img/LED_pool_light_LED37_blue_abs.png", "ABS", "LED 37", "blue", 4, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 46, "products_img/LED_pool_light_LED37_blue_stainless.png", "stainless steel", "LED 37", "blue", 4, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 49, "products_img/LED_pool_light_LED37_RGB_stainless.png", "stainless steel", "LED 37", "RGB", 4, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 60, "products_img/LED_pool_light_LED70_blue_abs.png", "ABS", "LED 70", "blue", 7, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 65, "products_img/LED_pool_light_LED70_RGB_abs.png", "ABS", "LED 70", "RGB", 7, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 69, "products_img/LED_pool_light_LED70_RGB_stainless.jpg", "stainless steel", "LED 70", "RGB", 7, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 75, "products_img/LED_pool_light_LED130_RGB_abs.png", "ABS", "LED 130", "RGB", 9, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("LED Light", 60, "products_img/LED_pool_light_mega_white_abs.png", "ABS", "Mega LED", "white", 8, undefined, "Lighting", "LED Light"));
arrListProducts.push(new Product("Sand Filter", 90, "products_img/sand_filter_DFR11.png", undefined, undefined, undefined, undefined, "if(volume<17.6){volume}else{Infinity}", "Filter", "Filter"));
arrListProducts.push(new Product("Sand Filter", 98, "products_img/sand_filter_DFR12.png", undefined, undefined, undefined, undefined, "if(volume<21.6){volume}else{Infinity}", "Filter", "Filter"));
arrListProducts.push(new Product("Sand Filter", 109, "products_img/sand_filter_DFR15.png", undefined, undefined, undefined, undefined, "if(volume<32){volume}else{Infinity}", "Filter", "Filter"));
arrListProducts.push(new Product("Sand Filter", 119, "products_img/sand_filter_DFR19.png", undefined, undefined, undefined, undefined, "if(volume<56){volume}else{Infinity}", "Filter", "Filter"));
arrListProducts.push(new Product("Sand Filter", 129, "products_img/sand_filter_DFR22.png", undefined, undefined, undefined, undefined, "if(volume<78.4){volume}else{Infinity}", "Filter", "Filter"));
arrListProducts.push(new Product("Sand Filter", 140, "products_img/sand_filter_DFR24.png", undefined, undefined, undefined, undefined, "if(volume<88){volume}else{Infinity}", "Filter", "Filter"));
arrListProducts.push(new Product("Solar Controller", 42, "products_img/solar_controller.jpg", undefined, undefined, undefined, "area", undefined, "Heaters", "Solar Controller"));
arrListProducts.push(new Product("Solar Panels", 10, "products_img/solar_panels.jpg", undefined, undefined, undefined, 3, undefined, "Heaters", "solar Panels"));
arrListProducts.push(new Product("Solar Pool Cover", 4, "products_img/solar_pool_cover_black_4mil.png", undefined, "4mil", "black", 1, undefined, "Heaters", "Solar Pool Cover"));
arrListProducts.push(new Product("Solar Pool Cover", 7, "products_img/solar_pool_cover_black_8mil.jpg", undefined, "8mil", "black", 1, undefined, "Heaters", "Solar Pool Cover"));
arrListProducts.push(new Product("Solar Pool Cover", 4, "products_img/solar_pool_cover_blue_4mil.jpg", undefined, "4mil", "blue", 1, undefined, "Heaters", "Solar Pool Cover"));
arrListProducts.push(new Product("Solar Pool Cover", 7, "products_img/solar_pool_cover_blue_8mil.jpg", undefined, "8mil", "blue", 1, undefined, "Heaters", "Solar Pool Cover"));
arrListProducts.push(new Product("Telescopic Pole", 3, "products_img/telescopic_pole.png", undefined, undefined, undefined, "area / Math.hypot(shortestLengthToCenter() + 1,deepDepth)", undefined, "Cleaning", "Telescopic Pole"));
arrListProducts.push(new Product("Vacuum Head", 12, "products_img/vacuum_head_3wheels.jpg", undefined, undefined, undefined, "if(area<1250){area}else{Infinity}" , undefined, "Cleaning", "Vacuum Head"));
arrListProducts.push(new Product("Vacuum Head", 39, "products_img/vacuum_head_16wheel_olympic.jpg", undefined, undefined, undefined, "area", undefined, "Cleaning", "Vacuum Head"));
arrListProducts.push(new Product("Water Pump", 250, "products_img/water_pump_pf17.png", undefined, undefined, undefined, undefined, "if(volume<147.2){volume}else{Infinity}", "Filter", "Water Pump"));
arrListProducts.push(new Product("Water Pump", 300, "products_img/water_pump_pf22.png", undefined, undefined, undefined, undefined, "if(volume<260.8){volume}else{Infinity}", "Filter", "Water Pump"));






// Create Cards of Products

var jumboContainer;
var subtypeContainer;
var variationsContainer;
var cardContainer;









let initTaskJumbo = (type, boolChecked) => {
  if(!boolChecked){
    $('#jumbo-'+type).remove();
  } else {
    jumboContainer = document.getElementById('jumbo-Container');
      createTaskJumbo(type);
  };
}

let createTaskJumbo = (type) => {

  let divJumbo = document.createElement('div');
  divJumbo.className = "jumbotron";
  divJumbo.id = "jumbo-"+type;

  var title = document.createElement("h1");
  title.innerText = type;
  title.className = "mb-2";

  var divSubtype = document.createElement('div');
  divSubtype.id = type+"-Container";

  jumboContainer.appendChild(divJumbo);
  divJumbo.appendChild(title);
  divJumbo.appendChild(divSubtype);

}



let initTaskVariations = (type) => {
  for (subtype in objDisplay[type]) {
    subtypeContainer = document.getElementById(type+"-Container")
    createTaskSubtypes(type, subtype);

    variationsContainer = document.getElementById(type + "-" + subtype + "-variations-Container")

    arrKinds.forEach(kind => {
      if (objVariations[type][subtype][kind].length > 1) {
        createTaskVariations(type, subtype, kind);
      }
    });
  };
};



let createTaskSubtypes = (type, subtype) => {

  var nameSubtype = document.createElement("h3");
  nameSubtype.innerText = subtype;

  var divVariations = document.createElement("div")
  divVariations.id = type + "-" + subtype + "-variations-Container"

  var divCards = document.createElement("div")
  divCards.id = type + "-" + subtype + "-cards-Container"

  subtypeContainer.appendChild(nameSubtype);
  subtypeContainer.appendChild(divVariations);
  subtypeContainer.appendChild(divCards);

}


let createTaskVariations = (type, subtype, kind) => {

  var strong = document.createElement("strong");

  var p = document.createElement("p");
  p.innerText = kind;

  variationsContainer.appendChild(strong);
  strong.appendChild(p);

  for (var i = 0; i < objVariations[type][subtype][kind].length; i++) {

    var div = document.createElement("div");
    div.className = "custom-control custom-radio custom-control-inline";

    var input = document.createElement("input");
    input.type = "radio";
    input.name = type+"-"+subtype+"-"+kind;
    input.id = type+"-"+subtype+"-"+kind+i;
    input.className = "custom-control-input";
    input.value = objVariations[type][subtype][kind][i];

    var label = document.createElement("label");
    label.className = "custom-control-label"
    label.htmlFor = input.id;
    label.innerText = input.value;


    variationsContainer.appendChild(div);
    div.appendChild(input);
    div.appendChild(label);

  }

  var br = document.createElement("br");

  variationsContainer.appendChild(br);
}

let initTaskCards = (type) => {

  for (subtype in objDisplay[type]) {
    cardContainer = document.getElementById(type + "-" + subtype + "-cards-Container")
    objDisplay[type][subtype].forEach(product => {
      createTaskCard(product);
    });
  };
};

let refreshTaskCards = (type, subtype) => {
  document.getElementById(type + "-" + subtype + "-cards-Container").innerHTML = "";
  cardContainer = document.getElementById(type + "-" + subtype + "-cards-Container");
  objDisplay[type][subtype].forEach(product => {
    createTaskCard(product);
  });
};

// task create cards
let createTaskCard = (product) => {

  let cardDeck = document.createElement("div");
  cardDeck.className = "card-deck";

  let row = document.createElement("div");
  row.className = "row";
  row.id = type+"-"+subtype+"-card-Container-";

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


    cardContainer.appendChild(cardDeck);
    cardDeck.appendChild(row);
    row.appendChild(grid);
    grid.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(price);

}







initObjects();
