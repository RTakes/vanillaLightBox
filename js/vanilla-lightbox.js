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
  this.instagramCallback = opt.instagramCallback || '';
  this.instagramUrl = 'https://api.instagram.com/v1/tags/'+encodeURIComponent(this.instagramTag.replace(/\W+/g, ''))+'/media/recent?client_id='+this.instagramClientId+'&callback=';
  this.instagramNextUrl = '';
  this.setInstagramTag = function(tag){
    if(tag && tag !== ''){
      tag = tag.replace(/\W+/g, '');
      this.instagramTag = encodeURIComponent(tag);
      this.instagramUrl = 'https://api.instagram.com/v1/tags/'+this.instagramTag+'/media/recent?client_id='+this.instagramClientId+'&callback=';
    }
  };
};

VanillaLb.prototype.resetLb = function(callback){
  document.getElementsByClassName('img-grid')[0].innerHTML = '';
  this.currentData = {};
  this.imageCount = 0;
  callback();
};

VanillaLb.prototype.getJsonP = function(url){

  var scriptTag = document.createElement('SCRIPT');
  scriptTag.type = 'text/javascript';
  scriptTag.src = url;

  document.getElementsByTagName('head')[0].appendChild(scriptTag);
}

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

    //Load more images
    if(this.imageCount - index <=2){
      this.loadingToggle('show');
      this.getJsonP(this.instagramNextUrl);
    }

    this.currentImage = parseInt(index);

    if(this.currentData.data[this.currentImage].caption){    
      var title = document.createElement('h3');
      title.classList.add('img-caption');
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
  if(!images || images.length === 0){
    alert('No photos matched your tag.  Please try again');
  }

  for(var i=0; i<images.length; i++){
    var dataIndex = 0;
    if(this.currentData.data.length > images.length){
      dataIndex = i+this.currentData.data.length-images.length;
    }else{
      dataIndex = i;
    }

    var li = document.createElement('li');
    li.className = 'photo-block';    
    li.dataset.index = dataIndex;

    var div = document.createElement('div');
    div.className = 'img-overlay';
    div.dataset.index = dataIndex; //iPhone fix


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


