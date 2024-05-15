/** api */
const headers = {
    'Authorization': 'Basic ZGl0cmF2b3llYnNwOmRpdHJhMzQhdm8u',
    'Content-Type': 'application/json'
};

function postRequest(url, body) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
}

/** util */
const stationsData = {
    "Adana": 234518376,
    "Adapazarı": 234515952,
    "Adnanmenderes Havaalanı": 234516881,
    "Afyon A.Çetinkaya": 234518802,
    "Ahmetli": 234516859,
    "Akgedik": 234517945,
    "Akhisar": 234516860,
    "Aksakal": 234516861,
    "Akçamağara": 234517944,
    "Akşehir": 234518804,
    "Alayunt": 234518806,
    "Alayunt Müselles": 234518807,
    "Alaşehir": 234516863,
    "Aliköy": 234518974,
    "Alpu": 234516251,
    "Alpullu": 234519116,
    "Alöve": 234518808,
    "Amasya": 234517458,
    "Ankara Gar": 234516259,
    "Argıthan": 234518809,
    "Arifiye": 234515954,
    "Artova": 234517459,
    "Arıkören": 234518380,
    "Atça": 234516868,
    "Avşar": 234517462,
    "Aydın": 234516869,
    "Ayrancı": 234518382,
    "Ayvacık": 234516870,
    "Aşkale": 234517461,
    "Bahçeli (Km.755+290 S)": 234517326,
    "Bahçıvanova": 234519132,
    "Bakır": 234517013,
    "Balıkesir": 234516871,
    "Balıkesir (Gökköy)": 13467491150,
    "Balıköy": 234518812,
    "Balışıh": 234516266,
    "Banaz": 234516872,
    "Bandırma Şehir": 234516874,
    "Baraklı": 234518814,
    "Baskil": 234517947,
    "Batman": 234517948,
    "Battalgazi": 234518068,
    "Bağıştaş": 234517463,
    "Bedirli": 234517465,
    "Belemedik": 234518385,
    "Beylikköprü": 234516142,
    "Beylikova": 234516149,
    "Beşiri": 234518052,
    "Bilecik": 234515958,
    "Bilecik YHT": 12030322511,
    "Bismil": 234518054,
    "Biçer": 234516145,
    "Bor": 234516272,
    "Bostankaya": 234517469,
    "Bozkurt": 234518817,
    "Bozüyük": 234515961,
    "Bozüyük YHT": 12030322514,
    "Boğazköprü": 234516270,
    "Boğazköy": 234517468,
    "Buharkent": 234516882,
    "Büyükderbent YHT": 22060529250,
    "Caferli": 234516274,
    "Cürek": 234517475,
    "Dazkırı": 234518830,
    "Demirdağ": 234517488,
    "Demiriz": 234518059,
    "Demirözü": 234518977,
    "Denizli": 234516893,
    "Derince YHT": 12030322503,
    "Değirmenözü": 234518831,
    "Diliskelesi YHT": 18940369700,
    "Dinar": 234518835,
    "Divriği": 234517491,
    "Diyarbakır": 234518062,
    "Dumlupınar": 234518837,
    "Durak": 234518396,
    "Dursunbey": 234518838,
    "Döğer": 234518836,
    "ERYAMAN YHT": 15224209550,
    "Edirne": 234519130,
    "Elmadağ": 234516288,
    "Emiralem": 234516899,
    "Erbaş": 234517493,
    "Ereğli": 234518397,
    "Ergani": 234518067,
    "Eriç": 234517494,
    "Erzincan": 234517496,
    "Erzurum": 234517498,
    "Eskişehir": 234516254,
    "Evciler": 234518842,
    "Eşme": 234517001,
    "Fırat": 234518069,
    "Gaziemir": 234517003,
    "Gazlıgöl": 234518951,
    "Gebze": 234515972,
    "Germencik": 234517005,
    "Germiyan": 234517604,
    "Gezin": 234518073,
    "Goncalı": 234517006,
    "Goncalı Müselles": 234517007,
    "Gökçedağ": 234518844,
    "Gökçekısık": 234518845,
    "Gölcük": 234518075,
    "Göçentaşı": 234517470,
    "Güllübağ": 234517610,
    "Gümüş": 234518503,
    "Gümüşgün": 234518848,
    "Gündoğan": 15672248500,
    "Güneş": 234517611,
    "Güzelbeyli": 234517772,
    "Hacıbayram": 234517612,
    "Hacıkırı": 234518505,
    "Hacırahmanlı": 234517011,
    "Hasankale": 234517616,
    "Havza": 234517617,
    "Hekimhan": 234518078,
    "Hereke YHT": 12030322501,
    "Himmetdede": 234516406,
    "Horasan": 234517620,
    "Horozköy": 234517015,
    "Horsunlu": 234517016,
    "Hüyük": 234516408,
    "Ilgın": 234518953,
    "Ilıca": 234517627,
    "Irmak": 234516414,
    "Isparta": 234518955,
    "Ispartakule": 234519137,
    "Kabakça": 234519139,
    "Kadınhan": 234518959,
    "Kaklık": 234518960,
    "Kalın": 234517623,
    "Kandilli": 234517625,
    "Kanlıca": 234516418,
    "Kapaklı": 234517023,
    "Karaali": 234517026,
    "Karaağaçlı": 234517025,
    "Karaisalıbucağı": 234518514,
    "Karakuyu": 234518961,
    "Karalar": 234516423,
    "Karaman": 234518516,
    "Karaosman": 234516422,
    "Karasenir": 234516425,
    "Karasu": 234517631,
    "Karaurgan": 234517632,
    "Karaözü": 234517629,
    "Kars": 234517635,
    "Kavak": 234517636,
    "Kavaklıdere": 234516895,
    "Kayabaşı": 234517637,
    "Kayabeyli": 234519140,
    "Kayaş": 234516429,
    "Kayseri": 234516430,
    "Kayseri (İncesu)": 234516411,
    "Kayışlar": 234517029,
    "Kaşınhan": 234518518,
    "Kemah": 234517638,
    "Kemaliye Çaltı": 234517478,
    "Kemerhisar": 234516432,
    "Keçiborlu": 234518964,
    "Kireç": 234518968,
    "Km.102+600": 234517941,
    "Km.139+500": 234518220,
    "Km.286+500": 234517938,
    "Konaklar": 234517033,
    "Konya": 234518520,
    "Konya (Selçuklu YHT)": 16942718500,
    "Kunduz": 234517649,
    "Kurfallı": 234519146,
    "Kurtalan": 234518089,
    "Kuyucak": 234517038,
    "Kuşcenneti": 234516883,
    "Kuşsarayı": 234518051,
    "Köprüköy": 234517648,
    "Köşk": 234517037,
    "Kürk": 234518092,
    "Kütahya": 234518973,
    "Kırkağaç": 234517031,
    "Kırıkkale": 234516436,
    "Kırıkkale YHT": 34026520100,
    "Kızoğlu": 234517643,
    "Kızılca": 234517641,
    "Ladik": 234517751,
    "Lüleburgaz": 234519148,
    "Maden": 234518094,
    "Malatya": 234518095,
    "Manisa": 234517039,
    "Mazlumlar": 234518978,
    "Menderes": 234516884,
    "Menemen": 234517041,
    "Mercan": 234517785,
    "Mezitler": 234518982,
    "Meşelidüz": 234517754,
    "Mithatpaşa": 234516100,
    "Muradiye": 234517042,
    "Muratlı": 234519251,
    "Nazilli": 234517045,
    "Niğde": 234516554,
    "Nusrat": 234518984,
    "Ortaklar": 234517049,
    "Osmancık": 234518676,
    "Oturak": 234517150,
    "Ovasaray": 234517758,
    "Palandöken": 234517759,
    "Pamukören": 234517004,
    "Pancar": 234517154,
    "Pehlivanköy": 234519254,
    "Piribeyler": 234518988,
    "Polatlı": 234516557,
    "Polatlı YHT": 234516719,
    "Porsuk": 234518989,
    "Pozantı": 234518536,
    "Pınarlı": 234518207,
    "Sabuncupınar": 234518991,
    "Salat": 234518208,
    "Salihli": 234517158,
    "Sallar": 234518209,
    "Sandal": 234517600,
    "Sapanca": 234516106,
    "Sarayköy": 234517159,
    "Sarayönü": 234518993,
    "Saruhanlı": 234517161,
    "Sarıkamış": 234517769,
    "Sarıkent": 234516278,
    "Sarıoğlan": 234517768,
    "Savaştepe": 234517162,
    "Sağlık": 234517156,
    "Sekili": 234516562,
    "Selçuk": 234517164,
    "Sincan": 234516563,
    "Sinekli": 234519258,
    "Sivas": 234517773,
    "Sivas(Adatepe)": 234517762,
    "Sivrice": 234518216,
    "Soma": 234517167,
    "Soğucak": 234517166,
    "Subaşı": 234517776,
    "Sudurağı": 234518540,
    "Sultandağı": 234518999,
    "Sultanhisar": 234517169,
    "Suluova": 234517777,
    "Susurluk": 234517170,
    "Süngütaşı": 234517775,
    "Sünnetçiler": 234517195,
    "Sütlaç": 234519101,
    "Tanyeri": 234517780,
    "Tavşanlı": 234519102,
    "Tayyakadın": 234519275,
    "Tecer": 234517783,
    "Tepeköy": 234517178,
    "Tokat(Yeşilyurt)": 234517756,
    "Topdağı": 234517796,
    "Topulyurdu": 234517901,
    "Torbalı": 234517181,
    "Turgutlu": 234517183,
    "Turhal": 234517787,
    "Ulam": 234518223,
    "Uluköy": 234519106,
    "Ulukışla": 234518654,
    "Uluova": 234518225,
    "Umurlu": 234517186,
    "Urganlı": 234517187,
    "Uzunköprü": 234519261,
    "Uşak": 234517188,
    "Velimeşe": 234519262,
    "Yahşihan": 234516576,
    "Yahşiler": 234517341,
    "Yarımca YHT": 12030322502,
    "Yaylıca": 234518202,
    "Yazıhan": 234518226,
    "Yağdonduran": 11783483650,
    "Yeni Karasar": 11783483651,
    "Yenice": 234518658,
    "Yenice D": 234517910,
    "Yenifakılı": 234516292,
    "Yenikangal": 234517452,
    "Yeniköy": 234517191,
    "Yeniçubuk": 234517603,
    "Yerköy": 234516580,
    "Yeşilhisar": 234516582,
    "Yolçatı": 234518227,
    "Yozgat YHT": 34026520101,
    "Yunusemre": 234516147,
    "Yıldırımkemal": 234519108,
    "Yıldızeli": 234517797,
    "Zile": 234517798,
    "Çadırkaya": 234517761,
    "Çakmak": 234518391,
    "Çalıköy": 234516885,
    "Çamlık": 234516886,
    "Çardak": 234518823,
    "Çatalca": 234519124,
    "Çavuşcugöl": 234518824,
    "Çay": 234518825,
    "Çerikli": 234516283,
    "Çerkezköy": 234519126,
    "Çetinkaya": 234517483,
    "Çiftehan": 234518392,
    "Çizözü": 234517309,
    "Çiğli": 234516889,
    "Çobanhasan": 234516890,
    "Çorlu": 234519127,
    "Çukurbük": 234517485,
    "Çukurhüseyin": 234516892,
    "Çumra": 234518394,
    "Çöltepe": 234518057,
    "Çöğürler": 234518828,
    "İhsaniye": 234518956,
    "İliç": 234517622,
    "İnay": 234517018,
    "İncirliova": 234517019,
    "İsabeyli": 234517020,
    "İshakçelebi": 234517021,
    "İstanbul(Bakırköy)": 15917493900,
    "İstanbul(Bostancı)": 15917435910,
    "İstanbul(Halkalı)": 234519135,
    "İstanbul(Pendik)": 234516104,
    "İstanbul(Söğütlüçeşme)": 15917435912,
    "İzmir (Basmane)": 234516875,
    "İzmit YHT": 12030322504,
    "Şarkışla": 234517779,
    "Şefaatli": 234516565,
    "Şefkat": 234518219,
    "Şehitlik": 234518542
}
function loadStations() {
    return stationsData;
}

