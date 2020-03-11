function onLoad() {
    
    mainContainer = document.createElement("div");
    mainContainer.classList += "visContainer";

}

if(window.addEventListener){
    window.addEventListener('load',onLoad,false);
}else{
    window.attachEvent('onload',onLoad);
}