require('should');
var staticInfo = require('../lib/static');
var TelegramLink = require('../lib/telegram.link');

describe('TelegramLink', function () {
    var primaryDC = staticInfo.telegram.test.primaryDataCenter;

    describe('#connect()', function () {
        it('should connect and disconnect to primary DC', function (done) {
            var telegramLink = new TelegramLink(primaryDC);
            telegramLink.connect(function (ex) {
                if(ex) console.log(ex);
                else telegramLink.end(function (ex) {
                    if(ex) console.log(ex);
                    done();
                });
            });
        })
    });

    describe('#authorization()', function () {
        it('should returns', function (done) {

            this.timeout(120000);
            var telegramLink = new TelegramLink(primaryDC);
            telegramLink.connect(function (e) {
                if(e) {
                    console.log('Connection error: %s', e);
                    done();
                    return;
                }
                telegramLink.authorization(function (ex, authKey) {
                    if (ex) {
                        console.log('Authorization KO: %s', ex);
                        telegramLink.end();
                    }
                    else {
                        authKey.should.be.ok;
                        console.log('Authorization OK: %s', authKey.toString());
                        telegramLink.end();
                    }
                    (!ex).should.be.true;
                    done();
                });
            });
        })
    });
});

