var fetchBtnClicked = 0;


/**
 * Add Eventlisteners to accordion elements
 * (start with a + sign)
 * so that they can open/close when clicked
 */
function addAccordionEventListeners (){
    var acc = document.getElementsByClassName("entry_as_accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.style.opacity = 0;
        } else {
          //panel.style.maxHeight = panel.scrollHeight + "px";
          //panel.style.maxHeight = 100 + "em";
          panel.style.maxHeight = Math.max(panel.scrollHeight, 1200) + "px";
          panel.style.opacity = 1;
        } 
      });
    }
}


/**
 * Tab Control for Coding Examples
 * Makes the selected tab visible
 */
function openTabContent(evt, tabId) {
    let i, tabContents, tablinks;

    // HIDE
    // Hide content of ALL tabs
    tabContents = document.getElementsByClassName("tabClass");
    Array.from(tabContents).forEach((tabCont) => {
        //tabCont.classList.remove("tabShow");
        tabCont.style.display = "none";
        //tabCont.style.opacity = 0;
    })
    // Remove "teal" border of ALL tablinks
    tablinks = document.getElementsByClassName("tablink");
    Array.from(tablinks).forEach((tablink) => {
        tablink.classList.remove("w3-border-teal");
        tablink.classList.remove("w3-text-teal");
    })

    // SHOW
    // Show selected tab content 
    const selectedTab = document.querySelector("#" + tabId);
    if (selectedTab){
        //selectedTab.classList.add("tabShow");
        selectedTab.style.display = "block";
        //selectedTab.style.opacity = 1;
    }
    // Add "teal" bottom border to selected tablink
    const tablinksUnderCurrentTab = evt.currentTarget.getElementsByClassName("tablink");
    if (tablinksUnderCurrentTab) {
        tablinksUnderCurrentTab[0].classList.add("w3-border-teal")
        tablinksUnderCurrentTab[0].classList.add("w3-text-teal")
    }
  }


/**
 * Select the tab with id="openTabAtStart" 
 * under Coding Examples
 */
function selectDefaultTab(){
    // Select the coding example Tab to show at start
    const defaultTab = "openTabAtStart";
    const defaultTabTag = document.querySelector("#" + defaultTab);
    if (defaultTabTag){defaultTabTag.click()}
}

/**
 * Toggle ShowHide for detailed descriptions
 * @param {*} obj 
 */
function ShowHide(obj) {
    obj.classList.toggle("w3-show")
  }
  

/**
 * Change the language of the CV
 * by changing the "lang" attribute of the document's body
 * @param {*} lang 
 */
function changeLang(lang){
    document.body.setAttribute('lang', lang.value);
}

/**
 * Change the language of the CV to the default language
 * by selecting the country flag. 
 * Clicking a flag triggers changeLang() too.
 * Change lang to the User's browser language.
 */
function setDefaultLanguage (){
    function changeToBrowserLanguage(){
        // Get browser language
        const getNavigatorLanguage = () => {
            if (navigator.languages && navigator.languages.length) {
                return navigator.languages[0];
            } else {
                return navigator.userLanguage || 
                navigator.language || 
                navigator.browserLanguage || 
                'en-US'; // If all other fails, return English
            }
        };
        // Select the same language as that of the browser by clicking on the corresponding flag.
        //const browserLang = getNavigatorLanguage().trim().split("-").shift().toLowerCase(); // Get first/prefered language.
        const browserLang = getNavigatorLanguage().trim().substring(0,2).toLowerCase(); // Get first/prefered language.
        const flagTag = document.querySelector("input[name=countryFlags][value='" + browserLang + "']");
         // If country flag corresponding the browser language found, click it.
         if (flagTag){flagTag.click()}
    }

    // Set document's language to the default
    const defaultLang = "se";
    const defLangFlag = document.querySelector("input[name=countryFlags][value='" + defaultLang + "']");    
    if (defLangFlag){ 
        defLangFlag.click(); // The default language's flag found, click it.
    } else { // Set document's language anyway.
        changeLang({value:defaultLang});
    }

    // Change document's language to User's browser language
    changeToBrowserLanguage();
}

