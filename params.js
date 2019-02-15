var default_params = {
    'svg_width': '500', 
    'svg_height': '200', 
    'show_outer': true,
    'padding': '10', 
    'y_pc': '50', 
    'strip_pc': '95',

    'colour_city': 'hk', 
    'colour_name': 'ctwl', 

    'direction': 'right', 
    'txt_bg_gap': '15',
    'txt_flip': false,
    'stn_list': [
        {'field0': '中環', 'field1': 'Central', 'wrap': false, 'change': 'cnone', 'change_name':['','']}, 
        {'field0': '金鐘', 'field1': 'Admiralty', 'wrap': false, 'change': 'cnone', 'change_name':['','']},
        {'field0': '荃灣', 'field1': 'Tsuen Wan', 'wrap': false, 'change': 'cnone', 'change_name':['','']}
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
        {"field0":"屯門","field1":"Tuen Mun","wrap":false,"change":"clrl","change_name":["輕鐵","Light Rail"]},
        {"field0":"兆康","field1":"Siu Hong","wrap":false,"change":"clrl","change_name":["輕鐵","Light Rail"]},
        {"field0":"天水圍","field1":"Tin Shui Wai","wrap":false,"change":"clrl","change_name":["輕鐵","Light Rail"]},
        {"field0":"朗屏","field1":"Long Ping","wrap":false,"change":"cnone",'change_name':['','']},
        {"field0":"元朗","field1":"Yuen Long","wrap":false,"change":"clrl","change_name":["輕鐵","Light Rail"]},
        {"field0":"錦上路","field1":"Kam Sheung Road","wrap":false,"change":"cnone",'change_name':['','']},
        {"field0":"荃灣西","field1":"Tsuen Wan West","wrap":false,"change":"cnone",'change_name':['','']},
        {"field0":"美孚","field1":"Mei Foo","wrap":false,"change":"ctwl","change_name":["荃灣綫","Tsuen Wan Line"]},
        {"field0":"南昌","field1":"Nam Cheong","wrap":false,"change":"ctcl","change_name":["東涌綫","Tung Chung Line"]},
        {"field0":"柯士甸","field1":"Austin","wrap":false,"change":"cnone",'change_name':['','']},
        {"field0":"尖東","field1":"East Tsim Sha Tsui","wrap":false,"change":"cnone",'change_name':['','']},
        {"field0":"紅磡","field1":"Hung Hom","wrap":false,"change":"cerl","change_name":["東鐵綫","East Rail Line"]}
    ],
    "current_stn_idx":"10"
}

var template_gz8_params = {
    'svg_width': '1700', 
    'svg_height': '200', 
    'show_outer': true,
    'padding': '6', 
    'y_pc': '45', 
    'strip_pc': '96',

    'colour_city': 'gz', 
    'colour_name': 'cgz8', 

    'direction': 'left', 
    'txt_bg_gap': '16',
    'txt_flip': false,
    'stn_list': [
        {"field0":"滘心","field1":"Jiaoxin","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"亭崗","field1":"Tinggang","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"石井","field1":"Shijing","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"小坪","field1":"Xiaoping","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"石潭","field1":"Shitan","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"聚龍","field1":"Julong","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"上埗","field1":"Shangbu","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"同德","field1":"Tongde","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"鵝掌坦","field1":"Ezhangtan","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"西村","field1":"Xicun","wrap":false,"change":"cgz5","change_name":["5號綫","Line 5"]},
        {"field0":"彩虹橋","field1":"Caihong Bridge","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"陳家祠","field1":"Chen Clan Academy","wrap":true,"change":"cgz1","change_name":["1號綫","Line 1"]},
        {"field0":"華林寺","field1":"Hualin Temple","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"文化公園","field1":"Cultural Park","wrap":false,"change":"cgz6","change_name":["6號綫","Line 6"]},
        {'field0': '同福西', 'field1': 'Tongfuxi', 'wrap': false, "change":"cnone","change_name":["",""]}, 
        {'field0': '鳳凰新村', 'field1': 'Fenghuang Xincun', 'wrap': true, "change":"cnone","change_name":["",""]}, 
        {'field0': '沙園', 'field1': 'Shayuan', 'wrap': false, "change":"cgf","change_name":["廣佛綫","Guangfo Line"]}, 
        {'field0': '寶崗大道', 'field1': 'Baogang Dadao', 'wrap': true,"change":"cnone","change_name":["",""]},
        {'field0': '昌崗', 'field1': 'Changgang', 'wrap': false,"change":"cgz2","change_name":["2號綫","Line 2"]},
        {"field0":"曉港","field1":"Xiaogang","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"中大","field1":"Sun Yat-sen University","wrap":true,"change":"cnone","change_name":["",""]},
        {"field0":"鷺江","field1":"Lujiang","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"客村","field1":"Kecun","wrap":false,"change":"cgz3","change_name":["3號綫","Line 3"]},
        {"field0":"赤崗","field1":"Chigang","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"磨碟沙","field1":"Modiesha","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"新港東","field1":"Xingangdong","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"琶洲","field1":"Pazhou","wrap":false,"change":"cnone","change_name":["",""]},
        {"field0":"萬勝圍","field1":"Wanshengwei","wrap":false,"change":"cgz4","change_name":["4號綫","Line 4"]}
    ], 
    'current_stn_idx': '18'
    
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

