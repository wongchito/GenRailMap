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
    document.getElementById('svg_width').value = svg_width;
    document.getElementById('root').setAttribute('width', svg_width);
    document.getElementById('outer').setAttribute('width', svg_width);

    var svg_height = params_instance['svg_height'];
    document.getElementById('svg_height').value = svg_height;
    document.getElementById('root').setAttribute('height', svg_height);
    document.getElementById('outer').setAttribute('height', svg_height);

    var show_outer = params_instance['show_outer'];
    document.getElementById('outer_checkbox').checked = show_outer;
    if (show_outer) {
        document.getElementById('outer').setAttribute('stroke', 'black');
    } else {
        document.getElementById('outer').setAttribute('stroke', 'none');
    }

    var padding = params_instance['padding'];
    document.getElementById('padding_text').value = padding;
    document.getElementById('padding_slider').value = padding;

    var y_pc = params_instance['y_pc'];
    document.getElementById('y_text').value = y_pc;
    document.getElementById('y_slider').value = y_pc;

    var strip_pc = params_instance['strip_pc'];
    document.getElementById('strip_text').value = strip_pc;
    document.getElementById('strip_slider').value = strip_pc;
    redrawStrip();

    var theme_city = params_instance['theme'][0];
    var theme = document.getElementById('theme');
    theme.querySelector('#city').value = theme_city;
    loadLine(theme);

    var theme_line = params_instance['theme'][1];
    theme.querySelector('#line').value = theme_line;
    loadColour(theme);

    redrawLineMain();

    var direction = params_instance['direction'];
    document.getElementById('direc_'+direction.substring(0,1)).checked = true;

    var txt_bg_gap = params_instance['txt_bg_gap'];
    document.getElementById('txt_bg_gap_text').value = txt_bg_gap;
    document.getElementById('txt_bg_gap_slider').value = txt_bg_gap;

    var stn_list = params_instance['stn_list'];
    var n_stn = stn_list.length;
    var stns = document.getElementById('stn_list').children;

    while (stns.length - 1) {
        rmStn(stns[1].children[2], true);
    }

    var n_stn_pre = stns.length;
    while (n_stn - n_stn_pre != 0) {
        addStn(document.getElementById('stn0').children[2], true);
        // } else if (n_stn < n_stn_pre) {
        //     rmStn(document.getElementById('stn_list').children[1].children[2], true);
        // // }
        var n_stn_pre = document.getElementById('stn_list').childElementCount;
    }

    reidxStn();

    var current_stn_idx = params_instance['current_stn_idx'];
    document.getElementById('stn_list').children[current_stn_idx].children[0].checked = true;
    redrawLinePassed();
    for (k=0; k<n_stn; k++) {
        // Wrap
        var wrap = stn_list[k]['wrap'];
        document.getElementById('stn'+k).children[3].checked = wrap;

        // Name in list
        document.getElementById('stn'+k).children[1].value = stn_list[k]['name'][0];
        document.getElementById('stn'+k).children[2].value = stn_list[k]['name'][1];
        if (stn_list[k]['change'][0] != 'nullCity') {
            var elem = document.getElementById('stn'+k).children[6];
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
        } else {
            document.getElementById('stn'+k).children[6].checked = false;
            if (document.getElementById('stn'+k).children[7]) {
                document.getElementById('stn'+k).remove(9);
                document.getElementById('stn'+k).remove(8);
                document.getElementById('stn'+k).remove(7);
            }
        }

        // Name in SVG
        var stn_name = document.getElementById('stn_name_'+k);
        stn_name.querySelector('#field0').textContent = stn_list[k]['name'][0];
        if (wrap) {
            var [str1, str2] = splitText(stn_list[k]['name'][1]);
            var stn_x = getStnX(k);
            var stn_name_html = str1 + '<tspan x="' + stn_x.toString() + '" dy="15">' + str2 + '</tspan>';
            stn_name.querySelector('#field1').innerHTML = stn_name_html;
        } else {
            stn_name.querySelector('#field1').textContent = stn_list[k]['name'][1];
        }

        // Int name in SVG
        var int_name = document.getElementById('int_name_'+k);
        // alert(stn_list[i]['change_name'][0])
        int_name.querySelector('#field0').textContent = stn_list[k]['change_name'][0];
        int_name.querySelector('#field1').textContent = stn_list[k]['change_name'][1];
    }

    redrawStn();
    addCurrentBG();
    reposStnName();

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
                stn_list[i]['change'] = [params_instance['theme'][0], stn_list[i]['change'].substring(1,stn_list[i]['change'].length)];
            }
        }

        return_value = false;
    }

    if (!return_value) {
        document.getElementById('params_string').value = JSON.stringify(params_instance);
    }
    return return_value;
}