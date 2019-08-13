'use strict';

function loadTemplate(line) {
    alert('All changes will be discarded! ')
    if (line == 'gz8') {
        sessionStorage.all_params = JSON.stringify(template_gz8_params);
    }
    if (line == 'wrl') {
        sessionStorage.all_params = JSON.stringify(template_wrl_params);
    }
    if (line == 'edi24') {
        sessionStorage.all_params = JSON.stringify(template_edi24_params);
    }

    loadSVGSize();
}

function loadSVGSize() {
    var params_instance = getParams();

    var svg_width = params_instance['svg_width'];
    svg_width__input.foundation_.setValue(svg_width);
    document.getElementById('root').setAttribute('width', svg_width);
    document.getElementById('outer').setAttribute('width', svg_width);

    var svg_height = params_instance['svg_height'];
    svg_height__input.foundation_.setValue(svg_height);
    // mdc.textField.MDCTextField.attachTo(document.getElementById('svg_height').parentElement).value = svg_height;
    // document.getElementById('svg_height').parentElement.MaterialTextfield.change(svg_height);
    // document.getElementById('svg_height').value = svg_height;
    document.getElementById('root').setAttribute('height', svg_height);
    document.getElementById('outer').setAttribute('height', svg_height);

    var show_outer = params_instance['show_outer'];
    mdc.switchControl.MDCSwitch.attachTo(document.getElementById('outer_checkbox').parentNode.parentNode.parentNode).checked = show_outer;
    // document.getElementById('outer_checkbox').checked = show_outer;
    // document.getElementById('outer_checkbox').checked = show_outer;
    if (show_outer) {
        // document.getElementById('outer_checkbox').parentNode.MaterialSwitch.on();
        document.getElementById('outer').setAttribute('stroke', 'black');
    } else {
        // document.getElementById('outer_checkbox').parentNode.MaterialSwitch.off();
        document.getElementById('outer').setAttribute('stroke', 'none');
    }

    var padding = params_instance['padding'];
    mdc.textField.MDCTextField.attachTo(document.getElementById('padding_text').parentElement).value = padding;
    // document.getElementById('padding_text').parentElement.MaterialTextfield.change(padding);
    // mdc.slider.MDCSlider.attachTo(document.getElementById('padding_slider')).value = padding;
    padding_slider.value = padding;
    // document.getElementById('padding_slider').MaterialSlider.change(padding);

    var y_pc = params_instance['y_pc'];
    mdc.textField.MDCTextField.attachTo(document.getElementById('y_text').parentElement).value = y_pc;
    // document.getElementById('y_text').parentElement.MaterialTextfield.change(y_pc);
    mdc.slider.MDCSlider.attachTo(document.getElementById('y_slider')).value = y_pc;
    // document.getElementById('y_slider').MaterialSlider.change(y_pc);

    var strip_pc = params_instance['strip_pc'];
    mdc.textField.MDCTextField.attachTo(document.getElementById('strip_text').parentElement).value = strip_pc;
    // document.getElementById('strip_text').parentElement.MaterialTextfield.change(strip_pc);
    mdc.slider.MDCSlider.attachTo(document.getElementById('strip_slider')).value = strip_pc;
    // document.getElementById('strip_slider').MaterialSlider.change(strip_pc);
    redrawStrip();

    var theme_city = params_instance['theme'][0];
    var theme = document.getElementById('theme');
    theme.querySelector('#city').parentElement.MaterialTextfield.change(theme_city);
    // theme.querySelector('#city').value = theme_city;
    loadLine(theme, params_instance['theme'][1]);

    // var theme_line = params_instance['theme'][1];
    // theme.querySelector('#line').value = theme_line;
    // loadColour(theme);

    redrawLines('main');

    var style = params_instance['style'];
    
    // var style_selector = document.getElementById('style');
    // style_selector.value = style;

    var line_num = params_instance['line_num'];
    document.getElementById('line_num').value = line_num;
    setLineNum(true);

    var direction = params_instance['direction'];
    if (direction.substring(0,1) == 'r') {
        document.getElementById('direc_r').disabled = true;
        document.getElementById('direc_l').disabled = false;
    } else {
        document.getElementById('direc_r').disabled = false;
        document.getElementById('direc_l').disabled = true;
    }

    setFontWeight();

    var txt_bg_gap = params_instance['txt_bg_gap'];
    document.getElementById('txt_bg_gap_text').parentElement.MaterialTextfield.change(txt_bg_gap);
    document.getElementById('txt_bg_gap_slider').MaterialSlider.change(txt_bg_gap);

    var stn_list = params_instance['stn_list'];
    var n_stn = stn_list.length;
    var stns = document.getElementById('stn_list').children;

    while (stns.length - 1) {
        rmStn(stns[1].querySelector('#rm'), true);
    }

    stns[0].querySelector('#change').checked = false;
    if (stns[0].children[4]) {
        stns[0].removeChild(stns[0].children[6]);
        stns[0].removeChild(stns[0].children[5]);
        stns[0].removeChild(stns[0].children[4]);
    }
    document.getElementById('stn_int_0').setAttribute('stroke', 'none');
    document.getElementById('int_bg_0').setAttribute('fill', 'none');

    var stn_to_add = n_stn - 1;
    while (stn_to_add != 0) {
        addStn(document.getElementById('stn0').querySelector('#rm'), true);
        // } else if (n_stn < n_stn_pre) {
        //     rmStn(document.getElementById('stn_list').children[1].children[2], true);
        // // }
        // var n_stn_pre = document.getElementById('stn_list').childElementCount;
        stn_to_add--;
    }
    // alert(n_stn_pre);
    reidxStn();

    var current_stn_idx = params_instance['current_stn_idx'];
    // document.getElementById('stn'+current_stn_idx).querySelector('#current').parentNode.MaterialRadio.check();
    document.getElementById('stn'+current_stn_idx).querySelector('#current').checked = true;
    // document.getElementById('stn_list').children[current_stn_idx].children[0].checked = true;
    redrawLines('passed');
    for (var k=0; k<n_stn; k++) {
        // Wrap
        var wrap = stn_list[k]['wrap'];
        document.getElementById('stn'+k).querySelector('#wrap').checked = wrap;

        // Name in list
        document.getElementById('stn'+k+'_field0').parentElement.MaterialTextfield.change(stn_list[k]['name'][0]);
        document.getElementById('stn'+k+'_field1').parentElement.MaterialTextfield.change(stn_list[k]['name'][1]);
        // document.getElementById('stn'+k).querySelector('#field0').value = stn_list[k]['name'][0];
        // document.getElementById('stn'+k).querySelector('#field0').parentElement.MaterialTextfield.change(stn_list[k]['name'][0]);
        // document.getElementById('stn'+k).querySelector('#field1').value = stn_list[k]['name'][1];
        if (stn_list[k]['change'][0] != 'nullCity') {
            var elem = document.getElementById('stn'+k).querySelector('#change');
            elem.checked = true;

            var selector = document.getElementById('theme').cloneNode(true);
            selector.setAttribute('id', 'int_selector');

            var int_name_field0 = document.createElementNS(elem.namespaceURI, 'input');
            int_name_field0.setAttribute('type', 'input');
            int_name_field0.setAttribute('onchange', 'setChangeName(this,0)');
            int_name_field0.value = stn_list[k]['change_name'][0];

            var int_name_field1 = int_name_field0.cloneNode(true);
            int_name_field1.setAttribute('onchange', 'setChangeName(this,1)');
            int_name_field1.value = stn_list[k]['change_name'][1];

            document.getElementById('stn'+k).appendChild(selector);
            document.getElementById('stn'+k).appendChild(int_name_field0);
            document.getElementById('stn'+k).appendChild(int_name_field1);

            var [change_city,change_line] = stn_list[k]['change'];
            loadCity(selector, change_city);
            loadLine(selector, change_line);
        }
        // } else {
        //     document.getElementById('stn'+k).children[6].checked = false;
        //     if (document.getElementById('stn'+k).children[8]) {
        //         document.getElementById('stn'+k).remove(9);
        //         document.getElementById('stn'+k).remove(8);
        //         document.getElementById('stn'+k).remove(7);
        //     }
        // }

        // Name in SVG
        var stn_name = document.getElementById('stn_name_'+k);
        stn_name.querySelector('#field0').textContent = stn_list[k]['name'][0];

        if (wrap) {
            var [str1, str2] = splitText(stn_list[k]['name'][1]);
            var stn_x = getStnX(k);
            var stn_name_html = str1 + '<tspan x="0" dy="15">' + str2 + '</tspan>';
            stn_name.querySelector('#field1').innerHTML = stn_name_html;
        } else {
            stn_name.querySelector('#field1').textContent = stn_list[k]['name'][1];
        }

        // Name in HTML
        // document.getElementById('stn'+k.toString()).children[1].value = stn_list[k]['name'][0];
        // document.getElementById('stn'+k.toString()).children[2].value = stn_list[k]['name'][1];

        // Int name in SVG
        var int_name = document.getElementById('int_name_'+k);
        // alert(stn_list[i]['change_name'][0])
        int_name.querySelector('#field0').textContent = stn_list[k]['change_name'][0];
        int_name.querySelector('#field1').textContent = stn_list[k]['change_name'][1];
    }

    redrawStn();
    reposStnName();
    addCurrentBG();

    // if (style != document.getElementById('style').value) {
    //     document.getElementById('style').value = style;
    //     setStyle();
    // }
    document.querySelector('input[name="style"]').setAttribute('value', style);
    // var styles = ['gzmtr', 'mtr'];
    // for (i=0; i<styles.length; i++) {
    //     if (style == styles[i]) {
    //         document.querySelector('li[data-val="'+style+'"]').className = 'mdl-menu__item selected';
    //     } else {
    //         document.querySelector('li[data-val="'+style+'"]').className = 'mdl-menu__item';
    //     }
    // }
    getmdlSelect.init('.getmdl-select');
    setStyle();
}

