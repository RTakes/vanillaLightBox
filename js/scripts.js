/**************************
* Initialize VanillaLb 
**************************/
var imagesLoadedCount = 0;

var vanillaLb = new VanillaLb({
  resolution : 'low_resolution',
  instagramClientId : clientId,
  instagramTag : 'dog',
  imagesLoadedCallback : imagesLoaded
});

function imagesLoaded(){
 imagesLoadedCount++;
 if(imagesLoadedCount === vanillaLb.imageCount){
  vanillaLb.loadingToggle('hide');
 }
};


//Prevent rapid repeaded loading on scroll
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
  
  if(!url){
    var url = vanillaLb.instagramNextUrl || vanillaLb.instagramUrl+'vanillaLb.getData';
  }

  var scriptTag = document.createElement('SCRIPT');
  scriptTag.type = 'text/javascript';
  scriptTag.src = url;

  document.getElementsByTagName('head')[0].appendChild(scriptTag);
};

retrieveData();


/**************************
* When dom is ready
**************************/
document.addEventListener("DOMContentLoaded", function() {
  //Show lightbox when photo is clicked
  document.getElementsByClassName('img-grid')[0].addEventListener('click', function(e) {
    vanillaLb.goToPhoto(e.path[1].dataset.index);
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
});

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
