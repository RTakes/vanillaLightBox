var VanillaLb = function(opt){
  this.resolution = opt.resolution || 'standard_resolution';
  this.currentImage = 0;
  this.currentData = {};
  this.previousData = [];
  this.imageCount = 0;
  this.imagesLoadedCallback = opt.imagesLoadedCallback || null;
  this.scrollHeight = opt.scrolllHeight || 100;
  this.instagramClientId = opt.instagramClientId,
  this.instagramTag = opt.instagramTag || 'cat';
  this.instagramUrl = 'https://api.instagram.com/v1/tags/'+this.instagramTag+'/media/recent?client_id='+this.instagramClientId+'&callback=';
  this.instagramNextUrl = '';

  function initializeDomElements(){
    var ul = document.createElement('ul');
    ul.classList.add('img-grid');

    var lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

  } 

  //initialize elements
  //ul.img-grid
  //div.lightbox.lb
    //nav.lb-nav
    //div.img-frame  
  //div.lb-overlay.lb

};

//Use this function as the jsonp callback from instagram
VanillaLb.prototype.getData = function(gallery){
  if(gallery.meta.code = 200){
    if(!this.currentData.meta){
      this.currentData = gallery;  
    }else{
      //Save previous image set then load more images
      this.previousData.push(this.currentData);
      //this.currentData = gallery;
      this.currentData.data = this.currentData.data.concat(gallery.data);
    }
    
    this.instagramNextUrl = gallery.pagination.next_url;
    this.imageCount = this.imageCount + gallery.data.length;
    this.buildImgGrid(gallery.data);
  }else{
    console.error(data.meta.code+': '+ data.meta.error_message);
  }
};

VanillaLb.prototype.loadingToggle = function(action){
  action  = action || 'show';

  var elements = document.getElementsByClassName('loading');
  for(var i=0; i<elements.length; i++) {
    if(action === 'show'){
      elements[i].classList.add('active');
    }else{
     elements[i].classList.remove('active'); 
    }
  }
};

//Opens overlay and lightbox
VanillaLb.prototype.openLightbox = function(){
  var elements = document.getElementsByClassName('lb');
  for(var i=0; i<elements.length; i++) {
    elements[i].classList.add('active');
  }
};

//Close Lightbox
VanillaLb.prototype.closeLightbox = function(){
  var elements = document.getElementsByClassName('lb');
  for(var i=0; i<elements.length; i++) {
    elements[i].classList.remove('active');
  }
  this.clearLightbox();
};

//Empties the lightbox
VanillaLb.prototype.clearLightbox = function(){
  document.getElementsByClassName('img-frame')[0].innerHTML = '';
};

//Accepts an array of image objects and the index of the image.
//returns an image element
VanillaLb.prototype.goToPhoto = function(index){
  if(index>=0 && index<this.imageCount){
    this.currentImage = parseInt(index);

    if(this.currentData.data[this.currentImage].caption){    
      var title = document.createElement('h3');
      title.innerHTML = this.currentData.data[this.currentImage].caption.text;
    }

    var img = document.createElement('img');
    img.src = this.currentData.data[this.currentImage].images[this.resolution].url;
    img.dataset.index = index;

    this.clearLightbox();
    document.getElementsByClassName('img-frame')[0].appendChild(title);
    document.getElementsByClassName('img-frame')[0].appendChild(img);
  }else{
    //no more photos in this direction
    console.log('no more photos');
  }
};

//Advance to the next photo
VanillaLb.prototype.next = function(){
  this.goToPhoto(this.currentImage+1);
};

//Move back to the previous photo
VanillaLb.prototype.prev = function(){
  this.goToPhoto(this.currentImage-1);
};


//Setup and append to the page
VanillaLb.prototype.buildImgGrid = function(images){
  for(var i=0; i<images.length; i++){

    var li = document.createElement('li');
    li.className = 'photo-block';
    if(this.currentData.data.length > images.length){
      li.dataset.index = i+this.currentData.data.length-images.length;
    }else{
      li.dataset.index = i;
    }

    var div = document.createElement('div');
    div.className = 'img-overlay';

    var img = document.createElement('img');
    img.src = images[i].images[this.resolution].url;

    if(this.imagesLoadedCallback){
      img.onload = this.imagesLoadedCallback;
    }
     
    li.appendChild(div);
    li.appendChild(img);
    document.getElementsByClassName('img-grid')[0].appendChild(li);
  }
};


