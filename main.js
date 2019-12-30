function print(args) { console.log(args) }

var roundedDataSize = [25, 20, 10]
var selected = ["", ""];

let topContainer = document.createElement("ul");
let domainContainer = document.createElement("li");
let subjectContainer = document.createElement("li");
let moduleContainer = document.createElement("li");

let domainList = document.createElement("ul");
let subjectList = document.createElement("ul");
let moduleList = document.createElement("ul");

domainContainer.appendChild(domainList);
subjectContainer.appendChild(subjectList);
moduleContainer.appendChild(moduleList);

var dataContainerItems = [domainList, subjectList, moduleList];
const dataContainers = [domainContainer, subjectContainer, moduleContainer]; 

topContainer.classList += "topContainer";

domainContainer.classList += "testContainer";
subjectContainer.classList += "testContainer";
moduleContainer.classList += "testContainer";
domainList.classList += "testList";
subjectList.classList += "testList";
moduleList.classList += "testList";

/*
domainContainer.style.backgroundColor = "red";
subjectContainer.style.backgroundColor = "green";
moduleContainer.style.backgroundColor = "blue";
linkContainer.style.backgroundColor = "gray";
*/

topContainer.appendChild(domainContainer);
let sep1 = document.createElement("div");
sep1.classList = "seperator";
topContainer.appendChild(sep1);

topContainer.appendChild(subjectContainer);
let sep2 = document.createElement("div");
sep2.classList = "seperator";
topContainer.appendChild(sep2);

topContainer.appendChild(moduleContainer);
let sep3 = document.createElement("div");

function changeDomain(domain) {
    var subjects = [];
    for (item in data[domain]) {
        subjects.push(item);
    }

    var displayNames = [];
    for (var i = 1; i < subjects.length; i++) {
        if (data[domain][subjects[i]]["displayName"] == undefined) { displayNames.push(subjects[i]); }
        else { displayNames.push(data[domain][subjects[i]]["displayName"]); }
    }
    
    fillList(displayNames, subjectList);

    selected[0] = domain;

    var firstSubjectName;
    var pass = false;
    for (prop in data[domain]) {
        if (pass) { firstSubjectName = prop; break;}
        else { pass = true; }
    }

    changeSubject(domain, firstSubjectName);

}

function changeSubject(domain, subject) {
    var modules = [];
    for (item in data[domain][subject]) {
        modules.push(item);
    }

    selected[0] = domain;
    selected[1] = subject;

    var displayNames = [];
    for (var i = 0; i < modules.length; i++) {
        item = modules[i];
        if (item == "displayName") {
            continue;
        }
        if (data[domain][subject][item] != "") {
            displayNames.push(data[domain][subject][item]);
        }
        else {
            displayNames.push(item);
        }
    }
    print(displayNames);

    fillList(displayNames, moduleList);

}

function fillList(input, funcList) {
    var inputLength = input.length;
    for (var x = 0 ; x < funcList.childNodes.length; x++) {
        if (x < inputLength) {
            funcList.childNodes[x].innerText = input[x];
            funcList.childNodes[x].classList = "occupied";
            if (funcList == moduleList) {
                var s0 = selected[0].split(" ").join("");
                var s1 = selected[1].split(" ").join("");
                var s2 = input[x].split(" ").join("");
                var fin = s0 + "/" + s1 + "/" + s2;
                funcList.childNodes[x].setAttribute("href", "https://coornhert.sharepoint.com/sites/liber/" + fin);
            }
        }
        else {
            funcList.childNodes[x].innerText = "";
            funcList.childNodes[x].classList = "empty";
        }
    }
    highlightSelected();
}

function highlightSelected() {
    for (var i = 0; i < 2; i++) {
        for (var x = 0; x < dataContainerItems[i].childNodes.length; x++) {
            if (dataContainerItems[i].childNodes[x].classList != "empty") {
                var toCheck = dataContainerItems[i].childNodes[x];
                if (toCheck.innerText == selected[i] || toCheck.getAttribute("realName") == selected[i]) {
                    toCheck.classList += " active";
                }
                else {
                    toCheck.classList = "occupied";
                }
            }
        }
    }
}


window.onload = function() {

    classNames = ["domain", "subject", "module"]
   
    for (var i = 0; i < 3; i++) {
        for (var x = 0; x < this.roundedDataSize[i]; x++) {
            if (i < 2) {
                var item = document.createElement("button");
            }
            else {
                var item = document.createElement("a");
                item.setAttribute("target", "_blank")
            }
            item.id = classNames[i];
            item.classList = "dataItem";
            item.onclick = test;
            dataContainerItems[i].appendChild(item);
        }
    }

    var domains = [];
    for (item in data) {
        domains.push(item);
    }
    var domainLength = domains.length;
    for (var x = 0 ; x < domainList.childNodes.length; x++) {
        if (x < domainLength) {
            if (data[domains[x]]["displayName"] != undefined) {
                domainList.childNodes[x].innerText = data[domains[x]]["displayName"];
                domainList.childNodes[x].setAttribute("realName", domains[x]);
            }
            else {
                domainList.childNodes[x].innerText = domains[x];
            }
            domainList.childNodes[x].classList = "occupied";
        }
        else {
            domainList.childNodes[x].innerText = "";
            domainList.childNodes[x].classList = "empty";
        }
    }

    for (domain in data) {
        this.changeDomain(domain);
        break;
    }
    domDataContainer = document.getElementById("dataContainer");
    domDataContainer.appendChild(topContainer);
}

function test() {
    if (this.id == "domain") {
        var domain = "";
        if (this.getAttribute("realName") == undefined) {
            domain = this.innerText;
        }
        else {
            domain = this.getAttribute("realName");
        }
        changeDomain(domain);
    }
    else if (this.id == "subject") {
        changeSubject(selected[0], this.innerText);
    }
    else if (this.id == "module") {
        
    }
}
