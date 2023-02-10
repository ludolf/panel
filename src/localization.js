let locale = (localStorage.getItem('localization') || navigator.language || 'en').substring(0, 2)

const snippets = {
    en: `i := 3
while i > 0 {
  Display(i, "...")
  i := i - 1
}
Display(Map)`,
    de: `i := 3
solange i > 0 {
  Darstellen(i, "...")
  i := i - 1
}
Darstellen(Map)`,
    cs: `i := 3
dokud i > 0 {
  Zobraz(i, "...")
  i := i - 1
}
Zobraz(Map)`,
}

function localize() {
    document.querySelectorAll('.localization:not(.'+locale+')').forEach(l => l.classList.remove('current'))
    document.querySelectorAll('.localization.'+locale).forEach(l => l.classList.add('current'))
}
localize()

function changeLocale(lang) {
    locale = lang || 'en'
    localStorage.setItem('localization', locale)
    localize()
}

const snippet = () => snippets[locale]

export { snippet, changeLocale }