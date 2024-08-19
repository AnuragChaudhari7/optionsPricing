# Options Pricing WebApp

## About
This app hosts the user interface to provide access to various option pricing models. <br>
Currently there are models to price both European and American options such as the Binomial Tree model and Black Scholes model.<br>
There is also a real-time valuation component to the app to valuate options on the market for some option chains. <br>

Live Site: https://optionspricing.onrender.com/
## Model Theory
Binomial Tree European: https://github.com/AnuragChaudhari7/optionsPricing/blob/main/models/binomial_european_theory.ipynb <br>

Binomial Tree American: https://github.com/AnuragChaudhari7/optionsPricing/blob/main/models/binomial_european_theory.ipynb <br>

Black-Scholes: https://github.com/AnuragChaudhari7/optionsPricing/blob/main/models/black_scholes.ipynb <br>

## Backend API:
Binomial Model Example:
```
import requests
import json

url = "https://optionspricing-backend.onrender.com/api/european/binomial"

payload = json.dumps({
  "S0": "42",
  "K": "40",
  "T": "0.5",
  "N": "4",
  "r": "0.1",
  "sig": "0.2"
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

```
Black-Scholes Model Example:
```
import requests
import json

url = "https://optionspricing-backend.onrender.com/api/european/blackscholes"

payload = json.dumps({
  "S": "42",
  "K": "40",
  "T": "0.5",
  "r": "0.1",
  "sig": "0.2"
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

Real-Time Valuations (Call Options):
```
import requests
import json

url = "https://optionspricing-backend.onrender.com/api/realtime/valuations/call"

payload = json.dumps({
  "ticker": "aapl" #change to any valid ticker 
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

Real-Time Valuations (Put Options):
```
import requests
import json

url = "https://optionspricing-backend.onrender.com/api/realtime/valuations/put"

payload = json.dumps({
  "ticker": "aapl" #change to any valid ticker 
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

```


