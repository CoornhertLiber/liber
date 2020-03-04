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
"Taalles", "TechnischOntwerpen", "WiskundeAC", "WiskundeBNieuweProgamma", "WiskundeD", "WiskundeOnderbouw"]
subjects = ["TechnischOntwerpen", "WiskundeAC", "WiskundeBNieuweProgamma", "WiskundeD", "WiskundeOnderbouw"]

special_cases = {"TechnischOnterwerpen": "Technisch", "WiskundeOnderbouw": "Wiskunde+Onderbouw", "WiskundeAC": "Wiskunde+A", "WiskundeBNieuweProgamma": "Wiskunde+B", "WiskundeD": "Wiskunde+D"}

domain = "https://graph.microsoft.com/v1.0/"
endpoint = "sites?search="
query = "liber/"
secret = str(secret.secret)

for subject in subjects:
    reqSubject = subject
    if subject in special_cases:
        reqSubject = special_cases[subject]
    response = requests.get(domain + endpoint + query + reqSubject, headers={"Authorization": f"bearer {secret}"})
    #print(response.text)
    with open("data/" + subject, "w+") as f:
        f.write(response.text)