function formatDate(date) {
    const parsedDate = new Date(date);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return parsedDate.toLocaleDateString('en-US', options);
}

/** config */
var config = {
    // Journey details
    binisIstasyonAdi: "İstanbul(Söğütlüçeşme)",
    inisIstasyonAdi: "Ankara Gar",
    date: "2024-05-15",

    // If you want to check all journeys in a given date/day, set to false. 
    // Else set to true and give a specific valid journey hour.
    checkSpecificHour: false,
    hour: "08:02",

    // Wait time between checks in seconds
    sleepTime: 10
};

/** setupConfig */


/** functions */
const stations = loadStations();
const seferUrl = "https://api-yebsp.tcddtasimacilik.gov.tr/sefer/seferSorgula";
const vagonUrl = "https://api-yebsp.tcddtasimacilik.gov.tr/vagon/vagonHaritasindanYerSecimi";

function getSelectedHours() {
    const checkboxes = document.querySelectorAll('#hourChoices input[type="checkbox"]:checked');
    const selectedHours = Array.from(checkboxes).map(checkbox => checkbox.value);
    console.log("Selected hours:", selectedHours); // Debugging: Output selected values to console
    document.getElementById("result").innerHTML += "Selected hours: " + selectedHours + "<br />";
    return selectedHours;
}