function save() {
    var params_instance = getParams();
    document.getElementById('params_string').value = JSON.stringify(params_instance);
}

function load() {
    // sessionStorage.all_params = JSON.stringify(template_gz8_params);
    sessionStorage.all_params = document.getElementById('params_string').value;
    if (checkDataVer()) {
        loadSVGSize();
    } else {
        alert('Warning: Configuration imported is deprecated! Please save the updated script in the text area and reload it again!')
    }
    // loadSVGSize();
}

function checkDataVer() {
    var return_value = true;
    // var params_instance = getParams();
    var params_instance = JSON.parse(document.getElementById('params_string').value);

    if (params_instance['colour_city']) {
        var theme_city = params_instance['colour_city'];
        if (theme_city == 'gz') {
            theme_city = 'guangzhou';
        }
        if (theme_city == 'hk') {
            theme_city = 'hongkong';
        }
        if (theme_city == 'fs') {
            theme_city = 'foshan';
        }
        if (theme_city == 'sz') {
            theme_city = 'shenzhen';
        }
        if (params_instance['theme'] == null) {
            params_instance['theme'] = ['',''];
        }
        params_instance['theme'][0] = theme_city;
        delete params_instance['colour_city'];

        return_value = false;
    }

    if (params_instance['colour_name']) {
        var theme_colour = params_instance['colour_name'];
        theme_colour = theme_colour.substring(1,theme_colour.length);
        if (params_instance['theme'] == null) {
            params_instance['theme'] = ['',''];
        }
        params_instance['theme'][1] = theme_colour;
        delete params_instance['colour_name'];

        return_value = false;
    }

    if (params_instance['stn_list'][0]['field0']) {
        var stn_list = params_instance['stn_list'];
        for (i=0; i<stn_list.length; i++) {
            stn_list[i]['name'] = [stn_list[i]['field0'], stn_list[i]['field1']];
            delete stn_list[i]['field0'];
            delete stn_list[i]['field1'];

            if (stn_list[i]['change'] == 'cnone') {
                stn_list[i]['change'] = ['nullCity', 'nullLine'];
            } else {
                var cities = Object.keys(colours);
                for (j=0; j<cities.length; j++) {
                    if (colours[cities[j]]['line'][stn_list[i]['change'].substring(1,stn_list[i]['change'].length)] != null) {
                        stn_list[i]['change'] = [cities[j], stn_list[i]['change'].substring(1,stn_list[i]['change'].length)];
                        break;
                    }
                }
            }
        }

        return_value = false;
    }

    if (params_instance['style'] == null) {
        params_instance['style'] = 'mtr';

        return_value = false;
    }

    if (params_instance['line_num'] == null) {
        params_instance['line_num'] = '1';

        return_value = false;
    }

    if (params_instance['auto_num'] == null) {
        params_instance['auto_num'] = 'asc';

        return_value = false;
    }

    if (params_instance['weight'] == null) {
        params_instance['weight'] = ['',''];

        return_value = false;
    }


    if (!return_value) {
        document.getElementById('params_string').value = JSON.stringify(params_instance);
    }
    return return_value;
}