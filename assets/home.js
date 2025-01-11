window.addEventListener('load', function() {
  const carouselLeft = document.querySelector("#carouselLeft")
  const carouselRight = document.querySelector("#carouselRight")
  const iframeCarousel = document.querySelector("#iframeCarousel")
  const iframeCarouselElements = Array.from(iframeCarousel.children)
  var carouselIndex = 0;

  // set the number of indicator dashes to the number of iframes
  gen = generateElements('<div class="h-[0.12rem] flex-auto transition-all duration-500 bg-secondary-200"></div>')
  document.querySelector("#carouselIndicator").appendChild(gen)
  for (i=1; i < iframeCarouselElements.length; ++i) {
    gen = generateElements('<div class="h-[0.12rem] flex-auto transition-all duration-500 bg-gray-400"></div>')
    document.querySelector("#carouselIndicator").appendChild(gen)
  }
  const carouselIndicators = document.querySelector("#carouselIndicator").children
  function carouselUpdate(index) {
    for (i=0; i<iframeCarouselElements.length; ++i) {
      if (i==index) {
        iframeCarouselElements[i].classList.remove("absolute", "scale-0", "opacity-0")
        carouselIndicators[i].classList.add("bg-secondary-200")
        carouselIndicators[i].classList.remove("bg-gray-400")
        continue
      }
      iframeCarouselElements[i].classList.add("absolute", "scale-0", "opacity-0")
      carouselIndicators[i].classList.remove("bg-secondary-200")
      carouselIndicators[i].classList.add("bg-gray-400")
    }
  }
  carouselLeft.addEventListener('click', () => {
    carouselIndex = (carouselIndex + iframeCarouselElements.length - 1) % iframeCarouselElements.length
    carouselUpdate(carouselIndex);
  })

  carouselRight.addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % iframeCarouselElements.length
    carouselUpdate(carouselIndex);
  })
})
