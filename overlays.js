
colors = {
    purple: '#7e1e9c', 
    green: '#15b01a',
    lightBlue: '#75bbfd', 
    orange: '#f97306', 
    pink: '#ff79e5',
    gold: '#d9d71e', 
    blue: '#069af3', 
    red: '#ff000d'
};

/*
each region object encapsulates information about a particular
region of the map.
*/
regions = [
{
    name: 'Central Park',
    //color to be shown in region
    color: colors['red'],
    //the polygon boundaries in lat lng
    path: [
        new google.maps.LatLng(40.7970474627213, -73.94907653331757),
        new google.maps.LatLng(40.76455136505513,-73.9727658033371),
        new google.maps.LatLng(40.76806170936613, -73.98237884044647),
        new google.maps.LatLng(40.800556090021466,-73.9580887556076)
    ],
    //street_label[i] contains the maps.Label object for the street connecting
    //path[i] and path[i+1]
    street_labels: [],
    //has_label[i] is true if the line connecting path[i] and path[i+1]
    //should have a street label
    has_label:[true, true, true, true]
    /*dynamically created field:
    poly: google.maps.Polygon object
    */
},
{
    name: 'Chelsea',
    color: colors['purple'],
    path:[
        new google.maps.LatLng(40.757205044580815, -74.00495231151581),
        new google.maps.LatLng(40.749792889699464, -73.98770034313202),
        new google.maps.LatLng(40.73717732305697, -73.99679839611053),
        new google.maps.LatLng(40.74257499754292, -74.00890052318573),
        new google.maps.LatLng(40.74816730666263, -74.00769889354706),
        new google.maps.LatLng(40.749987956993444, -74.00855720043182),
        new google.maps.LatLng(40.75401921961654, -74.00744140148163)
    ],
    street_labels: [],    
    has_label:[true, true, true, true, true, true, true]
},
{
    name: 'Battery Park',
    color: '#7e1e9c',
    path: [
        new google.maps.LatLng(40.70468447896035, -74.01436015963554),
        new google.maps.LatLng(40.704879678521486, -74.01732131838799),
        new google.maps.LatLng(40.70326926503271, -74.01757881045341),
        new google.maps.LatLng(40.701772684258295, -74.01629135012627),
        new google.maps.LatLng(40.70066649424731, -74.01420995593071),
        new google.maps.LatLng(40.70243964288751, -74.01378080248833),
        new google.maps.LatLng(40.70317166296373, -74.0144245326519),
    ],
    street_labels: [],
has_label: [true, false, false, false, false, false, true]
},
{
    name: 'Battery Park City',
    color: '#75bbfd',
    path: [
        new google.maps.LatLng(40.71834706657437, -74.01258319616318),
        new google.maps.LatLng(40.707742539689306, -74.01558727025986),
        new google.maps.LatLng(40.70494474491473, -74.01661723852158),
        new google.maps.LatLng(40.70465194564456, -74.01880592107773),
        new google.maps.LatLng(40.706799110400006, -74.01897758245468),
        new google.maps.LatLng(40.70647378685649, -74.01829093694687),
        new google.maps.LatLng(40.707937730287384, -74.01773303747177),
        new google.maps.LatLng(40.70803532537189, -74.01884883642197),
        new google.maps.LatLng(40.71229683790948, -74.01773303747177),
        new google.maps.LatLng(40.71200407096382, -74.01644557714462),
        new google.maps.LatLng(40.71359800876, -74.01610225439072),
        new google.maps.LatLng(40.713760653328414, -74.01738971471786),
        new google.maps.LatLng(40.71850969954106, -74.01670306921005),
    ],
    street_labels: [],
has_label: [true, false, false, false, false, false, false, false, false, false, false, false, false]
},
{
    name: 'Financial District',
    color: '#15b01a',
    path: [
        new google.maps.LatLng(40.71719236108568, -74.01281520724297),
        new google.maps.LatLng(40.71421605600625, -74.00631353259087),
        new google.maps.LatLng(40.71190648169586, -74.00820180773735),
        new google.maps.LatLng(40.71156491813167, -74.0075795352459),
        new google.maps.LatLng(40.71206913039633, -74.00521919131279),
        new google.maps.LatLng(40.70790519856078, -73.9999620616436),
        new google.maps.LatLng(40.70227697066692, -74.00919288396835),
        new google.maps.LatLng(40.701008113711325, -74.01390954852104),
        new google.maps.LatLng(40.702569780377935, -74.01356622576714),
        new google.maps.LatLng(40.703285532030286, -74.01429578661919),
        new google.maps.LatLng(40.704749545544296, -74.01420995593071),
        new google.maps.LatLng(40.70489594512577, -74.0165488421917),
    ],
    street_labels: [],
has_label: [true, true, false, false, false, true, false, false, false, false, false, true]
}, 
{
    name: 'Civic Center',
    color: '#f97306',
    path: [
        new google.maps.LatLng(40.71631412096641, -74.00461837649345),
        new google.maps.LatLng(40.711955276347744, -74.008137434721),
        new google.maps.LatLng(40.71161371303385, -74.00760099291801),
        new google.maps.LatLng(40.71213418976525, -74.00509044528008),
        new google.maps.LatLng(40.70936911052541, -74.00180742144585),
        new google.maps.LatLng(40.71328898298542, -73.99820253252983),
    ],
    street_labels: [],
has_label: [true, false, false, false, true, true]
}, 
{
    name: 'TriBeCa',
    color: '#069af3',
    path: [
        new google.maps.LatLng(40.71937164763133, -74.00195762515068),
        new google.maps.LatLng(40.726006647944835, -74.01109859347343),
        new google.maps.LatLng(40.71442749190498, -74.01358768343925),
        new google.maps.LatLng(40.71205286554415, -74.008137434721),
    ],
    street_labels: [],
has_label: [true, true, true, false /*should be TRUE*/]
}, 
{
    name: 'Two Bridges',
    color: '#ff000d',
    path: [
        new google.maps.LatLng(40.70969441992499, -73.99197980761528),
        new google.maps.LatLng(40.71392329749949, -73.9925591647625),
        new google.maps.LatLng(40.71333777662415, -73.99811670184135),
        new google.maps.LatLng(40.70936911052541, -74.00180742144585),
        new google.maps.LatLng(40.70790519856078, -73.99989768862724),
        new google.maps.LatLng(40.70886487781536, -73.99758026003838),
    ],
    street_labels: [],
has_label: [true, true, true, false, false, false]
}, 
{
    name: 'Chinatown',
    color: '#7e1e9c',
    path: [
        new google.maps.LatLng(40.71631412096641, -74.0045540034771),
        new google.maps.LatLng(40.719404173755834, -74.00189325213432),
        new google.maps.LatLng(40.71706225216946, -73.99863168597221),
        new google.maps.LatLng(40.71504553145126, -73.9925591647625),
        new google.maps.LatLng(40.713955826286046, -73.99270936846733),
        new google.maps.LatLng(40.71333777662415, -73.99837419390678),
    ],
    street_labels: [],
has_label: [true, false, true, false, true, true]
}, 
{
    name: 'Hudson Square',
    color: '#d9d71e',
    path: [
        new google.maps.LatLng(40.72914503284784, -74.01073381304741),
        new google.maps.LatLng(40.72597412504668, -74.01107713580132),
        new google.maps.LatLng(40.721941162500265, -74.00547668337822),
        new google.maps.LatLng(40.72838077658201, -74.00290176272392),
    ],
    street_labels: [],
has_label: [false, true, true, true]
}, 
{
    name: 'SoHo',
    color: '#15b01a',
    path: [
        new google.maps.LatLng(40.72838077658201, -74.00292322039604),
        new google.maps.LatLng(40.72192490005981, -74.0054552257061),
        new google.maps.LatLng(40.718477172979526, -74.00054141879082),
        new google.maps.LatLng(40.72239650921919, -73.99710819125175),
        new google.maps.LatLng(40.72516104742719, -73.99539157748222),
        new google.maps.LatLng(40.72581151031746, -73.9979450404644),
    ],
    street_labels: [],
has_label: [true, true, true, false, false, true]
}, 
{
    name: 'NoLita',
    color: '#ff000d',
    path: [
        new google.maps.LatLng(40.72516104742719, -73.99530574679375),
        new google.maps.LatLng(40.72342102794725, -73.99665758013725),
        new google.maps.LatLng(40.72078651935595, -73.99768754839897),
        new google.maps.LatLng(40.71942043681212, -73.99438306689262),
        new google.maps.LatLng(40.72412029357941, -73.99260208010674),
    ],
    street_labels: [],
    has_label: [true, false, false /*should be true*/, true, true]
},
{
    name: 'Little Italy',
    color: '#f97306',
    path: [
        new google.maps.LatLng(40.71943669986444, -73.99435959756374),
        new google.maps.LatLng(40.72107111635715, -73.99824343621731),
        new google.maps.LatLng(40.718444646402084, -74.00055013597012),
        new google.maps.LatLng(40.71704598853704, -73.9986189454794),
        new google.maps.LatLng(40.71618401033376, -73.99601384997368),
    ],
    street_labels: [],
    has_label: [true, true, false, true, true]
}, 
{
    name: 'Bowery',
    color: '#069af3',
    path: [
        new google.maps.LatLng(40.72415281738351, -73.99260208010674),
        new google.maps.LatLng(40.71942043681212, -73.99442598223686),
        new google.maps.LatLng(40.71618401033376, -73.99599239230156),
        new google.maps.LatLng(40.71501300319713, -73.99249479174614),
        new google.maps.LatLng(40.72294942604715, -73.98850366473198),
    ],
    street_labels: [],
has_label: [true, false, true, true, true]
}, 
{
    name: 'Lower East Side',
    color: '#ff79e5',
    path: [
        new google.maps.LatLng(40.72296568823725, -73.9885251224041),
        new google.maps.LatLng(40.71504553145126, -73.99249479174614),
        new google.maps.LatLng(40.70969441992499, -73.9918939769268),
        new google.maps.LatLng(40.7109793765167, -73.9795558154583),
        new google.maps.LatLng(40.71213418976525, -73.97777482867241),
        new google.maps.LatLng(40.717273679029205, -73.97524282336235),
        new google.maps.LatLng(40.718704858576665, -73.97498533129692),
    ],
    street_labels: [],
has_label: [true, false /*should be true*/, false, false, false, false, true]
}, 
{
    name: 'East Village',
    color: '#7e1e9c',
    path: [
        new google.maps.LatLng(40.72680345398506, -73.97189542651176),
        new google.maps.LatLng(40.73330763627338, -73.98723766207695),
        new google.maps.LatLng(40.728315733090284, -73.99077817797661),
        new google.maps.LatLng(40.727388856425094, -73.9914433658123),
        new google.maps.LatLng(40.72410403167143, -73.99251624941826),
        new google.maps.LatLng(40.71876991146138, -73.97511407732964),
        new google.maps.LatLng(40.72220136100681, -73.97444888949394),
    ],
    street_labels: [],
has_label: [true, true, false, false, false /*should be true*/, false, false]
}, 
{
    name: 'Greenwich Village',
    color: '#069af3',
    path: [
        new google.maps.LatLng(40.74099801143199, -74.00536939501762),
        new google.maps.LatLng(40.739339697048116, -74.00650665163994),
        new google.maps.LatLng(40.739404729763585, -74.00987550616264),
        new google.maps.LatLng(40.72914503284784, -74.01058360934258),
        new google.maps.LatLng(40.7283482548441, -74.0028803050518),
        new google.maps.LatLng(40.725844033295076, -73.9979450404644),
        new google.maps.LatLng(40.72548627966701, -73.9965932071209),
        new google.maps.LatLng(40.73173043046086, -73.9914433658123),
        new google.maps.LatLng(40.734852286139734, -73.99075672030449),
    ],
    street_labels: [],
    has_label: [false, true, true, true, true, false, true, false, true]
}, 
{
    name: 'West Village',
    color: '#ff79e5',
    path: [
        new google.maps.LatLng(40.73106376521653, -74.00148555636406),
        new google.maps.LatLng(40.73733991001137, -73.99687215685844),
        new google.maps.LatLng(40.740981753648505, -74.0053479373455),
        new google.maps.LatLng(40.739372213413816, -74.00648519396782),
        new google.maps.LatLng(40.739404729763585, -74.00989696383476),
        new google.maps.LatLng(40.72914503284784, -74.0106050670147),
        new google.maps.LatLng(40.7283482548441, -74.00290176272392),
    ],
    street_labels: [],
has_label: [true, true, false, true, false, false, false]
}, 
{
    name: 'NoHo',
    color: '#d9d71e',
    path: [
        new google.maps.LatLng(40.73491732324207, -73.99073526263237),
        new google.maps.LatLng(40.73171417041241, -73.9914433658123),
        new google.maps.LatLng(40.72545375651455, -73.99670049548149),
        new google.maps.LatLng(40.7251285241158, -73.99528428912163),
        new google.maps.LatLng(40.72415281738351, -73.9925591647625),
        new google.maps.LatLng(40.72737259531574, -73.99140045046806),
        new google.maps.LatLng(40.7333238959324, -73.98715183138847),
    ],
    street_labels: [],
has_label: [false, true, false, true, true, true, true]
}, 
{
    name: 'Flatiron District',
    color: '#15b01a',
    path: [
        new google.maps.LatLng(40.742932659294304, -73.99275630712509),
        new google.maps.LatLng(40.737242357886416, -73.99687618017197),
        new google.maps.LatLng(40.735226248609976, -73.99172633886337),
        new google.maps.LatLng(40.7370797706936, -73.99035304784775),
        new google.maps.LatLng(40.73652697126574, -73.98902267217636),
        new google.maps.LatLng(40.740168859407845, -73.98631900548935),
    ],
    street_labels: [],
has_label: [true, true, false, false, true, true]
}, 
{
    name: 'Gramercy Park',
    color: '#ff79e5',
    path: [
        new google.maps.LatLng(40.74018511739003, -73.98633643984795),
        new google.maps.LatLng(40.73516121180963, -73.9899842441082),
        new google.maps.LatLng(40.73438076524639, -73.98985549807549),
        new google.maps.LatLng(40.73135644834142, -73.9825813472271),
        new google.maps.LatLng(40.73693344188031, -73.97846147418022),
    ],
    street_labels: [],
has_label: [true, false, true, true, true]
}, 
{
    name: 'Meatpacking District',
    color: '#15b01a',
    path: [
        new google.maps.LatLng(40.74260751232707, -74.00895282626152),
        new google.maps.LatLng(40.740770402101624, -74.00918886065483),
        new google.maps.LatLng(40.73938847159069, -74.00987550616264),
        new google.maps.LatLng(40.739404729763585, -74.00652810931206),
        new google.maps.LatLng(40.740965495861055, -74.0053479373455),
    ],
    street_labels: [],
has_label: [false, false, true, true, true]
},
{
    name: 'Stuyvesant Town',
    color: '#d9d71e',
    path: [
        new google.maps.LatLng(40.7353238036913, -73.9748565852642),
        new google.maps.LatLng(40.73691718310342, -73.9784400165081),
        new google.maps.LatLng(40.73135644834142, -73.98255988955498),
        new google.maps.LatLng(40.726819715233496, -73.971938341856),
        new google.maps.LatLng(40.72886860074364, -73.97168084979057),
        new google.maps.LatLng(40.73020196853932, -73.97256061434746),
        new google.maps.LatLng(40.73124262727918, -73.97376224398613),
    ],
    street_labels: [],
has_label: [true, true, true, false, false, false, true]
},  
{
    name: 'Korea Town',
    color: '#f97306',
    path: [
        new google.maps.LatLng(40.7485086823967, -73.98869678378105),
        new google.maps.LatLng(40.74717568149654, -73.98554250597954),
        new google.maps.LatLng(40.74590768023386, -73.98642227053642),
        new google.maps.LatLng(40.747289475299446, -73.9896409213543),
    ],
    street_labels: [],
has_label: [true, true, true, true]
}, 
{
    name: 'Garment District',
    color: '#75bbfd',
    path: [
        new google.maps.LatLng(40.758472830416466, -73.99264499545097),
        new google.maps.LatLng(40.75336903249926, -73.99627134203911),
        new google.maps.LatLng(40.74841114665152, -73.98455545306206),
        new google.maps.LatLng(40.753499070431374, -73.98088619112968),
    ],
    street_labels: [],
has_label: [true, true, true, true]
}, 
{
    name: 'Kips Bay',
    color: '#ff000d',
    path: [
        new google.maps.LatLng(40.746444145257094, -73.97977039217949),
        new google.maps.LatLng(40.739518536862654, -73.98472711443901),
        new google.maps.LatLng(40.73535632201996, -73.97500678896904),
        new google.maps.LatLng(40.736835889159316, -73.97481366991997),
        new google.maps.LatLng(40.73919337320588, -73.97313997149467),
        new google.maps.LatLng(40.743192775723635, -73.97211000323296),
    ],
    street_labels: [],
has_label: [true, true, false, false, false, true]
}, 

];