async function fetchAndFilterJourneys() {
    getSelectedHours();
    const body = {
        kanalKodu: 3,
        dil: 0,
        seferSorgulamaKriterWSDVO: {
            satisKanali: 3,
            binisIstasyonu: config.binisIstasyonAdi,
            inisIstasyonu: config.inisIstasyonAdi,
            binisIstasyonId: stations[config.binisIstasyonAdi],
            inisIstasyonId: stations[config.inisIstasyonAdi],
            binisIstasyonu_isHaritaGosterimi: false,
            inisIstasyonu_isHaritaGosterimi: false,
            seyahatTuru: 1,
            gidisTarih: `${formatDate(config.date)} 00:00:00 AM`,
            bolgeselGelsin: false,
            islemTipi: 0,
            yolcuSayisi: 1,
            aktarmalarGelsin: true,
        }
    };

    const response = await postRequest(seferUrl, body);
    
    if (response && response.cevapBilgileri.cevapKodu === '000') {
        const selectedHours = getSelectedHours();

        response.seferSorgulamaSonucList.forEach(sefer => {
            const seferTime = new Date(sefer.binisTarih);
            const seferTimeString = `${seferTime.getHours().toString().padStart(2, '0')}:${seferTime.getMinutes().toString().padStart(2, '0')}`;

            if (selectedHours.includes(seferTimeString)) {
                checkSefer(sefer);
            }
        });
    }
    if (!found) { document.getElementById("result").innerHTML = '';}
}

