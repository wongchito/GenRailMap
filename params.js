var default_params = {
    'svg_width': '500', 
    'svg_height': '200', 
    'show_outer': true,
    'padding': '20', 
    'y_pc': '50', 
    'strip_pc': '95',

    "theme":["hongkong","twl"],
    "style":"mtr",
    "line_num":"TW",
    "auto_num":"asc",

    'direction': 'left', 
    "myfonts": [],
    "weight": ["bold","bold"],
    'txt_bg_gap': '15',
    'txt_flip': false,
    'stn_list': [
        {"name":["中環","Central"], "wrap":false, 'change':["hongkong","isl"], 'change_name':['港島綫往上環','Island Line towards Sheung Wan']}, 
        {"name":["金鐘","Admiralty"], 'wrap': false, 'change':["hongkong","isl"], 'change_name':['港島綫往柴灣','Island Line towards Chai Wan']},
        {"name":["荃灣","Tsuen Wan"], 'wrap': false, 'change':["nullCity","nullLine"], 'change_name':['','']}
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

    "theme":["hongkong","wrl"],
    "style":"mtr",
    "line_num":"W",
    "auto_num":"asc",
    
    "direction":"right",
    "weight": ["bold","bold"],
    "txt_bg_gap":"16",
    "txt_flip":false,
    "stn_list":[
        {"wrap":false,"change":["hongkong","lrl"],"change_name":["輕鐵","Light Rail"],"name":["屯門","Tuen Mun"]},
        {"wrap":false,"change":["hongkong","lrl"],"change_name":["輕鐵","Light Rail"],"name":["兆康","Siu Hong"]},
        {"wrap":false,"change":["hongkong","lrl"],"change_name":["輕鐵","Light Rail"],"name":["天水圍","Tin Shui Wai"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["朗屏","Long Ping"]},
        {"wrap":false,"change":["hongkong","lrl"],"change_name":["輕鐵","Light Rail"],"name":["元朗","Yuen Long"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["錦上路","Kam Sheung Road"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["荃灣西","Tsuen Wan West"]},
        {"wrap":false,"change":["hongkong","twl"],"change_name":["荃灣綫","Tsuen Wan Line"],"name":["美孚","Mei Foo"]},
        {"wrap":false,"change":["hongkong","tcl"],"change_name":["東涌綫","Tung Chung Line"],"name":["南昌","Nam Cheong"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["柯士甸","Austin"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["尖東","East Tsim Sha Tsui"]},
        {"wrap":false,"change":["hongkong","eal"],"change_name":["東鐵綫","East Rail Line"],"name":["紅磡","Hung Hom"]}
    ],
    "current_stn_idx":"10"
}

var template_gz8_params = {
    "svg_width":"1700",
    "svg_height":"200",
    "show_outer":true,
    "padding":"6",
    "y_pc":"55",
    "strip_pc":"96",

    "theme":["guangzhou","gz8"],
    "style":"gzmtr",
    "line_num":"8",
    "auto_num":"asc",

    "direction":"left",
    "weight": ["regular","regular"],
    "txt_bg_gap":"12",
    "txt_flip":false,
    "stn_list":[
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["滘心","Jiaoxin"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["亭岗","Tinggang"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["石井","Shijing"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["小坪","Xiaoping"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["石潭","Shitan"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["聚龙","Julong"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["上埗","Shangbu"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["同德","Tongde"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["鹅掌坦","Ezhangtan"]},
        {"wrap":false,"change":["guangzhou","gz5"],"change_name":["5号线","Line 5"],"name":["西村","Xicun"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["彩虹桥","Caihong Bridge"]},
        {"wrap":false,"change":["guangzhou","gz1"],"change_name":["1号线","Line 1"],"name":["陈家祠","Chen Clan Academy"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["华林寺","Hualin Temple"]},
        {"wrap":false,"change":["guangzhou","gz6"],"change_name":["6号线","Line 6"],"name":["文化公园","Cultural Park"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["同福西","Tongfuxi"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["凤凰新村","Fenghuang Xincun"]},
        {"wrap":false,"change":["guangzhou","gf"],"change_name":["广佛线","Guangfo Line"],"name":["沙园","Shayuan"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["宝岗大道","Baogang Dadao"]},
        {"wrap":false,"change":["guangzhou","gz2"],"change_name":["2号线","Line 2"],"name":["昌岗","Changgang"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["晓港","Xiaogang"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["中大","Sun Yat-sen University"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["鹭江","Lujiang"]},
        {"wrap":false,"change":["guangzhou","gz3"],"change_name":["3号线","Line 3"],"name":["客村","Kecun"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["赤岗","Chigang"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["磨碟沙","Modiesha"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["新港东","Xingangdong"]},
        {"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""],"name":["琶洲","Pazhou"]},
        {"wrap":false,"change":["guangzhou","gz4"],"change_name":["4号线","Line 4"],"name":["万胜围","Wanshengwei"]}
    ],
    "current_stn_idx":"18",
}

var template_edi24_params = {
    "svg_width":"700",
    "svg_height":"100",
    "show_outer":true,
    "padding":"13",
    "y_pc":"48",
    "strip_pc":"97",

    "theme":["edinburgh","l24"],
    "style":"mtr",
    "line_num":"24",
    "auto_num":"asc",

    "direction":"right",
    "weight": ["bold","regular"],
    "txt_bg_gap":"13",
    "txt_flip":false,
    "stn_list":[
        {"name":["","West Granton"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Drylaw Parish Church"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Crewe Toll (South)"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Kerr Street"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Frederick Street"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Brougham Street"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Thirlestane Road"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Blackford Avenue"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Cameron Toll"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]},
        {"name":["","Royal Infirmary"],"wrap":false,"change":["nullCity","nullLine"],"change_name":["",""]}
    ],
    "current_stn_idx":"4"
}