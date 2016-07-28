function AccountAddPage() {

    this.accountName  =  element(by.model('ctrl.account.name'));
    this.accountType  =  element.all(by.model('ctrl.account.type'));
    this.saveButton   =  element(by.css('save-button button'));
    this.backButton   =  element(by.css('back-button a'));

    this.clickBackButton = function() {
        this.backButton.click();
    };

    this.get = function() {
        browser.get('/#/layout/account/add');
    };

    this.clickSaveButton = function() {
        this.saveButton.click();
    };

    this.getTableRowData = function() {
        return $$('.table.table-striped.table-bordered.table-hover tbody tr');
    };

    this.clickPageNumber = function(pgNum) {
        browser.executeScript('window.scrollTo(0,0);').then(function() {
            var link = element(by.css("table-pagination")).element(by.linkText(pgNum.toString()));
            link.click();
        });
    };


    this.getTableColNames = function() {
        return $$('.table.table-striped.table-bordered.table-hover thead tr th');
    }
}

module.exports = AccountAddPage;