function deleteFetchBtn(){
    const buttonElement = document.getElementById("fetchAllDetails");
    if(buttonElement){buttonElement.remove();}
}

/**
 * Fill in personal data (email, phone, etc.)
 */
function fillInMyData(DriveData={}){
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
      
            input = Base64._utf8_encode(input);
      
            while (i < input.length) {
      
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
      
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
    
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
      
                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      
            }
      
            return output;
        },
      
      
        decode: function(input) {
            if (!input || input.trim().length == 0){return ""}

            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
      
            input = input.trim().replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
            while (i < input.length) {
    
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
      
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
      
                output = output + String.fromCharCode(chr1);
      
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
      
            }
    
            output = Base64._utf8_decode(output);
      
            return output;
      
        },
      
        _utf8_encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
      
            for (var n = 0; n < string.length; n++) {
    
                var c = string.charCodeAt(n);
    
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
    
            }
    
            return utftext;
        },
      
        _utf8_decode: function(utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
      
            while (i < utftext.length) {
    
                c = utftext.charCodeAt(i);
    
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    /* 
        No data from Drive! 
        use default data instead. 
    */
    //DriveData = {} // For testing the case when we have no data from Drive
    var defaultContactInfo = {
        "nev": {"default":"UGV0ZXIgVmFzaQ=="},
        "lakcim":{"default":"Qm9kZW4sIE5vcnJib3R0ZW4="}
    }    
    if (Object.keys(DriveData).length == 0){
        // Scan document span elements for lng values, make a Set with unique values
        let languagesInDoc = new Set();
        document.querySelectorAll('span[lang]').forEach(e=>languagesInDoc.add(e["lang"]));
        // Fill up DriveData with default values
        for (let [key, val] of Object.entries(defaultContactInfo)){
            DriveData[key] = {};
            languagesInDoc.forEach(lang => DriveData[key][lang]=val["default"])
        }
        console.log("No data from Drive, default data used: ", DriveData);
    }

    /**
     * Fill in Contact Info spans from DriveData
    */
    for (let [key, langDataObj] of Object.entries(DriveData)) {
        const contactInfoElement = document.getElementById(key);
        if(contactInfoElement){
            contactInfoElement.querySelectorAll('span[lang]').forEach(span => {
                let decodedString = "";
                    try{
                        decodedString = Base64.decode(langDataObj[span["lang"]]);
                    }
                    catch(err){
                        decodedString = "-";
                    }
                    span.innerHTML = decodedString;
                    contactInfoElement.classList.remove("w3-hide");
            });    
        }
    }
    /**
     * Delete the "fetchAllDetails" button if all p elements are visible,
     * meaning all contact info have been retrieved already.
     */
    if(!document.querySelector(".contact-info.w3-hide")){deleteFetchBtn()}
}

/**
 * Fetch data from Drive as text
 * clip the json part,
 * parse JSON,
 * extract data,
 * fill into contact info span tags.
 * @param {*} queryString 
 * @returns 
 */
function fetchDataFromDrive(queryString) {
    fetchBtnClicked += 1;
    const buttonElement = document.getElementById("fetchAllDetails");
    if(buttonElement){buttonElement.disabled='true';}
    if (fetchBtnClicked > 3){
        console.log("fetch btn clicked: ", fetchBtnClicked, "times. No more fetch!");
        deleteFetchBtn();
        return;
    };
    const apiKey = "AIzaSyC4gIYEKnBAcesxJXbPUINvgKpT8i6NlMg";
    const SsId = "1sT5-RTxGebv3Ty7hHAaWhZp9c_pQh9N6NvWbX3DuYn8";
    const sheetName = "Sheet1";
    const gid = "0";
    //const url1 = 'https://docs.google.com/spreadsheets/d/'+SsId+'/gviz/tq?tqx=out:json&tq&gid='+gid;
    //const url2 = 'https://sheets.googleapis.com/v4/spreadsheets/' + SsId + '/values/' + sheetName + '?key=' + apiKey + "'";

    function convertToJSON(responseAsText){
        let jsonData = {};        
        const JSONstring = (text, startAt = '{', stopAt = '}') => {
            // From
            let startId = text.indexOf(startAt);
            if (startId >= 0){startId = startId + startAt.length - 1};

            // Until
            let stopId = text.lastIndexOf(stopAt);
            if (stopId >= 0){stopId = stopId + 1};

            if (startId >= 0 && 
                stopId >= 0 && 
                stopId > startId && 
                stopId < text.length
            ){
                // Substring containing JSON only
                return text.substring(startId, stopId);
            }
            return "";
        }
        //console.log("text",responseAsText);
        //console.log("json text",JSONstring);

        try {
            jsonData = JSON.parse(JSONstring(responseAsText, '{', '}'));
        } catch (e) {
            console.log("Error when parsing data to JSON", e);
            console.log("JSONstring:", JSONstring);
        }
        //console.log("jsonData", jsonData);
        return jsonData;
    }

    const extractData = (JSONdata={}) => {
        let objOfData = {};
        if(JSONdata.hasOwnProperty('table') && 
            JSONdata["table"].hasOwnProperty('rows') &&
            JSONdata["table"]["rows"].length > 0 &&
            JSONdata["table"]["rows"].every(row => row.hasOwnProperty("c") || row["c"].length > 0)
        ){
            //console.log("tableData",data["table"]);
            function hasMeaningfulValue(item){
                return item != null && item.hasOwnProperty('v') && item["v"] != null;
            }

            const rows = JSONdata.table.rows;
            const colHeadersArr = rows[0]["c"].map((element, index) => hasMeaningfulValue(element) ? element["v"] : "dummyLang_" + index)
            //console.log("header", colHeadersArr)
            let rowTitle, colHeader, cellData, cellValue;
            for(let r = 0; r<rows.length; r++){
                //if(r === 0){continue} // Header row
                const rowDataArr = rows[r]["c"].map((element) => hasMeaningfulValue(element) ? element["v"] : "LQ==")
                rowTitle = hasMeaningfulValue(rows[r]["c"][0]) ? rows[r]["c"][0]["v"] : "dummyObj_" + r;
                /**
                 * Pair "colHeadersArr" and "rowDataArr" into an object as key, value and add it to "objOfData"
                 * Should look like:
                 * objOfData={  nev:{lang1:string, lang2:string, ...},
                 *              lakcim:{lang1:string, lang2:string, ...}.
                 *              ....
                 *            }
                 */
                objOfData[rowTitle] = Object.fromEntries(colHeadersArr.map((key, index) => [key, rowDataArr[index]]));
                //console.log("rowDataArr", rowDataArr)
                //console.log("rowObj", rowObj)
            }
        }
        console.log("objOfData:", objOfData);
        // Fill in contact data on page (pass it further even if empty)
        fillInMyData(objOfData);
    }

    const getSheetData = ({sheetId, sheetName, query, callback}) => {
        const urlbase = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        const url = `${urlbase}&sheet=${encodeURIComponent(sheetName)}&tq=${encodeURIComponent(query)}`;
        fetch(url)
        .then((resp) => resp.text())
        .then((response) => {
            callback(convertToJSON(response))
        })
        .catch(error => console.log('Error while fetching data from Drive: ', error));
    }

    // Call the fetching
    getSheetData({
        sheetId:SsId,
        sheetName:sheetName,
        query:queryString ? queryString : "select *",
        callback:extractData,
    });
}

function getLocation() {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
              } else { 
                console.log("Geolocation is not supported by this browser.");
              }
        } else if (result.state === "prompt") {
            console.log("Geolocation prompted for permission.");
        } else {
            // Don't do anything if the permission was denied.
            console.log("Geolocation: Not granted and not prompted. No permission.")
        }
    });
  }
  
  function showPosition(position) {
    console.log("Latitude:",position.coords.latitude,"Longitude:",position.coords.longitude);
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        break;
    }
  }


/**
 * Run these on Start Up
 */
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        setDefaultLanguage();
        selectDefaultTab();
        addAccordionEventListeners();
        // Fetch nev and lakcim data from Drive
        fetchDataFromDrive(queryString='select * where (A is null and B is not null) or A like "nev" or A like "lakcim"');
    }
}
