function initSVG() {
    // if (sessionStorage.all_params != null) {
    //     alert(sessionStorage.all_params);
    //     loadSVGSize();
    // } else {
        // sessionStorage.all_params = JSON.stringify(default_params);
        // loadSVGSize();
        // setFont();
        // reposStnName();
        // addCurrentBG();
        // loadSVGSize();
    // }

    // document.getElementById('svg_height').value = default_params['svg_height'];
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
    if (n_stn > 1) {
        var stn_x = lineStart + (lineLength / (n_stn-1)) * idx;
    }
    if (n_stn == 1) {
        var stn_x = lineStart + lineLength / 2;
    }
    return stn_x;
}

function getBGY(idx) {
    var stn_name = document.getElementById('stn_name_'+idx.toString());
    var pt = document.getElementById('root').createSVGPoint();
    var bb = stn_name.getBBox();
    var bcr = stn_name.getBoundingClientRect();
    pt.x = bcr.left;
    pt.y = bcr.top;
    var ctm = document.getElementById('root').getScreenCTM();
    var pos = pt.matrixTransform(ctm.inverse());
    var bg_lower_y = pos.y + bcr.height + 2;
    var bg_upper_y = pos.y - 2;
    // if (stn_name.children[0].nodeName == 'rect') {
    //     var bg_lower_y = pos.y + bb.height;
    //     var bg_upper_y = pos.y;
    // } else {
    //     var bg_lower_y = pos.y + bb.height + 2;
    //     var bg_upper_y = pos.y - 2;
    // }
    
    return [bg_lower_y, bg_upper_y];
}

function getIntLineY(idx) {
    var int_name = document.getElementById('int_name_'+idx.toString());
    // alert(int_name.getBBox().height);
    var int_lower_y = int_name.getBBox().y + int_name.getBBox().height;
    var int_upper_y = Number(int_name.getBBox().y);

    return [int_lower_y, int_upper_y];
}

// function getLineColour() {
//     var params_instance = getParams();
//     var colour_city = 
// }

function splitText(str) {
    var terms = str.split(' ');

    var i = 0;
    var j = terms.length -1;
    var str1 = '';
    var str2 = '';

    while (i <= j) {
        if (str1.length <= str2.length) {
            str1 += ' ' + terms[i];
            i += 1;
        } else {
            str2 = terms[j] + ' ' + str2;
            j -= 1;
        }
    }

    return [str1, str2];
}

function getStnState(idx) {
    var params_instance = getParams();
    var current_stn_idx = params_instance['current_stn_idx'];
    var direction = params_instance['direction'];
    if (direction == 'right') {
        if (idx < current_stn_idx) {
            return -1;
        } else if (idx == current_stn_idx) {
            return 0;
        } else {
            return 1;
        }
    } else {
        if (idx < current_stn_idx) {
            return 1;
        } else if (idx == current_stn_idx) {
            return 0;
        } else {
            return -1;
        }
    }
}