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
    redrawLines();
    redrawStn();
    reposStnName();
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
    redrawLines();
    redrawStn();
    reposStnName();
    reposStnName();
}

function setFont() {
    var fontZH = getFonts('zh');
    var fontEN = getFonts('en');
    var font_zh = fontEN[0];
    var font_en = fontEN[0];
    for (i=1; i<fontEN.length-1; i++) {
        font_zh += ',' + fontEN[i];
        font_en += ',' + fontEN[i];
    }
    font_en += ',' + fontEN[fontEN.length-1];

    for (i=0; i<fontZH.length; i++) {
        font_zh += ',' + fontZH[i];
    }

    var stn_names = document.getElementById('station_names').children;
    for (i=0; i<stn_names.length; i++) {
        stn_names[i].children[0].setAttribute('font-family', font_zh);
        for (j=1; j<stn_names[i].childElementCount; j++) {
            stn_names[i].children[j].setAttribute('font-family', font_en);
        }
    }

    var change_names = document.getElementById('change_names').children;
    for (i=0; i<change_names.length; i++) {
        change_names[i].children[0].setAttribute('font-family', font_zh);
        for (j=1; j<change_names[i].childElementCount; j++) {
            change_names[i].children[j].setAttribute('font-family', font_en);
        }
    }
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
        document.getElementById('padding_slider').MaterialSlider.change(padding);
    }

    // Log changes
    var params_instance = getParams();
    params_instance['padding'] = padding;
    putParams(params_instance);

    // Apply changes
    redrawLines();
    redrawStn();
    reposStnName();
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

function redrawLines(line=null) {
    if (line == null) {
        redrawLines('main');
        redrawLines('passed');
    }

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
    
    if (line == 'main') {
        if (direction == 'left') {
            var path_str = 'M ' + current_stn_x.toString() + ',' + y.toString() + ' H ' + lineStart.toString();
        }
        if (direction == 'right') {
            var path_str = 'M ' + current_stn_x.toString() + ',' + y.toString() + ' H ' + lineEnd.toString();
        }
        document.getElementById('line_main').setAttribute('d', path_str);
    }
    if (line == 'passed') {
        if (direction == 'right') {
            var path_str = 'M ' + current_stn_x.toString() + ',' + y.toString() + ' H ' + lineStart.toString();
        }
        if (direction == 'left') {
            var path_str = 'M ' + current_stn_x.toString() + ',' + y.toString() + ' H ' + lineEnd.toString();
        }
        document.getElementById('line_passed').setAttribute('d', path_str);
    }
}

function setY(src) {
    // Get new value
    if (src == 'slider') {
        var y_pc = document.getElementById('y_slider').value;
        document.getElementById('y_text').value = y_pc;
    }
    if (src == 'text') {
        var y_pc = document.getElementById('y_text').value;
        document.getElementById('y_slider').MaterialSlider.change(y_pc);
        // document.getElementById('y_slider').value = y_pc;
    }

    // Log changes
    var params_instance = getParams();
    params_instance['y_pc'] = y_pc;
    putParams(params_instance);

    // Apply changes
    redrawLines();
    redrawStn();
    reposStnName();
    addCurrentBG();
}

function setStripY(src) {
    // Get new value
    if (src == 'slider') {
        var strip_pc = document.getElementById('strip_slider').value;
        document.getElementById('strip_text').value = strip_pc;
    }
    if (src == 'text') {
        var strip_pc = document.getElementById('strip_text').value;
        document.getElementById('strip_slider').MaterialSlider.change(strip_pc);
    }

    // Log changes
    var params_instance = getParams();
    params_instance['strip_pc'] = strip_pc;
    putParams(params_instance);

    // Apply changes
    redrawStrip();
}

