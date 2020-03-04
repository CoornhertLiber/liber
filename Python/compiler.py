from os import listdir, getcwd
from os.path import isfile, join
import pprint
import json
import re

pp = pprint.PrettyPrinter(indent=4)

mypath = getcwd() #+ "/data"

#onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

full = {}

#onlyfiles = [x for x in onlyfiles if "Z" not in x]
#onlyfiles = onlyfiles[:1]

onlyfiles = ["links"]

displayNames = {"": ""}

for x in onlyfiles:

    with open("" + x, "r") as f:
            items = f.readlines()
            z = 0
            new = []
            for y in range(len(items)):
                if z % 2 == 0:
                    new.append(items[y].replace("/sites/liber/" + "Frans", "").replace("\n", "")[1:] )
                else:
                    displayNames[new[-1].split("/")[-1]] = items[y].replace("\n", "")
                z += 1

            dir = {}

            for item in new:
                if "/" in item:
                    z = item.split("/")
                    try:
                        dir[z[0]][z[1]] = ""
                    except:
                        dir[z[0]] = {z[1]: ""}         

    full[x] = dir

camel = {}

#pprint.pprint(full)

for domain in sorted(full.keys()):
    x = sorted(full[domain])
    camel[domain] = {}
    for subject in x:
        y = full[domain][subject].keys()
        #pprint.pprint(displayNames)
        #print("\n\n---------------------------\n\n")
        #pprint.pprint(full[domain])
        if sorted(y) == ["liber"]:
            continue
        camel[domain][subject] = {a: displayNames[a] for a in sorted(y)}
        for key in camel[domain][subject].keys():
            if key == camel[domain][subject][key]:
                camel[domain][subject][key] = "" 


camel_pat = re.compile(r'([A-Z])')

final = {}

def camel_to_underscore(name):
    if len(name) > 0:
        return name[0] + camel_pat.sub(lambda x: ' ' + x.group(1), name[1:])
    else:
        return ""

for domain in camel:
    newDomain = camel_to_underscore(domain)
    final[newDomain] = {}
    for subject in camel[domain]:
        newSubject = camel_to_underscore(subject)
        final[newDomain][newSubject] = {}
        for module in camel[domain][subject]:
            newModule = camel_to_underscore(module)
            final[newDomain][newSubject][newModule] = camel[domain][subject][module]

print(len(full.keys()))
print(max( [len(x.keys()) for x in full.values()] ))

with open("testing", "w+") as f:
    json.dump(final, f)