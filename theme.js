function save(isDark) {
    localStorage.setItem("RetroLiber", isDark);
}

function setTheme(isDark) {
    isDark = (isDark == "true");
    document.getElementById('themeSwitch').checked = isDark;
    isDark ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
}

function onLoad() {
    
    // try to load the dark theme settings
    var rlinks = localStorage.getItem("RetroLiber");
    try {
        setTheme(rlinks);
    }
    catch (e) { print(e); }

    // Add the listener for the theme switch
    document.getElementById('themeSwitch').addEventListener('change', function(event){
        (event.target.checked) ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
        save(event.target.checked);
    });

}

if(window.addEventListener){
    window.addEventListener('load',onLoad,false);
}else{
    window.attachEvent('onload',onLoad);
}