function setLineColour(elem) {
    var target = elem.getAttribute('id');
    var params_instance = getParams();
    var style = params_instance['style']
    if (target == 'theme') {
        var city = elem.querySelector('#city').value;
        var line = elem.querySelector('#line').value;
        var colour = elem.querySelector('#colour').value;
        var colour_name = 'c' + line;

        // Log changes
        var params_instance = getParams();
        params_instance['theme'][0] = city;
        params_instance['theme'][1] = line;
        // params_instance['colour_city'] = city;
        // params_instance['colour_name'] = colour_name;
        putParams(params_instance);

        // Apply changes
        document.getElementById('line_main').setAttribute('stroke', colour);
        document.getElementById('strip').setAttribute('stroke', colour);
        if (style == 'gzmtr') {
            var stn_icons = document.getElementById('stations').children;
            for (i=0; i<stn_icons.length; i++) {
                stn_icons[i].setAttribute('stroke', colour);
            }
        }
    } else if (target.substring(0,13) == 'int_selector') {
        var stn_idx = elem.parentNode.getAttribute('id').substring(3);
        var stn_state = getStnState(Number(stn_idx));
        var change_city = elem.querySelector('#city').value;
        var change_line = elem.querySelector('#line').value;
        var change_colour = colours[change_city]['line'][change_line]['colour'];
        var colour_name = 'c' + change_colour;

        // Log changes
        var params_instance = getParams();
        params_instance['stn_list'][stn_idx]['change'][0] = change_city;
        params_instance['stn_list'][stn_idx]['change'][1] = change_line;
        putParams(params_instance);

        // Apply changes
        if (stn_state == -1) {
            document.getElementById('stn_int_'+stn_idx).setAttribute('stroke', '#AAAAAA');
            document.getElementById('int_bg_'+stn_idx).setAttribute('fill', '#AAAAAA');
        } else {
            document.getElementById('stn_int_'+stn_idx).setAttribute('stroke', change_colour);
            document.getElementById('int_bg_'+stn_idx).setAttribute('fill', change_colour);
        }
    }
}

function setStnNum(load=false) {
    // Get new value
    var auto_num = document.getElementById('auto_num').value;
    var n_stn = getNStn();

    if (!load) {
        // Log changes
        var params_instance = getParams();
        params_instance['auto_num'] = auto_num;
        putParams(params_instance);
    }

    // Apply changes
    var stn_nums = document.getElementById('station_number').children;
    var stns = document.getElementById('stn_list').children;
    if (auto_num == 'asc') {
        for (i=0; i<n_stn; i++) {
            var num = (i+1).toString();
            if (num.length == 1) {
                num = '0' + num;
            }
            stn_nums[i].querySelector('#stn').textContent = num;
            stns[i].querySelector('#stn_num').value = num;
        }
    }
    if (auto_num == 'desc') {
        for (i=0; i<n_stn; i++) {
            var num = (n_stn - i).toString();
            if (num.length == 1) {
                num = '0' + num;
            }
            stn_nums[i].querySelector('#stn').textContent = num;
            stns[i].querySelector('#stn_num').value = num;
        }
    }
}

function setFontWeight(lang=null) {
    var params_instance = getParams();
    if (lang == null) {
        var [weight_zh,weight_en] = params_instance['weight'];
        if (weight_zh == 'bold') {
            document.getElementById('weight_zh').parentNode.MaterialIconToggle.check();
        } else {
            document.getElementById('weight_zh').parentNode.MaterialIconToggle.uncheck();
        }
        if (weight_en == 'bold') {
            document.getElementById('weight_en').parentNode.MaterialIconToggle.check();
        } else {
            document.getElementById('weight_en').parentNode.MaterialIconToggle.uncheck();
        }
    }
    if (lang == 'zh') {
        if (document.getElementById('weight_zh').checked) {
            var weight_zh = 'bold';
        } else {
            var weight_zh = 'regular';
        }
        params_instance['weight'][0] = weight_zh;
        putParams(params_instance);
    }
    if (lang == 'en') {
        if (document.getElementById('weight_en').checked) {
            var weight_en = 'bold';
        } else {
            var weight_en = 'regular';
        }
        params_instance['weight'][1] = weight_en;
        putParams(params_instance);
    }

    // Apply changes
    var stn_names = document.getElementById('station_names').children;
    var int_names = document.getElementById('change_names').children;
    for (i=0; i<stn_names.length; i++) {
        if (lang == 'zh' || lang == null) {
            stn_names[i].querySelector('#field0').setAttribute('font-weight', weight_zh);
            int_names[i].querySelector('#field0').setAttribute('font-weight', weight_zh);
        }
        if (lang == 'en' || lang == null) {
            stn_names[i].querySelector('#field1').setAttribute('font-weight', weight_en);
            int_names[i].querySelector('#field1').setAttribute('font-weight', weight_en);
        }
    }

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
    addCurrentBG();
}

