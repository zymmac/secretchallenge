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
function addByTag(tag) {
  for (var i = 0; i < listProducts.length; i++) {
    if (listProducts[i].tags === tag) {
      arrTags[tag].push(listProducts[i])
    }
  }
}

function removeByTag(tag) {
  arrTags[tag] = [];
}

  // Checkbox OnChange addByTag or removeByTag functions if checked
function addOrRemove(obj) {
  var tag = $(obj).val();
  if($(obj).is(":checked")) {
    addByTag(tag);
  } else {
    removeByTag(tag);
  }
  console.log(arrTags);
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
  area = 'area'+ format + '()';
  volume = 'volume' + format + '()';
  $('#formatText').text(format);
  $('#formatArea').text(Math.round(eval(area)*100)/100);
  $('#formatVolume').text(Math.round(eval(volume))*1000);
  $('#resultJumbotron').css("display",'block');
}

// Reset Values
function resetValues() {
  $('.form-control').val("")
}


//Products
var listProducts = [];

class Product {
  constructor(name, price, url, material, size, color, area, volume, tags) {
    this.name = name;
    this.price = price;
    this.url = url;
    this.area = area;
    this.size = size;
    this.material = material;
    this.color = color;
    this.volume = volume;
    this.tags = tags;
  }

  quantityByArea(formatArea) {
    return Math.ceil(formatArea / this.area);
  };

  quantityByVolume(formatVolume) {
    return Math.ceil(formatVolume / this.volume);
  };

  createVariations(key,arr) {
    this[key] = arr[0];
    for (var i = 1; i < arr.length; i++) {
      var newVariation = Object.create(this);
      newVariation[key] = arr[i];
      listProducts.push(newVariation);
    }
  }
}

listProducts.push(new Product("Led Light", 40, "testeurl.png","ABS","37 LED", "blue",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 45, "testeurl.png","Stainless steel","37 LED", "blue",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 40, "testeurl.png","ABS","37 LED", "RGB",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 45, "testeurl.png","Stainless steel","37 LED", "RGB",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 60, "testeurl.png","ABS","70 LED", "blue",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 65, "testeurl.png","Stainless steel","70 LED", "blue",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 60, "testeurl.png","ABS","70 LED", "RGB",6,undefined,"Lighting"));
listProducts.push(new Product("Led Light", 65, "testeurl.png","Stainless steel","70 LED", "RGB",6,undefined,"Lighting"));
listProducts.push(new Product("Plastico Bolha", 10, "testeurl.png","Plastico","300 micra", "blue",1,undefined,"Heaters"));

// Tags Arrays

var arrTags = {
  Lighting: [],
  Cleaning: [],
  Filter: [],
  WaterCare: [],
  Heaters: []
};
