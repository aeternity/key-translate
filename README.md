# Aeternity Key Translate GUI

Generate a ETH public/private key pair (derived ETH address) from your Bitcoin sender address and WIF or mnemonic phrase.

## Live version
Hosted on Github Pages: https://aeternity.github.io/key-translate/

## Setup

Or clone the repository and run the script on your local computer offline:
* install dependencies and modules `npm install`
* start the package `npm start`

## Deployment
After cloning and `npm install` the repository. 

Then, checkout the `gh-pages` branch into the `/dist` subfolder:

```
git clone git@github.com:aeternity/key-translate.git --branch gh-pages dist
``` 

Now:

* Use `npm run build` to build the new version
* Deploy it using `npm run deploy`.

## Usage with Mnemonic Phrase

You will need to enter:
* your `mnemonic passphrase`
* your public Bitcoin address

### Sample
Mnemonic Passphrase:
```
gold yard dizzy report sting cereal smart enter wild cargo balance season display process sick
```
Bitcoin Address
```
1D2i1bNfVQaVeasCRyRHEdiZYnVgwLUzBH
```
Use the first input-address from the sending transaction.

## Usage with WIF
You will need to enter:
* your WIF (Bitcoin `private key`)
* your public Bitcoin address

### Sample
WIF / Bitcoin Private Key:
```
5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ
```
Bitcoin Address
```
1GAehh7TsJAHuUAeKZcXf5CnwuGuGgyX2S
```

## License

Copyright (c) 2017 Aeternity Developers

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
