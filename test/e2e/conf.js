exports.config = {
    framework: 'jasmine',
    seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',
    onPrepare: function() {
        browser.get('/#/login');

        element(by.model('ctrl.loginInfo.username')).sendKeys('test');
        element(by.model('ctrl.loginInfo.password')).sendKeys('test');
        element(by.model('ctrl.loginInfo.accountName')).sendKeys('test');
        element(by.buttonText("Login")).click();;

        // Login takes some time, so wait until it's done.
        // For the test app's login, we know it's done when it redirects to
        // index.html.
        return browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /account/.test(url);
            });
        }, 10000);
    }
};
