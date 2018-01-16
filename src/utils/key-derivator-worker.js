import bip39 from 'bip39';
import bs58 from 'bs58';
import bitcoinjs from 'bitcoinjs-lib';
import hdkey from 'ethereumjs-wallet/hdkey';
import ethereumjsWallet from 'ethereumjs-wallet';

const bip32pathPrefix = "m/0'/0/";
const bip44pathPrefix = "m/44'/0'/0'/0/";
const derivationTries = 100;

import japaneseWordlist from 'bip39/wordlists/japanese.json';
import englishWordlist from 'bip39/wordlists/english.json';

function getWordlistBySecret(secret) {
    let firstWord = secret.trim().split(/\u3000/g)[0] // use ideographic space in unicode

    // check if it is a japanese secret
    if (japaneseWordlist.indexOf(firstWord) !== -1) {
        console.log('detected japanese language.')
        return japaneseWordlist
    }

    return englishWordlist
}

self.onmessage = function(e) {
    if (e.data.msg === undefined) return;

    postMessage({ isRunning: true });

    let address = e.data.msg.address;
    let secret = e.data.msg.secret;

    let wif;
    let hdRoot;

    let wordlist = getWordlistBySecret(secret)

    // check if we deal with a mnenomic phrase
    if (bip39.validateMnemonic(secret, wordlist) && bitcoinjs.address) {
        hdRoot = bitcoinjs.HDNode.fromSeedBuffer(bip39.mnemonicToSeed(secret));

        // search for used address
        for (var i = 0; i < derivationTries; i++) {
            
            // check if its a bip32 key
            postMessage({ status: { path: bip32pathPrefix + i, type: 'BIP32' }});
            if (hdRoot.derivePath(bip32pathPrefix + i).getAddress() === address) {
                wif = hdRoot.derivePath(bip32pathPrefix + i).keyPair.toWIF();
                break;
            }

            // check if its a bip44 key
            postMessage({ status: { path: bip44pathPrefix + i, type: 'BIP44' }});
            if (hdRoot.derivePath(bip44pathPrefix + i).getAddress() === address) {
                wif = hdRoot.derivePath(bip44pathPrefix + i).keyPair.toWIF();
                break;
            }

            if (i + 1 >= derivationTries) {
                postMessage({ error: 'We couldn\'t match your address to your key.' });
            }
            
        }

    } else {
        wif = secret;
    }

    postMessage({ wif: wif });
    postMessage({ isRunning: false });

};