function addStn(elem, load=false) {
    // Get new value
    var par = elem.parentNode.parentNode;
    var add_idx = par.getAttribute('id').substring(3);
    
    if (!load) {
        // Log changes
        var params_instance = getParams();
        params_instance['stn_list'].splice(add_idx, 0, params_instance['stn_list'][add_idx]);
        putParams(params_instance);

        var params_instance = getParams();
        params_instance['stn_list'][add_idx]['change'][0] = 'nullCity';
        params_instance['stn_list'][add_idx]['change'][1] = 'nullLine'; // reset interchange
    }

    // Apply changes
    var new_stn = par.cloneNode(true);
    if (new_stn.children[4]) {
        new_stn.querySelector('#change').checked = false;
        new_stn.removeChild(new_stn.children[6]);
        new_stn.removeChild(new_stn.children[5]);
        new_stn.removeChild(new_stn.children[4]);
    } // reset interchange
    var stns = document.getElementById('stn_list').children;
    par.parentNode.insertBefore(new_stn, stns[parseInt(add_idx)]);

    var stn_icon = document.getElementById('stn_icon_'+add_idx);
    var new_stn_icon = stn_icon.cloneNode(true);
    var stn_icons = document.getElementById('stations').children;
    stn_icon.parentNode.insertBefore(new_stn_icon, stn_icons[parseInt(add_idx)]);

    var stn_num = document.getElementById('stn_num_'+add_idx);
    var new_stn_num = stn_num.cloneNode(true);
    var stn_nums = document.getElementById('station_number').children;
    stn_num.parentNode.insertBefore(new_stn_num, stn_nums[parseInt(add_idx)]);

    var stn_int = document.getElementById('stn_int_'+add_idx);
    var new_stn_int = stn_int.cloneNode(true);
    new_stn_int.setAttribute('stroke', 'none'); // reset interchange
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

    var int_bg = document.getElementById('int_bg_'+add_idx);
    var new_int_bg = int_bg.cloneNode(true);
    new_int_bg.setAttribute('fill', 'none');
    var int_bgs = document.getElementById('change_bgs').children;
    int_bg.parentNode.insertBefore(new_int_bg, int_bgs[parseInt(add_idx)]);

    if (!load) {
        reidxStn();
        // redrawStn();

        // Fix radio input
        var current_stn_idx = document.querySelector('input[name="current"]:checked').parentNode.parentNode.getAttribute('id').substring(3);
        params_instance['current_stn_idx'] = current_stn_idx;
        putParams(params_instance);

        redrawLines();
        redrawStn();
        reposStnName();
        addCurrentBG();
    }
}

function rmStn(elem, load=false) {
    // Get value to remove
    var par = elem.parentNode.parentNode;
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

    // Remove station number in SVG
    var stn_num = document.getElementById('stn_num_'+rm_idx);
    stn_num.parentNode.removeChild(stn_num);

    // Remove interchange in SVG
    var stn_int = document.getElementById('stn_int_'+rm_idx);
    stn_int.parentNode.removeChild(stn_int);

    // Remove station name in SVG
    var stn_name = document.getElementById('stn_name_'+rm_idx);
    stn_name.parentNode.removeChild(stn_name);

    // Remove int name in SVG
    var int_name = document.getElementById('int_name_'+rm_idx);
    int_name.parentNode.removeChild(int_name);

    // Remove int bg in SVG
    var int_bg = document.getElementById('int_bg_'+rm_idx);
    int_bg.parentNode.removeChild(int_bg);

    if (!load) {
        reidxStn();
        // redrawStn();
    
        // Fix radio input
        var current_stn = document.querySelector('input[name="current"]:checked');
        if (current_stn != null) {
            var current_stn_idx = current_stn.parentNode.parentNode.getAttribute('id').substring(3);
        } else {
            var n_stn = params_instance['stn_list'].length;
            if (rm_idx >= n_stn) {
                current_stn_idx = n_stn - 1;
            } else {
                current_stn_idx = rm_idx;
            }
            document.getElementById('stn_list').children[current_stn_idx].querySelector('#current').checked = true;
        }
    
        // Log changes
        params_instance['current_stn_idx'] = current_stn_idx.toString();
        putParams(params_instance);
    
        // Apply other changes
        redrawLines();
        redrawStn();
        reposStnName();
        addCurrentBG();
    }
}

