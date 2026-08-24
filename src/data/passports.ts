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
  ["SG","Singapore","Asia","burgundy",1,1,192,150,29,13,35,100.0,[1,1,1]],
  ["JP","Japan","Asia","burgundy",2,2,187,146,28,13,40,97.4,[2,2,2]],
  ["KR","South Korea","Asia","burgundy",2,2,187,146,28,13,40,97.4,[3,2,2]],
  ["AE","United Arab Emirates","MiddleEast","navy",2,8,187,146,28,13,40,97.4,[9,8,2]],
  ["SE","Sweden","Europe","burgundy",3,4,186,145,28,13,41,96.9,[3,4,3]],
  ["BE","Belgium","Europe","burgundy",4,4,185,144,28,13,42,96.4,[4,4,4]],
  ["DK","Denmark","Europe","burgundy",4,3,185,144,28,13,42,96.4,[4,3,4]],
  ["FI","Finland","Europe","burgundy",4,3,185,144,28,13,42,96.4,[3,3,4]],
  ["FR","France","Europe","burgundy",4,3,185,144,28,13,42,96.4,[2,3,4]],
  ["DE","Germany","Europe","burgundy",4,3,185,144,28,13,42,96.4,[2,3,4]],
  ["IE","Ireland","Europe","burgundy",4,3,185,144,28,13,42,96.4,[3,3,4]],
  ["IT","Italy","Europe","burgundy",4,3,185,144,28,13,42,96.4,[2,3,4]],
  ["LU","Luxembourg","Europe","burgundy",4,4,185,144,28,13,42,96.4,[3,4,4]],
  ["NL","Netherlands","Europe","burgundy",4,4,185,144,28,13,42,96.4,[3,4,4]],
  ["NO","Norway","Europe","burgundy",4,4,185,144,28,13,42,96.4,[4,4,4]],
  ["ES","Spain","Europe","burgundy",4,3,185,144,28,13,42,96.4,[2,3,4]],
  ["CH","Switzerland","Europe","burgundy",4,5,185,144,28,13,42,96.4,[4,5,4]],
  ["AT","Austria","Europe","burgundy",5,4,184,144,28,12,43,95.8,[3,4,5]],
  ["GR","Greece","Europe","burgundy",5,5,184,144,28,12,43,95.8,[6,5,5]],
  ["MT","Malta","Europe","burgundy",5,7,184,144,28,12,43,95.8,[7,7,5]],
  ["PT","Portugal","Europe","burgundy",5,4,184,144,28,12,43,95.8,[5,4,5]],
  ["HU","Hungary","Europe","burgundy",6,7,183,143,27,13,44,95.3,[7,7,6]],
  ["MY","Malaysia","Asia","green",6,11,183,143,27,13,44,95.3,[12,11,6]],
  ["PL","Poland","Europe","burgundy",6,7,183,143,27,13,44,95.3,[6,7,6]],
  ["GB","United Kingdom","Europe","burgundy",6,6,183,143,27,13,44,95.3,[4,6,6]],
  ["AU","Australia","Oceania","navy",7,7,182,142,27,13,45,94.8,[5,7,7]],
  ["CA","Canada","Americas","navy",7,8,182,142,27,13,45,94.8,[7,8,7]],
  ["CZ","Czechia","Europe","burgundy",7,7,182,142,27,13,45,94.8,[7,7,7]],
  ["LV","Latvia","Europe","burgundy",7,9,182,142,27,13,45,94.8,[10,9,7]],
  ["NZ","New Zealand","Oceania","navy",7,5,182,142,27,13,45,94.8,[4,5,7]],
  ["SK","Slovakia","Europe","burgundy",7,9,182,142,27,13,45,94.8,[10,9,7]],
  ["SI","Slovenia","Europe","burgundy",7,9,182,142,27,13,45,94.8,[10,9,7]],
  ["HR","Croatia","Europe","burgundy",8,9,181,141,27,13,46,94.3,[11,9,8]],
  ["EE","Estonia","Europe","burgundy",8,8,181,141,27,13,46,94.3,[9,8,8]],
  ["LI","Liechtenstein","Europe","burgundy",9,11,180,140,27,13,47,93.8,[12,11,9]],
  ["LT","Lithuania","Europe","burgundy",9,10,180,140,27,13,47,93.8,[9,10,9]],
  ["IS","Iceland","Europe","burgundy",10,10,179,140,27,12,48,93.2,[10,10,10]],
  ["US","United States","Americas","navy",10,10,31,24,5,2,196,16.1,[8,10,10]],
  ["BG","Bulgaria","Europe","burgundy",11,13,177,138,27,12,50,92.2,[14,13,11]],
  ["RO","Romania","Europe","burgundy",11,13,177,138,27,12,50,92.2,[14,13,11]],
  ["MC","Monaco","Europe","burgundy",12,13,176,137,26,13,51,91.7,[13,13,12]],
  ["CL","Chile","Americas","burgundy",13,14,174,136,26,12,53,90.6,[15,14,13]],
  ["CY","Cyprus","Europe","burgundy",13,12,35,27,5,3,192,18.2,[13,12,13]],
  ["HK","Hong Kong SAR","Asia","burgundy",13,17,35,27,5,3,192,18.2,[18,17,13]],
  ["AD","Andorra","Europe","burgundy",14,15,169,132,25,12,58,88.0,[17,15,14]],
  ["AR","Argentina","Americas","burgundy",15,16,168,131,25,12,59,87.5,[17,16,15]],
  ["BR","Brazil","Americas","navy",15,16,37,29,6,2,190,19.3,[17,16,15]],
  ["IL","Israel","MiddleEast","navy",16,18,166,129,25,12,61,86.5,[18,18,16]],
  ["SM","San Marino","Europe","burgundy",16,16,38,30,6,2,189,19.8,[16,16,16]],
  ["BB","Barbados","Americas","burgundy",17,20,163,127,24,12,64,84.9,[20,20,17]],
  ["BN","Brunei","Asia","green",17,19,39,30,6,3,188,20.3,[19,19,17]],
  ["BS","Bahamas","Americas","burgundy",18,21,158,123,24,11,69,82.3,[21,21,18]],
  ["KN","Saint Kitts and Nevis","Americas","burgundy",19,25,157,122,24,11,70,81.8,[23,25,19]],
  ["VC","Saint Vincent and the Grenadines","Americas","burgundy",19,24,41,32,6,3,186,21.4,[23,24,19]],
  ["MX","Mexico","Americas","burgundy",20,22,156,122,23,11,71,81.2,[22,22,20]],
  ["UY","Uruguay","Americas","burgundy",21,23,155,121,23,11,72,80.7,[23,23,21]],
  ["AG","Antigua and Barbuda","Americas","burgundy",22,26,154,120,23,11,73,80.2,[26,26,22]],
  ["SC","Seychelles","Africa","burgundy",22,24,43,34,6,3,184,22.4,[24,24,22]],
  ["VA","Vatican City","Europe","burgundy",23,25,151,118,23,10,76,78.6,[25,25,23]],
  ["CR","Costa Rica","Americas","burgundy",24,27,148,115,22,11,79,77.1,[27,27,24]],
  ["GD","Grenada","Americas","burgundy",25,29,147,115,22,10,80,76.6,[31,29,25]],
  ["MU","Mauritius","Africa","burgundy",25,27,46,36,7,3,181,24.0,[28,27,25]],
  ["PA","Panama","Americas","burgundy",25,28,46,36,7,3,181,24.0,[29,28,25]],
  ["DM","Dominica","Americas","burgundy",26,32,145,113,22,10,82,75.5,[32,32,26]],
  ["PY","Paraguay","Americas","burgundy",26,30,48,37,7,4,179,25.0,[31,30,26]],
  ["TT","Trinidad and Tobago","Americas","burgundy",26,28,49,38,7,4,178,25.5,[27,28,26]],
  ["LC","Saint Lucia","Americas","burgundy",27,30,144,112,22,10,83,75.0,[30,30,27]],
  ["UA","Ukraine","Europe","navy",28,29,142,111,21,10,85,74.0,[30,29,28]],
  ["MO","Macao SAR","Asia","burgundy",29,31,141,110,21,10,86,73.4,[32,31,29]],
  ["PE","Peru","Americas","burgundy",29,32,141,110,21,10,86,73.4,[33,32,29]],
  ["RS","Serbia","Europe","burgundy",30,34,135,105,20,10,92,70.3,[34,34,30]],
  ["TW","Taiwan","Asia","burgundy",31,33,134,105,20,9,93,69.8,[33,33,31]],
  ["GT","Guatemala","Americas","burgundy",32,36,132,103,20,9,95,68.8,[36,36,32]],
  ["SB","Solomon Islands","Oceania","navy",32,36,132,103,20,9,95,68.8,[37,36,32]],
  ["SV","El Salvador","Americas","burgundy",33,35,131,102,20,9,96,68.2,[35,35,33]],
  ["CO","Colombia","Americas","burgundy",34,37,130,101,20,9,97,67.7,[37,37,34]],
  ["HN","Honduras","Americas","burgundy",35,37,129,101,19,9,98,67.2,[38,37,35]],
  ["WS","Samoa","Oceania","navy",35,39,129,101,19,9,98,67.2,[39,39,35]],
  ["MH","Marshall Islands","Oceania","navy",36,40,127,99,19,9,100,66.1,[40,40,36]],
  ["TO","Tonga","Oceania","navy",36,39,127,99,19,9,100,66.1,[39,39,36]],
  ["ME","Montenegro","Europe","burgundy",37,40,126,98,19,9,101,65.6,[41,40,37]],
  ["MK","North Macedonia","Europe","burgundy",37,38,126,98,19,9,101,65.6,[41,38,37]],
  ["NI","Nicaragua","Americas","burgundy",38,41,125,98,19,8,102,65.1,[41,41,38]],
  ["TV","Tuvalu","Oceania","navy",38,41,125,98,19,8,102,65.1,[41,41,38]],
  ["KI","Kiribati","Oceania","navy",39,42,122,95,18,9,105,63.5,[42,42,39]],
  ["AL","Albania","Europe","burgundy",40,43,121,94,18,9,106,63.0,[43,43,40]],
  ["BA","Bosnia and Herzegovina","Europe","burgundy",40,42,121,94,18,9,106,63.0,[43,42,40]],
  ["GE","Georgia","Europe","navy",41,42,120,94,18,8,107,62.5,[44,42,41]],
  ["FM","Micronesia","Oceania","navy",41,42,120,94,18,8,107,62.5,[42,42,41]],
  ["PW","Palau","Oceania","navy",41,42,120,94,18,8,107,62.5,[42,42,41]],
  ["MD","Moldova","Europe","burgundy",42,44,119,93,18,8,108,62.0,[44,44,42]],
  ["VE","Venezuela","Americas","navy",43,45,116,90,17,9,111,60.4,[42,45,43]],
  ["RU","Russia","Europe","navy",44,46,113,88,17,8,114,58.9,[45,46,44]],
  ["TR","Türkiye","MiddleEast","navy",44,46,113,88,17,8,114,58.9,[45,46,44]],
  ["QA","Qatar","MiddleEast","navy",45,47,111,87,17,7,116,57.8,[46,47,45]],
  ["BZ","Belize","Americas","burgundy",46,49,100,78,15,7,127,52.1,[48,49,46]],
  ["ZA","South Africa","Africa","navy",46,48,100,78,15,7,127,52.1,[47,48,46]],
  ["KW","Kuwait","MiddleEast","navy",47,50,96,75,14,7,131,50.0,[49,50,47]],
  ["EC","Ecuador","Americas","burgundy",48,52,93,73,14,6,134,48.4,[51,52,48]],
  ["MV","Maldives","Asia","green",49,53,92,72,14,6,135,47.9,[52,53,49]],
  ["TL","Timor-Leste","Asia","burgundy",49,51,92,72,14,6,135,47.9,[50,51,49]],
  ["GY","Guyana","Americas","burgundy",50,54,88,69,13,6,139,45.8,[55,54,50]],
  ["BH","Bahrain","MiddleEast","navy",51,55,87,68,13,6,140,45.3,[57,55,51]],
  ["FJ","Fiji","Oceania","navy",51,55,87,68,13,6,140,45.3,[54,55,51]],
  ["SA","Saudi Arabia","MiddleEast","green",51,54,87,68,13,6,140,45.3,[56,54,51]],
  ["VU","Vanuatu","Oceania","navy",51,54,87,68,13,6,140,45.3,[53,54,51]],
  ["NR","Nauru","Oceania","navy",52,57,86,67,13,6,141,44.8,[55,57,52]],
  ["JM","Jamaica","Americas","burgundy",53,56,85,66,13,6,142,44.3,[55,56,53]],
  ["OM","Oman","MiddleEast","navy",54,56,84,66,13,5,143,43.8,[58,56,54]],
  ["PG","Papua New Guinea","Oceania","navy",54,58,84,66,13,5,143,43.8,[59,58,54]],
  ["CN","China","Asia","navy",55,60,82,64,12,6,145,42.7,[59,60,55]],
  ["BW","Botswana","Africa","navy",56,59,81,63,12,6,146,42.2,[56,59,56]],
  ["KOS","Kosovo","Europe","burgundy",56,61,81,63,12,6,146,42.2,[63,61,56]],
  ["KZ","Kazakhstan","Asia","burgundy",57,63,78,61,12,5,149,40.6,[64,63,57]],
  ["BY","Belarus","Europe","navy",58,62,77,60,12,5,150,40.1,[61,62,58]],
  ["BO","Bolivia","Americas","burgundy",58,64,77,60,12,5,150,40.1,[62,64,58]],
  ["TH","Thailand","Asia","navy",59,62,76,59,11,6,151,39.6,[60,62,59]],
  ["SR","Suriname","Americas","burgundy",60,64,75,58,11,6,152,39.1,[63,64,60]],
  ["NA","Namibia","Africa","navy",61,63,74,58,11,5,153,38.5,[61,63,61]],
  ["LS","Lesotho","Africa","navy",62,65,73,57,11,5,154,38.0,[63,65,62]],
  ["DO","Dominican Republic","Americas","burgundy",63,67,71,55,11,5,156,37.0,[66,67,63]],
  ["SZ","Eswatini","Africa","navy",63,66,71,55,11,5,156,37.0,[64,66,63]],
  ["MA","Morocco","Africa","green",63,67,71,55,11,5,156,37.0,[68,67,63]],
  ["ID","Indonesia","Asia","green",64,66,70,55,10,5,157,36.5,[65,66,64]],
  ["MW","Malawi","Africa","navy",64,67,70,55,10,5,157,36.5,[66,67,64]],
  ["KE","Kenya","Africa","navy",65,69,69,54,10,5,158,35.9,[66,69,65]],
  ["GM","Gambia","Africa","green",66,69,68,53,10,5,159,35.4,[69,69,66]],
  ["TZ","Tanzania","Africa","navy",66,70,68,53,10,5,159,35.4,[67,70,66]],
  ["AZ","Azerbaijan","Asia","green",67,68,67,52,10,5,160,34.9,[69,68,67]],
  ["GH","Ghana","Africa","navy",67,71,67,52,10,5,160,34.9,[72,71,67]],
  ["RW","Rwanda","Africa","navy",68,73,66,51,10,5,161,34.4,[75,73,68]],
  ["TN","Tunisia","Africa","burgundy",68,71,66,51,10,5,161,34.4,[71,71,68]],
  ["BJ","Benin","Africa","navy",69,71,65,51,10,4,162,33.9,[76,71,69]],
  ["PH","Philippines","Asia","burgundy",69,72,65,51,10,4,162,33.9,[73,72,69]],
  ["UG","Uganda","Africa","navy",69,71,65,51,10,4,162,33.9,[70,71,69]],
  ["AM","Armenia","Asia","navy",70,71,64,50,10,4,163,33.3,[72,71,70]],
  ["MN","Mongolia","Asia","navy",70,72,85,66,13,6,142,44.3,[76,72,70]],
  ["ZM","Zambia","Africa","navy",70,71,86,67,13,6,141,44.8,[70,71,70]],
  ["CV","Cape Verde","Africa","navy",71,71,63,49,9,5,164,32.8,[71,71,71]],
  ["SL","Sierra Leone","Africa","navy",72,72,62,48,9,5,165,32.3,[74,72,72]],
  ["ZW","Zimbabwe","Africa","navy",73,73,87,68,13,6,140,45.3,[75,73,73]],
  ["KG","Kyrgyzstan","Asia","burgundy",74,73,88,69,13,6,139,45.8,[76,73,74]],
  ["MZ","Mozambique","Africa","navy",74,74,88,69,13,6,139,45.8,[76,74,74]],
  ["UZ","Uzbekistan","Asia","green",74,74,88,69,13,6,139,45.8,[78,74,74]],
  ["ST","São Tomé and Príncipe","Africa","navy",75,75,89,69,13,7,138,46.4,[77,75,75]],
  ["TG","Togo","Africa","navy",76,76,90,70,14,6,137,46.9,[79,76,76]],
  ["BF","Burkina Faso","Africa","green",77,77,56,44,8,4,171,29.2,[80,77,77]],
  ["CU","Cuba","Americas","burgundy",77,76,91,71,14,6,136,47.4,[78,76,77]],
  ["IN","India","Asia","navy",77,77,91,71,14,6,136,47.4,[82,77,77]],
  ["SN","Senegal","Africa","green",77,77,92,72,14,6,135,47.9,[82,77,77]],
  ["DZ","Algeria","Africa","green",78,81,55,43,8,4,172,28.6,[84,81,78]],
  ["CI","Côte d'Ivoire","Africa","navy",78,77,93,73,14,6,134,48.4,[81,77,78]],
  ["GA","Gabon","Africa","navy",78,78,93,73,14,6,134,48.4,[80,78,78]],
  ["MG","Madagascar","Africa","navy",78,78,94,73,14,7,133,49.0,[80,78,78]],
  ["MR","Mauritania","Africa","green",78,79,94,73,14,7,133,49.0,[83,79,78]],
  ["NE","Niger","Africa","green",79,79,54,42,8,4,173,28.1,[83,79,79]],
  ["ML","Mali","Africa","green",80,81,95,74,14,7,132,49.5,[84,81,80]],
  ["TJ","Tajikistan","Asia","green",80,80,96,75,14,7,131,50.0,[82,80,80]],
  ["GQ","Equatorial Guinea","Africa","navy",81,80,52,41,8,3,175,27.1,[83,80,81]],
  ["GN","Guinea","Africa","green",81,79,97,76,15,6,130,50.5,[81,79,81]],
  ["TD","Chad","Africa","navy",82,83,98,76,15,7,129,51.0,[86,83,82]],
  ["KM","Comoros","Africa","green",83,83,50,39,8,3,177,26.0,[85,83,83]],
  ["GW","Guinea-Bissau","Africa","navy",83,82,99,77,15,7,128,51.6,[84,82,83]],
  ["EG","Egypt","Africa","navy",84,85,100,78,15,7,127,52.1,[87,85,84]],
  ["HT","Haiti","Americas","burgundy",84,83,101,79,15,7,126,52.6,[86,83,84]],
  ["JO","Jordan","MiddleEast","green",84,84,101,79,15,7,126,52.6,[84,84,84]],
  ["LR","Liberia","Africa","navy",84,84,101,79,15,7,126,52.6,[88,84,84]],
  ["AO","Angola","Africa","navy",85,86,48,37,7,4,179,25.0,[87,86,85]],
  ["BI","Burundi","Africa","navy",85,86,48,37,7,4,179,25.0,[89,86,85]],
  ["CF","Central African Republic","Africa","navy",85,84,48,37,7,4,179,25.0,[86,84,85]],
  ["VN","Vietnam","Asia","navy",85,84,48,37,7,4,179,25.0,[88,84,85]],
  ["BT","Bhutan","Asia","navy",86,84,47,37,7,3,180,24.5,[87,84,86]],
  ["KH","Cambodia","Asia","navy",86,83,47,37,7,3,180,24.5,[86,83,86]],
  ["CM","Cameroon","Africa","navy",86,85,47,37,7,3,180,24.5,[89,85,86]],
  ["CG","Congo","Africa","navy",87,86,46,36,7,3,181,24.0,[89,86,87]],
  ["DJ","Djibouti","Africa","green",88,87,45,35,7,3,182,23.4,[90,87,88]],
  ["LA","Laos","Asia","navy",88,86,45,35,7,3,182,23.4,[90,86,88]],
  ["TM","Turkmenistan","Asia","green",88,85,45,35,7,3,182,23.4,[89,85,88]],
  ["NG","Nigeria","Africa","green",89,88,44,34,7,3,183,22.9,[92,88,89]],
  ["CD","DR Congo","Africa","navy",90,90,43,34,6,3,184,22.4,[91,90,90]],
  ["LB","Lebanon","MiddleEast","green",90,89,43,34,6,3,184,22.4,[92,89,90]],
  ["ET","Ethiopia","Africa","navy",91,88,42,33,6,3,185,21.9,[91,88,91]],
  ["MM","Myanmar","Asia","green",91,88,42,33,6,3,185,21.9,[92,88,91]],
  ["SS","South Sudan","Africa","green",92,90,41,32,6,3,186,21.4,[93,90,92]],
  ["SD","Sudan","Africa","green",92,92,41,32,6,3,186,21.4,[94,92,92]],
  ["LY","Libya","Africa","green",93,95,39,30,6,3,188,20.3,[98,95,93]],
  ["LK","Sri Lanka","Asia","navy",93,91,39,30,6,3,188,20.3,[93,91,93]],
  ["ER","Eritrea","Africa","green",94,94,38,30,6,2,189,19.8,[95,94,94]],
  ["IR","Iran","MiddleEast","green",94,91,38,30,6,2,189,19.8,[94,91,94]],
  ["PS","Palestine","MiddleEast","green",94,94,38,30,6,2,189,19.8,[97,94,94]],
  ["BD","Bangladesh","Asia","green",95,94,36,28,5,3,191,18.8,[97,94,95]],
  ["NP","Nepal","Asia","navy",96,95,35,27,5,3,192,18.2,[98,95,96]],
  ["KP","North Korea","Asia","navy",96,93,35,27,5,3,192,18.2,[96,93,96]],
  ["SO","Somalia","Africa","green",97,96,32,25,5,2,195,16.7,[99,96,97]],
  ["PK","Pakistan","Asia","green",98,96,31,24,5,2,196,16.1,[100,96,98]],
  ["YE","Yemen","MiddleEast","green",98,96,31,24,5,2,196,16.1,[100,96,98]],
  ["IQ","Iraq","MiddleEast","green",99,97,29,23,4,2,198,15.1,[101,97,99]],
  ["SY","Syria","MiddleEast","green",100,98,26,20,4,2,201,13.5,[102,98,100]],
  ["AF","Afghanistan","Asia","green",101,99,23,18,3,2,204,12.0,[103,99,101]],
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
