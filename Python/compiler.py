import pprint
import json

pp = pprint.PrettyPrinter(indent=4)

def camel_to_underscore(name):
    if len(name) > 0:
        return name[0] + camel_pat.sub(lambda x: ' ' + x.group(1), name[1:])
    else:
        return ""


domains = ["Aardrijkskunde", "Biologie", "BiologieOB", "Bronnenonderzoek", "BV",
"Chinaproject", "Debat", "Duits", "Economie", "Engels", "Filosofie", "Frans", "Geschiedenis",
"Grieks", "HPG", "KCV", "Latijn", "LIC", "LO", "Maatschappijleer", "Mentoraat", "Natuurkunde", 
"Nederlands", "NLT", "OnderzoekenenOntwerpen", "Profielwerkstuk", "Scheikunde", "Studievaardigheden", 
"Taalles"]

domains = ["Aardrijkskunde"]

allData = {}

for domain in domains: 
    with open("data/" + domain, "r") as f:
        temp = f.readlines()[0]
        data = json.loads(temp)["value"]
        pp.pprint(data)
        print("\n\n")

        for item in data:
            path = item["webUrl"].replace("https://coornhert.sharepoint.com/sites/liber/", "")
            dataType = "subject" if path.count("/") == 1 else "module" if path.count("/") == 2 else "domain"
            print(path + "      " + dataType)
            displayName = item["displayName"]

            if dataType == "domain":
                allData[path] = {"displayName": displayName}
            
            elif dataType == "subject":
                path = path.split("/")[1]
                if path in allData[domain]:
                    allData[domain][path]["displayName"] = displayName.replace(domain + "/", "")
                else:
                    allData[domain][path] = {"displayName": displayName.replace(domain + "/", "")}
            
            elif dataType == "module":
                pathSplit = path.replace(domain + "/", "").split("/")
                try:
                    allData[domain][pathSplit[0]][pathSplit[1]] = displayName
                except KeyError:
                    allData[domain][pathSplit[0]] = {}
                    allData[domain][pathSplit[0]][pathSplit[1]] = displayName

        pp.pprint(allData)

        with open("compiled/" + domain, "w+") as f:
            f.write(str(allData))