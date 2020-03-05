import pprint
import json
import collections

pp = pprint.PrettyPrinter(indent=0, width=1)

def camel_to_underscore(name):
    if len(name) > 0:
        return name[0] + camel_pat.sub(lambda x: ' ' + x.group(1), name[1:])
    else:
        return ""


domains = ["Aardrijkskunde", "Biologie", "Bronnenonderzoek", "BV",
"Chinaproject", "Duits", "Economie", "Engels", "Filosofie", "Frans", "Geschiedenis",
"Grieks", "HPG", "KCV", "Latijn", "LIC", "LO", "Maatschappijleer", "Natuurkunde", 
"Nederlands", "NLT", "OnderzoekenenOntwerpen", "Profielwerkstuk", "Scheikunde", 
"Taalles", "TechnischOntwerpen", "WiskundeAC", "WiskundeBNieuweProgamma", "WiskundeD", "WiskundeOnderbouw"]

#domains = ["WiskundeD"]

nameLUT = {"BiologieOB": "Biologie OB", "NederlandsOB": "Nederlands", "WiskundeAC": "Wiskunde AC", 
"WiskundeBNieuweProgramma": "Wiskunde B", "WiskundeD": "Wiskunde D", "WiskundeOnderbouw": "Wiskunde Onderbouw",
"TechnischOntwerpen": "Technisch Ontwerpen"}

allData = {}

for domainName in domains: 
    with open("data/" + domainName, "r") as f:
        temp = f.readlines()[0]
        data = json.loads(temp)["value"]
        #pp.pprint(data)
        #print("\n\n")

        for item in data:
            path = item["webUrl"].replace("https://coornhert.sharepoint.com/sites/liber/", "")
            dataType = "subject" if path.count("/") == 1 else "module" if path.count("/") == 2 else "domain"
            #print(path + "      " + dataType)
            displayName = item["displayName"]

            domain = domainName

            if "NederlandsOB" in path:
                domain = "NederlandsOB"
            if "Biologie" in path:
                if "BiologieOB" in path:
                    domain = "BiologieOB"
                else:
                    domain = "Biologie"
            
            if domainName == "WiskundeAC":
                if "WiskundeOnderbouw" in item:
                    continue
            
            if dataType == "domain":
                allData[path] = {"displayName": domain}
            
            elif dataType == "subject":
                path = path.split("/")[1]
                if not domain in allData:
                    allData[domain] = {}
                if path in allData[domain]:
                    allData[domain][path]["displayName"] = displayName.replace(domain + "/", "")
                else:
                    allData[domain][path] = {"displayName": displayName.replace(domain + "/", "")}
            
            elif dataType == "module":
                pathSplit = path[len(domain) + 1:].split("/")
                try:
                    #print(pathSplit)
                    allData[domain][pathSplit[0]][pathSplit[1]] = displayName
                except KeyError:
                    allData[domain][pathSplit[0]] = {}
                    allData[domain][pathSplit[0]][pathSplit[1]] = displayName

                allData[domain][pathSplit[0]] = json.loads(json.dumps(collections.OrderedDict(sorted(allData[domain][pathSplit[0]].items()))))

    allData[domain] = json.loads(json.dumps(collections.OrderedDict(sorted(allData[domain].items()))))

for domain in allData.keys():
    if domain in nameLUT:
        allData[domain]["displayName"] = nameLUT[domain]

with open("../data.js", "w+")as f:
    f.write("let data = " + str(dict(allData)))