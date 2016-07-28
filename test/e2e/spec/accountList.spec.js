var AccountListPage = require('../pages/accountListPage');

describe('Account List Page - ', function() {
    var accountListPage = new AccountListPage();
    var rowDataPaginationOne = [];

    it('should display the add button', function() {
        expect(accountListPage.addButton.isDisplayed()).toBe(true);
    });

    it('should display the text on the add button as "Add"', function() {
        expect(accountListPage.addButton.getText()).toBe('Add');
    });

    it('should match the account table column Names', function() {
        var list = accountListPage.getTableColNames();
        expect(list.get(0).getText()).toBe('Id ');
        expect(list.get(1).getText()).toBe('Name ');
        expect(list.get(2).getText()).toBe('Type ');
        expect(list.get(3).getText()).toBe('Vehicles');
        expect(list.get(4).getText()).toBe('Interfaces');
        expect(list.get(5).getText()).toBe('Api Credentials');
    });

    it('should display 10 rows of data', function() {
        var rowData = accountListPage.getTableRowData();
        expect(rowData.count()).toEqual(element.all(by.repeater('row in ctrl.data')).count());
    });

    it('should display table data - default pagination 1', function() {
        var rowData = accountListPage.getTableRowData();

        //storing information to verify data when user paginates back to 1 from 2
        rowDataPaginationOne.push({
            id: accountListPage.getTableRowData().last().$$('td').get(0).getText(),
            name: accountListPage.getTableRowData().last().$$('td').get(1).getText(),
            type: accountListPage.getTableRowData().last().$$('td').get(2).getText(),

            vehicleAnchorClassName: accountListPage.getTableRowData().last().$$('td').get(3).$('a').getAttribute('class'),
            vehicleIconClassName: accountListPage.getTableRowData().last().$$('td').get(3).$('a').$('i').getAttribute('class'),

            interfaceAnchorClassName: accountListPage.getTableRowData().last().$$('td').get(4).$('a').getAttribute('class'),
            interfaceIconClassName: accountListPage.getTableRowData().last().$$('td').get(4).$('a').$('i').getAttribute('class'),

            apiCredentialAnchorClassName: accountListPage.getTableRowData().last().$$('td').get(5).$('a').getAttribute('class'),
            apiCredentialIconClassName: accountListPage.getTableRowData().last().$$('td').get(5).$('a').$('i').getAttribute('class')
        });

        expect(rowData.count()).toEqual(10);
        expect(rowData.first().$$('td').get(0).getText()).toBe('0');
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/account');
    });

    it('should display the values when the table is paginated to 2', function() {
        accountListPage.clickPageNumber(2);
        var rowData = accountListPage.getTableRowData();
        expect(rowData.count()).toEqual(element.all(by.repeater('row in ctrl.data')).count());
        expect(rowData.first().$$('td').get(0).getText()).toBe(element(by.repeater('row in ctrl.data').row(0).column('row.id')).getText());
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/account');
    });

    it('should display the values when the table is paginated back to 1', function() {
        accountListPage.clickPageNumber(1);
        var rowData = accountListPage.getTableRowData();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/account');

        expect(rowData.last().$$('td').get(0).getText()).toBe(rowDataPaginationOne[0].id);
        expect(rowData.last().$$('td').get(1).getText()).toBe(rowDataPaginationOne[0].name);
        expect(rowData.last().$$('td').get(2).getText()).toBe(rowDataPaginationOne[0].type);

        expect(rowData.last().$$('td').get(3).$('a').getAttribute('class')).toBe(rowDataPaginationOne[0].vehicleAnchorClassName);
        expect(rowData.last().$$('td').get(3).$('a').$('i').getAttribute('class')).toBe(rowDataPaginationOne[0].vehicleIconClassName);

        expect(rowData.last().$$('td').get(4).$('a').getAttribute('class')).toBe(rowDataPaginationOne[0].interfaceAnchorClassName);
        expect(rowData.last().$$('td').get(4).$('a').$('i').getAttribute('class')).toBe(rowDataPaginationOne[0].interfaceIconClassName);

        expect(rowData.last().$$('td').get(5).$('a').getAttribute('class')).toBe(rowDataPaginationOne[0].apiCredentialAnchorClassName);
        expect(rowData.last().$$('td').get(5).$('a').$('i').getAttribute('class')).toBe(rowDataPaginationOne[0].apiCredentialIconClassName);
    });

    it('should navigate to vehicle page when vehicle link is clicked', function() {
        accountListPage.vehicleClick();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/vehicle?accountId=9');
        browser.navigate().back();
    });

    it('should navigate to credential page when interface link is clicked', function() {
        accountListPage.interfaceClick();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/externalInterface?accountId=9');
        browser.navigate().back();
    });

    it('should navigate to credential page when credential link is clicked', function() {
        accountListPage.credentialClick();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/credential?accountId=9');
        browser.navigate().back();
    });

    it('should navigate to account add when "add" button is clicked', function() {
        accountListPage.clickAccountAddButton();
        expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/account/add');
    });
});