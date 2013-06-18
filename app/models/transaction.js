Balanced.Transaction = Balanced.Model.extend({
    account: Balanced.Model.belongsTo('Balanced.Account', 'account_json', {embedded: true}),

    web_uri: function () {
        return Balanced.MigrationUtils.convertApiUriIntoWebUri(this.get('uri'));
    }.property('uri'),

    embedded_iframe_url: function () {
        return this.get('web_uri') + Balanced.MigrationUtils.embeddedQueryString();
    }.property('web_uri'),

    amount_dollars: function () {
        if (this.get('amount')) {
            return (this.get('amount') / 100).toFixed(2);
        } else {
            return '';
        }
    }.property('amount')
});

Balanced.Transaction.reopenClass({
    deserialize: function (json) {
        json.account_json = json.account;
        delete json.account;
    },
    serialize: function (json) {
        json.account = json.account_json;
        delete json.account_json;
    }
});
