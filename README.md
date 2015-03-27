#Vanilla Lightbox
## An instagram lightbox written in vanilla javascript
####[http://ricktakes.com/sandbox/vanilla_lightbox](http://ricktakes.com/sandbox/vanilla_lightbox)

Vanilla Lightbox displays a gallery of images based on an instagram tag.  Users can search via tag.  

###Features
1. Infinite scroll to load images
2. Use mouse keys to advance photos in lightbox
3. Auto load photos when users approach last remaining images in lightbox

###Setup
Minimum setup example:

```javascript
var vanillaLb = new VanillaLb({ instagramClientId :YOUR_INSTAGRAM_CLIENT_KEY});
```

Options Example:

```javascript
// Initialize VanillaLb 
var vanillaLb = new VanillaLb({
  resolution : 'low_resolution',
  instagramClientId : YOUR_INSTAGRAM_CLIENT_KEY,
  instagramTag : 'dog',
  imagesLoadedCallback : imagesLoaded
});

//Invoked as images load.  Used to show loading state.
var imagesLoadedCount = 0;

//Images loaded callback
function imagesLoaded(){
 imagesLoadedCount++;
 if(imagesLoadedCount === vanillaLb.imageCount){
  vanillaLb.loadingToggle('hide');
 }
};
```
    
###Roadmap
- Better loading detection
- Animation effects for lightbox

