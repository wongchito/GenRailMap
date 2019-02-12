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
    redrawLineMain();
    redrawLinePassed();
    redrawStn();
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
}

function redrawLineMain() {
    // Get linePos info
    var linePos = getLinePos();
    var lineStart = linePos[0];
    var lineLength = linePos[1];

    // Read from log
    var params_instance = getParams();
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
    var svg_height = params_instance['svg_height'];
    var svg_width = params_instance['svg_width'];
    var strip_y = svg_height * strip_pc / 100;

    var strip_path_str = 'M 0,' + strip_y.toString() + ' H ' + svg_width;
    document.getElementById('strip').setAttribute('d', strip_path_str);
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

    var cities = document.getElementById('colour_cities').children;

    for (i=0; i<cities.length; i++) {
        if (cities[i].getAttribute('id') == colour_city) {
            cities[i].style.display = 'block'

            var colour_name = 'c' + cities[i].children[0].value;
            params_instance['colour_name'] = colour_name;

            document.getElementById('line_main').setAttribute('class', colour_name);
            document.getElementById('strip').setAttribute('class', colour_name);
        } else {
            cities[i].style.display = 'none'
        }
    }

    putParams(params_instance);
}

function addStn(elem) {
    // Get new value
    var par = elem.parentNode;
    var add_idx = par.getAttribute('id').substring(3);
    
    // Log changes
    var params_instance = getParams();
    params_instance['stn_list'].splice(add_idx, 0, params_instance['stn_list'][add_idx]);
    putParams(params_instance);

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

    reidxStn();
    redrawStn();
    redrawLinePassed();
    addCurrentBG();
}

function rmStn(elem) { 
    // Get value to remove
    var par = elem.parentNode;
    var rm_idx = par.getAttribute('id').substring(3);

    // Log changes
    var params_instance = getParams();
    params_instance['stn_list'].splice(rm_idx, 1);
    putParams(params_instance);

    // Remove station in HTML
    par.parentNode.removeChild(par);

    // Remove station in SVG
    var stn_icon = document.getElementById('stn_icon_'+rm_idx);
    stn_icon.parentNode.removeChild(stn_icon);

    // Remove station name in SVG
    var stn_name = document.getElementById('stn_name_'+rm_idx);
    stn_name.parentNode.removeChild(stn_name);

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
            txt_bg.setAttribute('x', (current_stn_x-45).toString());
            txt_bg.setAttribute("y", txt_dim.y);
            txt_bg.setAttribute("width", '90');
            txt_bg.setAttribute("height", txt_dim.height);
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
    var stn_index = elem.parentNode.getAttribute('id').substring(3);

    // Log changes
    var params_instance = getParams();
    params_instance['stn_list'][stn_index][target] = elem.value; 
    putParams(params_instance);

    // Apply changes
    var stn_name = document.getElementById('stn_name_'+stn_index);
    stn_name.querySelector('#'+target).textContent = elem.value;
}

function test() {
    // readTextFile('init.json')
    
    alert(JSON.stringify(getParams()));
    // alert(sessionStorage.all_params);
    // loadJSON(function(json) {
    //     console.log(json); // this will log out the json object
    //   });
    // if (sessionStorage.testObject) {
    //     var b = JSON.parse(sessionStorage.testObject);
    //     b['svg_width'] += 1;
    //     sessionStorage.testObject = JSON.stringify(b);
    //     alert(sessionStorage.testObject);
    // } else {
    //     sessionStorage.testObject = JSON.stringify(init);
    // }

    // var b = localStorage.getItem('testObject');
    // alert(sessionStorage.testObject);
    // var a = document.getElementById('root').getElementsByTagName('style');
}

// function loadJSON(callback) {   
//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open('GET', './init.json', true);
//     xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//             callback(JSON.parse(xobj.responseText));
//         }
//     };
//     xobj.send(null);  
// }

// function readTextFile(file) {
//     var rawFile = new XMLHttpRequest(); // XMLHttpRequest (often abbreviated as XHR) is a browser object accessible in JavaScript that provides data in XML, JSON, but also HTML format, or even a simple text using HTTP requests.
//     rawFile.open("GET", file, false); // open with method GET the file with the link file ,  false (synchronous)
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4) // readyState = 4: request finished and response is ready
//         {
//             if(rawFile.status === 200) // status 200: "OK"
//             {
//                 var allText = rawFile.responseText; //  Returns the response data as a string
//                 console.log(allText); // display text on the console
//             }
//         }
//     }
//     rawFile.send(null); //Sends the request to the server Used for GET requests with param null
// }
