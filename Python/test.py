import json

with open("test.json", "r") as f:
    data = json.loads(f.read())

with open("links", "w+") as f:
    for x in data["value"]:
        f.write(x["webUrl"].replace("https://coornhert.sharepoint.com", "") + "\n")
        f.write(x["displayName"] + "\n")