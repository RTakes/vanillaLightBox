var VanillaLb = function(opt){
  this.resolution = opt.resolution || 'standard_resolution';
  this.currentImage = 0;
  this.currentData = {};
  this.previousData = [];
  this.imageCount = 0;
  this.instagramTag = opt.instagramTag || 'cat';
  this.instagramUrl = 'https://api.instagram.com/v1/tags/'+this.instagramTag+'/media/recent?client_id=';

};

//Use this function as the jsonp callback from instagram
VanillaLb.prototype.getData = function(gallery){
  if(gallery.meta.code = 200){
    if(!this.currentData.meta){
      this.currentData = gallery;  
    }else{
      //Save previous image set then load more images
      this.previousData.push(this.currentData);
      this.currentData = gallery;
      //this.currentData.data = this.currentData.data.concat(gallery.data);
    }
    
    this.imageCount = this.currentData.data.length;
    buildImgGrid(this.currentData.data);
  }else{
    console.error(data.meta.code+': '+ data.meta.error_message);
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

    var title = document.createElement('h3');
    title.innerHTML = this.currentData.data[this.currentImage].caption.text;

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