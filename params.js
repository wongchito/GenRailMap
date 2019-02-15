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
    'txt_flip': false,
    'stn_list': [
        {'field0': '中環', 'field1': 'Central', 'wrap': false, 'change': 'cnone'}, 
        {'field0': '金鐘', 'field1': 'Admiralty', 'wrap': false, 'change': 'cnone'},
        {'field0': '荃灣', 'field1': 'Tsuen Wan', 'wrap': false, 'change': 'cnone'}
    ], 
    'current_stn_idx': '1'
}

var template_wrl_params = {
    "svg_width":"1000",
    "svg_height":"200",
    "show_outer":true,
    "padding":"9",
    "y_pc":"45",
    "strip_pc":"97",
    
    "colour_city":"hk",
    "colour_name":"cwrl",

    "direction":"right",
    "txt_bg_gap":"16",
    "txt_flip":false,
    "stn_list":[
        {"field0":"屯門","field1":"Tuen Mun","wrap":false,"change":"clrl"},
        {"field0":"兆康","field1":"Siu Hong","wrap":false,"change":"clrl"},
        {"field0":"天水圍","field1":"Tin Shui Wai","wrap":false,"change":"clrl"},
        {"field0":"朗屏","field1":"Long Ping","wrap":false,"change":"cnone"},
        {"field0":"元朗","field1":"Yuen Long","wrap":false,"change":"clrl"},
        {"field0":"錦上路","field1":"Kam Sheung Road","wrap":false,"change":"cnone"},
        {"field0":"荃灣西","field1":"Tsuen Wan West","wrap":false,"change":"cnone"},
        {"field0":"美孚","field1":"Mei Foo","wrap":false,"change":"ctwl"},
        {"field0":"南昌","field1":"Nam Cheong","wrap":false,"change":"ctcl"},
        {"field0":"柯士甸","field1":"Austin","wrap":false,"change":"cnone"},
        {"field0":"尖東","field1":"East Tsim Sha Tsui","wrap":false,"change":"cnone"},
        {"field0":"紅磡","field1":"Hung Hom","wrap":false,"change":"cerl"}
    ],
    "current_stn_idx":"10"
}

var template_gz8_params = {
    'svg_width': '700', 
    'svg_height': '200', 
    'show_outer': true,
    'padding': '15', 
    'y_pc': '45', 
    'strip_pc': '90',

    'colour_city': 'gz', 
    'colour_name': 'cgz8', 

    'direction': 'left', 
    'txt_bg_gap': '12',
    'txt_flip': true,
    'stn_list': [
        {'field0': '鳳凰新村', 'field1': 'Fenghuang Xincun', 'wrap': true, "change":"cnone"}, 
        {'field0': '沙園', 'field1': 'Shayuan', 'wrap': false, "change":"cgf"}, 
        {'field0': '寶崗大道', 'field1': 'Baogang Dadao', 'wrap': true,"change":"cnone"},
        {'field0': '昌崗', 'field1': 'Changgang', 'wrap': false,"change":"cgz2"},
        {"field0":"曉港","field1":"Xiaogang","wrap":false,"change":"cnone"},
        {"field0":"中大","field1":"Sun Yat-sen University","wrap":true,"change":"cnone"},
        {"field0":"鷺江","field1":"Lujiang","wrap":false,"change":"cnone"},
        {"field0":"客村","field1":"Kecun","wrap":false,"change":"cgz3"},
        {"field0":"赤崗","field1":"Chigang","wrap":false,"change":"cnone"},
        {"field0":"磨碟沙","field1":"Modiesha","wrap":false,"change":"cnone"},
        {"field0":"新港東","field1":"Xingangdong","wrap":false,"change":"cnone"},
        {"field0":"琶洲","field1":"Pazhou","wrap":false,"change":"cnone"},
        {"field0":"萬勝圍","field1":"Wanshengwei","wrap":false,"change":"cgz4"}
    ], 
    'current_stn_idx': '3'
    
}

var template_gz2_params = {
    'svg_width': '700', 
    'svg_height': '300', 
    'show_outer': false,
    'padding': '15', 
    'y_pc': '55', 
    'strip_pc': '95',

    'colour_city': 'gz', 
    'colour_name': 'cgz2', 

    'direction': 'left', 
    'txt_bg_gap': '12',
    'txt_flip': true,
    'stn_list': [
        {'field0': '南洲', 'field1': 'Nanzhou'}, 
        {'field0': '東曉南', 'field1': 'Dongxiaonan'}, 
        {'field0': '江泰路', 'field1': 'Jiangtai Lu'},
        {'field0': '昌崗', 'field1': 'Changgang'},
        {'field0': '江南西', 'field1': 'Jiangnanxi'},
        {'field0': '市二宮', 'field1': 'The 2nd Workers\' Cultural Palace'},
        {'field0': '海珠廣場', 'field1': 'Haizhu Square'},
        {'field0': '公園前', 'field1': 'Gongyuanqian'},
        {'field0': '紀念堂', 'field1': 'Sun Yat-sen Memorial Hall'}
    ], 
    'current_stn_idx': '2'
}

