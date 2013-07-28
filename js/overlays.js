
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
        new google.maps.LatLng(40.80065354924362, -73.95817525684834),
        new google.maps.LatLng(40.768094211687796, -73.98199327290058),
        new google.maps.LatLng(40.76435634049001, -73.97302396595478),
        new google.maps.LatLng(40.79691751000055, -73.9491630345583),
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
has_label: [true, true, true, true]
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
    has_label: [true, false, true, true, true]
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
has_label: [true, true, false, false, false, false, true]
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
has_label: [true, true, false, false, true, false, false]
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
{
    name: 'Murray Hill',
    color: '#ff79e5',
    path: [
        new google.maps.LatLng(40.75280011355584, -73.97928122431045),
        new google.maps.LatLng(40.748069770416734, -73.96797303110361),
        new google.maps.LatLng(40.74573698590986, -73.97020462900406),
        new google.maps.LatLng(40.743176518476595, -73.97209290415049),
        new google.maps.LatLng(40.74782592917611, -73.98297194391495),
    ],
    street_labels: [],
has_label: [true, false, false, true, true]
},
{
    name: 'Turtle Bay',
    color: '#15b01a',
    path: [
        new google.maps.LatLng(40.752117404397765, -73.97559888660913),
        new google.maps.LatLng(40.7584078163464, -73.97100694477558),
        new google.maps.LatLng(40.75470190924651, -73.96229512989521),
        new google.maps.LatLng(40.748720009353846, -73.96750934422022),
    ],
    street_labels: [],
has_label: [true, true, false, true]
},
{
    name: 'Hell\'s Kitchen',
    color: '#ff79e5',
    path: [
        new google.maps.LatLng(40.75223118974426, -73.9934516698122),
        new google.maps.LatLng(40.757205044580815, -74.00495298206806),
        new google.maps.LatLng(40.76217852730423, -74.00130517780781),
        new google.maps.LatLng(40.76373875892501, -73.9989448338747),
        new google.maps.LatLng(40.76962180287486, -73.99478204548359),
        new google.maps.LatLng(40.77157186825386, -73.99448163807392),
        new google.maps.LatLng(40.77283938006045, -73.99340875446796),
        new google.maps.LatLng(40.76923178293144, -73.98478277027607),
        new google.maps.LatLng(40.7678666951022, -73.98568399250507),
        new google.maps.LatLng(40.76676160346336, -73.98289449512959),
    ],
    street_labels: [],
has_label: [true, false, false, false, false, false, true, false, false, true]
},
{
    name: 'Theater District',
    color: '#d9d71e',
    path: [
        new google.maps.LatLng(40.75362910810917, -73.98512609302998),
        new google.maps.LatLng(40.75590472630009, -73.99083383381367),
        new google.maps.LatLng(40.76481139691841, -73.98431070148945),
        new google.maps.LatLng(40.76243856845115, -73.97873170673847),
    ],
    street_labels: [],
has_label: [true, true, true, true]
}, 
{
    name: 'Upper East Side',
    color: '#15b01a',
    path: [
        new google.maps.LatLng(40.764291332174466, -73.97302396595478),
        new google.maps.LatLng(40.78795015792346, -73.95572908222675),
        new google.maps.LatLng(40.7829461089784, -73.94388444721699),
        new google.maps.LatLng(40.781223849079005, -73.9442277699709),
        new google.maps.LatLng(40.776836758909496, -73.94251115620136),
        new google.maps.LatLng(40.77550432601707, -73.9425540715456),
        new google.maps.LatLng(40.77215687670767, -73.94538648426533),
        new google.maps.LatLng(40.77004432189692, -73.94796140491962),
        new google.maps.LatLng(40.76458386909368, -73.95259626209736),
        new google.maps.LatLng(40.76182096906601, -73.95508535206318),
        new google.maps.LatLng(40.75977309846517, -73.95774610340595),
        new google.maps.LatLng(40.758342802212724, -73.95894773304462),
    ],
    street_labels: [],
has_label: [true, true, false, false, false, false, false, false, false, false, false, true]
}, 
{
    name: 'Upper West Side',
    color: '#069af3',
    path: [
        new google.maps.LatLng(40.80068603561921, -73.95817525684839),
        new google.maps.LatLng(40.7686142466727, -73.98160703480244),
        new google.maps.LatLng(40.769849313451346, -73.98431070148945),
        new google.maps.LatLng(40.769166779384996, -73.98473985493183),
        new google.maps.LatLng(40.772871880045216, -73.9934516698122),
        new google.maps.LatLng(40.80572123160574, -73.9704061299563),
    ],
    street_labels: [],
has_label: [true, false, false, true, true, true]
}, 
{
    name: 'East Harlem',
    color: '#ff79e5',
    path: [
        new google.maps.LatLng(40.7829461089784, -73.94385829567909),
        new google.maps.LatLng(40.78795015792346, -73.95561710000038),
        new google.maps.LatLng(40.8030899832907, -73.9445449411869),
        new google.maps.LatLng(40.80250524727603, -73.94291415810585),
        new google.maps.LatLng(40.80503906613369, -73.94102588295937),
        new google.maps.LatLng(40.80581868324361, -73.9427424967289),
        new google.maps.LatLng(40.817836621370134, -73.93398776650429),
        new google.maps.LatLng(40.81225017494346, -73.9343310892582),
        new google.maps.LatLng(40.80965166748856, -73.93510356545448),
        new google.maps.LatLng(40.80731292377169, -73.93407359719276),
        new google.maps.LatLng(40.8034148344062, -73.93046870827675),
        new google.maps.LatLng(40.79750229524064, -73.92926707863808),
        new google.maps.LatLng(40.79584539034771, -73.92952457070356),
        new google.maps.LatLng(40.79444835997204, -73.93098369240761),
        new google.maps.LatLng(40.79100439209487, -73.93656268715858),
        new google.maps.LatLng(40.78645548149673, -73.93879428505898),
        new google.maps.LatLng(40.78457084153033, -73.94132629036909),
    ],
    street_labels: [],
has_label: [true, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false]
}, 
{
    name: 'Morningside Heights',
    color: '#f97306',
    path: [
        new google.maps.LatLng(40.81796653313175, -73.96036393940449),
        new google.maps.LatLng(40.81160055762011, -73.95469911396503),
        new google.maps.LatLng(40.81104837789448, -73.95431287586695),
        new google.maps.LatLng(40.80552632790066, -73.95830400288105),
        new google.maps.LatLng(40.80315495364101, -73.95817525684834),
        new google.maps.LatLng(40.80127078766092, -73.9595914632082),
        new google.maps.LatLng(40.80507155036278, -73.968560770154),
        new google.maps.LatLng(40.80806003141889, -73.96680124104023),
        new google.maps.LatLng(40.809391811146064, -73.96538503468037),
        new google.maps.LatLng(40.81582295653154, -73.96057851612568),
        new google.maps.LatLng(40.81644005386475, -73.9604926854372),
        new google.maps.LatLng(40.81715458044764, -73.96092183887959),
    ],
    street_labels: [],
has_label: [true, false, true, false, false, true, false, false, true, false, false, false]
}, 
{
    name: 'Harlem',
    color: '#7e1e9c',
    path: [
        new google.maps.LatLng(40.817836621370134, -73.93405683338642),
        new google.maps.LatLng(40.80575371550092, -73.94281156361103),
        new google.maps.LatLng(40.806370906488624, -73.94427068531513),
        new google.maps.LatLng(40.803934592883806, -73.9460731297732),
        new google.maps.LatLng(40.8032848941508, -73.94448526203638),
        new google.maps.LatLng(40.7968850217806, -73.9491630345583),
        new google.maps.LatLng(40.80123830157151, -73.9595914632082),
        new google.maps.LatLng(40.803187438792285, -73.9581323415041),
        new google.maps.LatLng(40.80555881189126, -73.95826108753681),
        new google.maps.LatLng(40.81108085918201, -73.95426996052265),
        new google.maps.LatLng(40.818843430868, -73.9610505849123),
        new google.maps.LatLng(40.82576077323659, -73.95504243671894),
        new google.maps.LatLng(40.83001474287479, -73.9511800557375),
        new google.maps.LatLng(40.8344957287081, -73.94963510334497),
        new google.maps.LatLng(40.82803392073441, -73.93474347889423),
        new google.maps.LatLng(40.82228595433684, -73.93435724079609),
    ],
    street_labels: [],
has_label: [true, false, false, false, false, true, false, false, true, true, false, false, false, true, false, false]
}, 
];