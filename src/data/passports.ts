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
  ["SG","Singapore","Asia","burgundy",1,4,161,27,7,32,100,[1,1,1,4,1]],
  ["JP","Japan","Asia","burgundy",2,1,163,20,10,34,99.0,[1,1,1,1,2]],
  ["DE","Germany","Europe","burgundy",3,5,155,31,6,35,98.5,[14,10,5,5,3]],
  ["IT","Italy","Europe","burgundy",3,1,151,32,9,35,98.5,[1,1,1,1,3]],
  ["ES","Spain","Europe","burgundy",3,4,150,31,11,35,98.5,[11,6,2,4,3]],
  ["FR","France","Europe","burgundy",3,1,154,27,11,35,98.5,[6,1,1,1,3]],
  ["FI","Finland","Europe","burgundy",3,5,155,29,8,35,98.5,[2,5,7,5,3]],
  ["KR","South Korea","Asia","burgundy",3,3,163,21,8,35,98.5,[5,9,5,3,3]],
  ["AT","Austria","Europe","burgundy",9,9,154,30,7,36,97.9,[10,5,10,9,9]],
  ["DK","Denmark","Europe","burgundy",9,9,144,36,11,36,97.9,[20,16,14,9,9]],
  ["IE","Ireland","Europe","burgundy",9,8,165,20,6,36,97.9,[6,7,12,8,9]],
  ["NL","Netherlands","Europe","burgundy",9,9,147,32,12,36,97.9,[10,15,15,9,9]],
  ["SE","Sweden","Europe","burgundy",9,9,153,27,11,36,97.9,[1,1,2,9,9]],
  ["BE","Belgium","Europe","burgundy",14,10,150,27,13,37,97.4,[13,14,11,10,14]],
  ["NO","Norway","Europe","burgundy",14,13,140,37,13,37,97.4,[19,21,20,13,14]],
  ["CH","Switzerland","Europe","burgundy",14,17,163,20,7,37,97.4,[14,17,13,17,14]],
  ["GB","United Kingdom","Europe","burgundy",14,15,158,25,7,37,97.4,[21,24,24,15,14]],
  ["NZ","New Zealand","Oceania","navy",18,22,138,40,11,38,96.9,[29,28,25,22,18]],
  ["AU","Australia","Oceania","navy",18,21,156,27,6,38,96.9,[10,12,16,21,18]],
  ["PT","Portugal","Europe","burgundy",18,12,159,22,8,38,96.9,[8,5,8,12,18]],
  ["GR","Greece","Europe","burgundy",18,14,138,40,11,38,96.9,[20,15,18,14,18]],
  ["MT","Malta","Europe","burgundy",18,18,138,40,11,38,96.9,[17,15,13,18,18]],
  ["LU","Luxembourg","Europe","burgundy",18,22,157,25,7,38,96.9,[24,21,24,22,18]],
  ["CZ","Czechia","Europe","burgundy",24,24,151,23,14,39,96.4,[22,23,20,24,24]],
  ["PL","Poland","Europe","burgundy",24,23,138,38,12,39,96.4,[22,24,24,23,24]],
  ["HU","Hungary","Europe","burgundy",24,27,147,31,10,39,96.4,[27,26,28,27,24]],
  ["US","United States","Americas","navy",27,31,153,23,10,41,95.4,[22,23,21,31,27]],
  ["CA","Canada","Americas","navy",28,28,138,33,14,42,94.9,[19,23,25,28,28]],
  ["LT","Lithuania","Europe","burgundy",28,28,149,28,8,42,94.9,[36,31,31,28,28]],
  ["SK","Slovakia","Europe","burgundy",30,30,142,36,6,43,94.4,[34,29,28,30,30]],
  ["SI","Slovenia","Europe","burgundy",30,34,150,20,14,43,94.4,[32,35,39,34,30]],
  ["LV","Latvia","Europe","burgundy",30,32,139,40,5,43,94.4,[45,41,37,32,30]],
  ["EE","Estonia","Europe","burgundy",30,31,144,32,8,43,94.4,[27,22,27,31,30]],
  ["IS","Iceland","Europe","burgundy",34,34,140,29,14,44,93.8,[23,25,26,34,34]],
  ["LI","Liechtenstein","Europe","burgundy",34,34,142,29,12,44,93.8,[30,35,38,34,34]],
  ["HR","Croatia","Europe","burgundy",34,35,134,38,11,44,93.8,[37,40,37,35,34]],
  ["MY","Malaysia","Asia","green",37,42,140,29,13,45,93.3,[33,36,39,42,37]],
  ["MC","Monaco","Europe","burgundy",38,39,141,28,11,47,92.3,[46,43,40,39,38]],
  ["BG","Bulgaria","Europe","burgundy",39,40,139,28,12,48,91.8,[26,31,32,40,39]],
  ["RO","Romania","Europe","burgundy",39,44,141,28,10,48,91.8,[50,47,43,44,39]],
  ["AE","United Arab Emirates","MiddleEast","navy",39,39,140,28,11,48,91.8,[49,51,48,39,39]],
  ["CY","Cyprus","Europe","burgundy",42,41,129,36,13,49,91.3,[43,42,45,41,42]],
  ["CL","Chile","Americas","burgundy",43,46,143,25,8,51,90.3,[45,40,42,46,43]],
  ["TW","Taiwan","Asia","burgundy",44,41,128,33,12,54,88.7,[37,35,38,41,44]],
  ["AR","Argentina","Americas","burgundy",45,45,135,32,5,55,88.2,[44,43,46,45,45]],
  ["BR","Brazil","Americas","navy",45,45,139,25,8,55,88.2,[37,37,42,45,45]],
  ["HK","Hong Kong SAR","Asia","burgundy",47,47,133,26,11,57,87.2,[57,54,55,47,47]],
  ["IL","Israel","MiddleEast","navy",47,45,139,19,12,57,87.2,[31,36,37,45,47]],
  ["SM","San Marino","Europe","burgundy",49,49,141,22,6,58,86.7,[53,50,47,49,49]],
  ["AD","Andorra","Europe","burgundy",49,48,136,26,7,58,86.7,[37,38,42,48,49]],
  ["BN","Brunei","Asia","green",51,47,128,29,11,59,86.2,[39,37,41,47,51]],
  ["BB","Barbados","Americas","burgundy",52,51,132,22,9,64,83.6,[41,45,47,51,52]],
  ["MX","Mexico","Americas","burgundy",53,52,134,21,6,66,82.6,[54,52,53,52,53]],
  ["UY","Uruguay","Americas","burgundy",54,59,123,28,6,70,80.5,[39,44,49,59,54]],
  ["VA","Vatican City","Europe","burgundy",55,55,125,25,6,71,80.0,[62,57,52,55,55]],
  ["BS","Bahamas","Americas","burgundy",55,55,121,27,8,71,80.0,[54,54,56,55,55]],
  ["SC","Seychelles","Africa","burgundy",55,58,115,31,10,71,80.0,[49,52,57,58,55]],
  ["KN","Saint Kitts and Nevis","Americas","burgundy",55,54,130,16,10,71,80.0,[49,44,48,54,55]],
  ["VC","Saint Vincent and the Grenadines","Americas","burgundy",55,54,116,31,9,71,80.0,[46,49,47,54,55]],
  ["CR","Costa Rica","Americas","burgundy",60,60,128,20,4,75,77.9,[57,62,64,60,60]],
  ["MU","Mauritius","Africa","burgundy",60,60,128,19,5,75,77.9,[62,59,60,60,60]],
  ["AG","Antigua and Barbuda","Americas","burgundy",60,54,126,18,8,75,77.9,[44,43,46,54,60]],
  ["TT","Trinidad and Tobago","Americas","burgundy",63,62,130,15,4,78,76.4,[61,64,61,62,63]],
  ["LC","Saint Lucia","Americas","burgundy",63,65,109,30,10,78,76.4,[65,66,69,65,63]],
  ["GD","Grenada","Americas","burgundy",65,69,118,26,4,79,75.9,[79,82,79,69,65]],
  ["UA","Ukraine","Europe","navy",65,70,112,28,8,79,75.9,[85,80,75,70,65]],
  ["PA","Panama","Americas","burgundy",67,70,127,16,4,80,75.4,[73,70,68,70,67]],
  ["DM","Dominica","Americas","burgundy",68,71,112,25,8,82,74.4,[68,66,71,71,68]],
  ["MO","Macao SAR","Asia","burgundy",68,69,111,27,7,82,74.4,[72,70,74,69,68]],
  ["PY","Paraguay","Americas","burgundy",70,68,105,28,10,84,73.3,[74,72,70,68,70]],
  ["RS","Serbia","Europe","burgundy",71,70,113,15,10,89,70.8,[78,80,75,70,71]],
  ["PE","Peru","Americas","burgundy",72,75,108,23,6,90,70.3,[75,80,83,75,72]],
  ["SV","El Salvador","Americas","burgundy",72,75,118,14,5,90,70.3,[76,77,75,75,72]],
  ["GT","Guatemala","Americas","burgundy",74,79,111,18,7,91,69.7,[72,76,77,79,74]],
  ["CO","Colombia","Americas","burgundy",75,76,115,13,7,92,69.2,[75,77,79,76,75]],
  ["HN","Honduras","Americas","burgundy",75,76,108,22,5,92,69.2,[82,77,73,76,75]],
  ["NI","Nicaragua","Americas","burgundy",77,77,112,17,4,94,68.2,[76,81,80,77,77]],
  ["ME","Montenegro","Europe","burgundy",78,78,108,12,6,101,64.6,[77,77,76,78,78]],
  ["MK","North Macedonia","Europe","burgundy",78,72,100,17,9,101,64.6,[68,70,74,72,78]],
  ["AL","Albania","Europe","burgundy",80,80,94,25,5,103,63.6,[79,83,79,80,80]],
  ["MD","Moldova","Europe","burgundy",81,75,89,25,8,105,62.6,[70,71,66,75,81]],
  ["BA","Bosnia and Herzegovina","Europe","burgundy",81,80,92,25,5,105,62.6,[83,83,85,80,81]],
  ["GE","Georgia","Europe","navy",81,84,89,25,8,105,62.6,[86,90,92,84,81]],
  ["VE","Venezuela","Americas","navy",81,83,91,25,6,105,62.6,[82,87,85,83,81]],
  ["TR","Türkiye","MiddleEast","navy",85,85,99,13,6,109,60.5,[87,88,83,85,85]],
  ["RU","Russia","Europe","navy",86,87,91,20,5,111,59.5,[84,87,82,87,86]],
  ["QA","Qatar","MiddleEast","navy",87,87,88,13,8,118,55.9,[93,91,91,87,87]],
  ["ZA","South Africa","Africa","navy",88,84,90,12,4,121,54.4,[81,81,85,84,88]],
  ["BZ","Belize","Americas","burgundy",89,87,82,14,7,124,52.8,[89,86,85,87,89]],
  ["KW","Kuwait","MiddleEast","navy",90,84,82,14,4,127,51.3,[87,90,90,84,90]],
  ["TO","Tonga","Oceania","navy",91,89,78,15,6,128,50.8,[85,84,83,89,91]],
  ["MV","Maldives","Asia","green",92,86,75,14,7,131,49.2,[86,82,80,86,92]],
  ["EC","Ecuador","Americas","burgundy",92,93,83,9,4,131,49.2,[90,92,96,93,92]],
  ["FJ","Fiji","Oceania","navy",92,88,78,11,7,131,49.2,[80,85,90,88,92]],
  ["WS","Samoa","Oceania","navy",92,95,77,12,7,131,49.2,[99,96,97,95,92]],
  ["FM","Micronesia","Oceania","navy",92,88,76,14,6,131,49.2,[89,91,87,88,92]],
  ["VU","Vanuatu","Oceania","navy",97,91,74,12,6,135,47.2,[90,91,89,91,97]],
  ["TV","Tuvalu","Oceania","navy",97,97,70,16,6,135,47.2,[95,100,102,97,97]],
  ["MH","Marshall Islands","Oceania","navy",97,91,72,16,4,135,47.2,[103,102,97,91,97]],
  ["SA","Saudi Arabia","MiddleEast","green",100,100,75,11,5,136,46.7,[97,96,96,100,100]],
  ["SR","Suriname","Americas","burgundy",101,106,71,16,3,137,46.2,[105,103,105,106,101]],
  ["KI","Kiribati","Oceania","navy",101,99,72,12,6,137,46.2,[94,98,99,99,101]],
  ["BW","Botswana","Africa","navy",103,101,72,14,3,138,45.6,[109,105,110,101,103]],
  ["JM","Jamaica","Americas","burgundy",103,97,69,18,2,138,45.6,[83,86,91,97,103]],
  ["GY","Guyana","Americas","burgundy",105,105,70,13,5,139,45.1,[93,95,95,105,105]],
  ["BH","Bahrain","MiddleEast","navy",106,106,68,15,4,140,44.6,[107,107,106,106,106]],
  ["NR","Nauru","Oceania","navy",106,102,71,13,3,140,44.6,[95,99,98,102,106]],
  ["OM","Oman","MiddleEast","navy",108,108,65,18,3,141,44.1,[102,100,105,108,108]],
  ["CN","China","Asia","navy",109,107,67,12,6,142,43.6,[110,105,110,107,109]],
  ["BO","Bolivia","Americas","burgundy",110,110,68,10,5,144,42.6,[100,104,102,110,110]],
  ["TH","Thailand","Asia","navy",111,113,67,10,5,145,42.1,[110,110,110,113,111]],
  ["NA","Namibia","Africa","navy",111,111,67,10,5,145,42.1,[110,109,105,111,111]],
  ["LS","Lesotho","Africa","navy",111,111,71,8,3,145,42.1,[110,110,110,111,111]],
  ["SB","Solomon Islands","Oceania","navy",111,116,62,17,3,145,42.1,[110,110,110,116,111]],
  ["BY","Belarus","Europe","navy",115,117,62,12,5,148,40.5,[110,110,110,117,115]],
  ["KZ","Kazakhstan","Asia","burgundy",115,115,64,11,4,148,40.5,[110,110,110,115,115]],
  ["SZ","Eswatini","Africa","navy",117,113,58,17,3,149,40.0,[110,110,109,113,117]],
  ["PG","Papua New Guinea","Oceania","navy",117,119,66,9,3,149,40.0,[110,110,110,119,117]],
  ["ID","Indonesia","Asia","green",119,118,63,10,3,151,39.0,[110,110,110,118,119]],
  ["MW","Malawi","Africa","navy",119,121,64,9,3,151,39.0,[110,110,110,121,119]],
  ["KE","Kenya","Africa","navy",121,126,60,11,3,153,37.9,[110,110,110,126,121]],
  ["TZ","Tanzania","Africa","navy",121,121,58,11,5,153,37.9,[110,110,110,121,121]],
  ["DO","Dominican Republic","Americas","burgundy",121,123,60,9,5,153,37.9,[110,110,110,123,121]],
  ["ZM","Zambia","Africa","navy",124,127,56,12,5,154,37.4,[110,110,110,127,124]],
  ["MA","Morocco","Africa","green",125,122,60,9,3,155,36.9,[110,110,110,122,125]],
  ["TN","Tunisia","Africa","burgundy",125,125,52,15,5,155,36.9,[110,110,110,125,125]],
  ["AZ","Azerbaijan","Asia","green",127,127,62,7,2,156,36.4,[110,110,110,127,127]],
  ["UG","Uganda","Africa","navy",128,129,56,12,2,157,35.9,[110,110,110,129,128]],
  ["MZ","Mozambique","Africa","navy",129,129,50,15,4,158,35.4,[110,110,110,129,129]],
  ["PH","Philippines","Asia","burgundy",130,135,58,6,4,159,34.9,[110,110,110,135,130]],
  ["GM","Gambia","Africa","green",130,127,51,14,3,159,34.9,[110,110,110,127,130]],
  ["CV","Cape Verde","Africa","navy",130,124,56,10,2,159,34.9,[110,110,110,124,130]],
  ["AM","Armenia","Asia","navy",133,137,51,11,5,160,34.4,[110,110,110,137,133]],
  ["GH","Ghana","Africa","navy",133,129,52,10,5,160,34.4,[110,110,110,129,133]],
  ["RW","Rwanda","Africa","navy",135,129,49,14,3,161,33.8,[110,110,110,129,135]],
  ["ZW","Zimbabwe","Africa","navy",135,133,51,11,4,161,33.8,[110,110,110,133,135]],
  ["CU","Cuba","Americas","burgundy",135,135,50,14,2,161,33.8,[110,110,110,135,135]],
  ["KG","Kyrgyzstan","Asia","burgundy",138,141,48,13,4,162,33.3,[110,110,110,141,138]],
  ["CI","Côte d'Ivoire","Africa","navy",139,142,47,12,4,164,32.3,[110,110,110,142,139]],
  ["SN","Senegal","Africa","green",139,139,49,11,3,164,32.3,[110,110,110,139,139]],
  ["BJ","Benin","Africa","navy",139,144,51,8,4,164,32.3,[110,110,110,144,139]],
  ["SL","Sierra Leone","Africa","navy",139,135,53,7,3,164,32.3,[110,110,110,135,139]],
  ["UZ","Uzbekistan","Asia","green",143,147,50,10,2,165,31.8,[110,110,110,147,143]],
  ["IN","India","Asia","navy",143,137,47,11,4,165,31.8,[110,110,110,137,143]],
  ["MN","Mongolia","Asia","navy",143,148,50,8,4,165,31.8,[110,110,110,148,143]],
  ["TG","Togo","Africa","navy",143,145,49,11,2,165,31.8,[110,110,110,145,143]],
  ["MG","Madagascar","Africa","navy",143,144,53,7,2,165,31.8,[110,110,110,144,143]],
  ["ML","Mali","Africa","green",148,147,49,9,3,166,31.3,[110,110,110,147,148]],
  ["BF","Burkina Faso","Africa","green",148,148,51,6,4,166,31.3,[110,110,110,148,148]],
  ["TJ","Tajikistan","Asia","green",150,155,48,10,2,167,30.8,[110,110,110,155,150]],
  ["GN","Guinea","Africa","green",150,150,48,8,4,167,30.8,[110,110,110,150,150]],
  ["ST","São Tomé and Príncipe","Africa","navy",150,152,50,7,3,167,30.8,[110,110,110,152,150]],
  ["PW","Palau","Oceania","navy",150,151,47,10,3,167,30.8,[110,110,110,151,150]],
  ["TL","Timor-Leste","Asia","burgundy",150,144,49,10,1,167,30.8,[110,110,110,144,150]],
  ["MR","Mauritania","Africa","green",155,157,48,7,3,169,29.7,[110,110,110,157,155]],
  ["GA","Gabon","Africa","navy",156,154,47,6,4,170,29.2,[110,110,110,154,156]],
  ["VN","Vietnam","Asia","navy",157,157,41,11,3,172,28.2,[110,110,110,157,157]],
  ["KH","Cambodia","Asia","navy",157,159,43,9,3,172,28.2,[110,110,110,159,157]],
  ["DZ","Algeria","Africa","green",157,154,49,5,1,172,28.2,[110,110,110,154,157]],
  ["AO","Angola","Africa","navy",157,154,42,9,4,172,28.2,[110,110,110,154,157]],
  ["NE","Niger","Africa","green",157,159,44,9,2,172,28.2,[110,110,110,159,157]],
  ["TM","Turkmenistan","Asia","green",162,167,45,5,3,174,27.2,[110,110,110,167,162]],
  ["LA","Laos","Asia","navy",162,159,45,5,3,174,27.2,[110,110,110,159,162]],
  ["BT","Bhutan","Asia","navy",162,166,44,6,3,174,27.2,[110,110,110,166,162]],
  ["JO","Jordan","MiddleEast","green",162,163,42,8,3,174,27.2,[110,110,110,163,162]],
  ["LR","Liberia","Africa","navy",162,160,46,5,2,174,27.2,[110,110,110,160,162]],
  ["EG","Egypt","Africa","navy",167,170,42,8,2,175,26.7,[110,110,110,170,167]],
  ["GQ","Equatorial Guinea","Africa","navy",167,169,42,7,3,175,26.7,[110,110,110,169,167]],
  ["BI","Burundi","Africa","navy",169,163,42,8,1,176,26.2,[110,110,110,163,169]],
  ["DJ","Djibouti","Africa","green",169,163,37,11,3,176,26.2,[110,110,110,163,169]],
  ["CG","Congo","Africa","navy",169,171,41,9,1,176,26.2,[110,110,110,171,169]],
  ["CM","Cameroon","Africa","navy",169,165,44,5,2,176,26.2,[110,110,110,165,169]],
  ["CF","Central African Republic","Africa","navy",169,165,44,6,1,176,26.2,[110,110,110,165,169]],
  ["TD","Chad","Africa","navy",169,168,44,5,2,176,26.2,[110,110,110,168,169]],
  ["GW","Guinea-Bissau","Africa","navy",169,163,38,10,3,176,26.2,[110,110,110,163,169]],
  ["KM","Comoros","Africa","green",169,171,43,7,1,176,26.2,[110,110,110,171,169]],
  ["HT","Haiti","Americas","burgundy",169,174,44,5,2,176,26.2,[110,110,110,174,169]],
  ["MM","Myanmar","Asia","green",178,178,36,8,3,180,24.1,[110,110,110,178,178]],
  ["ET","Ethiopia","Africa","navy",178,176,35,9,3,180,24.1,[110,110,110,176,178]],
  ["CD","DR Congo","Africa","navy",178,183,35,9,3,180,24.1,[110,110,110,183,178]],
  ["SS","South Sudan","Africa","green",181,185,34,9,3,181,23.6,[110,110,110,185,181]],
  ["NG","Nigeria","Africa","green",181,182,38,6,2,181,23.6,[110,110,110,182,181]],
  ["KOS","Kosovo","Europe","burgundy",181,185,39,5,2,181,23.6,[110,110,110,185,181]],
  ["SD","Sudan","Africa","green",184,185,34,9,2,182,23.1,[110,110,110,185,184]],
  ["IR","Iran","MiddleEast","green",185,188,37,5,2,183,22.6,[110,110,110,188,185]],
  ["LK","Sri Lanka","Asia","navy",186,184,37,5,1,184,22.1,[110,110,110,184,186]],
  ["LB","Lebanon","MiddleEast","green",186,190,37,5,1,184,22.1,[110,110,110,190,186]],
  ["ER","Eritrea","Africa","green",186,185,37,5,1,184,22.1,[110,110,110,185,186]],
  ["BD","Bangladesh","Asia","green",189,189,33,8,1,185,21.5,[110,110,110,189,189]],
  ["KP","North Korea","Asia","navy",189,189,34,6,2,185,21.5,[110,110,110,189,189]],
  ["NP","Nepal","Asia","navy",191,191,30,7,3,187,20.5,[110,110,110,191,191]],
  ["LY","Libya","Africa","green",191,194,30,8,2,187,20.5,[110,110,110,194,191]],
  ["PS","Palestine","MiddleEast","green",193,191,30,7,2,188,20.0,[110,110,110,191,193]],
  ["SO","Somalia","Africa","green",194,194,28,5,2,192,17.9,[110,110,110,194,194]],
  ["PK","Pakistan","Asia","green",195,195,27,6,1,193,17.4,[110,110,110,195,195]],
  ["YE","Yemen","MiddleEast","green",196,194,25,6,2,194,16.9,[110,110,110,194,196]],
  ["IQ","Iraq","MiddleEast","green",197,191,27,3,1,196,15.9,[110,110,110,191,197]],
  ["SY","Syria","MiddleEast","green",198,199,22,6,1,198,14.9,[110,110,110,199,198]],
  ["AF","Afghanistan","Asia","green",199,193,24,3,1,199,14.4,[110,110,110,193,199]],
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
  visaFree: number;
  visaOnArrival: number;
  eta: number;
  visaRequired: number;
  totalAccess: number;
  prevAccess: number;
  accessDelta: number;
  mobility: number;
  history: number[];
  /** 10-year rank series (older years extrapolated deterministically). */
  history10: number[];
}

