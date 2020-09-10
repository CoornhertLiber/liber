subjects = document.getElementById("WebPartWPQ3").childNodes[0].childNodes[5].childNodes[1].childNodes

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

link = subjects[0].childNodes[0].href
data = httpGet(link)
var ifrm = document.createElement("iframe");
ifrm.setAttribute("src", link);
x = obj.getElementsByClassName("ms-rtestate-field")[1].children[2].children[0]