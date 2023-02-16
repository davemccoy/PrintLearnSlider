
class ScriptLoader {
    constructor (options) {
        const { src, global, protocol = document.location.protocol } = options
        this.src = src
        this.global = global
        this.protocol = protocol
        this.isLoaded = false
    }

    loadScript () {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `${this.protocol}//${this.src}`
            const el = document.getElementsByTagName('script')[0]
            el.parentNode.insertBefore(script, el)
            script.addEventListener('load', () => {
                this.isLoaded = true
                resolve(script)
            })
            script.addEventListener('error', () => {
                reject(new Error(`${this.src} failed to load.`))
            })
        })
    }
    load () {
        return new Promise(async (resolve, reject) => {
            if (!this.isLoaded) {
                try {
                    await this.loadScript()
                    resolve(window[this.global])
                } catch (e) {
                    reject(e)
                }
            } else {
                resolve(window[this.global])
            }
        })
    }
}
async function ProductSlider({apiKey, backgroundURL, rootID, sliderType,type5options, sliderPerView, enablePreview, enableAutoHover, hideTitle, priceColor, hidePrice, imageLogo, allButton, fontSizeName, fontSizePrice, titleColor, linktype}) {
    /*
    * Type = 1 -> дефолтный - 4 товара друг за другом идет
    * Type = 2 -> два товара друг под другом
    * Type = 3 -> 3 товара с правой стороны (1 вверху, 2рядом внизу)
    * Type = 4 -> 2 товара с правой стороны (1 вверху, 1 внизу)
    * Type = 5 -> Просто кнопка
    */
    if (typeof $ !== 'function') {
        const jqLoad = new ScriptLoader({
            src: 'code.jquery.com/jquery-3.6.1.min.js',
            global: 'jQuery',
        })
        await jqLoad.load();
    }
    let body = $('body');
    body.append('<link rel="stylesheet" href="https://printlean.com/widgets/slider-style.css"/>');
    // body.append('<link rel="stylesheet" href="/slider-style.css"/>');
    if (sliderType !== 5) {

        if (typeof Swiper !== 'function') {
            body.append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>');

            const swiperLoad = new ScriptLoader({
                src: 'cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js',
                global: 'swiper',
            })
            await swiperLoad.load();
        }
    }
    var target = $('#'+rootID);
    if (!target.length) {
        return false;
    }
    if (!apiKey) {
        apiKey = target.attr('data-key');
    }
    if (!backgroundURL) {
        backgroundURL = target.attr('data-bg')
    }
    if (!sliderType) {
        sliderType = parseInt(target.attr('data-type'));
    } else if (!sliderType) {
        sliderType = 1;
    }
    var className = '';
    if (sliderPerView[1200] && sliderPerView[1200] >= 5) {
        className = 'name-smaller'
    }
    $(document).on('click','.js-show-all-products',function(){
        $('#modal-swiper, #modal-swiper-bg').remove();
        var modal = '<div id="modal-swiper-bg"></div><div id="modal-swiper"><iframe src="https://printlean.com/?api-key='+apiKey+'&photo='+backgroundURL+'"></iframe></div>';
        body.after(modal);
        $('#modal-swiper').prepend('<div id="modal-swiper-close"></div>');
    });

    $(document).on('click','#modal-swiper-bg, #modal-swiper-close',function(){
        $('#modal-swiper, #modal-swiper-bg').remove();
    });

    if (sliderType === 5) {
        type5options = type5options || false;
        var color = (type5options && type5options.color) ? type5options.color : '#ffffff';
        var bgColor = (type5options && type5options.bgColor) ? type5options.bgColor : '#333333';
        var buttontext = (type5options && type5options.buttonText) ? type5options.buttonText : 'Print with';
        var btn = `<span class="js-show-all-products" style="background-color: ${bgColor}; cursor: pointer; color: ${color}; display: inline-block;text-decoration: none; border: 1px solid ${bgColor}; user-select: none;padding: 10px 25px; border-radius: 100px;">${buttontext} <img style="max-height: 36px; vertical-align: middle; margin-left: 6px; display: inline-block;" src="https://printlean.com/images/logo.png" alt=""></span>`
        target.append(btn);
        return;
    }
    var slider = '<div class="swiper products-slider js-products-swiper '+className+'"><div class="swiper-wrapper"></div></div><div class="swiper-button-prev product-slider__prev-btn"> <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.794819 6.5C0.794819 6.73299 0.883779 6.96595 1.06132 7.14358L6.65109 12.7333C7.00667 13.0889 7.58317 13.0889 7.93861 12.7333C8.29404 12.3779 8.29404 11.8015 7.93861 11.4458L2.99248 6.50001L7.93844 1.55413C8.29387 1.19855 8.29387 0.622217 7.93844 0.266812C7.583 -0.0889387 7.00649 -0.0889388 6.65091 0.266812L1.06115 5.85643C0.883577 6.03415 0.794819 6.26711 0.794819 6.5Z" fill="white"/> </svg> </div><div class="swiper-button-next product-slider__next-btn"> <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.794819 6.5C0.794819 6.73299 0.883779 6.96595 1.06132 7.14358L6.65109 12.7333C7.00667 13.0889 7.58317 13.0889 7.93861 12.7333C8.29404 12.3779 8.29404 11.8015 7.93861 11.4458L2.99248 6.50001L7.93844 1.55413C8.29387 1.19855 8.29387 0.622217 7.93844 0.266812C7.583 -0.0889387 7.00649 -0.0889388 6.65091 0.266812L1.06115 5.85643C0.883577 6.03415 0.794819 6.26711 0.794819 6.5Z" fill="white"/> </svg> </div>';
    if (sliderType === 1 || sliderType === 2) {
        slider = '<div class="slider-wrapper">' + slider + '</div>';
    }
    var imagePreview = '';
    if (enablePreview) {
        imagePreview = `<div class="image-preview">
                <img class="image-preview__image" src="${backgroundURL}" alt="">
            </div>`;
    }
    target.append(imagePreview);
    target.append(slider);
    target.addClass('product-slider product-slider--type-'+sliderType);
    target.wrapInner('.products-slider-wrapper')
    document.documentElement.style.setProperty('--bg-url', 'url("'+backgroundURL+'")');
    var breakpoints = {
        320: {
            slidesPerView: sliderPerView[320] ? sliderPerView[320] : 1.5,
            spaceBetween: 20
        },
        768: {
            slidesPerView: sliderPerView[768] ? sliderPerView[768] : 3,
        },
        992: {
            slidesPerView:sliderPerView[992] ? sliderPerView[992] :  3,
        },
        1200: {
            slidesPerView: sliderPerView[1200] ? sliderPerView[1200] : 4,
        }
    };
    document.documentElement.style.setProperty('--bg-url', 'url("'+backgroundURL+'")');
    $.getJSON('https://printlean.com/api/products?api-key='+apiKey, function (data) {
        if (sliderType === 2 || sliderType === 4) {
            data = chunkArray(data, 2);
        } else if (sliderType === 3) {
            data = chunkArray(data, 3);
        }
        $.each(data,function(i, val){
            var slide;
            slide = `<div class="swiper-slide">`
            if (sliderType === 2) {
                $.each(val, function (i1, val1) {
                    slide += renderSlide(val1, 'product-slide--mb-17');
                })
            } else if (sliderType === 3) {
                $.each(val, function (i1, val1) {
                    slide += renderSlide(val1, 'product-slide--three-items');
                })
                breakpoints = {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 1,
                    },
                    992: {
                        slidesPerView: 1,
                    },
                    1200: {
                        slidesPerView: 1,
                    }
                }
            } else if (sliderType === 4) {
                $.each(val, function (i1, val1) {
                    slide += renderSlide(val1, 'product-slide--mb-17');
                })
                breakpoints = {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 1,
                    },
                    992: {
                        slidesPerView: 1,
                    },
                    1200: {
                        slidesPerView: 1,
                    }
                }
            } else {
                slide += renderSlide(val);
            }
            slide += `</div>`;
            target.find('.swiper-wrapper').append(slide);
        });
        let productsSlider = new Swiper('#'+rootID+' .js-products-swiper', {
            slidesPerView: 4,
            spaceBetween: 17,
            speed: 500,
            navigation: {
                nextEl: '#'+rootID+' .product-slider__next-btn',
                prevEl: '#'+rootID+' .product-slider__prev-btn',
            },
            breakpoints: breakpoints,
            watchSlidesProgress: true,
            on: {
                init: function (swiper) {
                    if (enableAutoHover && (typeof enableAutoHover == 'boolean')) {
                        autoHoverStart();
                        hoverSlide();
                    }
                },
            },
        });
        if (!linktype || linktype === 'frame' || linktype !== 'new' || linktype !== 'same') {
            $(document).on('click','.product-slide',function(){
                var id = $(this).attr('data-id');
                $('#modal-swiper, #modal-swiper-bg').remove();
                var modal = '<div id="modal-swiper-bg"></div><div id="modal-swiper"><iframe src="https://printlean.com/product/'+id+'?api-key='+apiKey+'&photo='+backgroundURL+'"></iframe></div>';
                body.after(modal);
                $('#modal-swiper').prepend('<div id="modal-swiper-close"></div>');
            });
        }
        if (linktype === 'new') {
            $(document).on('click','.product-slide',function(){
                var id = $(this).attr('data-id');
                window.open('https://printlean.com/product/'+id+'?api-key='+apiKey+'&photo='+backgroundURL, '_blank').focus();
            });
        }
        if (linktype === 'same') {
            $(document).on('click','.product-slide',function(){
                var id = $(this).attr('data-id');
                document.location.href = 'https://printlean.com/product/'+id+'?api-key='+apiKey+'&photo='+backgroundURL
            });
        }

        let adsBy = `<div style="user-select: none; margin: 25px 0; text-align: right; color: gray; font-family: Montserrat,sans-serif;">Ads by <a style="text-decoration: none; color: inherit; font-family: inherit" href="https://affiliate.printlean.com/">Printlean.com</a></div>`;
        if (imageLogo) {
            adsBy = `<div style="user-select: none; margin: 25px 0; text-align: center; color: gray; font-family: Montserrat,sans-serif; vertical-align: middle;">Powered by <a style="vertical-align: middle; text-decoration: none; color: inherit; font-family: inherit" href="https://affiliate.printlean.com/"><img style="height: 36px; vertical-align: middle;;" src="https://printlean.com/images/logo_dark.png" alt=""></a></div>`;
        }
        $(adsBy).insertAfter(target);
        if (allButton) {
            let color = allButton.buttonColor ? allButton.buttonColor : '#5ab6f8';
            let buttonHtml = `<div style="vertical-align: middle; margin: 25px 0; text-align: center; font-family: Montserrat,sans-serif;"><a href="javascript:void('0')" class="js-show-all-products" style="color: ${color};;display: inline-block;text-decoration: none;border: 1px solid ${color}; user-select: none;padding: 10px 25px; border-radius: 100px;">${allButton.buttonText ? allButton.buttonText : 'See All Products'}</a></div>`;
            $(buttonHtml).insertAfter(target);
        }
    });
    let currentIndex = 0;
    let hoverTimeout = 0;

    function autoHoverStart() {
        hoverTimeout = setInterval(function () {
            let slides = [...document.querySelectorAll('.js-products-swiper .swiper-slide.swiper-slide-visible')];
            if (sliderType === 2 || sliderType === 3 || sliderType === 4) {
                slides = [...document.querySelectorAll('.js-products-swiper .swiper-slide.swiper-slide-visible .product-slide')];
            }

            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            slides.forEach((e) => {
                let t = e.querySelector('.product-slide__image')
                t.classList.remove('auto-hover');
            })
            let b = slides[currentIndex].querySelector('.product-slide__image');
            b.classList.add('auto-hover');
            currentIndex++;
        }, 2000)
    }
    function autoHoverEnd() {
        clearInterval(hoverTimeout);
        let slides = [...document.querySelectorAll('.js-products-swiper .swiper-slide.swiper-slide-visible')];
        if (sliderType === 3 || sliderType === 4) {
            slides = [...document.querySelectorAll('.js-products-swiper .swiper-slide.swiper-slide-visible .product-slide')];
        }
        slides.forEach((e) => {
            let t = e.querySelector('.product-slide__image')
            t.classList.remove('auto-hover');
        })
    }
    function hoverSlide() {
        $('body').on('mouseenter', '.js-products-swiper .swiper-slide.swiper-slide-visible', function () {
            autoHoverEnd()
        }).on('mouseleave', function () {
            autoHoverStart()
        });
    }

    function chunkArray(inputArray, perChunk = 2, ) {
        return inputArray.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, []);
    }

    function renderSlide(slide, customClass) {
        var $slide = `<div class="product-slide ${enableAutoHover === 'all' ? 'background-now' : ''} ${customClass ? customClass : ''}" data-id="${slide.id}">
            <div class="product-slide__image">
                <img src="https://printlean.com/${slide.photo}" alt="${slide.name}">
            </div>
            <div class="product-slide__content">`;
        var $fzName = fontSizeName ? fontSizeName : false;
        var $fzPrice = fontSizePrice ? fontSizePrice : false;

        if (!hideTitle) {
            $slide +=  `<div class="product-slide__name" style="font-size: ${$fzName}px;color: ${titleColor ? titleColor : '#383838'}">
                    ${slide.name}
                </div>`;
        }
        if (!hidePrice) {
            $slide +=  `<div class="product-slide__price" style="font-size: ${$fzPrice}px; color: ${priceColor ? priceColor : '#d04747'}">
                    ${slide.price ? '$'+slide.price : ''}
                </div>`;
        }
        $slide += `</div>
        </div>`;
        return $slide
    }
}