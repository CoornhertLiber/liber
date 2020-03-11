sideBarLinks = {
    "Testing123": {"page": "vis.html"},
    "Settings": {"page": "vis.html", "icon": "fa-gear"}
};

navEnabled = false;

function print(e) {console.log(e);}

function toggleNav() {
    navEnabled = !navEnabled;
    if (navEnabled) { document.getElementById("mySidenav").style.width = "25%"; }
    else { document.getElementById("mySidenav").style.width = "0%"; }
}

function onLoad() {

    document.onkeydown = function (e) {
        e = e || window.event;;
        if ((e.keyCode == 27 && navEnabled) || e.keyCode == 77) { // Handles the ESC key
            toggleNav();
        }
    }

    list = document.getElementById("menuList");
    for (item in sideBarLinks) {
        li = document.createElement("li");

        divIcon = document.createElement("div");
        icon = sideBarLinks[item]["icon"];
        if (icon == undefined) { icon = "fa-question" }
        divIcon.classList = "linkIcon fa " + icon;
        divLink = document.createElement("div");
        divLink.classList = "menuLink";
        divLink.innerText = item;

        li.appendChild(divIcon);
        li.appendChild(divLink);
        
        list.appendChild(li);

    toggleNav(true);
    }
}

if(window.addEventListener){
    window.addEventListener('load',onLoad,false);
}else{
    window.attachEvent('onload',onLoad);
}