var logInner = document.getElementById("log").innerHTML

function checkSefer(sefer) {
    console.log(`Checking for time: ${sefer.binisTarih}`);
    sefer.vagonTipleriBosYerUcret.forEach(vagon => {
        vagon.vagonListesi.forEach(vagonDetail => {
            const vagonSiraNo = vagonDetail.vagonSiraNo;
            console.log(`Checking for vagon: ${vagonSiraNo}`);
            logInner = `Checking for vagon: ${vagonSiraNo} for journey at ${sefer.binisTarih} <br />`;
            checkSpecificSeats(sefer.seferId, vagonSiraNo, sefer.trenAdi, sefer.binisTarih);
        });
    });
}

var audio = new Audio('http://tastyspleen.net/~quake2/baseq2/sound/misc/firebell.wav');

async function checkSpecificSeats(seferId, vagonSiraNo, trenAdi, binisTarih) {
    const body = {
        kanalKodu: "3",
        dil: 0,
        seferBaslikId: seferId,
        vagonSiraNo: vagonSiraNo,
        binisIst: config.binisIstasyonAdi,
        InisIst: config.inisIstasyonAdi
    };

    const response = await postRequest(vagonUrl, body);
    const data = response;

    if (data.cevapBilgileri.cevapKodu === '000') {
        data.vagonHaritasiIcerikDVO.koltukDurumlari.forEach(seat => {
            if (seat.durum === 0) { // Available
                if (!seat.koltukNo.endsWith('h')) { // Not Handicapped
                    console.log(`Available seat: ${seat.koltukNo} in Wagon ${vagonSiraNo}`);
                    document.getElementById("result").innerHTML += `Available seat: ${seat.koltukNo} in Wagon ${vagonSiraNo} on ${binisTarih}<br/>`;
                    found = true;
                    audio.play();
                } else { // Handicapped
                    console.log(`Available handicapped seat: ${seat.koltukNo} in Wagon ${vagonSiraNo}`);
                }
            }
        });
    }
}

/** page */

