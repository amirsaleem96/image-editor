var canvas;
var stage;
var image;
var imageData;
var bitmap;
function getImageData(){
  console.log('working...');
  var imageUrl = getQueryStringValue('imageUrl');
   try {
     getRequest(
       baseURL+'/getImageData', {
         imageUrl: imageUrl
       }, showImage
     );
   } catch (e) {
     alert('An error has occured');
     console.log(e);
   }
}
var showImage = function(res) {
  imageData = res.data;
  init();
}

function init() {
  canvas = document.getElementById("image-bg");
  stage = new createjs.Stage(canvas);
  image = new Image();
  image.src = imageData;
  image.onload = makeBitmap;
}

function makeBitmap() {
  bitmap = new createjs.Bitmap(image);
  stage.addChild(bitmap);
  stage.update();
}

$(document).ready(function(){
 getImageData();
});
