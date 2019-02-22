var fontZH = [
    "Hiragino Mincho ProN", 
    "Source Han Serif", 
    "Noto Serif CJK JP",
    "STHeiti",
    "sans-serif"
]

var fontEN = [
    "Myriad Pro", 
    "Arial", 
    "sans-serif"
]

var myfonts = {
    'zh': [
        "Hiragino Mincho ProN", 
        "Source Han Serif", 
        "Noto Serif CJK JP",
        "STHeiti",
        "Heiti SC",
        "sans-serif"
    ], 
    'en': [
        "Myriad Pro", 
        "Arial", 
        "sans-serif"
    ]
}

function getFonts(lang) {
    return JSON.parse(sessionStorage.myfonts)[lang];
}

function putFonts(instance, lang) {
    var pre_font = JSON.parse(sessionStorage.myfonts);
    pre_font[lang] = instance;
    sessionStorage.myfonts = JSON.stringify(pre_font);
}