/**************************
* Initialize VanillaLb 
**************************/

var vanillaLb = new VanillaLb({
  resolution : 'low_resolution',
  instagramTag : 'dog' 
});


/**************************
* Get data from instagram
**************************/

//var clientId = 'YOUR CLIENT ID';

function requestUrl(baseUrl, clientId, cbName){
  return baseUrl+''+clientId+'&callback='+cbName;
};

function retrieveData(url){
  if(!url){
    var baseUrl = vanillaLb.instagramUrl;
    var url = requestUrl( baseUrl, clientId, 'vanillaLb.getData'); 
  }

  var scriptTag = document.createElement('SCRIPT');
  scriptTag.type = 'text/javascript';
  scriptTag.src = url;

  document.getElementsByTagName('head')[0].appendChild(scriptTag);
};

retrieveData();

//Get next set of photos
// console.log(vanillaLb.currentData.pagination.next_url);
// retrieveData(vanillaLb.currentData.pagination.next_url);



/**************************
* When dom is ready
**************************/
document.addEventListener("DOMContentLoaded", function() {
  //Show lightbox when photo is clicked
  document.getElementsByClassName('img-grid')[0].addEventListener('click', function(e) {
    vanillaLb.goToPhoto(e.target.dataset.index);
    vanillaLb.openLightbox();
  });

  //Close lightbox and overlay
  var close = document.getElementsByClassName('close');
  for(var i = 0; i<close.length; i++){
    close[i].addEventListener('click', function(e) {
      vanillaLb.closeLightbox();
    });
  }

  //Previous and Next buttons
  var next = document.getElementsByClassName('next');
  for(var i = 0; i<next.length; i++){

    next[i].addEventListener('click', function(e) {
      e.preventDefault();
      vanillaLb.next();
    });
  }

  var prev = document.getElementsByClassName('prev');
  for(var i = 0; i<prev.length; i++){
    prev[i].addEventListener('click', function(e) {
      e.preventDefault();
      vanillaLb.goToPhoto(vanillaLb.currentImage-1);
    });
  }
});


/**************************
* Page setup functions
**************************/
function buildImgGrid(data){
  //instagram resolution options: low_resolution, standard_resolution, thumbnail 
  resolution = vanillaLb.resolution; 
  var images = vanillaLb.currentData.data;

  for(var i=0; i<images.length; i++){

    var li = document.createElement('li');
    li.className = 'photo-block';

    var img = document.createElement('img');
    img.src = images[i].images[resolution].url;
    img.dataset.index = i;

    li.appendChild(img);
    document.getElementsByClassName('img-grid')[0].appendChild(li);
  }
};