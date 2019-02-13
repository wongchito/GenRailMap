function loadTemplate(line) {
    alert('All changes will be discarded! ')
    sessionStorage.all_params = JSON.stringify(template_gz8_params);

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

    var colour_city = params_instance['colour_city'];
    document.getElementById('colour_city').value = colour_city;
    getCity(document.getElementById('colour_city'));
    var colour_name = params_instance['colour_name'];
    document.getElementById(colour_city).value = colour_name.substring(1);
    setLineColour();

    redrawLineMain();

    var direction = params_instance['direction'];
    document.querySelector('input[name="direction"]').checked = direction;

    var txt_bg_gap = params_instance['txt_bg_gap'];
    document.getElementById('txt_bg_gap_text').value = txt_bg_gap;
    document.getElementById('txt_bg_gap_slider').value = txt_bg_gap;

    var stn_list = params_instance['stn_list'];
    var n_stn = stn_list.length;
    var n_stn_pre = document.getElementById('stn_list').childElementCount;

    while (n_stn - n_stn_pre != 0) {
        if (n_stn > n_stn_pre) {
            addStn(document.getElementById('stn0').children[2], true);
        } else {
            rmStn(document.getElementById('stn0').children[2], true);
        }
        var n_stn_pre = document.getElementById('stn_list').childElementCount;
    }

    reidxStn();

    var current_stn_idx = params_instance['current_stn_idx'];
    document.getElementById('stn_list').children[current_stn_idx].children[0].checked = true;
    redrawLinePassed();

    for (i=0; i<n_stn; i++) {
        document.getElementById('stn'+i).children[1].value = stn_list[i]['field0'];
        document.getElementById('stn'+i).children[2].value = stn_list[i]['field1'];
        var wrap = stn_list[i]['wrap'];
        var stn_name = document.getElementById('stn_name_'+i);
        stn_name.querySelector('#field0').textContent = stn_list[i]['field0'];
        if (wrap) {
            var [str1, str2] = splitText(stn_list[i]['field1']);
            var stn_x = getStnX(i);
            var stn_name_html = str1 + '<tspan x="' + stn_x.toString() + '" dy="15">' + str2 + '</tspan>';
            stn_name.querySelector('#field1').innerHTML = stn_name_html;
        } else {
            stn_name.querySelector('#field1').textContent = stn_list[i]['field1'];
        }
    }

    redrawStn();
    addCurrentBG();
    reposStnName();

}