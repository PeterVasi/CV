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
 * by selecting the country flag 
 * to which corresponds the User's browser language.
 * Clicking a flag triggers changeLang() too.
 */
function setDefaultLanguage (){
    // Set document's language to the default
    const defaultLang = "se";
    const defLangFlag = document.querySelector("input[name=countryFlags][value='" + defaultLang + "']");    
    if (defLangFlag){ // The default language's flag found, click it.
        defLangFlag.click();
    } else { // Set document's language anyway.
        changeLang({value:defaultLang});
    }

    // Change document's language to User's browser language
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
    const browserLang = getNavigatorLanguage().trim().split("-").shift().toLowerCase(); // Get first/prefered language.
    // Select the same language as that of the browser by clicking on the corresponding flag.
    const flagTag = document.querySelector("input[name=countryFlags][value='" + browserLang + "']");
    if (flagTag){ // If country flag of the browser language found, click it.
        flagTag.click();
    }
}


/**
 * Fill in personal data (email, phone, etc.)
 */
function fillInMyData(){
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
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
      
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
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

    //encoded data
    var my_details = [
        {id:"lakcim", string64:"Qm9kZW4sIE5vcnJib3R0ZW4="},
        {id:"ecim", string64:"MnBldGVydmFzaUBnbWFpbC5jb20="},
        // {id:"telszam", string64:"KzQ2IDczIDk0OCA2MCA4Mw=="}
    ]

    for (let x of my_details){
        const my_element = document.getElementById(x["id"]);
        if (my_element){
            const spanElements = my_element.querySelectorAll("span[lang]"); //span elements with lang attribute
            if (spanElements){
                for (let spanElement of spanElements){
                    spanElement.innerHTML = Base64.decode(x["string64"]); //replace node's content
                }
            }
        }
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
        fillInMyData();
    }
}
