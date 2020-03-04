import requests, json
from os import listdir, getcwd
from os.path import isfile, join
import pprint
import json
import re
import secret

subjects = ["Aardrijkskunde", "Biologie", "BiologieOB", "Bronnenonderzoek", "BV",
"Chinaproject", "Debat", "Duits", "Economie", "Engels", "Filosofie", "Frans", "Geschiedenis",
"Grieks", "HPG", "KCV", "Latijn", "LIC", "LO", "Maatschappijleer", "Mentoraat", "Natuurkunde", 
"Nederlands", "NLT", "OnderzoekenenOntwerpen", "Profielwerkstuk", "Scheikunde", "Studievaardigheden", 
"Taalles", "TechnischOntwerpen", "WiskundeAC", "WiskundeBProgramma", "WiskundeD", "WiskundeOnderbouw"]
#subjects = ["TechnischOntwerpen", "WiskundeAC", "WiskundeBProgramma", "WiskundeD", "WiskundeOnderbouw"]

domain = "https://graph.microsoft.com/v1.0/"
endpoint = "sites?search="
query = "liber/"
secret = str(secret.secret)

for subject in subjects:
    response = requests.get(domain + endpoint + query + subject, headers={"Authorization": f"bearer {secret}"})
    #print(response.text)
    with open("data/" + subject, "w+") as f:
        f.write(response.text)