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

// Calculate

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

listProducts.push(new Product("Led Light", 40, "testeurl"));
listProducts.push(new Product("Central System", 90, "testeurl2"));
