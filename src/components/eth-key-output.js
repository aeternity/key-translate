export default {
    name: 'EthKeyOutput',
    props: ['wallet'],
    template: `
        <div>
            ETH Private-Key:
            <textarea class="form-control" :value="privateKey"></textarea>

            ETH Address:
            <textarea class="form-control" :value="address"></textarea>
        </div>
    `,
    computed: {
        address: function() {
            if (!this.wallet) return '';
            return "0x" + this.wallet.getAddress().toString('hex');
        },
        privateKey: function() {
            if (!this.wallet) return '';
            return this.wallet.getPrivateKey().toString('hex');
        }
    }
}
