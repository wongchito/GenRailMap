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

var default_fonts = {
    'zh': [
        "Hiragino Mincho ProN", 
        "Source Han Serif", 
        "Noto Serif CJK JP",
        "STHeiti",
        "Heiti SC",
        "SimHei",
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

function pullFont(name, lang) {
    if (lang == 'zh') {
        var fontZH = getFonts('zh');
        fontZH.unshift(fontZH.splice(fontZH.indexOf(name), 1)[0]);
        putFonts(fontZH, 'zh');
    }
    if (lang == 'en') {
        var fontEN = getFonts('en');
        fontEN.unshift(fontEN.splice(fontEN.indexOf(name), 1)[0]);
        putFonts(fontEN, 'en');
    }
    setFont();
}