# PrintLearnSlider
## Instalations
- npm install - to install
- node minify.js - to minify script

##Usage
###arguments
- apiKey - api key (required)
- backgroundURL - background image url
- rootID - id of DOM element
- sliderType - type of slide (1-5)
- type5options - (color, bgColor, buttonText)
- sliderPerView - how much slides per one slide
- enablePreview - toggle image preview
- enableAutoHover - auto show background image
- hideTitle - hide title in product catd
- priceColor - change price color
- hidePrice - hide price from product cards
- imageLogo - show image in credits 
- allButton - show all button 
```javascript
ProductSlider({
    rootID: 'productSlider',
    apiKey: 'your-api-key',
    sliderType: 4,
    backgroundURL: 'https://printlean.com/store/img/photo-gallery/1.jpg',
    sliderPerView: {
        1200: 4,
        992: 3,
        768: 3,
        320: 1.5,
    },
    imageLogo: true,
    hideTitle: true,
    hidePrice: true,
    priceColor: '#dddddd',
    type5options: {
        color: 'red',
        bgColor: '#ddd',
        buttonText: 'print width'
    },
    bgToAll: true,
    allButton: {
        buttonText: 'See All Products',
        buttonColor: '#5ab6f8'
    }
});
```