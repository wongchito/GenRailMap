function setSVGWidth() {
    // Get new value
    var svg_width = document.getElementById('svg_width').value;

    // Log changes
    var params_instance = getParams();
    params_instance['svg_width'] = svg_width;
    putParams(params_instance);

    // Apply changes
    document.getElementById('root').setAttribute('width', svg_width);
    document.getElementById('outer').setAttribute('width', svg_width);
    redrawStrip();
    redrawLineMain();
    redrawLinePassed();
    redrawStn();
    addCurrentBG();
}

function setSVGHeight() {
    // Get new value
    var svg_height = document.getElementById('svg_height').value;

    // Log changes
    var params_instance = getParams();
    params_instance['svg_height'] = svg_height;
    putParams(params_instance);

    // Apply changes
    document.getElementById('root').setAttribute('height', svg_height);
    document.getElementById('outer').setAttribute('height', svg_height);
    redrawStrip();
    redrawLineMain();
    redrawLinePassed();
    redrawStn();
    reposStnName();
}

// function setZoom(src) {
//     if (src == 'slider') {
//         var zoom_log = document.getElementById('zoom_slider').value;
//         var zoom = Math.pow(10, zoom_log);
//         document.getElementById('zoom_text').value = zoom;
//     }
//     if (src == 'text') {
//         var zoom = document.getElementById('zoom_text').value;
//         document.getElementById('zoom_slider').value = Math.log10(zoom);
//     }

//     var width = document.getElementById('svg_width').value;
//     var height = document.getElementById('svg_height').value;

//     var view_width = width / zoom * 100;
//     var view_height = height / zoom * 100;

//     var viewBox_str = '0 0 ' + view_width.toString() + ' ' + view_height.toString();
//     document.getElementById('root').setAttribute('viewBox', viewBox_str);
// }

function showOuter(elem) {
    // Get new value
    var show_outer = elem.checked;
    
    // Log changes
    var params_instance = getParams();
    params_instance['show_outer'] = show_outer;
    putParams(params_instance);

    // Apply changes
    if (show_outer) {
        document.getElementById('outer').setAttribute('stroke', 'black');
    } else {
        document.getElementById('outer').setAttribute('stroke', 'none');
    }
}

function setPadding(src) {
    // Get new value
    if (src == 'slider') {
        var padding = document.getElementById('padding_slider').value;
        document.getElementById('padding_text').value = padding;
    }
    if (src == 'text') {
        var padding = document.getElementById('padding_text').value;
        document.getElementById('padding_slider').value = padding;
    }

    // Log changes
    var params_instance = getParams();
    params_instance['padding'] = padding;
    putParams(params_instance);

    // Apply changes
    redrawLineMain();
    redrawLinePassed();
    redrawStn();
    addCurrentBG();
}

function redrawStrip() {
    // Get strip info
    var strip_y = getStripY();
    var params_instance = getParams();
    var svg_width = params_instance['svg_width'];

    // Apply changes
    var strip_path_str = 'M 0,' + strip_y.toString() + ' H ' + svg_width;
    document.getElementById('strip').setAttribute('d', strip_path_str);
}

function redrawLineMain() {
    // Get linePos info
    var linePos = getLinePos();
    var lineStart = linePos[0];
    var lineLength = linePos[1];

    // Read from log
    var y = getY()

    // Apply changes
    document.getElementById('line_main').setAttribute('d', 'M ' + lineStart.toString() + ',' + y + ' h ' + lineLength.toString());
}

function setY(src) {
    // Get new value
    if (src == 'slider') {
        var y_pc = document.getElementById('y_slider').value;
        document.getElementById('y_text').value = y_pc;
    }
    if (src == 'text') {
        var y_pc = document.getElementById('y_text').value;
        document.getElementById('y_slider').value = y_pc;
    }

    // Log changes
    var params_instance = getParams();
    params_instance['y_pc'] = y_pc;
    putParams(params_instance);

    // Apply changes
    redrawLineMain();
    redrawLinePassed();
    redrawStn();
    reposStnName();
}