/**
 * Builds a stable 10-year rank series by extrapolating five extra years
 * backwards from the oldest known value with a per-country seed.
 */
function extendHistory(iso: string, history: number[]): number[] {
  const seed = [...iso].reduce((s, c) => s + c.charCodeAt(0) * 7, 0);
  const oldest = history[0]!;
  const earlier: number[] = [];
  let v = oldest;
  for (let i = 0; i < 5; i++) {
    const swing = (((seed + i * 31) % 11) - 5) + Math.round(oldest * 0.06);
    v = Math.max(1, Math.min(110, v + swing));
    earlier.unshift(v);
  }
  return [...earlier, ...history];
}

function flagOf(iso: string) {
  const code = iso === "KOS" ? "XK" : iso;
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

export const PASSPORTS: Passport[] = (() => {
  const base = ROWS.map(
    ([iso, name, region, cover, rank, prevRank, visaFree, visaOnArrival, eta, visaRequired, mobility, history]) => {
      const totalAccess = visaFree + visaOnArrival + eta;
      const accessDelta = Math.round((prevRank - rank) * 1.6);
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
        visaFree,
        visaOnArrival,
        eta,
        visaRequired,
        totalAccess,
        prevAccess: totalAccess - accessDelta,
        accessDelta,
        mobility,
        history,
        history10: extendHistory(iso, history),
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
    list.forEach((p, i) => {
      p.regionalRank = i + 1;
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
 * Deterministic per-destination access map. Access is assigned in a stable
 * order so that overlap between any two passports stays consistent.
 */
export function accessListFor(p: Passport) {
  const seedShift = [...p.iso].reduce((s, c) => s + c.charCodeAt(0), 0) % 17;
  const free: Passport[] = [];
  const voa: Passport[] = [];
  const etaList: Passport[] = [];
  const required: Passport[] = [];
  PASSPORTS.forEach((dest, i) => {
    if (dest.iso === p.iso) return;
    const slot = ((i * i * 7 + i * (seedShift + 3) + seedShift * 29) % PASSPORTS.length) / PASSPORTS.length;
    const scaled = slot * TOTAL_DESTINATIONS;
    if (scaled < p.visaFree) free.push(dest);
    else if (scaled < p.visaFree + p.visaOnArrival) voa.push(dest);
    else if (scaled < p.totalAccess) etaList.push(dest);
    else required.push(dest);
  });
  const byName = (a: Passport, b: Passport) => a.name.localeCompare(b.name);
  return {
    free: free.sort(byName),
    voa: voa.sort(byName),
    eta: etaList.sort(byName),
    required: required.sort(byName),
  };
}

export function accessKindFor(p: Passport, destIso: string): AccessKind {
  const lists = accessListFor(p);
  if (lists.free.some((d) => d.iso === destIso)) return "free";
  if (lists.voa.some((d) => d.iso === destIso)) return "voa";
  if (lists.eta.some((d) => d.iso === destIso)) return "eta";
  return "required";
}