function reidxStn() {
    var n_stn = getNStn();
    var params_instance = getParams();
    var auto_num = params_instance['auto_num'];

    var stns = document.getElementById('stn_list').children;
    var stn_icons = document.getElementById('stations').children;
    var stn_nums = document.getElementById('station_number').children;
    // stn_num managed by setStnNum();
    var stn_ints = document.getElementById('station_ints').children;
    var stn_names = document.getElementById('station_names').children;
    var int_names = document.getElementById('change_names').children;
    var int_bgs = document.getElementById('change_bgs').children;

    for (i=0; i<n_stn; i++) {
        stns[i].setAttribute('id', 'stn'+i.toString());
        stn_icons[i].setAttribute('id', 'stn_icon_'+i.toString());
        stn_nums[i].setAttribute('id', 'stn_num_'+i.toString());
        // if (auto_num == 'asc') {
        //     if (i<9) {
        //         stn_nums[i].querySelector('#stn').textContent = '0' + (i+1).toString();
        //         stns[i].querySelector('#stn_num').value = '0' + (i+1).toString();
        //     } else {
        //         stn_nums[i].querySelector('#stn').textContent = (i+1).toString();
        //         stns[i].querySelector('#stn_num').value = (i+1).toString();
        //     }
        // }
        
        stn_ints[i].setAttribute('id', 'stn_int_'+i.toString());
        stn_names[i].setAttribute('id', 'stn_name_'+i.toString());

        int_names[i].setAttribute('id', 'int_name_'+i.toString());
        int_bgs[i].setAttribute('id', 'int_bg_'+i.toString());
    }

    setStnNum(true);
}

function redrawStn() {
    // Station names and interchange ticks are also shifted
    // And station number (if any)

    // Read from logs
    var stn_icons = document.getElementById('stations').children;
    var n_stn = stn_icons.length;
    var params_instance = getParams();
    var style = params_instance['style'];

    var y = getY();

    // Apply changes
    for (i=0; i<n_stn; i++) {
        // station icon
        var stn_state = getStnState(i);
        var stn_x = getStnX(i);
        stn_icons[i].setAttribute('transform', 'translate(' + stn_x.toString() + ',' + y.toString() + ')');
        if (style == 'mtr') {
            if (stn_state == -1) {
                stn_icons[i].setAttribute('xlink:href', '#stn_hk_pass');
            } else {
                stn_icons[i].setAttribute('xlink:href', '#stn_hk');
            }
            stn_icons[i].setAttribute('stroke', 'none');
        }
        if (style == 'gzmtr') {
            var [theme_city, theme_line] = params_instance['theme'];
            var theme_colour = colours[theme_city]['line'][theme_line]['colour'];
            if (stn_state == -1) {
                stn_icons[i].setAttribute('stroke', '#AAAAAA');
            } else {
                stn_icons[i].setAttribute('stroke', theme_colour);
            }
            stn_icons[i].setAttribute('xlink:href', '#stn_gz');
        }

        // station number
        var stn_num = document.getElementById('stn_num_'+i);
        stn_num.children[0].setAttribute('x', (stn_x-9).toString());
        stn_num.children[1].setAttribute('x', (stn_x+9).toString());
        stn_num.children[0].setAttribute('y', y.toString());
        stn_num.children[1].setAttribute('y', y.toString());

        var stn_int = document.getElementById('stn_int_'+i);
        var int_bg = document.getElementById('int_bg_'+i);
        var [change_city,change_line] = params_instance['stn_list'][i]['change'];
        if (change_line != 'nullLine') {
            var change_colour = colours[change_city]['line'][change_line]['colour'];
            if (stn_state == -1) {
                stn_int.setAttribute('stroke', '#AAAAAA');
                int_bg.setAttribute('fill', '#AAAAAA');
            } else {
                stn_int.setAttribute('stroke', change_colour);
                int_bg.setAttribute('fill', change_colour);
            }
        }
        stn_int.setAttribute('x', stn_x.toString());
        stn_int.setAttribute('y', y.toString());

        var stn_name = document.getElementById('stn_name_'+i);
        var stn_num = document.getElementById('stn_num_'+i);
        if (stn_state == -1) {
            stn_name.setAttribute('class', 'PassedName');
            stn_num.setAttribute('class', 'PassedName');
        } else if (stn_state == 0 && style == 'mtr') {
            stn_name.setAttribute('class', 'CurrentName');
        } else {
            stn_name.setAttribute('class', 'FutureName');
            stn_num.setAttribute('class', 'FutureName');
        }


        var [pre_x, pre_y, pre_d] = stn_name.getAttribute('transform').match(/-?\d+\.?\d*/g);
        var tf_str = 'translate(' + stn_x.toString() + ',' + pre_y + ')rotate(' + pre_d + ')';
        stn_name.setAttribute('transform', tf_str);

        var int_name = document.getElementById('int_name_'+i);
        if (style == 'mtr') {
            if (stn_state == -1) {
                int_name.setAttribute('class','PassedName');
            } else {
                int_name.setAttribute('class', 'FutureName');
            }
        }
        if (style == 'gzmtr') {
            int_name.setAttribute('class','CurrentName');
        }
        for (j=0; j<int_name.childElementCount; j++) {
            int_name.children[j].setAttribute('x', stn_x.toString());
        }
    }
}

