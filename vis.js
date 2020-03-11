function print(args) { console.log(args) }

domains = {}


function save(isDark) {
    localStorage.setItem("RetroLiber", isDark);
}
function onLoad() {
   
    var domains = localStorage.getItem("RetroLiberUser");
    if (domains == undefined) {
        domains = {}
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
        if (data[item]["displayName"] == undefined) { text.innerHtml = data[item] }
        else { text.innerText = data[item]["displayName"]; }
        text.classList += "visText";

        icon = document.createElement("div");
        icon.classList += "fa fa-star-o";
        obj.appendChild(icon);

        label = document.createElement("label");
        label.classList += "switch";
        input = document.createElement("input");
        input.type = "checkbox";
        span = document.createElement("span");
        span.classList += "slider"
        
        label.appendChild(input);
        label.appendChild(span);

        obj.appendChild(text);
        obj.appendChild(label);

        mainContainer.appendChild(obj);
    }

    document.body.appendChild(mainContainer);

}

if(window.addEventListener){
    window.addEventListener('load',onLoad,false);
}else{
    window.attachEvent('onload',onLoad);
}