function setStripY(src) {
    // Get new value
    if (src == 'slider') {
        var strip_pc = document.getElementById('strip_slider').value;
        document.getElementById('strip_text').value = strip_pc;
    }
    if (src == 'text') {
        var strip_pc = document.getElementById('strip_text').value;
        document.getElementById('strip_slider').value = strip_pc;
    }

    // Log changes
    var params_instance = getParams();
    params_instance['strip_pc'] = strip_pc;
    putParams(params_instance);

    // Apply changes
    redrawStrip();
}

function setLineColour() {
    // Get new value
    var colour_city = document.getElementById('colour_city').value;
    var colour_name = 'c' + document.getElementById(colour_city).value;

    // Log changes
    var params_instance = getParams();
    params_instance['colour_city'] = colour_city;
    params_instance['colour_name'] = colour_name;
    putParams(params_instance);

    // Apply changes
    document.getElementById('line_main').setAttribute('class', colour_name);
    document.getElementById('strip').setAttribute('class', colour_name);
}

function getCity(dropdown) {
    // Get new value
    var colour_city = dropdown.options[dropdown.selectedIndex].value;

    // Log changes
    var params_instance = getParams();
    params_instance['colour_city'] = colour_city;
    putParams(params_instance);

    var cities = document.getElementById('colour_cities').children;

    for (i=0; i<cities.length; i++) {
        if (cities[i].getAttribute('id') == colour_city) {
            cities[i].style.display = 'block'
        } else {
            cities[i].style.display = 'none'
        }
    }
    setLineColour()
    // putParams(params_instance);
}

function setTxtBGGap(src) {
    // Get new value
    if (src == 'slider') {
        var txt_bg_gap = document.getElementById('txt_bg_gap_slider').value;
        document.getElementById('txt_bg_gap_text').value = txt_bg_gap;
    }
    if (src == 'text') {
        var txt_bg_gap = document.getElementById('txt_bg_gap_text').value;
        document.getElementById('txt_bg_gap_slider').value = txt_bg_gap;
    }

    // Log changes
    var params_instance = getParams();
    params_instance['txt_bg_gap'] = txt_bg_gap;
    putParams(params_instance);

    // Apply changes
    reposStnName();
}

function addStn(elem, load=false) {
    // Get new value
    var par = elem.parentNode;
    var add_idx = par.getAttribute('id').substring(3);
    
    if (!load) {
        // Log changes
        var params_instance = getParams();
        params_instance['stn_list'].splice(add_idx, 0, params_instance['stn_list'][add_idx]);
        putParams(params_instance);
    }

    // Apply changes
    var new_stn = par.cloneNode(true);
    var stns = document.getElementById('stn_list').children;
    par.parentNode.insertBefore(new_stn, stns[parseInt(add_idx)]);

    var stn_icon = document.getElementById('stn_icon_'+add_idx);
    var new_stn_icon = stn_icon.cloneNode(true);
    var stn_icons = document.getElementById('stations').children;
    stn_icon.parentNode.insertBefore(new_stn_icon, stn_icons[parseInt(add_idx)]);

    var stn_name = document.getElementById('stn_name_'+add_idx);
    var new_stn_name = stn_name.cloneNode(true);
    var stn_names = document.getElementById('station_names').children;
    stn_name.parentNode.insertBefore(new_stn_name, stn_names[parseInt(add_idx)]);

    if (!load) {
        reidxStn();
        redrawStn();
        redrawLinePassed();
        addCurrentBG();
        reposStnName();
    }
}

function rmStn(elem, load=false) { 
    // Get value to remove
    var par = elem.parentNode;
    var rm_idx = par.getAttribute('id').substring(3);

    if (!load) {
        // Log changes
        var params_instance = getParams();
        params_instance['stn_list'].splice(rm_idx, 1);
        putParams(params_instance);
    }

    // Remove station in HTML
    par.parentNode.removeChild(par);

    // Remove station in SVG
    var stn_icon = document.getElementById('stn_icon_'+rm_idx);
    stn_icon.parentNode.removeChild(stn_icon);

    // Remove station name in SVG
    var stn_name = document.getElementById('stn_name_'+rm_idx);
    stn_name.parentNode.removeChild(stn_name);

    if (!load) {
        reidxStn();
        redrawStn();
    
        // Fix radio input
        var current_stn_idx = document.querySelector('input[name="current"]:checked');
    
        if (current_stn_idx == null) {
            var n_stn = params_instance['stn_list'].length;
            if (rm_idx >= n_stn) {
                current_stn_idx = n_stn - 1;
            } else {
                current_stn_idx = rm_idx;
            }
            document.getElementById('stn_list').children[current_stn_idx].children[0].checked = true;
        }
    
        // Log changes
        params_instance['current_stn_idx'] = current_stn_idx.toString();
        putParams(params_instance);
    
        // Apply other changes
        redrawLinePassed();
        addCurrentBG();
        reposStnName();
    }
}

