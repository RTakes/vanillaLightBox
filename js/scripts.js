//https://api.instagram.com/v1/tags/cat/media/recent


var scriptTag = document.createElement('SCRIPT');
scriptTag.type = 'text/javascript';
scriptTag.src = url;

 
document.getElementsByTagName('head')[0].appendChild(scriptTag);

function getData(data){
  //console.log(data);
  for(var i=0; i<data.data.length; i++){
    var img = data.data[i];
    displayImg(img.images.standard_resolution.url);
  }
};

function displayImg(src){
  var img = document.createElement('img');
  var li = document.createElement('li');
  li.className = 'photo-block';
  img.src = src;
  li.appendChild(img);
  li.dataset.icon= 'some-attribute';
  document.getElementsByClassName('img-grid')[0].appendChild(li);
};

//Wait for dom to be ready
document.addEventListener("DOMContentLoaded", function() {
  // Get the element, add a click listener...
  document.getElementsByClassName('img-grid')[0].addEventListener('click', function(e) {
    console.log(e.target);

    var el = document.querySelector('.lb-overlay');
    el.className = el.className+' active';

    // If it was a list item
    if(e.target && e.target.nodeName == "LI") {
      // List item found!  Output the ID!
      console.log("List item ", e.target.id.replace("post-"), " was clicked!");
    }
  });
});

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




