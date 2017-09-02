import bitcoinjs from 'bitcoinjs-lib';
import ethereumjsWallet from 'ethereumjs-wallet';
import bs58 from 'bs58';

var Worker = require('worker-loader!./../utils/key-derivator-worker.js')
const worker = new Worker();

export default {
    name: 'BtcKeyInput',
    template: `
        <div>
            <div class="row">
                <div class="col-12">
                    <h2>BTC WIF secret or mnemonic phrase</h2>
                    <textarea v-model="secret" class="form-control" type="text" placeholder="correct horse battery staple ..."></textarea>
                </div>
                <div class="col-12">
                    <h2>BTC Sender Address</h2>
                    <textarea v-model="address" class="form-control" type="text" placeholder="BTC-Address you have contributed from"></textarea>
                </div>
            </div>

            <div class="row pt-5 pb-5">
                <div class="col text-center">
                    <button class="btn btn-primary" @click="translateKey(secret, address)" :disabled="isRunning || (!secret || !address)">
                        <i class="fa fa-spinner fa-spin" v-show="isRunning"></i> Generate ETH Public/Private KeyPair
                    </button>
                    <p class="pt-3">
                        <small v-if="status.path">
                        Current Derivation Path: 
                        <br>{{ status.path }}
                        <br><br>
                        Type:
                        <br>{{ status.type }}
                        </small>
                    </p>
                </div>
            </div>

            <p class="alert alert-warning" v-if="error">
                {{ error }}
            </p>

            <hr>

            <p class="alert alert-success" v-if="type && path">
                Type: {{ type }}<br>
                Path: {{ path }}
            </p>

        </div>
    `,
    methods: {
        translateKey: function (secret, address) {
            
            worker.onmessage = (e) => {
                if (e.data.status) {
                    this.status = e.data.status;
                    return;
                }

                if (e.data.isRunning) {
                    this.isRunning = e.data.isRunning;
                    return;
                }

                if (e.data.error) {
                    this.isRunning = false;
                    this.error = e.data.error;
                    return;
                }

                if (e.data.wif) {
                    this.isRunning = false;

                    let keyPair;

                    try {
                        keyPair = bitcoinjs.ECPair.fromWIF(e.data.wif);

                        if (keyPair.getAddress() === address) {
                            // strip network byte and checksum bytes in the end
                            let wallet = ethereumjsWallet.fromPrivateKey(bs58.decode(keyPair.toWIF()).slice(1, 33));
                            this.$emit('walletChanged', wallet);
                        }
                    } catch (err) {
                        this.error = 'This is not a valid secret.';
                        console.warn(err);
                    }

                    return;
                }
            };

            worker.postMessage({
                msg: { secret: secret, address: address }
            });

        }
    },
    data: function () {
        return {
            isRunning: false,
            path: null,
            type: null,
            secret: null,
            address: null,
            error: null,
            status: {
                try: 0,
                max: 100
            }
        }
    }
}
