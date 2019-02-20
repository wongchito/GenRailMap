function loadCity(elem, city=null) {
    var city_selector = elem.querySelector('#city');
    while (city_selector.length) {
        city_selector.remove(0);
    }

    var city_keys = Object.keys(colours).sort();
    for (i=0; i<city_keys.length; i++) {
        var option = document.createElement('option');
        var key = city_keys[i];
        option.text = colours[key]['name'][0];
        var n_name = colours[key]['name'].length
        if (n_name > 1) {
            for (j=1; j<n_name; j++) {
                option.text += ' - ' + colours[key]['name'][j];
            }
        }
        option.value = key;
        city_selector.add(option);
    }

    if (city != null) {
        city_selector.value = city;
    }

    loadLine(elem);
}

function loadLine(elem, line=null) {
    var line_selector = elem.querySelector('#line');
    var city = elem.querySelector('#city').value;
    while (line_selector.length) {
        line_selector.remove(0);
    }

    var line_list = colours[city]['line'];
    var line_keys = Object.keys(line_list);
    for (i=0; i<line_keys.length; i++) {
        var option = document.createElement('option'); 
        var key = line_keys[i];
        option.text = line_list[key]['name'][0];
        var n_name = line_list[key]['name'].length;
        if (n_name > 1) {
            for (j=1; j<n_name; j++) {
                option.text += ' - ' + line_list[key]['name'][j];
            }
        }
        option.value = key;
        line_selector.add(option);
    }

    if (line != null) {
        line_selector.value = line;
    }

    loadColour(elem);
}

function loadColour(elem) {
    var city = elem.querySelector('#city').value;
    var line = elem.querySelector('#line').value;
    elem.querySelector('#colour').value = colours[city]['line'][line]['colour'];

    // On SVG
    setLineColour(elem);
}

function loadChangeColourSelector(elem) {
    var change = elem.checked;
    var stn_idx = elem.parentNode.getAttribute('id').substring(3);
    var params_instance = getParams();

    if (change) {
        var selector = document.getElementById('theme').cloneNode(true);
        selector.setAttribute('id', 'int_selector');

        var int_name_field0 = document.createElementNS(elem.namespaceURI, 'input');
        int_name_field0.setAttribute('type', 'input');
        int_name_field0.setAttribute('onchange', 'setChangeName(this,0)');

        var int_name_field1 = int_name_field0.cloneNode(true);
        int_name_field1.setAttribute('onchange', 'setChangeName(this,1)');

        elem.parentNode.appendChild(selector);
        elem.parentNode.appendChild(int_name_field0);
        elem.parentNode.appendChild(int_name_field1);

        var theme_city = params_instance['theme'][0];
        loadCity(selector, theme_city);
    } else {
        params_instance['stn_list'][stn_idx]['change'] = ['nullCity','nullLine'];
        putParams(params_instance);

        if (elem.parentNode.children[7]) {
            elem.parentNode.removeChild(elem.parentNode.children[9]);
            elem.parentNode.removeChild(elem.parentNode.children[8]);
            elem.parentNode.removeChild(elem.parentNode.children[7]);
        }

        document.getElementById('stn_int_'+stn_idx).setAttribute('stroke', 'none');

        var int_names = document.getElementById('int_name_'+stn_idx).children;
        for (i=0; i<int_names.length; i++) {
            int_names[i].textContent = '';
        }
    }
}

function init() {
    checkVer();
    loadCity(document.getElementById('theme'));
}

function test() {
    // for (i=0; i<3; i++) {
    //     var name = document.getElementById('stn_name_'+i).querySelector('#field1');
    //     var x = name.parentNode.getAttribute('transform').match(/-?\d+/g)[0];
    //     var dim = name.getBoundingClientRect();
    //     x = x - (dim.left - x);
    //     name.parentNode.setAttribute('transform', 'translate('+x.toString()+',75)rotate(-45)');
    // }
    for (i=0; i<3; i++) {
        var name = document.getElementById('stn_name_'+i);
        var pt = document.getElementById('root').createSVGPoint();
        var bb = name.getBBox();
        var bcr = name.getBoundingClientRect();
        pt.x = bcr.left;
        pt.y = bcr.top;
        var ctm = document.getElementById('root').getScreenCTM();
        var pos = pt.matrixTransform(ctm.inverse());
        // alert([pos.x, pos.y])
        // alert([dim.x, dim.y, dim2.width, dim2.height]);
        var rect = document.createElementNS(name.namespaceURI, 'rect');
        rect.setAttribute('x', pos.x);
        rect.setAttribute('y', pos.y);
        rect.setAttribute('width', bcr.width);
        rect.setAttribute('height', bcr.height);
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', '#000');
        name.parentNode.appendChild(rect);
    }
}

function notImplement() {
    alert('Not implemented! ')
}

function checkVer() {
    if (Number(localStorage.ver) != 20190217) {
        localStorage.ver = 0;
    }
    if (typeof(Storage) !== "undefined") {
        if (Number(localStorage.ver) != 20190217) {
            localStorage.ver = 20190217;
            alert('New version (20190217):\n\t1. Update colour palette\n\t2. Update colour selector\n\t3. New templates available');
        }
    }
}