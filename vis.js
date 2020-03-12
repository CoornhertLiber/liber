function print(args) { console.log(args) }

settings = {}


function saveSettings(item) {
    localStorage.setItem("RetroLiberUser", JSON.stringify(item));
}

function onLoad() {
   
    settings = JSON.parse(localStorage.getItem("RetroLiberUser"));
    if (settings == undefined) {
        settings = {}
    }

    // Add the listener for the theme switch
    //document.getElementById('themeSwitch').addEventListener('change', function(event){
    //    (event.target.checked) ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
    //    save(event.target.checked);
    //});

    mainContainer = document.createElement("ul");
    mainContainer.classList += "visContainer";

    for (item in data) {
        obj = document.createElement("li");
        obj.classList += "visItem";

        text = document.createElement("div");
        if (data[item]["displayName"] == undefined) { 
            text.innerHtml = data[item];
        }
        else { 
            text.innerText = data[item]["displayName"];
            text.setAttribute("realName", item);
        }
        text.classList += "visText";

        icon = document.createElement("div");
        iconBox = document.createElement("input");
        iconBox.type = "checkbox";
        iconBox.classList += "visStarBox";

        if (settings[item] != undefined) {
            icon.classList = settings[item]["starred"] ? "fa fa-star" : "fa fa-star-o";
            iconBox.checked = settings[item]["starred"];
        }
        else {
            icon.classList = "fa fa-star-o";
        }

        iconBox.addEventListener("change", starPressed);

        obj.appendChild(icon);
        obj.appendChild(iconBox);

        label = document.createElement("label");
        label.classList += "visSwitch";
        input = document.createElement("input");
        input.type = "checkbox";
        if (settings[item] != undefined) {
            input.checked = !settings[item]["hidden"];
        }
        else {
            input.checked = true;
        }
        input.addEventListener("change", switchPressed); 


        span = document.createElement("span");
        span.classList += "visSlider";
        
        label.appendChild(input);
        label.appendChild(span);

        obj.appendChild(text);
        obj.appendChild(label);

        mainContainer.appendChild(obj);
    }

    document.body.appendChild(mainContainer);

}

function switchPressed() {
    domain = this.parentNode.parentNode.childNodes[2];
    if (domain.getAttribute("realName") == undefined) { name = domain.innerText; }
    else { name = domain.getAttribute("realName"); }
    if (settings[name] == undefined) {
        settings[name] = {};
    }
    settings[name]["hidden"] = !this.checked;
    saveSettings(settings);
}

function starPressed() {
    domain = this.parentNode.childNodes[2];
    if (domain.getAttribute("realName") == undefined) { name = domain.innerText; }
    else { name = domain.getAttribute("realName"); }
    if (settings[name] == undefined) {
        settings[name] = {};
    };
    settings[name]["starred"] = this.checked;
    saveSettings(settings);

    icon = this.parentNode.childNodes[0];
    icon.classList = this.checked ? "fa fa-star" : "fa fa-star-o";
}

if(window.addEventListener){
    window.addEventListener('load',onLoad,false);
}else{
    window.attachEvent('onload',onLoad);
}