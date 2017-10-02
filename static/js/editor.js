var canvas;
var stage;
var image;
var imageData;
var bitmap;
var container;
var bitmapContainer;
function getImageData(){
  var imageUrl = getQueryStringValue('imageUrl');
   try {
     getRequest(
       baseURL+'/getImageData', {
         imageUrl: imageUrl
       }, showImage,
       null,
       function(){
         $(".loader-wrapper").css({"display":"flex"});
       }
     );
   } catch (e) {
     alert('An error has occured');
     console.log(e);
   }
}
var showImage = function(res) {
  imageData = res.data;
  init();
};

function init() {
  canvas = document.getElementById("image-bg");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  stage = new createjs.Stage(canvas);
  container = new createjs.Container();
  bitmapContainer = new createjs.Container();
  image = new Image();
  image.src = imageData;
  image.onload = loadBitmap;
}

function loadBitmap() {
  $(".loader-wrapper").css({"display":"none"});
  bitmap = new createjs.Bitmap(image);
  bitmapContainer.addChild(bitmap);
  container.addChild(bitmapContainer);
  stage.addChild(container);
  var containerBounds = container.getBounds();
  if(image.height > image.width) {
    if(containerBounds.width > canvas.width || containerBounds.height > canvas.height) {
       container.scaleX = container.scaleY = image.width / image.height;
    }
  } else {
    if(containerBounds.width > canvas.width || containerBounds.height > canvas.height) {
       container.scaleX = container.scaleY = image.height / image.width;
    }
  }
  container.x = (canvas.width - bitmap.image.width * container.scaleX)/2;
  container.y = (canvas.height - bitmap.image.height * container.scaleY)/2;
  stage.update();
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function blobToObjectURL(blob) {
  return URL.createObjectURL(blob);
}

var downloadCanvas =  function(){
      var link = document.getElementById("download");
      var imgData = document.getElementById("image-bg").toDataURL({format: 'png',multiplier: 4});
      var strDataURI = imgData.substr(22, imgData.length);
      var blob = dataURLtoBlob(imgData);
      var objurl = blobToObjectURL(blob);
      link.download = "edited-image.png";
      link.href = objurl;
};


$(document).ready(function(){
 //getImageData();
 $("#download").on("click", function(){
   downloadCanvas();
 });
});
