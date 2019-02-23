function setStyle(load=false) {
    // Get new value
    var style = document.getElementById('style').value;

    if (!load) {
    // Log changes
        var params_instance = getParams();
        params_instance['style'] = style;
        putParams(params_instance);
    }

    // Toggle line/station number input
    if (style == 'gzmtr') {
        document.getElementById('style').parentNode.setAttribute('class', 'mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone mdl-cell--middle mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty');
        document.getElementById('line_num').parentNode.style.display = 'inline';
        document.getElementById('auto_num').parentNode.style.display = 'inline';
        var stn_list = document.getElementById('stn_list').children;
        for (i=0; i<stn_list.length; i++) {
            stn_list[i].querySelector('#stn_num').style.display = 'inline';
        }
    }
    if (style == 'mtr') {
        document.getElementById('style').parentNode.setAttribute('class', 'mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--middle mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty');
        document.getElementById('line_num').parentNode.style.display = 'none';
        document.getElementById('auto_num').parentNode.style.display = 'none';
        var stn_list = document.getElementById('stn_list').children;
        for (i=0; i<stn_list.length; i++) {
            stn_list[i].querySelector('#stn_num').style.display = 'none';
        }
    }

    // Set line width/style
    if (style == 'mtr') {
        document.getElementById('line_main').parentNode.setAttribute('class', 'LineDiagramHK');
        document.getElementById('line_passed').parentNode.setAttribute('class', 'LineDiagramHK');
        document.getElementById('station_ints').setAttribute('class', 'LineDiagramChangeHK');
        document.getElementById('intline_up').setAttribute('stroke-linecap', 'round');
        document.getElementById('intline_down').setAttribute('stroke-linecap', 'round');
    }
    if (style == 'gzmtr') {
        document.getElementById('line_main').parentNode.setAttribute('class', 'LineDiagramGZ');
        document.getElementById('line_passed').parentNode.setAttribute('class', 'LineDiagramPassGZ');
        document.getElementById('station_ints').setAttribute('class', 'LineDiagramChangeGZ');
        document.getElementById('intline_up').setAttribute('stroke-linecap', 'square');
        document.getElementById('intline_down').setAttribute('stroke-linecap', 'square');
    }

    // Set station icon
    var [theme_city, theme_line] = params_instance['theme'];
    var theme_colour = colours[theme_city]['line'][theme_line]['colour'];
    var stn_icons = document.getElementById('stations').children;
    for (i=0; i<stn_icons.length; i++) {
        var stn_state = getStnState(i);
        // consider combine with redrawStn()
        if (style == 'mtr') {
            if (stn_state == -1) {
                stn_icons[i].setAttribute('xlink:href', '#stn_hk_pass');
            } else {
                stn_icons[i].setAttribute('xlink:href', '#stn_hk');
            }
            stn_icons[i].setAttribute('stroke', 'none');
        }
        if (style == 'gzmtr') {
            if (stn_state == -1) {
                stn_icons[i].setAttribute('stroke', '#AAAAAA');
            } else {
                stn_icons[i].setAttribute('stroke', theme_colour);
            }
            stn_icons[i].setAttribute('xlink:href', '#stn_gz');
        }
    }

    // Rotate station names
    var stn_names = document.getElementById('station_names').children;
    var current_stn_idx = params_instance['current_stn_idx'];
    for (i=0; i<stn_names.length; i++) {
        var [pre_x, pre_y] = stn_names[i].getAttribute('transform').match(/-?\d+\.?\d*/g);
        if (style == 'gzmtr') {
            stn_names[i].setAttribute('transform', 'translate('+pre_x+','+pre_y+')rotate(-45)');
            stn_names[i].setAttribute('text-anchor', 'start');
            if (i == current_stn_idx) {
                stn_names[i].setAttribute('class', 'FutureName');
            }
        }
        if (style == 'mtr') {
            stn_names[i].setAttribute('transform', 'translate('+pre_x+','+pre_y+')rotate(0)');
            stn_names[i].setAttribute('text-anchor', 'middle');
            if (i == current_stn_idx) {
                stn_names[i].setAttribute('class', 'CurrentName');
            }
        }
    }

    // Show/hide interchange background and switch colour
    if (style == 'gzmtr') {
        document.getElementById('change_bgs').style.display = 'inline';
        var int_names = document.getElementById('change_names').children;
        for (i=0; i<int_names.length; i++) {
            int_names[i].setAttribute('class', 'CurrentName');
        }
    }
    if (style == 'mtr') {
        document.getElementById('change_bgs').style.display = 'none';
        var int_names = document.getElementById('change_names').children;
        for (i=0; i<int_names.length; i++) {
            var stn_state = getStnState(i);
            if (stn_state == -1) {
                int_names[i].setAttribute('class', 'PassedName');
            } else {
                int_names[i].setAttribute('class', 'FutureName');
            }
        }
    }

    // Show/hide station number
    if (style == 'gzmtr') {
        document.getElementById('station_number').style.display = 'inline';
    }
    if (style == 'mtr') {
        document.getElementById('station_number').style.display = 'none';
        // addCurrentBG();
    }

    // Show/Hide text bg
    if (style == 'gzmtr') {
        document.getElementById('current_bg').setAttribute('fill', 'none');
    }
    if (style == 'mtr') {
        document.getElementById('current_bg').setAttribute('fill', '#000');
    }

    if (style == 'gzmtr') {
        pullFont('HeiTi', 'zh');
        pullFont('Heiti SC', 'zh');
        pullFont('STHeiti', 'zh');
        pullFont('Arial', 'en');
    }
    if (style == 'mtr') {
        pullFont('Myriad Pro', 'en');
        pullFont('Noto Serif CJK JP', 'zh');
        pullFont('Source Han Serif', 'zh');
        pullFont('Hiragino Mincho ProN', 'zh');
    }


    reposStnName();
    addCurrentBG();
}