function setDirection(elem) {
    // Get new value
    var direction = elem.getAttribute('id');
    if (direction == 'direc_l') {
        direction = 'left';
        document.getElementById('direc_l').disabled = true;
        document.getElementById('direc_r').disabled = false;
    }
    if (direction == 'direc_r') {
        direction = 'right';
        document.getElementById('direc_r').disabled = true;
        document.getElementById('direc_l').disabled = false;
    }

    // Log changes
    var params_instance = getParams();
    params_instance['direction'] = direction;
    putParams(params_instance);

    // Apply changes
    redrawLines();
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
    redrawLines();
    reposStnName();
    addCurrentBG();
}

function addCurrentBG() {
    var params_instance = getParams();
    var current_stn_idx = params_instance['current_stn_idx'];
    var current_stn_x = getStnX(current_stn_idx);

    var stn_name = document.getElementById('stn_name_'+current_stn_idx);

    var txt_bcr = stn_name.getBoundingClientRect();
    var pt = document.getElementById('root').createSVGPoint();
    pt.x = txt_bcr.left;
    pt.y = txt_bcr.top;
    var ctm = document.getElementById('root').getScreenCTM();
    var txt_pos = pt.matrixTransform(ctm.inverse());
            
    var txt_bg = document.getElementById('current_bg');
    txt_bg.setAttribute('x', (txt_pos.x-4).toString());
    txt_bg.setAttribute("y", (txt_pos.y-2).toString());
    txt_bg.setAttribute("width", (txt_bcr.width+8).toString());
    txt_bg.setAttribute("height", (txt_bcr.height+4).toString());
}

function setStnName(elem, target) {
    // Get new value
    var stn_idx = elem.parentNode.getAttribute('id').substring(3);

    // Log changes
    var params_instance = getParams();
    params_instance['stn_list'][stn_idx]['name'][target] = elem.value; 
    var wrap = params_instance['stn_list'][stn_idx]['wrap'];
    putParams(params_instance);

    // Apply changes
    var stn_name = document.getElementById('stn_name_'+stn_idx);
    if (wrap && target == 1) {
        var [str1, str2] = splitText(elem.parentNode.querySelector('#field1').value);
        var stn_x = getStnX(stn_idx);
        var stn_name_html = str1 + '<tspan x="0" dy="15">' + str2 + '</tspan>';
        stn_name.querySelector('#field1').innerHTML = stn_name_html;
    } else {
        stn_name.querySelector('#field'+target.toString()).textContent = elem.value;
    }

    reposStnName();
    addCurrentBG();
}

