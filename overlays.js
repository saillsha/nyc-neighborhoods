overlays = [
{
    name: 'Central Park',
    //color to be shown in region
    color: 'red',
    //the polygon boundaries in lat lng
    path: [
        new google.maps.LatLng(40.7970474627213, -73.94907653331757),
        new google.maps.LatLng(40.76455136505513,-73.9727658033371),
        new google.maps.LatLng(40.76806170936613, -73.98237884044647),
        new google.maps.LatLng(40.800556090021466,-73.9580887556076)
    ],
    //street_label[i] is true if the line connecting path[i] and path[i+1]
    //should have a street label
    street_label:[true, true, true, true]
},
{
    name: 'Chelsea',
    color: 'purple',
    path:[
        new google.maps.LatLng(40.757205044580815, -74.00495231151581),
        new google.maps.LatLng(40.749792889699464, -73.98770034313202),
        new google.maps.LatLng(40.73717732305697, -73.99679839611053),
        new google.maps.LatLng(40.74257499754292, -74.00890052318573),
        new google.maps.LatLng(40.74816730666263, -74.00769889354706),
        new google.maps.LatLng(40.749987956993444, -74.00855720043182),
        new google.maps.LatLng(40.75401921961654, -74.00744140148163)
    ],
        street_label:[true, true, true, true, true, true, true]
// },
// 'Bowery':{
//     color: 'green',
//     path:[
//         new google.maps.LatLng(40.72699858870393, -73.99155467748642),
//         new google.maps.LatLng(40.720201058841496, -73.99404376745224),
//         new google.maps.LatLng(40.716102691059206, -73.9960178732872),
//         new google.maps.LatLng(40.71502926732618, -73.99249881505966),
//         new google.maps.LatLng(40.72296568823725, -73.98863643407822),
//         new google.maps.LatLng(40.72520983236449, -73.98709148168564)
//     ]
// },
// 'Greenwich Village':{
//     color: 'orange',
//     path:[
//         new google.maps.LatLng(40.734868545421286, -73.99086803197861),
//         new google.maps.LatLng(40.73171417041241, -73.9914259314537),
//         new google.maps.LatLng(40.72550254123729, -73.99679034948349),
//         new google.maps.LatLng(40.72829947220741, -74.00279849767685),
//         new google.maps.LatLng(40.72914503284784, -74.01078075170517),
//         new google.maps.LatLng(40.73935595523296, -74.00975078344345),
//         new google.maps.LatLng(40.73935595523296, -74.0064463019371),
//         new google.maps.LatLng(40.74101426921151, -74.00537341833115)
//     ]
// },
// 'West Village':{
//     color: 'blue',
//     path:[
//         new google.maps.LatLng(40.74104678475861, -74.00537341833115), 
//         new google.maps.LatLng(40.73733991001137, -73.99683326482773), 
//         new google.maps.LatLng(40.730901162924205, -74.00155395269394),
//         new google.maps.LatLng(40.728266950429735, -74.0029701590538), 
//         new google.maps.LatLng(40.72911251148341, -74.01078075170517), 
//         new google.maps.LatLng(40.73945350425846, -74.00979369878769), 
//         new google.maps.LatLng(40.739420987932526, -74.00653213262558)
//     ]
// },
// 'East Village':{
//     color: 'purple',
//     path:[
//         new google.maps.LatLng(40.724169079279605, -73.99267047643661),
//         new google.maps.LatLng(40.718672332110465, -73.97486060857773),
//         new google.maps.LatLng(40.726835976477936, -73.97189944982529),
//         new google.maps.LatLng(40.7332425975975, -73.98722022771835),
//         new google.maps.LatLng(40.727258767439, -73.99151176214218)
//     ]
// },
// 'East Harlem':{
//     color: 'purple',
//     path:[
//         new google.maps.LatLng(40.803349864310306, -73.94469916820526),
//         new google.maps.LatLng(40.78788517269141, -73.95568549633026),
//         new google.maps.LatLng(40.7829461089784, -73.94401252269745),
//         new google.maps.LatLng(40.786845400329625, -73.9386910200119),
//         new google.maps.LatLng(40.790614497682476, -73.93663108348846),
//         new google.maps.LatLng(40.795812901603064, -73.92942130565643),
//         new google.maps.LatLng(40.800945926051526, -73.92950713634491),
//         new google.maps.LatLng(40.80581868324361, -73.94100844860077),
//         new google.maps.LatLng(40.80270015985332, -73.9430683851242)
//     ]
// },
// 'Battery Park':{
//     color:'gold',
//     path:[
//         new google.maps.LatLng(40.704879678521486, -74.01733003556728),
//         new google.maps.LatLng(40.70468447896035, -74.01419721543789),
//         new google.maps.LatLng(40.70315539593834, -74.0145405381918),
//         new google.maps.LatLng(40.70237457404695, -74.01372514665127),
//         new google.maps.LatLng(40.70061769132372, -74.01411138474941),
//         new google.maps.LatLng(40.701854021034066, -74.0163429826498),
//         new google.maps.LatLng(40.703513269579396, -74.01767335832119) 
//     ]
// },
// 'Battery Park City':{
//     color:'green',
//     path:[
//         new google.maps.LatLng(40.71821695991492, -74.01265226304531),
//         new google.maps.LatLng(40.70484714530104, -74.01668630540371),
//         new google.maps.LatLng(40.70471701226029, -74.01883207261562),
//         new google.maps.LatLng(40.706961771575806, -74.01904664933681),
//         new google.maps.LatLng(40.70686417491799, -74.01853166520596), 
//         new google.maps.LatLng(40.70787266681827, -74.01793085038662), 
//         new google.maps.LatLng(40.708132920313375, -74.01870332658291),
//         new google.maps.LatLng(40.71229683790948, -74.0178021043539), 
//         new google.maps.LatLng(40.712101660088756, -74.01664339005947),
//         new google.maps.LatLng(40.71337030569675, -74.01621423661709), 
//         new google.maps.LatLng(40.71366306663506, -74.01754461228848), 
//         new google.maps.LatLng(40.718542226086726, -74.01664339005947) 
//     ]
// },
// 'Finanial District':{
//     color:'pink',
//     path:[
//         new google.maps.LatLng(40.71720862468233, -74.01290975511074), 
//         new google.maps.LatLng(40.71421605600625, -74.00621496140957), 
//         new google.maps.LatLng(40.711841422104456, -74.00814615190029),
//         new google.maps.LatLng(40.7114835932153, -74.00763116776943),
//         new google.maps.LatLng(40.712101660088756, -74.00544248521328),
//         new google.maps.LatLng(40.70787266681827, -74.00012098252773),
//         new google.maps.LatLng(40.70208176347777, -74.00930486619473),
//         new google.maps.LatLng(40.70113825399865, -74.01406846940517),
//         new google.maps.LatLng(40.702342039602826, -74.01372514665127),
//         new google.maps.LatLng(40.703122861875606, -74.01449762284756),
//         new google.maps.LatLng(40.70484714530104, -74.01411138474941),
//         new google.maps.LatLng(40.704749545544296, -74.01672922074795)
//     ]
// },
// 'Lower East Side':{
//     color:'blue',
//     path:[
//         new google.maps.LatLng(40.718672332110465, -73.97471509873867),
//         new google.maps.LatLng(40.72296568823725, -73.98870550096035),
//         new google.maps.LatLng(40.71457387021076, -73.99265371263027),
//         new google.maps.LatLng(40.70959682727199, -73.99188123643398),
//         new google.maps.LatLng(40.71089805088516, -73.97973619401455),
//         new google.maps.LatLng(40.71219924907064, -73.97763334214687) 
//     ]
// },
// 'Little Italy':{
//     color: 'orange',
//     path:[
//         new google.maps.LatLng(40.71945296291278, -73.99438709020615),
//         new google.maps.LatLng(40.72107924768216, -73.99824947118759),
//         new google.maps.LatLng(40.718444646402084, -74.00056689977646),
//         new google.maps.LatLng(40.71711104304284, -73.99876445531845),
//         new google.maps.LatLng(40.716200274176735, -73.99618953466415)
//     ]
// },
// 'NoLita':{
//     color:'lightBlue',
//     path:[
//         new google.maps.LatLng(40.72504721576778, -73.99533122777939),
//         new google.maps.LatLng(40.722217623379684, -73.9971336722374),
//         new google.maps.LatLng(40.72098167171645, -73.99816364049911),
//         new google.maps.LatLng(40.71951801506643, -73.99438709020615),
//         new google.maps.LatLng(40.72413655548345, -73.9925417304039)
//     ]
// },
// 'TriBeCa':{
//     color:'purple',
//     path:[
//         new google.maps.LatLng(40.725925340669626, -74.01112407445908),
//         new google.maps.LatLng(40.71938791069558, -74.00189727544785),
//         new google.maps.LatLng(40.711418533210676, -74.00859206914902),
//         new google.maps.LatLng(40.71366306663506, -74.01387065649033) 
//     ]
// },
// 'SoHo':{
//     color:'red',
//     path:[
//         new google.maps.LatLng(40.72829947220741, -74.0029701590538),
//         new google.maps.LatLng(40.72355112443508, -74.00481551885605),
//         new google.maps.LatLng(40.72208752428535, -74.0055450797081),
//         new google.maps.LatLng(40.718444646402084, -74.00065273046494),
//         new google.maps.LatLng(40.72231519753357, -73.9971336722374), 
//         new google.maps.LatLng(40.725112262454154, -73.99550288915634) 
//     ]
// },
// 'Two Bridges':{
//     color:'orange',
//     path:[
//         new google.maps.LatLng(40.713760653328414, -73.99262756109238),
//         new google.maps.LatLng(40.713402834753445, -73.99824947118759),
//         new google.maps.LatLng(40.70936911052541, -74.00189727544785),
//         new google.maps.LatLng(40.70787266681827, -74.00000900030136),
//         new google.maps.LatLng(40.70881608089887, -73.99782031774521),
//         new google.maps.LatLng(40.70959682727199, -73.99189800024033)
//     ]
// },
// 'Chinatown':{
//     color:'pink',
//     path:[
//         new google.maps.LatLng(40.71932285841479, -74.00194019079208),
//         new google.maps.LatLng(40.716200274176735, -74.00455802679062),
//         new google.maps.LatLng(40.71333777662415, -73.99824947118759),
//         new google.maps.LatLng(40.71385823987875, -73.99279922246933),
//         new google.maps.LatLng(40.71496421078612, -73.99258464574814),
//         new google.maps.LatLng(40.71704598853704, -73.99872153997421)
//     ]
// },
// 'Civic Center':{
//     color: 'lightBlue',
//     path:[
//         new google.maps.LatLng(40.71623280185081, -74.00460094213486),
//         new google.maps.LatLng(40.71337030569675, -73.99820655584335),
//         new google.maps.LatLng(40.70923898632059, -74.00202602148056),
//         new google.maps.LatLng(40.71226430831242, -74.00545924901962),
//         new google.maps.LatLng(40.71154865315637, -74.0075621008873),
//         new google.maps.LatLng(40.711873951908125, -74.0081200003624)
//     ]
// },
// 'Meatpacking District':{
//     color:'gold',
//     path:[
//         new google.maps.LatLng(40.74257499754292, -74.00893539190292),
//         new google.maps.LatLng(40.74104678475861, -74.00545924901962),
//         new google.maps.LatLng(40.73932343885932, -74.00657504796982),
//         new google.maps.LatLng(40.73945350425846, -74.00979369878769)
//     ]
// },
// 'Hudson Square':{
//     color:'green',
//     path: [
//         new google.maps.LatLng(40.72911251148341, -74.01078075170517), 
//         new google.maps.LatLng(40.725892817731726, -74.01108115911484),
//         new google.maps.LatLng(40.72205499947202, -74.00571674108505), 
//         new google.maps.LatLng(40.72820190682675, -74.00301307439804) 
//     ]
// },
// 'NoHo':{
//     color: 'pink',
//     path:[
//         new google.maps.LatLng(40.73054343648237, -73.99237006902695),
//         new google.maps.LatLng(40.72960033028089, -73.98992389440536),
//         new google.maps.LatLng(40.72712867819861, -73.9916405081749),
//         new google.maps.LatLng(40.72423412682422, -73.99267047643661),
//         new google.maps.LatLng(40.72560011057546, -73.99653285741806)
//     ]
 }
};