function reidxStn() {
    var n_stn = getNStn();

    var stns = document.getElementById('stn_list').children;
    var stn_icons = document.getElementById('stations').children;
    var stn_names = document.getElementById('station_names').children;

    for (i=0; i<n_stn; i++) {
        stns[i].setAttribute('id', 'stn'+i.toString());
        stn_icons[i].setAttribute('id', 'stn_icon_'+i.toString());
        stn_names[i].setAttribute('id', 'stn_name_'+i.toString());
    }
}

function redrawStn() {
    // Read from logs
    var stn_icons = document.getElementById('stations').children;
    var n_stn = stn_icons.length;

    var y = getY();

    // Apply changes
    for (i=0; i<n_stn; i++) {
        var stn_x = getStnX(i);
        stn_icons[i].setAttribute('transform', 'translate(' + stn_x.toString() + ',' + y.toString() + ')');
        var stn_name = document.getElementById('stn_name_'+i);
        for (j=0; j<stn_name.children.length; j++) {
            if (stn_name.children[j].nodeName != 'rect') {
                stn_name.children[j].setAttribute('x', stn_x.toString());
            }
        }
    }
}

function setDirection(elem) {
    // Get new value
    var direction = elem.value;

    // Log changes
    var params_instance = getParams();
    params_instance['direction'] = direction;
    putParams(params_instance);

    // Apply changes
    redrawLinePassed();
}

function setCurrentStn(elem) {
    // Get new value
    var current_stn_idx = elem.parentNode.getAttribute('id').substring(3);

    // Log changes
    var params_instance = getParams();
    params_instance['current_stn_idx'] = current_stn_idx;
    putParams(params_instance);

    // Apply changes
    redrawLinePassed();
    addCurrentBG();
    reposStnName();
}

function addCurrentBG() {
    var params_instance = getParams();
    var current_stn_idx = params_instance['current_stn_idx'];
    var current_stn_x = getStnX(current_stn_idx);

    var stn_names = document.getElementById('station_names').children;

    for (i=0; i<stn_names.length; i++) {
        if (i == current_stn_idx) {
            // Add background
            if (stn_names[i].children[0].nodeName == 'rect') {
                stn_names[i].removeChild(stn_names[i].children[0]);
            }
            var txt_dim = stn_names[i].getBBox();
            
            var txt_bg = document.createElementNS(stn_names[i].namespaceURI, 'rect');
            txt_bg.setAttribute('x', (txt_dim.x-10).toString());
            txt_bg.setAttribute("y", (txt_dim.y-2.5).toString());
            txt_bg.setAttribute("width", (txt_dim.width+20).toString());
            txt_bg.setAttribute("height", (txt_dim.height+5).toString());
            txt_bg.setAttribute("fill", "black");
            stn_names[i].insertBefore(txt_bg, stn_names[i].children[0]);
            
            // Change class
            for (j=1; j<stn_names[i].children.length; j++) {
                var class_lang = stn_names[i].children[j].getAttribute('class').slice(-2);
                stn_names[i].children[j].setAttribute('class', 'CurrentStnName'+class_lang);
            }
        } else {
            // Remove BG
            if (stn_names[i].children[0].nodeName == 'rect') {
                stn_names[i].removeChild(stn_names[i].children[0]);

                // Change back class
                for (j=0; j<stn_names[i].children.length; j++) {
                    var class_lang = stn_names[i].children[j].getAttribute('class').slice(-2);
                    stn_names[i].children[j].setAttribute('class', 'StnName'+class_lang);
                }
            }
        }
    }
}

