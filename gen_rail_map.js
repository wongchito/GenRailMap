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
    var colour_list = document.getElementById('colour_cities');
    var colour_name = 'c' + colour_list.querySelector('#' + colour_city).value;

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

        var params_instance = getParams();
        params_instance['stn_list'][add_idx]['change'] = 'cnone'; // reset interchange
    }

    // Apply changes
    var new_stn = par.cloneNode(true);
    if (new_stn.children[8]) {
        new_stn.children[6].checked = false;
        new_stn.removeChild(new_stn.children[10]);
        new_stn.removeChild(new_stn.children[9]);
        new_stn.removeChild(new_stn.children[8]);
        new_stn.removeChild(new_stn.children[7]);
    } // reset interchange
    var stns = document.getElementById('stn_list').children;
    par.parentNode.insertBefore(new_stn, stns[parseInt(add_idx)]);

    var stn_icon = document.getElementById('stn_icon_'+add_idx);
    var new_stn_icon = stn_icon.cloneNode(true);
    var stn_icons = document.getElementById('stations').children;
    stn_icon.parentNode.insertBefore(new_stn_icon, stn_icons[parseInt(add_idx)]);

    var stn_int = document.getElementById('stn_int_'+add_idx);
    var new_stn_int = stn_int.cloneNode(true);
    new_stn_int.setAttribute('class', 'cnone'); // reset interchange
    var stn_ints = document.getElementById('station_ints').children;
    stn_int.parentNode.insertBefore(new_stn_int, stn_ints[parseInt(add_idx)]);

    var stn_name = document.getElementById('stn_name_'+add_idx);
    var new_stn_name = stn_name.cloneNode(true);
    var stn_names = document.getElementById('station_names').children;
    stn_name.parentNode.insertBefore(new_stn_name, stn_names[parseInt(add_idx)]);

    var int_name = document.getElementById('int_name_'+add_idx);
    var new_int_name = int_name.cloneNode(true);
    for (i=0;i<new_int_name.childElementCount;i++) {
        new_int_name.children[i].textContent = '';
    }
    var int_names = document.getElementById('change_names').children;
    int_name.parentNode.insertBefore(new_int_name, int_names[parseInt(add_idx)]);

    if (!load) {
        reidxStn();
        // redrawStn();

        // Fix radio input
        var current_stn_idx = document.querySelector('input[name="current"]:checked').parentNode.getAttribute('id').substring(3);
        params_instance['current_stn_idx'] = current_stn_idx;
        putParams(params_instance);

        redrawLinePassed();
        redrawStn();
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

    // Remove interchange in SVG
    var stn_int = document.getElementById('stn_int_'+rm_idx);
    stn_int.parentNode.removeChild(stn_int);

    // Remove station name in SVG
    var stn_name = document.getElementById('stn_name_'+rm_idx);
    stn_name.parentNode.removeChild(stn_name);

    // Remove int name in SVG
    var int_name = document.getElementById('int_name_'+rm_idx);
    int_name.parentNode.removeChild(int_name);

    if (!load) {
        reidxStn();
        // redrawStn();
    
        // Fix radio input
        var current_stn = document.querySelector('input[name="current"]:checked');
        if (current_stn != null) {
            var current_stn_idx = current_stn.parentNode.getAttribute('id').substring(3);
        } else {
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
        redrawStn();
        addCurrentBG();
        reposStnName();
    }
}

function reidxStn() {
    var n_stn = getNStn();

    var stns = document.getElementById('stn_list').children;
    var stn_icons = document.getElementById('stations').children;
    var stn_ints = document.getElementById('station_ints').children;
    var stn_names = document.getElementById('station_names').children;
    var int_names = document.getElementById('change_names').children;

    for (i=0; i<n_stn; i++) {
        stns[i].setAttribute('id', 'stn'+i.toString());
        stn_icons[i].setAttribute('id', 'stn_icon_'+i.toString());
        stn_ints[i].setAttribute('id', 'stn_int_'+i.toString());
        stn_names[i].setAttribute('id', 'stn_name_'+i.toString());

        if (stns[i].children[8]) {
            stns[i].children[7].setAttribute('id', 'colour_city_int_'+i.toString());
            stns[i].children[8].setAttribute('id', 'colour_cities_int_'+i.toString());
        }

        int_names[i].setAttribute('id', 'int_name_'+i.toString());
    }
}

function redrawStn() {
    // Station names and interchange ticks are also shifted

    // Read from logs
    var stn_icons = document.getElementById('stations').children;
    var n_stn = stn_icons.length;
    var params_instance = getParams();

    var y = getY();

    // Apply changes
    for (i=0; i<n_stn; i++) {
        var stn_state = getStnState(i);
        var stn_x = getStnX(i);
        stn_icons[i].setAttribute('transform', 'translate(' + stn_x.toString() + ',' + y.toString() + ')');
        if (stn_state == -1) {
            stn_icons[i].setAttribute('xlink:href', '#passedint');
        } else {
            stn_icons[i].setAttribute('xlink:href', '#int');
        }

        var stn_int = document.getElementById('stn_int_'+i);
        var change_colour = params_instance['stn_list'][i]['change'];
        if (change_colour != 'cnone') {
            if (stn_state == -1) {
                stn_int.setAttribute('class', 'cpassed');
            } else {
                stn_int.setAttribute('class', params_instance['stn_list'][i]['change']);
            }
        }
        stn_int.setAttribute('x', stn_x.toString());
        stn_int.setAttribute('y', y.toString());

        var stn_name = document.getElementById('stn_name_'+i);
        if (stn_state == -1) {
            stn_name.setAttribute('class', 'PassedName');
        } else if (stn_state == 0) {
            stn_name.setAttribute('class', 'CurrentName');
        } else {
            stn_name.setAttribute('class', 'FutureName');
        }
        for (j=0; j<stn_name.children.length; j++) {
            if (stn_name.children[j].nodeName != 'rect') {
                stn_name.children[j].setAttribute('x', stn_x.toString());
            }
            if (stn_name.children[j].childElementCount) {
                stn_name.children[j].children[0].setAttribute('x', stn_x.toString());
            }
        }

        var int_name = document.getElementById('int_name_'+i);
        if (stn_state == -1) {
            int_name.setAttribute('class','PassedName');
        } else {
            int_name.setAttribute('class', 'FutrueName');
        }
        for (j=0; j<int_name.childElementCount; j++) {
            int_name.children[j].setAttribute('x', stn_x.toString());
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
    redrawStn();
}

function setCurrentStn(elem) {
    // Get new value
    var current_stn_idx = elem.parentNode.getAttribute('id').substring(3);

    // Log changes
    var params_instance = getParams();
    params_instance['current_stn_idx'] = current_stn_idx;
    putParams(params_instance);

    // Apply changes
    redrawStn();
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
            txt_bg.setAttribute('x', (txt_dim.x-4).toString());
            txt_bg.setAttribute("y", (txt_dim.y-2).toString());
            txt_bg.setAttribute("width", (txt_dim.width+8).toString());
            txt_bg.setAttribute("height", (txt_dim.height+4).toString());
            txt_bg.setAttribute("fill", "black");
            stn_names[i].insertBefore(txt_bg, stn_names[i].children[0]);
            
            // Change class
            // for (j=1; j<stn_names[i].children.length; j++) {
            //     var class_lang = stn_names[i].children[j].getAttribute('class').slice(-2);
            //     stn_names[i].children[j].setAttribute('class', 'CurrentStnName'+class_lang);
            // }
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
    // Interchange ticks also repositioned here
    var params_instance = getParams();
    var y = getY();
    var txt_bg_gap = params_instance['txt_bg_gap'];
    var txt_flip = params_instance['txt_flip'];

    var stn_names = document.getElementById('station_names').children;
    for (i=0; i<stn_names.length; i++) {
        var bg_y = getBGY(i);
        var bg_lower_y = bg_y[0];
        var bg_upper_y = bg_y[1];


        if (i%2 == txt_flip) {
            var dy = y - Number(txt_bg_gap) - bg_lower_y;
            document.getElementById('stn_int_'+i).setAttribute('xlink:href', '#intline_down');
        } else {
            var dy = y + Number(txt_bg_gap) - bg_upper_y;
            document.getElementById('stn_int_'+i).setAttribute('xlink:href', '#intline_up');
        }

        var stn_name = stn_names[i].children;
        for (j=0; j<stn_name.length; j++) {
            var new_y = Number(stn_name[j].getAttribute('y')) + dy;
            stn_name[j].setAttribute('y', new_y.toString());
        }

        // interchange line name
        var [int_lower_y,int_upper_y] = getIntLineY(i);
        // alert([y,int_upper_y,int_lower_y]);
        if (i%2 == txt_flip) {
            var int_dy = y + 25 - int_upper_y;
        } else {
            var int_dy = y - 25 - int_lower_y;
        }
        // alert(int_dy);
        var int_name = document.getElementById('int_name_'+i.toString());
        for (j=0; j<int_name.childElementCount; j++) {
            var new_int_y = Number(int_name.children[j].getAttribute('y')) + int_dy;
            int_name.children[j].setAttribute('y', new_int_y.toString());
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

function showColourSelector(elem, load=false) {
    // Get new value
    var change = elem.checked;
    var stn_idx = elem.parentNode.getAttribute('id').substring(3);
    var params_instance = getParams();

    var city_list = document.getElementById('colour_city').cloneNode(true);
    city_list.setAttribute('id', 'colour_city_int_'+stn_idx);
    city_list.setAttribute('onchange', 'getChangeCity(this)');

    var colour_list = document.getElementById('colour_cities').cloneNode(true);
    colour_list.setAttribute('id', 'colour_cities_int_'+stn_idx);
    for (i=0; i<colour_list.childElementCount; i++) {
        colour_list.children[i].setAttribute('onchange', 'setChangeColour(this)');
    }

    var int_name_field0 = document.createElementNS(elem.namespaceURI, 'input');
    int_name_field0.setAttribute('type', 'input');
    int_name_field0.setAttribute('onchange', 'setChangeName(this,0)');

    var int_name_field1 = int_name_field0.cloneNode(true);
    int_name_field1.setAttribute('onchange', 'setChangeName(this,1)');
    
    if (change) {
        elem.parentNode.appendChild(city_list);
        elem.parentNode.appendChild(colour_list);
        elem.parentNode.appendChild(int_name_field0);
        elem.parentNode.appendChild(int_name_field1);
        getChangeCity(elem.parentNode.children[7]);
    } else {
        params_instance['stn_list'][stn_idx]['change'] = 'cnone';
        putParams(params_instance);

        if (elem.parentNode.children[7]) {
            elem.parentNode.removeChild(elem.parentNode.children[10]);
            elem.parentNode.removeChild(elem.parentNode.children[9]);
            elem.parentNode.removeChild(elem.parentNode.children[8]);
            elem.parentNode.removeChild(elem.parentNode.children[7]);
        }
        document.getElementById('stn_int_'+stn_idx).setAttribute('class', 'cnone');
    }
}

function getChangeCity(elem) {
    var stn_idx = elem.parentNode.getAttribute('id').substring(3);
    var colour_list = document.getElementById('colour_cities_int_'+stn_idx).children;
    var change_city = elem.value;
    for (i=0; i<colour_list.length; i++) {
        if (colour_list[i].getAttribute('id') == change_city) {
            colour_list[i].style.display = 'block'
        } else {
            colour_list[i].style.display = 'none'
        }
    }
    setChangeColour(elem.parentNode.children[8].children[0]);
}

function setChangeColour(elem) {
    var stn_idx = elem.parentNode.parentNode.getAttribute('id').substring(3);
    var stn_state = getStnState(Number(stn_idx));
    var change_city = document.getElementById('colour_city_int_'+stn_idx).value;
    var colour_list = document.getElementById('colour_cities_int_'+stn_idx);
    var colour_name = 'c' + colour_list.querySelector('#'+change_city).value;

    // Log changes
    var params_instance = getParams();
    params_instance['stn_list'][stn_idx]['change'] = colour_name;
    putParams(params_instance);

    // Apply changes
    if (stn_state == -1) {
        document.getElementById('stn_int_'+stn_idx).setAttribute('class', 'cpassed');
    } else {
        document.getElementById('stn_int_'+stn_idx).setAttribute('class', colour_name);
    }
    
}

function setChangeName(elem, i) {
    // Get new value
    var int_name_txt = elem.value;
    var stn_idx = elem.parentNode.getAttribute('id').substring(3);

    // Log changes
    var params_instance = getParams();
    params_instance['stn_list'][stn_idx]['change_name'][i] = int_name_txt;
    putParams(params_instance);

    // Apply changes
    var int_name = document.getElementById('int_name_'+stn_idx);
    int_name.querySelector('#field'+i.toString()).textContent = int_name_txt;
    reposStnName();
}

function test() {
    for (i=0;i<3;i++)
    alert(getIntLineY(i));
    // var a = document.getElementById('stn_name_2').children;
    // alert(a[1].children[0].getAttribute('x'));
    // alert(JSON.stringify(getParams()));

}

function testCity(elem) {
    var par = elem.parentNode;
    var city = elem.value;
    var selectLine = par.querySelector('#selectLine');
    var ln = selectLine.length;
    while (ln) {
        selectLine.remove(0);
        ln--;
    }

    var line_list = colours[city]['line'];
    var line_keys = Object.keys(line_list);
    for (i=0; i<line_keys.length; i++) {
        var option = document.createElement('option'); 
        var key = line_keys[i];
        option.text = line_list[key]['name'][0] + ' - ' + line_list[key]['name'][1];
        option.value = key;
        selectLine.add(option);
    }

    testColour(selectLine);
}

function testColour(elem) {
    var par = elem.parentNode;
    var line = elem.value;
    var city = par.querySelector('#selectCity').value;
    par.querySelector('#selectColour').value = colours[city]['line'][line]['colour'];
}

function testLoad() {
    var theme = document.getElementById('theme');
    testCity(theme.querySelector('#selectCity'));
    testColour(theme.querySelector('#selectLine'));
}