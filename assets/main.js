function generateElements(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.children[0];
}

window.addEventListener('load', function() {
  const menuOpen = document.querySelector("#menuOpen")
  const menu = document.querySelector("#menu")
  const languageSelector = document.querySelector("#languageSelector")
  const currentLanguage = document.querySelector("#currentLanguage")
  const languages = document.querySelector("#languages")
  const searchButton = document.querySelector("#searchButton")
  const searchCloseButton = document.querySelector("#searchCloseButton")
  const search = document.querySelector("#search")
  const searchModal = document.querySelector("#searchModal")

  var languageSelectorEnabled = false
  var searchOpened = false


  // add event listeners for interactivity 
  menuOpen.addEventListener('click', () => {
    menu.classList.toggle("-translate-x-full")
    menu.classList.toggle("shadow-[0_100px_100px_0_rgba(0,0,0,0.5)]")
  })

  function toggleSearch() {
      searchButton.classList.toggle("flex-auto")
      searchModal.classList.toggle("order-first")
      searchModal.classList.toggle("col-span-3")
      search.classList.toggle("flex-1")
      search.classList.toggle("absolute")
      search.classList.toggle("scale-0")
      searchCloseButton.classList.toggle("scale-0")
      searchCloseButton.classList.toggle("absolute")
      searchOpened ^= true
  }
  searchButton.addEventListener('click', () => {
    if (!searchOpened) {
      toggleSearch()
      if (languageSelectorEnabled) {
        toggleLanguageSelector()
      }
    }
  })
  searchCloseButton.addEventListener('click', () => {
    if (searchOpened) {
      toggleSearch()
    }
  })


  document.querySelectorAll("#accordion").forEach(accordion => {
    let accordionButton = accordion.querySelector("button");
    var accordionContents = accordion.querySelector("#contents");
    accordionButton.addEventListener('click', () => {
      if (accordionContents.classList.contains("selected")) {
        accordionContents.style.removeProperty('max-height');
      } else {
        accordionContents.style.setProperty('max-height', accordionContents.scrollHeight + 'px')
      }
      accordionContents.classList.toggle("selected");
    })
  })

  function toggleLanguageSelectorConditional(event) {
    if (event.explicitOriginalTarget !== languageSelector) {
      toggleLanguageSelector()
    }
  }
  
  function toggleLanguageSelector() {
    ["scale-0", "opacity-0", "-translate-y-[58%]", "lg:translate-y-[58%]"].forEach(
      prop => languages.classList.toggle(prop)
    )
    languageSelectorEnabled ^= true

    if (languageSelectorEnabled) {
      languages.focus()
      languages.addEventListener('blur', toggleLanguageSelectorConditional)
    } else {
      languages.removeEventListener('blur', toggleLanguageSelectorConditional)
    }
  }

  Array.from(languages.children).forEach((lang) => {
    lang.addEventListener('click', () => {
      currentLanguage.innerText = lang.innerText
      // TODO: Actually translate the page
      toggleLanguageSelector()
    })
  })

  languageSelector.addEventListener('click', toggleLanguageSelector)

})