function reposStnName() {
    // Interchange ticks also repositioned here
    var params_instance = getParams();
    var y = getY();
    var txt_bg_gap = params_instance['txt_bg_gap'];
    var txt_flip = params_instance['txt_flip'];
    var style = params_instance['style'];

    var stn_names = document.getElementById('station_names').children;
    for (i=0; i<stn_names.length; i++) {
        var bg_y = getBGY(i);
        var bg_lower_y = bg_y[0];
        var bg_upper_y = bg_y[1];
        var stn_x = getStnX(i);


        if (i%2 != txt_flip && style=='mtr') {
            var dy = y + Number(txt_bg_gap) - bg_upper_y;
        } else {
            var dy = y - Number(txt_bg_gap) - bg_lower_y;
        }

        // var stn_name = stn_names[i].children;
        // for (j=0; j<stn_name.length; j++) {
        //     var new_y = Number(stn_name[j].getAttribute('y')) + dy;
        //     stn_name[j].setAttribute('y', new_y.toString());
        // }

        var [pre_x, pre_y, pre_d] = stn_names[i].getAttribute('transform').match(/-?\d+\.?\d*/g);
        var new_y = Number(pre_y) + dy;
        if (style == 'gzmtr') {
            var pt = document.getElementById('root').createSVGPoint();
            var ctm = document.getElementById('root').getScreenCTM();
            var bcr = stn_names[i].getBoundingClientRect();
            var bb = stn_names[i].getBBox();
            pt.x = bcr.left;
            pt.y = bcr.top;
            var pos = pt.matrixTransform(ctm.inverse());
            x = stn_x - bb.height * Math.cos(Number(pre_d)) * 0.8;
        }
        if (style == 'mtr') {
            x = stn_x;
        }
        stn_names[i].setAttribute('transform', 'translate('+x.toString()+','+new_y.toString()+')rotate('+pre_d+')');

        // interchange line name
        var [int_lower_y,int_upper_y] = getIntLineY(i);
        // alert([y,int_upper_y,int_lower_y]);
        if (i%2 != txt_flip && style == 'mtr') {
            var int_dy = y - 25 - int_lower_y;
            document.getElementById('stn_int_'+i).setAttribute('xlink:href', '#intline_up');
        } else {
            var int_dy = y + 25 - int_upper_y;
            document.getElementById('stn_int_'+i).setAttribute('xlink:href', '#intline_down');
        }
        // alert(int_dy);
        var int_name = document.getElementById('int_name_'+i.toString());
        for (j=0; j<int_name.childElementCount; j++) {
            var new_int_y = Number(int_name.children[j].getAttribute('y')) + int_dy;
            int_name.children[j].setAttribute('y', new_int_y.toString());
        }

        // interchange bg
        var int_name_bb = int_name.getBBox();
        var int_name_bg_y = int_name_bb.y + int_name_bb.height/2 - 10;
        if (int_name_bb.width > 29) {
            int_name_bb_x = stn_x - int_name_bb.width/2 - 4;
            document.getElementById('int_bg_'+i.toString()).setAttribute('width', (int_name_bb.width+8).toString());
        } else {
            int_name_bb_x = stn_x - 18.5;
            document.getElementById('int_bg_'+i.toString()).setAttribute('width', '37');
        }
        document.getElementById('int_bg_'+i.toString()).setAttribute('y', int_name_bg_y.toString());
        document.getElementById('int_bg_'+i.toString()).setAttribute('x', int_name_bb_x.toString());
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
    setStnName(elem.parentNode.querySelector('#field1'), 1);
}


function getChangeCity(elem) {
    var stn_idx = elem.parentNode.getAttribute('id').substring(3);
    var colour_list = document.getElementById('colour_cities_int_'+stn_idx).children;
    var change_city = elem.value;
    for (i=0; i<colour_list.length; i++) {
        if (colour_list[i].getAttribute('id') == change_city) {
            colour_list[i].style.display = 'inline'
        } else {
            colour_list[i].style.display = 'none'
        }
    }
    setChangeColour(elem.parentNode.children[8].children[0]);
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

function setLineNum(load=false) {
    // Get new value
    var line_num = document.getElementById('line_num').value;

    if (!load) {
        // Log changes
        var params_instance = getParams();
        params_instance['line_num'] = line_num;
        putParams(params_instance);
    }

    // Apply changes
    var stn_nums = document.getElementById('station_number').children;
    for (i=0; i<stn_nums.length; i++) {
        stn_nums[i].querySelector('#ln').textContent = line_num;
    }
}