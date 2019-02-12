var default_params = {
    'svg_width': '500', 
    'svg_height': '200', 
    'show_outer': true,
    'padding': '10', 
    'y_pc': '50', 
    'strip_pc': '90',

    'colour_city': 'hk', 
    'colour_name': 'ctwl', 

    'direction': 'right', 
    'txt_bg_gap': '10',
    'txt_bg_flip': false,
    'stn_list': [
        {'field0': '中環', 'field1': 'Central'}, 
        {'field0': '金鐘', 'field1': 'Admiralty'},
        {'field0': '荃灣', 'field1': 'Tsuen Wan'}
    ], 
    'current_stn_idx': '1'
}

function initSVG() {
    sessionStorage.all_params = JSON.stringify(default_params);

    document.getElementById('svg_height').value = default_params['svg_height'];
    addCurrentBG();
    reposStnName();
}

function getParams(params_name='all_params') {
    return JSON.parse(sessionStorage.getItem(params_name));
}

function putParams(instance, params_name=null) {
    if (params_name == null) {
        sessionStorage.all_params = JSON.stringify(instance);
    } else {
        sessionStorage.setItem(params_name) = JSON.stringify(instance);
    }
}

function getLinePos() {
    // Read from log
    var params_instance = getParams();
    var svg_width = params_instance['svg_width'];
    var padding = params_instance['padding'];

    var lineStart = svg_width * padding / 200;
    var lineLength = svg_width * (1 - padding / 100);
    return [lineStart, lineLength];
}

function getY() {
    // Read from log
    var params_instance = getParams();
    var svg_height = params_instance['svg_height'];
    var y_pc = params_instance['y_pc'];

    var y = svg_height * y_pc / 100;
    return y;
}

function getStripY() {
    var params_instance = getParams();
    var svg_height = params_instance['svg_height'];
    var strip_pc = params_instance['strip_pc'];
    var strip_y = svg_height * strip_pc / 100;

    return strip_y;
}

function getNStn() {
    var params_instance = getParams();
    var n_stn = params_instance['stn_list'].length;
    return n_stn;
}

function getStnX(idx) {
    var linePos = getLinePos();
    var lineStart = linePos[0];
    var lineLength = linePos[1];
    var n_stn = getNStn();
    var stn_x = lineStart + (lineLength / (n_stn-1)) * idx;
    return stn_x;
}

function getBGY(idx) {
    var stn_name = document.getElementById('stn_name_'+idx.toString());
    if (stn_name.children[0].nodeName == 'rect') {
        var bg_lower_y = stn_name.getBBox().y + stn_name.getBBox().height;
        var bg_upper_y = Number(stn_name.getBBox().y);
    } else {
        var bg_lower_y = stn_name.getBBox().y + stn_name.getBBox().height + 2.5;
        var bg_upper_y = stn_name.getBBox().y - 2.5;
    }
    
    return [bg_lower_y, bg_upper_y];
}

// function getLineColour() {
//     var params_instance = getParams();
//     var colour_city = 
// }