/**************************
* Initialize VanillaLb 
**************************/
var vanillaLb = new VanillaLb({
  resolution : 'low_resolution',
  instagramClientId : YOUR_INSTAGRAM_CLIENT_KEY,
  instagramTag : 'dog',
  imagesLoadedCallback : imagesLoaded
});


//Invoked as images load.  Used to show loading state.
var imagesLoadedCount = 0;

function imagesLoaded(){
 imagesLoadedCount++;
 if(imagesLoadedCount === vanillaLb.imageCount){
  vanillaLb.loadingToggle('hide');
 }
};

//Setup infinite scroll
//Prevent rapid repeated loading on scroll
var throttled = throttle(retrieveData, 1000);
window.onscroll = function(){
  var pageHeight = document.documentElement.scrollHeight; //max scrollable height
  var scrollPosition = document.documentElement.scrollTop || window.pageYOffset; //current scroll position
  var remainingHeight = document.documentElement.clientHeight; //remaining scrollable height

  if(pageHeight - (scrollPosition + remainingHeight) < vanillaLb.scrollHeight){
    throttled();
  }
};

/**************************
* Get data from instagram
**************************/
function retrieveData(url){
  vanillaLb.loadingToggle('show');
  url = url || vanillaLb.instagramNextUrl || vanillaLb.instagramUrl+'vanillaLb.getData';
  vanillaLb.getJsonP(url);
};

//Get initial data
retrieveData();


/**************************
* When dom is ready
**************************/
document.addEventListener('DOMContentLoaded', function() {
  //Show lightbox when photo is clicked
  document.getElementsByClassName('img-grid')[0].addEventListener('click', function(e) {
    vanillaLb.goToPhoto(e.target.dataset.index);
    vanillaLb.openLightbox();
  }, false);

  //Close lightbox and overlay
  var close = document.getElementsByClassName('close');
  for(var i = 0; i<close.length; i++){
    close[i].addEventListener('click', function(e) {
      vanillaLb.closeLightbox();
    });
  }

  //Search for tag
  var searchButton = document.getElementById('search-submit');
  searchButton.addEventListener('click', function(e){
    e.preventDefault();
    vanillaLb.resetLb(function(){
      imagesLoadedCount = 0;
      var tag = document.getElementById('search-box').value.replace(' ', '');
      vanillaLb.setInstagramTag(tag);
      retrieveData(vanillaLb.instagramUrl+'vanillaLb.getData');
    });
  });

  //Previous and Next buttons
  var next = document.getElementsByClassName('next');
  for(var i = 0; i<next.length; i++){

    next[i].addEventListener('click', function(e) {
      e.preventDefault();
      vanillaLb.next();
      retrieveData(vanillaLb.instagramNextUrl);      
    });
  }

  var prev = document.getElementsByClassName('prev');
  for(var i = 0; i<prev.length; i++){
    prev[i].addEventListener('click', function(e) {
      e.preventDefault();
      vanillaLb.goToPhoto(vanillaLb.currentImage-1);
    });
  }

  //Enable keyboard controls
  document.onkeyup = function(e){
  switch (e.keyCode) {
      case 37: //left arrow
        vanillaLb.prev();
        break;
      case 39: //right arrow
        vanillaLb.next();
        break;      
    }
  };

});//DOMContentLoaded

/**************************
* Utility Functions
**************************/

//Throttle based on underscores throttle method
function throttle(func, wait) {
  var context, args, result;
  var timeout = null;
  var previous = 0;

  var later = function() {
    previous = new Date;
    timeout = null;
    result = func.apply(context, args);
  };

  return function() {
    var now = new Date;
    if (!previous) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
