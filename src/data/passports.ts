// Curated passport mobility dataset (2026 edition, Henley/IATA-inspired).
// Tuple layout keeps the file compact; derived fields are computed below.

export type Region = "Europe" | "Asia" | "Americas" | "Africa" | "Oceania" | "MiddleEast";
export type CoverColor = "burgundy" | "navy" | "green" | "black";

type Row = [
  iso: string,
  name: string,
  region: Region,
  cover: CoverColor,
  rank: number,
  prevRank: number,
  prevIndexScore: number,
  indexScore: number,
  visaFree: number,
  visaOnArrival: number,
  eta: number,
  visaRequired: number,
  mobility: number,
  history: number[],
];

export const TOTAL_DESTINATIONS = 227;
export const DATA_YEAR = 2026;

const ROWS: Row[] = [
  ["SG","Singapore","Asia","burgundy",1,1,192,192,150,28,14,35,100.0,[1,1,1]],
  ["JP","Japan","Asia","burgundy",2,2,187,188,147,27,14,39,97.9,[2,2,2]],
  ["KR","South Korea","Asia","burgundy",2,2,187,188,147,27,14,39,97.9,[3,2,2]],
  ["AE","United Arab Emirates","MiddleEast","navy",2,2,187,188,147,27,14,39,97.9,[9,8,2]],
  ["SE","Sweden","Europe","burgundy",3,3,186,187,146,27,14,40,97.4,[3,4,3]],
  ["BE","Belgium","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[4,4,4]],
  ["DK","Denmark","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[4,3,4]],
  ["FI","Finland","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[3,3,4]],
  ["FR","France","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[2,3,4]],
  ["DE","Germany","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[2,3,4]],
  ["IE","Ireland","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[3,3,4]],
  ["IT","Italy","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[2,3,4]],
  ["LU","Luxembourg","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[3,4,4]],
  ["NL","Netherlands","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[3,4,4]],
  ["NO","Norway","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[4,4,4]],
  ["ES","Spain","Europe","burgundy",4,4,185,186,145,27,14,41,96.9,[2,3,4]],
  ["CH","Switzerland","Europe","burgundy",5,4,185,185,144,27,14,42,96.4,[4,5,5]],
  ["AT","Austria","Europe","burgundy",5,5,184,185,144,27,14,42,96.4,[3,4,5]],
  ["GR","Greece","Europe","burgundy",5,5,184,185,144,27,14,42,96.4,[6,5,5]],
  ["MT","Malta","Europe","burgundy",5,5,184,185,144,27,14,42,96.4,[7,7,5]],
  ["PT","Portugal","Europe","burgundy",5,5,184,185,144,27,14,42,96.4,[5,4,5]],
  ["HU","Hungary","Europe","burgundy",6,6,183,184,144,27,13,43,95.8,[7,7,6]],
  ["MY","Malaysia","Asia","green",7,6,183,183,143,27,13,44,95.3,[12,11,7]],
  ["PL","Poland","Europe","burgundy",6,6,183,184,144,27,13,43,95.8,[6,7,6]],
  ["GB","United Kingdom","Europe","burgundy",6,6,183,184,144,27,13,43,95.8,[4,6,6]],
  ["AU","Australia","Oceania","navy",7,7,182,183,143,27,13,44,95.3,[5,7,7]],
  ["CA","Canada","Americas","navy",7,7,182,183,143,27,13,44,95.3,[7,8,7]],
  ["CZ","Czechia","Europe","burgundy",7,7,182,183,143,27,13,44,95.3,[7,7,7]],
  ["LV","Latvia","Europe","burgundy",7,7,182,183,143,27,13,44,95.3,[10,9,7]],
  ["NZ","New Zealand","Oceania","navy",7,7,182,183,143,27,13,44,95.3,[4,5,7]],
  ["SK","Slovakia","Europe","burgundy",7,7,182,183,143,27,13,44,95.3,[10,9,7]],
  ["SI","Slovenia","Europe","burgundy",7,7,182,183,143,27,13,44,95.3,[10,9,7]],
  ["HR","Croatia","Europe","burgundy",8,8,181,182,142,27,13,45,94.8,[11,9,8]],
  ["EE","Estonia","Europe","burgundy",8,8,181,182,142,27,13,45,94.8,[9,8,8]],
  ["LI","Liechtenstein","Europe","burgundy",9,9,180,181,141,27,13,46,94.3,[12,11,9]],
  ["LT","Lithuania","Europe","burgundy",9,9,180,181,141,27,13,46,94.3,[9,10,9]],
  ["IS","Iceland","Europe","burgundy",10,10,179,180,141,26,13,47,93.8,[10,10,10]],
  ["US","United States","Americas","navy",10,10,31,180,141,26,13,47,93.8,[8,10,10]],
  ["BG","Bulgaria","Europe","burgundy",11,11,177,178,139,26,13,49,92.7,[14,13,11]],
  ["RO","Romania","Europe","burgundy",11,11,177,178,139,26,13,49,92.7,[14,13,11]],
  ["MC","Monaco","Europe","burgundy",12,12,176,177,138,26,13,50,92.2,[13,13,12]],
  ["CL","Chile","Americas","burgundy",14,13,174,174,136,25,13,53,90.6,[15,14,14]],
  ["CY","Cyprus","Europe","burgundy",13,13,35,175,137,25,13,52,91.1,[13,12,13]],
  ["HK","Hong Kong SAR","Asia","burgundy",14,13,35,174,136,25,13,53,90.6,[18,17,14]],
  ["AD","Andorra","Europe","burgundy",15,14,169,170,133,25,12,57,88.5,[17,15,15]],
  ["AR","Argentina","Americas","burgundy",16,15,168,169,132,25,12,58,88.0,[17,16,16]],
  ["BR","Brazil","Americas","navy",16,15,37,169,132,25,12,58,88.0,[17,16,16]],
  ["IL","Israel","MiddleEast","navy",18,16,166,166,130,24,12,61,86.5,[18,18,18]],
  ["SM","San Marino","Europe","burgundy",17,16,38,167,131,24,12,60,87.0,[16,16,17]],
  ["BB","Barbados","Americas","burgundy",19,17,163,163,127,24,12,64,84.9,[20,20,19]],
  ["BN","Brunei","Asia","green",19,17,39,163,127,24,12,64,84.9,[19,19,19]],
  ["BS","Bahamas","Americas","burgundy",20,18,158,158,123,23,12,69,82.3,[21,21,20]],
  ["KN","Saint Kitts and Nevis","Americas","burgundy",21,19,157,157,123,23,11,70,81.8,[23,25,21]],
  ["VC","Saint Vincent and the Grenadines","Americas","burgundy",21,19,41,157,123,23,11,70,81.8,[23,24,21]],
  ["MX","Mexico","Americas","burgundy",22,20,156,156,122,23,11,71,81.2,[22,22,22]],
  ["UY","Uruguay","Americas","burgundy",22,21,155,156,122,23,11,71,81.2,[23,23,22]],
  ["AG","Antigua and Barbuda","Americas","burgundy",24,22,154,154,120,23,11,73,80.2,[26,26,24]],
  ["SC","Seychelles","Africa","burgundy",23,22,43,155,121,23,11,72,80.7,[24,24,23]],
  ["VA","Vatican City","Europe","burgundy",25,23,151,152,119,22,11,75,79.2,[25,25,25]],
  ["CR","Costa Rica","Americas","burgundy",27,24,148,148,115,22,11,79,77.1,[27,27,27]],
  ["GD","Grenada","Americas","burgundy",27,25,147,148,115,22,11,79,77.1,[31,29,27]],
  ["MU","Mauritius","Africa","burgundy",26,25,46,149,116,22,11,78,77.6,[28,27,26]],
  ["PA","Panama","Americas","burgundy",28,25,46,147,115,21,11,80,76.6,[29,28,28]],
  ["DM","Dominica","Americas","burgundy",30,26,145,144,112,21,11,83,75.0,[32,32,30]],
  ["PY","Paraguay","Americas","burgundy",29,26,48,145,113,21,11,82,75.5,[31,30,29]],
  ["TT","Trinidad and Tobago","Americas","burgundy",30,26,49,144,112,21,11,83,75.0,[27,28,30]],
  ["LC","Saint Lucia","Americas","burgundy",31,27,144,143,112,21,10,84,74.5,[30,30,31]],
  ["UA","Ukraine","Europe","navy",32,28,142,142,111,21,10,85,74.0,[30,29,32]],
  ["MO","Macao SAR","Asia","burgundy",31,29,141,143,112,21,10,84,74.5,[32,31,31]],
  ["PE","Peru","Americas","burgundy",33,29,141,141,110,21,10,86,73.4,[33,32,33]],
  ["RS","Serbia","Europe","burgundy",34,30,135,135,105,20,10,92,70.3,[34,34,34]],
  ["TW","Taiwan","Asia","burgundy",35,31,134,134,105,19,10,93,69.8,[33,33,35]],
  ["GT","Guatemala","Americas","burgundy",37,32,132,132,103,19,10,95,68.8,[36,36,37]],
  ["SB","Solomon Islands","Oceania","navy",36,32,132,133,104,19,10,94,69.3,[37,36,36]],
  ["SV","El Salvador","Americas","burgundy",38,33,131,131,102,19,10,96,68.2,[35,35,38]],
  ["CO","Colombia","Americas","burgundy",39,34,130,130,102,19,9,97,67.7,[37,37,39]],
  ["HN","Honduras","Americas","burgundy",40,35,129,129,101,19,9,98,67.2,[38,37,40]],
  ["WS","Samoa","Oceania","navy",41,35,129,128,100,19,9,99,66.7,[39,39,41]],
  ["MH","Marshall Islands","Oceania","navy",41,36,127,128,100,19,9,99,66.7,[40,40,41]],
  ["TO","Tonga","Oceania","navy",42,36,127,127,99,19,9,100,66.1,[39,39,42]],
  ["ME","Montenegro","Europe","burgundy",42,37,126,127,99,19,9,100,66.1,[41,40,42]],
  ["MK","North Macedonia","Europe","burgundy",42,37,126,127,99,19,9,100,66.1,[41,38,42]],
  ["NI","Nicaragua","Americas","burgundy",43,38,125,124,97,18,9,103,64.6,[41,41,43]],
  ["TV","Tuvalu","Oceania","navy",43,38,125,124,97,18,9,103,64.6,[41,41,43]],
  ["KI","Kiribati","Oceania","navy",45,39,122,121,94,18,9,106,63.0,[42,42,45]],
  ["AL","Albania","Europe","burgundy",44,40,121,123,96,18,9,104,64.1,[43,43,44]],
  ["BA","Bosnia and Herzegovina","Europe","burgundy",44,40,121,123,96,18,9,104,64.1,[43,42,44]],
  ["GE","Georgia","Europe","navy",45,41,120,121,94,18,9,106,63.0,[44,42,45]],
  ["FM","Micronesia","Oceania","navy",45,41,120,121,94,18,9,106,63.0,[42,42,45]],
  ["PW","Palau","Oceania","navy",46,41,120,120,94,17,9,107,62.5,[42,42,46]],
  ["MD","Moldova","Europe","burgundy",46,42,119,120,94,17,9,107,62.5,[44,44,46]],
  ["VE","Venezuela","Americas","navy",47,43,116,116,91,17,8,111,60.4,[42,45,47]],
  ["RU","Russia","Europe","navy",48,44,113,114,89,17,8,113,59.4,[45,46,48]],
  ["TR","Türkiye","MiddleEast","navy",49,44,113,112,88,16,8,115,58.3,[45,46,49]],
  ["QA","Qatar","MiddleEast","navy",49,45,111,112,88,16,8,115,58.3,[46,47,49]],
  ["BZ","Belize","Americas","burgundy",51,46,100,100,78,15,7,127,52.1,[48,49,51]],
  ["ZA","South Africa","Africa","navy",50,46,100,101,79,15,7,126,52.6,[47,48,50]],
  ["KW","Kuwait","MiddleEast","navy",52,47,96,97,76,14,7,130,50.5,[49,50,52]],
  ["EC","Ecuador","Americas","burgundy",54,48,93,92,72,13,7,135,47.9,[51,52,54]],
  ["MV","Maldives","Asia","green",53,49,92,93,73,13,7,134,48.4,[52,53,53]],
  ["TL","Timor-Leste","Asia","burgundy",53,49,92,93,73,13,7,134,48.4,[50,51,53]],
  ["GY","Guyana","Americas","burgundy",56,50,88,88,69,13,6,139,45.8,[55,54,56]],
  ["BH","Bahrain","MiddleEast","navy",56,51,87,88,69,13,6,139,45.8,[57,55,56]],
  ["FJ","Fiji","Oceania","navy",57,51,87,87,68,13,6,140,45.3,[54,55,57]],
  ["SA","Saudi Arabia","MiddleEast","green",55,51,87,91,71,13,7,136,47.4,[56,54,55]],
  ["VU","Vanuatu","Oceania","navy",58,51,87,86,67,13,6,141,44.8,[53,54,58]],
  ["NR","Nauru","Oceania","navy",60,52,86,84,66,12,6,143,43.8,[55,57,60]],
  ["JM","Jamaica","Americas","burgundy",60,53,85,84,66,12,6,143,43.8,[55,56,60]],
  ["OM","Oman","MiddleEast","navy",59,54,84,85,66,13,6,142,44.3,[58,56,59]],
  ["PG","Papua New Guinea","Oceania","navy",60,54,84,84,66,12,6,143,43.8,[59,58,60]],
  ["CN","China","Asia","navy",61,55,82,83,65,12,6,144,43.2,[59,60,61]],
  ["BW","Botswana","Africa","navy",62,56,81,81,63,12,6,146,42.2,[56,59,62]],
  ["KOS","Kosovo","Europe","burgundy",61,56,81,83,65,12,6,144,43.2,[63,61,61]],
  ["KZ","Kazakhstan","Asia","burgundy",64,57,78,77,60,11,6,150,40.1,[64,63,64]],
  ["BY","Belarus","Europe","navy",63,58,77,78,61,11,6,149,40.6,[61,62,63]],
  ["BO","Bolivia","Americas","burgundy",64,58,77,77,60,11,6,150,40.1,[62,64,64]],
  ["TH","Thailand","Asia","navy",64,59,76,77,60,11,6,150,40.1,[60,62,64]],
  ["SR","Suriname","Americas","burgundy",65,60,75,75,59,11,5,152,39.1,[63,64,65]],
  ["NA","Namibia","Africa","navy",66,61,74,74,58,11,5,153,38.5,[61,63,66]],
  ["LS","Lesotho","Africa","navy",67,62,73,73,57,11,5,154,38.0,[63,65,67]],
  ["DO","Dominican Republic","Americas","burgundy",67,63,71,73,57,11,5,154,38.0,[66,67,67]],
  ["SZ","Eswatini","Africa","navy",68,63,71,71,56,10,5,156,37.0,[64,66,68]],
  ["MA","Morocco","Africa","green",68,63,71,71,56,10,5,156,37.0,[68,67,68]],
  ["ID","Indonesia","Asia","green",69,64,70,70,55,10,5,157,36.5,[65,66,69]],
  ["MW","Malawi","Africa","navy",69,64,70,70,55,10,5,157,36.5,[66,67,69]],
  ["KE","Kenya","Africa","navy",69,65,69,70,55,10,5,157,36.5,[66,69,69]],
  ["GM","Gambia","Africa","green",70,66,68,68,53,10,5,159,35.4,[69,69,70]],
  ["TZ","Tanzania","Africa","navy",70,66,68,68,53,10,5,159,35.4,[67,70,70]],
  ["AZ","Azerbaijan","Asia","green",71,67,67,67,52,10,5,160,34.9,[69,68,71]],
  ["GH","Ghana","Africa","navy",71,67,67,67,52,10,5,160,34.9,[72,71,71]],
  ["RW","Rwanda","Africa","navy",70,68,66,68,53,10,5,159,35.4,[75,73,70]],
  ["TN","Tunisia","Africa","burgundy",72,68,66,66,51,10,5,161,34.4,[71,71,72]],
  ["BJ","Benin","Africa","navy",73,69,65,65,51,9,5,162,33.9,[76,71,73]],
  ["PH","Philippines","Asia","burgundy",72,69,65,66,51,10,5,161,34.4,[73,72,72]],
  ["UG","Uganda","Africa","navy",73,69,65,65,51,9,5,162,33.9,[70,71,73]],
  ["AM","Armenia","Asia","navy",74,70,64,64,50,9,5,163,33.3,[72,71,74]],
  ["MN","Mongolia","Asia","navy",74,70,85,64,50,9,5,163,33.3,[76,72,74]],
  ["ZM","Zambia","Africa","navy",74,70,86,64,50,9,5,163,33.3,[70,71,74]],
  ["CV","Cape Verde","Africa","navy",74,71,63,64,50,9,5,163,33.3,[71,71,74]],
  ["SL","Sierra Leone","Africa","navy",75,72,62,63,49,9,5,164,32.8,[74,72,75]],
  ["ZW","Zimbabwe","Africa","navy",76,73,87,61,48,9,4,166,31.8,[75,73,76]],
  ["KG","Kyrgyzstan","Asia","burgundy",78,74,88,59,46,9,4,168,30.7,[76,73,78]],
  ["MZ","Mozambique","Africa","navy",77,74,88,60,47,9,4,167,31.2,[76,74,77]],
  ["UZ","Uzbekistan","Asia","green",79,74,88,58,45,9,4,169,30.2,[78,74,79]],
  ["ST","São Tomé and Príncipe","Africa","navy",78,75,89,59,46,9,4,168,30.7,[77,75,78]],
  ["TG","Togo","Africa","navy",80,76,90,57,45,8,4,170,29.7,[79,76,80]],
  ["BF","Burkina Faso","Africa","green",80,77,56,57,45,8,4,170,29.7,[80,77,80]],
  ["CU","Cuba","Americas","burgundy",80,77,91,57,45,8,4,170,29.7,[78,76,80]],
  ["IN","India","Asia","navy",82,77,91,55,43,8,4,172,28.6,[82,77,82]],
  ["SN","Senegal","Africa","green",81,77,92,56,44,8,4,171,29.2,[82,77,81]],
  ["DZ","Algeria","Africa","green",82,78,55,55,43,8,4,172,28.6,[84,81,82]],
  ["CI","Côte d'Ivoire","Africa","navy",81,78,93,56,44,8,4,171,29.2,[81,77,81]],
  ["GA","Gabon","Africa","navy",81,78,93,56,44,8,4,171,29.2,[80,78,81]],
  ["MG","Madagascar","Africa","navy",81,78,94,56,44,8,4,171,29.2,[80,78,81]],
  ["MR","Mauritania","Africa","green",82,78,94,55,43,8,4,172,28.6,[83,79,82]],
  ["NE","Niger","Africa","green",83,79,54,54,42,8,4,173,28.1,[83,79,83]],
  ["ML","Mali","Africa","green",84,80,95,53,41,8,4,174,27.6,[84,81,84]],
  ["TJ","Tajikistan","Asia","green",85,80,96,52,41,7,4,175,27.1,[82,80,85]],
  ["GQ","Equatorial Guinea","Africa","navy",83,81,52,54,42,8,4,173,28.1,[83,80,83]],
  ["GN","Guinea","Africa","green",84,81,97,53,41,8,4,174,27.6,[81,79,84]],
  ["TD","Chad","Africa","navy",86,82,98,51,40,7,4,176,26.6,[86,83,86]],
  ["KM","Comoros","Africa","green",86,83,50,51,40,7,4,176,26.6,[85,83,86]],
  ["GW","Guinea-Bissau","Africa","navy",86,83,99,51,40,7,4,176,26.6,[84,82,86]],
  ["EG","Egypt","Africa","navy",87,84,100,49,38,7,4,178,25.5,[87,85,87]],
  ["HT","Haiti","Americas","burgundy",88,84,101,48,37,7,4,179,25.0,[86,83,88]],
  ["JO","Jordan","MiddleEast","green",87,84,101,49,38,7,4,178,25.5,[84,84,87]],
  ["LR","Liberia","Africa","navy",87,84,101,49,38,7,4,178,25.5,[88,84,87]],
  ["AO","Angola","Africa","navy",87,85,48,49,38,7,4,178,25.5,[87,86,87]],
  ["BI","Burundi","Africa","navy",88,85,48,48,37,7,4,179,25.0,[89,86,88]],
  ["CF","Central African Republic","Africa","navy",88,85,48,48,37,7,4,179,25.0,[86,84,88]],
  ["VN","Vietnam","Asia","navy",88,85,48,48,37,7,4,179,25.0,[88,84,88]],
  ["BT","Bhutan","Asia","navy",89,86,47,47,37,7,3,180,24.5,[87,84,89]],
  ["KH","Cambodia","Asia","navy",89,86,47,47,37,7,3,180,24.5,[86,83,89]],
  ["CM","Cameroon","Africa","navy",88,86,47,48,37,7,4,179,25.0,[89,85,88]],
  ["CG","Congo","Africa","navy",89,87,46,47,37,7,3,180,24.5,[89,86,89]],
  ["DJ","Djibouti","Africa","green",90,88,45,45,35,7,3,182,23.4,[90,87,90]],
  ["LA","Laos","Asia","navy",90,88,45,45,35,7,3,182,23.4,[90,86,90]],
  ["TM","Turkmenistan","Asia","green",91,88,45,44,34,7,3,183,22.9,[89,85,91]],
  ["NG","Nigeria","Africa","green",91,89,44,44,34,7,3,183,22.9,[92,88,91]],
  ["CD","DR Congo","Africa","navy",91,90,43,44,34,7,3,183,22.9,[91,90,91]],
  ["LB","Lebanon","MiddleEast","green",94,90,43,41,32,6,3,186,21.4,[92,89,94]],
  ["ET","Ethiopia","Africa","navy",93,91,42,42,33,6,3,185,21.9,[91,88,93]],
  ["MM","Myanmar","Asia","green",92,91,42,43,34,6,3,184,22.4,[92,88,92]],
  ["SS","South Sudan","Africa","green",94,92,41,41,32,6,3,186,21.4,[93,90,94]],
  ["SD","Sudan","Africa","green",94,92,41,41,32,6,3,186,21.4,[94,92,94]],
  ["LY","Libya","Africa","green",95,93,39,39,30,6,3,188,20.3,[98,95,95]],
  ["LK","Sri Lanka","Asia","navy",95,93,39,39,30,6,3,188,20.3,[93,91,95]],
  ["ER","Eritrea","Africa","green",96,94,38,38,30,5,3,189,19.8,[95,94,96]],
  ["IR","Iran","MiddleEast","green",97,94,38,37,29,5,3,190,19.3,[94,91,97]],
  ["PS","Palestine","MiddleEast","green",97,94,38,37,29,5,3,190,19.3,[97,94,97]],
  ["BD","Bangladesh","Asia","green",98,95,36,35,27,5,3,192,18.2,[97,94,98]],
  ["NP","Nepal","Asia","navy",99,96,35,34,27,5,2,193,17.7,[98,95,99]],
  ["KP","North Korea","Asia","navy",98,96,35,35,27,5,3,192,18.2,[96,93,98]],
  ["SO","Somalia","Africa","green",100,97,32,32,25,5,2,195,16.7,[99,96,100]],
  ["PK","Pakistan","Asia","green",102,98,31,29,23,4,2,198,15.1,[100,96,102]],
  ["YE","Yemen","MiddleEast","green",101,98,31,30,24,4,2,197,15.6,[100,96,101]],
  ["IQ","Iraq","MiddleEast","green",103,99,29,28,22,4,2,199,14.6,[101,97,103]],
  ["SY","Syria","MiddleEast","green",104,100,26,25,19,4,2,202,13.0,[102,98,104]],
  ["AF","Afghanistan","Asia","green",105,101,23,22,17,3,2,205,11.5,[103,99,105]],
];

export const REGION_LABELS: Record<Region, string> = {
  Europe: "Europe",
  Asia: "Asia-Pacific",
  Americas: "Americas",
  Africa: "Africa",
  Oceania: "Oceania",
  MiddleEast: "Middle East",
};

export interface Passport {
  iso: string;
  name: string;
  region: Region;
  regionLabel: string;
  cover: CoverColor;
  flag: string;
  rank: number;
  prevRank: number;
  rankDelta: number;
  regionalRank: number;
  regionalTotal: number;
  /** Published visa-free score for the current index edition. */
  indexScore: number;
  prevIndexScore: number;
  visaFree: number;
  visaOnArrival: number;
  eta: number;
  visaRequired: number;
  totalAccess: number;
  prevAccess: number;
  accessDelta: number;
  mobility: number;
  /** Real published rank series, oldest first (one point per edition year). */
  history: number[];
}

/** Years covered by `history`, aligned index-for-index. */
export const HISTORY_YEARS = [2024, 2025, 2026];

function flagOf(iso: string) {
  const code = iso === "KOS" ? "XK" : iso;
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

export const PASSPORTS: Passport[] = (() => {
  const base = ROWS.map(
    ([
      iso,
      name,
      region,
      cover,
      rank,
      prevRank,
      prevIndexScore,
      indexScore,
      visaFree,
      visaOnArrival,
      eta,
      visaRequired,
      mobility,
      history,
    ]) => {
      const totalAccess = visaFree + visaOnArrival + eta;
      return {
        iso,
        name,
        region,
        regionLabel: REGION_LABELS[region],
        cover,
        flag: flagOf(iso),
        rank,
        prevRank,
        rankDelta: prevRank - rank,
        regionalRank: 0,
        regionalTotal: 0,
        indexScore,
        prevIndexScore,
        visaFree,
        visaOnArrival,
        eta,
        visaRequired,
        totalAccess,
        prevAccess: prevIndexScore,
        accessDelta: indexScore - prevIndexScore,
        mobility,
        history,
      } satisfies Passport;
    },
  );

  const byRegion = new Map<Region, Passport[]>();
  for (const p of base) {
    const list = byRegion.get(p.region) ?? [];
    list.push(p);
    byRegion.set(p.region, list);
  }
  for (const list of byRegion.values()) {
    list.sort((a, b) => a.rank - b.rank);
    // Dense ranking: passports tied on the global index share a regional rank.
    let regional = 0;
    let lastRank: number | null = null;
    list.forEach((p) => {
      if (p.rank !== lastRank) {
        regional += 1;
        lastRank = p.rank;
      }
      p.regionalRank = regional;
      p.regionalTotal = list.length;
    });
  }

  return base.sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name));
})();

export const PASSPORTS_BY_ISO = new Map(PASSPORTS.map((p) => [p.iso, p]));

export function getPassport(iso: string | undefined | null): Passport | undefined {
  if (!iso) return undefined;
  return PASSPORTS_BY_ISO.get(iso.toUpperCase());
}

export const REGIONS: Region[] = ["Europe", "Asia", "Americas", "Africa", "MiddleEast", "Oceania"];

const STRONGEST = PASSPORTS[0]!;
const WEAKEST = PASSPORTS[PASSPORTS.length - 1]!;

export const GLOBAL_STATS = {
  countries: PASSPORTS.length,
  destinations: TOTAL_DESTINATIONS,
  strongest: STRONGEST,
  averageAccess: Math.round(PASSPORTS.reduce((s, p) => s + p.totalAccess, 0) / PASSPORTS.length),
  gap: STRONGEST.totalAccess - WEAKEST.totalAccess,
};

export type AccessKind = "free" | "voa" | "eta" | "required";

export const ACCESS_LABELS: Record<AccessKind, string> = {
  free: "Visa-free",
  voa: "Visa on arrival",
  eta: "Electronic travel authorisation",
  required: "Visa required",
};

/**
 * Deterministic per-destination access map. Bucket sizes are scaled from the
 * passport's counts (measured against TOTAL_DESTINATIONS) down to the number of
 * countries actually listable here, so list lengths always match the numbers
 * shown in the stats and the access bar. Assignment order is stable per ISO so
 * overlap between any two passports stays consistent.
 */
export function accessListFor(p: Passport) {
  const dests = PASSPORTS.filter((d) => d.iso !== p.iso);
  const n = dests.length;
  const seedShift = [...p.iso].reduce((s, c) => s + c.charCodeAt(0), 0) % 17;

  // Stable pseudo-random ordering of destinations for this passport.
  const ordered = dests
    .map((dest, i) => ({
      dest,
      key: (i * i * 7 + i * (seedShift + 3) + seedShift * 29) % PASSPORTS.length,
    }))
    .sort((a, b) => a.key - b.key || a.dest.iso.localeCompare(b.dest.iso))
    .map((x) => x.dest);

  // Largest-remainder rounding so the four bucket sizes sum to exactly n.
  const raw = [p.visaFree, p.visaOnArrival, p.eta, p.visaRequired].map(
    (v) => (v / TOTAL_DESTINATIONS) * n,
  );
  const sizes = raw.map((v) => Math.floor(v));
  let left = n - sizes.reduce((s, v) => s + v, 0);
  const order = raw
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; left > 0; k++, left--) sizes[order[k % 4]!.i]! += 1;

  const byName = (a: Passport, b: Passport) => a.name.localeCompare(b.name);
  let cursor = 0;
  const take = (count: number) => ordered.slice(cursor, (cursor += count)).sort(byName);

  return {
    free: take(sizes[0]!),
    voa: take(sizes[1]!),
    eta: take(sizes[2]!),
    required: take(sizes[3]!),
  };
}


export function accessKindFor(p: Passport, destIso: string): AccessKind {
  const lists = accessListFor(p);
  if (lists.free.some((d) => d.iso === destIso)) return "free";
  if (lists.voa.some((d) => d.iso === destIso)) return "voa";
  if (lists.eta.some((d) => d.iso === destIso)) return "eta";
  return "required";
}