function redrawLinePassed() {
    // Read from log
    var params_instance = getParams();
    var current_stn_idx = params_instance['current_stn_idx'];
    var direction = params_instance['direction'];

    var linePos = getLinePos();
    var lineStart = linePos[0];
    var lineLength = linePos[1];
    var lineEnd = lineStart + lineLength;
    
    var current_stn_x = getStnX(current_stn_idx);

    var y = getY();
    
    if (direction == 'right') {
        var path_str = 'M ' + current_stn_x.toString() + ',' + y.toString() + ' H ' + lineStart.toString();
    }
    if (direction == 'left') {
        var path_str = 'M ' + current_stn_x.toString() + ',' + y.toString() + ' H ' + lineEnd.toString();
    }

    document.getElementById('line_passed').setAttribute('d', path_str);
}

function setStnName(elem, target) {
    // Get new value
    var stn_idx = elem.parentNode.getAttribute('id').substring(3);

    // Log changes
    var params_instance = getParams();
    params_instance['stn_list'][stn_idx][target] = elem.value; 
    var wrap = params_instance['stn_list'][stn_idx]['wrap'];
    putParams(params_instance);

    // Apply changes
    var stn_name = document.getElementById('stn_name_'+stn_idx);
    if (wrap && target == 'field1') {
        var [str1, str2] = splitText(elem.parentNode.children[2].value);
        var stn_x = getStnX(stn_idx);
        var stn_name_html = str1 + '<tspan x="' + stn_x.toString() + '" dy="15">' + str2 + '</tspan>';
        stn_name.querySelector('#field1').innerHTML = stn_name_html;
    } else {
        stn_name.querySelector('#'+target).textContent = elem.value;
    }

    addCurrentBG();
    reposStnName();
}

function reposStnName() {
    var params_instance = getParams();
    var y = getY();
    var txt_bg_gap = params_instance['txt_bg_gap'];
    var txt_flip = params_instance['txt_flip'];

    var stn_names = document.getElementById('station_names').children;
    for (i=0; i<stn_names.length; i++) {
        var bg_y = getBGY(i);
        var bg_lower_y = bg_y[0];
        var bg_upper_y = bg_y[1];

        var stn_name = stn_names[i].children;

        if (i%2 == txt_flip) {
            var dy = y - Number(txt_bg_gap) - bg_lower_y;
        } else {
            var dy = y + Number(txt_bg_gap) - bg_upper_y;
        }

        for (j=0; j<stn_name.length; j++) {
            var new_y = Number(stn_name[j].getAttribute('y')) + dy;
            stn_name[j].setAttribute('y', new_y.toString());
        }
    }
    // addCurrentBG();
}

function flipStnPos() {
    var params_instance = getParams();
    if (params_instance['txt_flip']) {
        params_instance['txt_flip'] = false;
    } else {
        params_instance['txt_flip'] = true;
    }
    putParams(params_instance);

    reposStnName();
}

function wrapStnName(elem) {
    // Get new value
    var wrap = elem.checked;
    var stn_idx = elem.parentNode.getAttribute('id').substring(3);

    // Log changes
    var params_instance = getParams();
    params_instance['stn_list'][stn_idx]['wrap'] = wrap;
    putParams(params_instance);

    // Apply changes
    setStnName(elem.parentNode.children[2], 'field1');
}

function test() {
    var a = 'Guangzhou South Railway Station';
    alert(splitText(a));

    // alert(a);
    // var stn_name = document.getElementById('stn_name_0');
    // var stn_name_y = stn_name.getBBox().y + stn_name.getBBox().height;
    // var params_instance = getParams();
    // var y = getY();
    // var txt_bg_gap = params_instance['txt_bg_gap'];
    // var dy = y - txt_bg_gap - stn_name_y;
    // for (i=1; i<3; i++) {
    //     var new_y = Number(stn_name.children[i].getAttribute('y')) + dy;
    //     stn_name.children[i].setAttribute('y', new_y.toString());
    // }
    // addCurrentBG();

    // readTextFile('init.json')

}

