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
    var lineStart = svg_width * pad / 200;
    var lineLength = svg_width * (1 - pad/100);
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

function addStn(elem) {
    var par = elem.parentNode;
    var add_index = par.getAttribute('id').substring(3);
    var new_stn = par.cloneNode(true);
    var stns = document.getElementById('stn_list').children;
    par.parentNode.insertBefore(new_stn, stns[parseInt(add_index)]);

    var stn_icon = document.getElementById('stn_icon_'+add_index);
    var new_stn_icon = stn_icon.cloneNode(true);
    var stn_icons = document.getElementById('stations').children;
    stn_icon.parentNode.insertBefore(new_stn_icon, stn_icons[parseInt(add_index)]);

    reindexStn();
}

function removeStn(elem) {
    // Remove station in HTML
    var par = elem.parentNode;
    var removed_index = par.getAttribute('id').substring(3);
    par.parentNode.removeChild(par);

    // Remove station in SVG
    var stn_icon = document.getElementById('stn_icon_'+removed_index);
    stn_icon.parentNode.removeChild(stn_icon);
    
    reindexStn();
}

function reindexStn() {
    var stns = document.getElementById('stn_list').children;
    var n_stn = stns.length;

    // Re-index stations in list
    for (i=0; i<n_stn; i++) {
        stns[i].setAttribute('id', 'stn'+i.toString())
    }

    var stn_icons = document.getElementById('stations').children;

    var svg_width = document.getElementById('root').getAttribute('width');
    var pad = document.getElementById('padding_input').value;
    var lineStart = svg_width * pad / 200;
    var lineLength = svg_width * (1 - pad/100);

    // Re-index stations in SVG
    for (i=0; i<n_stn; i++) {
        var stn_icons_x = lineStart + (lineLength / (n_stn-1)) * i;
        stn_icons[i].setAttribute('id', 'stn_icon_'+i.toString())
        stn_icons[i].setAttribute('transform', 'translate(' + stn_icons_x + ',30)')
    }
}