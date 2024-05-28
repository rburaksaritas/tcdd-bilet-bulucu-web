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
let stationsData = {};

async function fetchStationsData() {
    const url = "https://api-yebsp.tcddtasimacilik.gov.tr/istasyon/istasyonYukle";
    const body = {
        "kanalKodu": "3",
        "dil": 1,
        "tarih": "Nov 10, 2011 12:00:00 AM",
        "satisSorgu": true
    };
    
    const response = await postRequest(url, body);
    if (response && response.istasyonBilgileriList) {
        stationsData = response.istasyonBilgileriList.reduce((acc, station) => {
            acc[station.istasyonAdi] = station.istasyonId;
            return acc;
        }, {});
        console.log('Station data is updated.');
        return stationsData;
    } else {
        console.error('Failed to fetch station data:', response);
    }
}


async function loadStations() {
    if (Object.keys(stationsData).length === 0) {
        const url = "https://api-yebsp.tcddtasimacilik.gov.tr/istasyon/istasyonYukle";
        const body = {
            "kanalKodu": "3",
            "dil": 1,
            "tarih": "Nov 10, 2011 12:00:00 AM",
            "satisSorgu": true
        };
    
        const response = await postRequest(url, body);
        if (response && response.istasyonBilgileriList) {
            stationsData = response.istasyonBilgileriList.reduce((acc, station) => {
                acc[station.istasyonAdi] = station.istasyonId;
                return acc;
            }, {});
            console.log('Station data is updated.');
        } else {
            console.error('Failed to fetch station data:', response);
        }
    }
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


/** functions */
loadStations();
const stations = stationsData;
const seferUrl = "https://api-yebsp.tcddtasimacilik.gov.tr/sefer/seferSorgula";
const vagonUrl = "https://api-yebsp.tcddtasimacilik.gov.tr/vagon/vagonHaritasindanYerSecimi";

function getSelectedHours() {
    const checkboxes = document.querySelectorAll('#hourChoices input[type="checkbox"]:checked');
    const selectedHours = Array.from(checkboxes).map(checkbox => checkbox.value);
    console.log("Selected hours:", selectedHours);
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
document.addEventListener('DOMContentLoaded', async function() {
    const stationsData = await loadStations();
    const binisSelect = document.getElementById('binisIstasyonAdi');
    const inisSelect = document.getElementById('inisIstasyonAdi');

    Object.keys(stationsData).forEach(stationName => {
        const option = new Option(stationName, stationName);
        binisSelect.options.add(option);
        inisSelect.options.add(option.cloneNode(true)); 
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

// To dynamically update the hour selection based on the preferences
async function prefetchForHours() {
    const hourContainer = document.getElementById('hourChoices');
    hourContainer.innerHTML = ''; 

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

// To format and update selections
function updateHourDropdown(journeys) {
    const hourContainer = document.getElementById('hourChoices');
    hourContainer.innerHTML = '';

    const times = journeys.map(journey => {
        const seferTime = new Date(journey.binisTarih);
        return seferTime.toTimeString().substring(0, 5); // "HH:MM" format
    }).sort((a, b) => a.localeCompare(b)); // Sort times

    [...new Set(times)].forEach(time => {
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
    const existingLoader = container.querySelector('.loader');

    if (existingLoader) {
        container.removeChild(existingLoader);
    } else {
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
        sleepTime: parseInt(document.getElementById('sleepTime').value, 15)
    };

    const selectedHours = getSelectedHours();
    if (selectedHours.length == 0) { alert("Please select one or more hours"); return; }

    toggleLoading('find-seat-button');
    while (!found) {
        console.log('Searching...');
        document.getElementById("result").innerHTML += 'Searching...<br />';
        await fetchAndFilterJourneys();
    }
    toggleLoading('find-seat-button');
    for (let i = 0; i < 4; i++) {
        setTimeout(function() {
            audio.play();
        }, 4000 * i);
    }
    
}
