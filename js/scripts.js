//https://api.instagram.com/v1/tags/cat/media/recent


var scriptTag = document.createElement('SCRIPT');
scriptTag.type = 'text/javascript';
scriptTag.src = url;

 
document.getElementsByTagName('head')[0].appendChild(scriptTag);

function getData(data){
    console.log(data.pagination);
    for(var i=0; i<data.data.length; i++){
        var img = data.data[i];
        displayImg(img.images.standard_resolution.url);
    }
}

function displayImg(src){
    var img = document.createElement('img');
    var li = document.createElement('li');
    li.className = 'photo-block'
    img.src = src;
    li.appendChild(img);
    document.getElementsByClassName('image-list')[0].appendChild(li);
}