// Load options for station selects on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const stationsData = loadStations();
    const binisSelect = document.getElementById('binisIstasyonAdi');
    const inisSelect = document.getElementById('inisIstasyonAdi');

    // Convert object keys to an array and iterate
    Object.keys(stationsData).forEach(stationName => {
        const option = new Option(stationName, stationName);
        binisSelect.options.add(option);
        inisSelect.options.add(option.cloneNode(true));  // Clones the option node for the second select
    });
    binisSelect.value = config.binisIstasyonAdi;
    inisSelect.value = config.inisIstasyonAdi;

    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    var day = String(tomorrow.getDate()).padStart(2, '0');
    var month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    var year = tomorrow.getFullYear();

    var dateStr = `${year}-${month}-${day}`; 
    document.getElementById('date').value = dateStr;

    prefetchForHours();
    document.getElementById('binisIstasyonAdi').addEventListener('change', prefetchForHours);
    document.getElementById('inisIstasyonAdi').addEventListener('change', prefetchForHours);
    document.getElementById('date').addEventListener('change', prefetchForHours);
});


async function prefetchForHours() {
    const hourContainer = document.getElementById('hourChoices');
    hourContainer.innerHTML = ''; // Clear previous checkboxes

    config = {
        binisIstasyonAdi: document.getElementById('binisIstasyonAdi').value,
        inisIstasyonAdi: document.getElementById('inisIstasyonAdi').value,
        date: document.getElementById('date').value,
        sleepTime: parseInt(document.getElementById('sleepTime').value, 10)
    };
    console.log('Configuration updated:', config);
    toggleLoading('hourChoices');
    const body = {
        kanalKodu: 3,
        dil: 0,
        seferSorgulamaKriterWSDVO: {
            satisKanali: 3,
            binisIstasyonu: config.binisIstasyonAdi,
            inisIstasyonu: config.inisIstasyonAdi,
            binisIstasyonId: stations[config.binisIstasyonAdi],
            inisIstasyonId: stations[config.inisIstasyonAdi],
            binisIstasyonu_isHaritaGosterimi: false,
            inisIstasyonu_isHaritaGosterimi: false,
            seyahatTuru: 1,
            gidisTarih: `${formatDate(config.date)} 00:00:00 AM`,
            bolgeselGelsin: false,
            islemTipi: 0,
            yolcuSayisi: 1,
            aktarmalarGelsin: true,
        }
    };
    console.log(body);
    const response = await postRequest(seferUrl, body);
    toggleLoading('hourChoices');
    if (response && response.cevapBilgileri && response.cevapBilgileri.cevapKodu === '000') {
        updateHourDropdown(response.seferSorgulamaSonucList);
    } else {
        const hourContainer = document.getElementById('hourChoices');
        hourContainer.innerHTML = "Station pair does not have any available journey.<br/>Check your preferences and try again.";
    }
}

function updateHourDropdown(journeys) {
    const hourContainer = document.getElementById('hourChoices');
    hourContainer.innerHTML = ''; // Clear previous checkboxes

    const times = journeys.map(journey => {
        const seferTime = new Date(journey.binisTarih);
        return seferTime.toTimeString().substring(0, 5); // "HH:MM" format
    }).sort((a, b) => a.localeCompare(b)); // Sort times

    [...new Set(times)].forEach(time => { // Remove duplicates and add checkboxes
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = time;
        checkbox.name = 'hour';
        checkbox.value = time;

        const label = document.createElement('label');
        label.htmlFor = time;
        label.appendChild(document.createTextNode(time));

        const wrapper = document.createElement('div');
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);

        hourContainer.appendChild(wrapper);
    });
}

function toggleLoading(elementId) {
    const container = document.getElementById(elementId);
    // Check if the loader already exists
    const existingLoader = container.querySelector('.loader');

    if (existingLoader) {
        // If loader exists, remove it
        container.removeChild(existingLoader);
    } else {
        // Create a new loader element and append it to the container
        const loader = document.createElement('div');
        loader.className = 'loader';
        container.appendChild(loader);
    }
}

var found = false;

async function runFinder(){
    found = false
    config = {
        binisIstasyonAdi: document.getElementById('binisIstasyonAdi').value,
        inisIstasyonAdi: document.getElementById('inisIstasyonAdi').value,
        date: document.getElementById('date').value,
        sleepTime: parseInt(document.getElementById('sleepTime').value, 10)
    };
    console.log('Configuration updated:', config);

    const selectedHours = getSelectedHours();
    if (selectedHours.length == 0) { alert("Please select one or more hours"); return; }

    toggleLoading('find-seat-button');
    while (!found) {
        console.log('Searching...');
        document.getElementById("result").innerHTML += 'Searching...<br />';
        await fetchAndFilterJourneys();
    }
    toggleLoading('find-seat-button');
    for (let i = 0; i < 5; i++) {
        setTimeout(function() {
            audio.play();
        }, 4000 * i);
    }
    
}