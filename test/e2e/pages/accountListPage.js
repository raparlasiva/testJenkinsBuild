function AccountListPage() {

    this.addButton   =  element(by.css('[click="ctrl.add()"]'));
    this.accountData =  element(by.model('ctrl.data'));

    this.get = function() {
        browser.get('/#/layout/account');
    };

    this.clickAccountAddButton = function() {
        this.addButton.click();
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
    };

    this.vehicleClick = function() {
        this.getTableRowData().last().$$('td').get(3).$('a').click();
    };

    this.interfaceClick = function() {
        this.getTableRowData().last().$$('td').get(4).$('a').click();
    };

    this.credentialClick = function() {
        this.getTableRowData().last().$$('td').get(5).$('a').click();
    };
}

module.exports = AccountListPage;
