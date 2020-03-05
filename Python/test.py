import pprint
import json

pp = pprint.PrettyPrinter(indent=0)

data = {
    "2": {
        "displayName": "test",
        "b": {
            "zasd": "1",
            "sa": "2",
            "displayName": "b1"
        },
        "a": {
            "qwrq": "3",
            "dfasd": "4",
            "displayName": "a1"
        }
    }
}
x = pp.pformat(data)
x = x.replace("\'", "\"")
res = json.loads(x)
print(res)