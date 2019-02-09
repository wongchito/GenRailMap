function setSVGSize() {
    var width = document.getElementById('svg_width').value;
    var height = document.getElementById('svg_height').value;

    document.getElementById('root').setAttribute('width', width);
    document.getElementById('root').setAttribute('height', height);

    document.getElementById('outer').setAttribute('width', width);
    document.getElementById('outer').setAttribute('height', height);

    var pad = document.getElementById('padding_input').value;
    setLineLength(width, pad);
    reposStn();
    redrawLinePassed();
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
    reposStn();
    redrawLinePassed();
}

function setLineLength(svg_width, pad) {
    var lineStart = svg_width * pad / 200;
    var lineLength = svg_width * (1 - pad/100);
    document.getElementById('line_main').setAttribute('d', 'M ' + lineStart.toString() + ',30 h ' + lineLength.toString());
}

function setLineColour() {
    var city = document.getElementById('city').value;
    var lineName = document.getElementById(city).value;

    document.getElementById('line_main').setAttribute('class', 'c'+lineName);
}

function getCity(dropdown) {
    var value = dropdown.options[dropdown.selectedIndex].value;

    var cities = document.getElementById('cities').children;

    for (i=0; i<cities.length; i++) {
        if (cities[i].getAttribute('id') == value) {
            cities[i].style.display = 'block'
            var lineName = cities[i].children[0].value;
            document.getElementById('line_main').setAttribute('class', 'c'+lineName);
        } else {
            cities[i].style.display = 'none'
        }
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
    reposStn();
    redrawLinePassed();
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
    reposStn();

    // Fix radio input
    var current_stn_index = document.querySelector('input[name="current"]:checked');
    if (current_stn_index == null) {
        var n_stn = document.getElementById('stn_list').children.length;
        if (removed_index >= n_stn) {
            removed_index = n_stn - 1;
        }
        document.getElementById('stn_list').children[removed_index].children[0].checked = true;
    }

    redrawLinePassed();
}

function reindexStn() {
    var stns = document.getElementById('stn_list').children;
    var n_stn = stns.length;

    // Re-index stations in list
    for (i=0; i<n_stn; i++) {
        stns[i].setAttribute('id', 'stn'+i.toString())
    }

    var stn_icons = document.getElementById('stations').children;

    // Re-index stations in SVG
    for (i=0; i<n_stn; i++) {
        stn_icons[i].setAttribute('id', 'stn_icon_'+i.toString())
    }
}

function reposStn() {
    var stn_icons = document.getElementById('stations').children;
    var n_stn = stn_icons.length;

    var svg_width = document.getElementById('root').getAttribute('width');
    var pad = document.getElementById('padding_input').value;
    var lineStart = svg_width * pad / 200;
    var lineLength = svg_width * (1 - pad/100);

    for (i=0; i<n_stn; i++) {
        var stn_icons_x = lineStart + (lineLength / (n_stn-1)) * i;
        stn_icons[i].setAttribute('transform', 'translate(' + stn_icons_x + ',30)')
    }
}

function setDirection(elem) {
    var direction = elem.value;
    redrawLinePassed(null, direction);
}

function setCurrentStn(elem) {
    var current_stn_index = elem.parentNode.getAttribute('id').substring(3);
    redrawLinePassed(current_stn_index, null);
}

function redrawLinePassed(current_stn_index=null, direction=null) {
    if (current_stn_index == null) {
        var current_stn_index = document.querySelector('input[name="current"]:checked').parentNode.getAttribute('id').substring(3);
    }
    if (direction == null) {
        var direction = document.querySelector('input[name="direction"]:checked').value;
    }

    var svg_width = document.getElementById('root').getAttribute('width');
    var pad = document.getElementById('padding_input').value;
    var lineStart = svg_width * pad / 200;
    var lineLength = svg_width * (1 - pad/100);
    var lineEnd = lineStart + lineLength;
    var n_stn = document.getElementById('stations').children.length;
    var current_stn_x = lineStart + (lineLength / (n_stn-1)) * current_stn_index;

    if (direction == 'right') {
        var path_str = 'M ' + current_stn_x.toString() + ',30 H ' + lineStart.toString();
    }
    if (direction == 'left') {
        var path_str = 'M ' + current_stn_x.toString() + ',30 H ' + lineEnd.toString();
    }

    document.getElementById('line_passed').setAttribute('d', path_str);
}