function setSVGSize() {
    var width = document.getElementById('svg_width').value;
    var height = document.getElementById('svg_height').value;

    document.getElementById('root').setAttribute('width', width);
    document.getElementById('root').setAttribute('height', height);

    document.getElementById('outer').setAttribute('width', width);
    document.getElementById('outer').setAttribute('height', height);

    var pad = document.getElementById('padding_input').value;
    setLineLength(width, pad);
}

function setPadding(src) {
    if (src == 'slider') {
        var pad = document.getElementById('padding_slider').value;
        document.getElementById('padding_input').value = pad;
    }
    if (src == 'input') {
        var pad = document.getElementById('padding_input').value;
        document.getElementById('padding_slider').value = pad;
    }

    var svg_width = document.getElementById('root').getAttribute('width');
    setLineLength(svg_width, pad);
}

function setLineLength(svg_width, pad) {
    var lineStart = Math.round(svg_width * pad / 200);
    var lineLength = Math.round(svg_width * (1 - pad/100));
    document.getElementById('mainLine').setAttribute('d', 'M ' + lineStart.toString() + ',30 h ' + lineLength.toString());
}

function setLineColour(elem) {
    var city = document.getElementById('city').value;
    var lineName = document.getElementById(city).value;

    elem.setAttribute('class', 'c'+lineName);

    // var root = document.getElementById('root');
    // rootNS = root.namespaceURI;
    // var lines = document.createElementNS(rootNS, 'g');
    // lines.setAttribute('class', 'LineDiagram');
    // root.appendChild(lines);
    // var line = document.createElementNS(rootNS, 'path');
    // lines.appendChild(line)
    // line.setAttribute('class', 'c'+lineName);
    // line.setAttribute('d', 'M 0,20 H 100');
}

function changeColour(elem) {
    elem.setAttribute('class', 'cgz2');
}

function getCity(dropdown) {
    var value = dropdown.options[dropdown.selectedIndex].value;
    if (value == 'hk') {
        document.getElementById('hk').style.display = 'block';
        document.getElementById('gz').style.display = 'none';
    }
    if (value == 'gz') {
        document.getElementById('hk').style.display = 'none';
        document.getElementById('gz').style.display = 'block';
    }
}