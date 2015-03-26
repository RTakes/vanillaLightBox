
var options = {
  resolution : 'standard_resolution',
  currentImage: 0
};

/**************************
* Get data from instagram
**************************/
var scriptTag = document.createElement('SCRIPT');
scriptTag.type = 'text/javascript';
scriptTag.src = url;

document.getElementsByTagName('head')[0].appendChild(scriptTag);

//Called as jsonp response
function getData(data){
  if(data.meta.code = 200){
    options.currentData = data;
    buildImgGrid(data);
  }else{
    console.error(data.meta.code+': '+ data.meta.error_message);
  }
};


/**************************
* When dom is ready
**************************/
document.addEventListener("DOMContentLoaded", function() {

  //Show lightbox when photo is clicked
  document.getElementsByClassName('img-grid')[0].addEventListener('click', function(e) {
    console.log(e.target.dataset.index);
    goToPhoto(e.target.dataset.index);
    openLightbox();
  });

  //Close lightbox and overlay
  var close = document.getElementsByClassName('close');
  for(var i = 0; i<close.length; i++){
    close[i].addEventListener('click', function(e) {
      closeLightbox();
    });
  }

  //Previous and Next buttons
  var next = document.getElementsByClassName('next');
  for(var i = 0; i<next.length; i++){
    next[i].addEventListener('click', function(e) {
      e.preventDefault();
      goToPhoto(options.currentImage+1);
    });
  }

  var prev = document.getElementsByClassName('prev');
  for(var i = 0; i<prev.length; i++){
    prev[i].addEventListener('click', function(e) {
      e.preventDefault();
      goToPhoto(options.currentImage-1);
    });
  }
});


/**************************
* Lightbox functions
**************************/
function buildImgGrid(data){
  //instagram resolution options: low_resolution, standard_resolution, thumbnail 
  resolution = options.resolution; 

  for(var i=0; i<data.data.length; i++){

    var li = document.createElement('li');
    li.className = 'photo-block';

    var img = document.createElement('img');
    img.src = data.data[i].images[resolution].url;
    img.dataset.index = i;

    li.appendChild(img);
    li.dataset.icon= 'some-attribute';
    document.getElementsByClassName('img-grid')[0].appendChild(li);
  }
};

//Opens overlay and lightbox
function openLightbox(){
  var elements = document.getElementsByClassName('lb');
  for(var i=0; i<elements.length; i++) {
    elements[i].classList.add('active');
  }
};

//Close Lightbox
function closeLightbox(){
  var elements = document.getElementsByClassName('lb');
  for(var i=0; i<elements.length; i++) {
    elements[i].classList.remove('active');
  }
  clearLightbox();
};

//Empties the lightbox
function clearLightbox(){
  document.getElementsByClassName('img-frame')[0].innerHTML = '';
};

//Accepts an array of image objects and the index of the image.
//returns an image element
function goToPhoto(index){
  options.currentImage = parseInt(index);
  var img = document.createElement('img');
  img.src = options.currentData.data[options.currentImage].images[options.resolution].url;
  img.dataset.index = index;

  clearLightbox();
  document.getElementsByClassName('img-frame')[0].appendChild(img);
};






//var imgUrl = 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/10553976_398730420307916_1998452567_n.jpg';
//getImg(imgUrl);


//Returns image dom element
// function getImg(url){        
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', imgUrl, true);
//   xhr.responseType = 'blob';

//   xhr.onload = function(e) {
//     if (this.status == 200) {
//       var blob = this.response;

//       var img = document.createElement('img');
//       img.onload = function(e) {
//         window.URL.revokeObjectURL(img.src); // Clean up after yourself.
//       };
//       img.src = window.URL.createObjectURL(blob);
//       return img;     
//     }
//   };

//   xhr.send();
// };




