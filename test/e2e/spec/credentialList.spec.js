var CredentialListPage = require('../pages/credentialListPage');
var credentialListPage, rowData;

describe('Credential List Page - ', function() {
    beforeEach(function() {
        credentialListPage = new CredentialListPage();
        rowData = credentialListPage.getTableRowData();
    });

    describe('display add button and text - ', function() {
        it('should display the add button', function() {
            expect(credentialListPage.addButton.isDisplayed()).toBe(true);
        });

        it('should display the text on the add button as "Add"', function() {
            expect(credentialListPage.addButton.getText()).toBe('Add');
        });
    });

    describe('should display table column names- ', function() {
        it('should match the ext Interface table column Names', function () {
            var list = credentialListPage.getTableColNames();
            expect(list.get(0).getText()).toBe('Id ');
            expect(list.get(1).getText()).toBe('Username ');
            expect(list.get(2).getText()).toBe('Valid From');
            expect(list.get(3).getText()).toBe('Valid To');
            expect(list.get(4).getText()).toBe('Service');
            expect(list.get(5).getText()).toBe('Action');
        });

        it('should display "n" rows of data', function() {
            expect(rowData.count()).toEqual(credentialListPage.credentialListData.count());
        });
    });

    describe('when edit button is clicked- ', function() {
        console.log('edit goes here');
        it('should navigate to edit page', function () {
            element.all(by.repeater('row in ctrl.data')).then(function(data) {
                if(data.length > 0) {
                    //-------- when edit btn is clicked check the url ------------------
                    data[0].element(by.css('[ng-click="ctrl.edit(row)"]')).click();
                    expect(browser.getCurrentUrl()).toContain('layout/credential/edit');
                    browser.navigate().back();
                }
            });
        });
    });

    describe('should test the table content -', function() {
        it('checks row content - before and after delete functionality"', function() {
            var initialRowInfoBeforeDelete = '';
            element.all(by.repeater('row in ctrl.data')).then(function(data) {
                if(data.length > 0) {
                    initialRowInfoBeforeDelete = element(by.repeater('row in ctrl.data').row(0)).getText();
    
                    //---------------------- check initial row content------------------
                    expect(rowData.first().getText()).toBe(initialRowInfoBeforeDelete);
    
                    //---------------------- when confirm delete is clicked  check the row content------------------
                    data[0].element(by.css('[ng-click="ctrl.confirmDelete(row)"]')).click();
                    expect(rowData.first().$$('td').get(5).getText())
                        .toEqual(element(by.repeater('row in ctrl.data').row(0)).getText());
                    expect(rowData.first().$$('td').get(6).$$('div').get(1).$$('a').get(0).getAttribute('class'))
                        .toBe('btn btn-primary btn-sm');
                    expect(rowData.first().$$('td').get(6).$$('div').get(1).$$('a').get(0)
                        .$('span').getAttribute('class')).toBe('fa fa-check fa-fw');
                    expect(rowData.first().$$('td').get(6).$$('div').get(1).$$('a').get(1).getAttribute('class'))
                        .toBe('btn btn-danger btn-sm');
                    expect(rowData.first().$$('td').get(6).$$('div').get(1).$$('a').get(1)
                        .$('span').getAttribute('class')).toBe('fa fa-ban fa-fw');
    
                    //---------------------- when cancel is clicked - check the row content ---------------------
                    data[0].element(by.css('[ng-click="ctrl.cancelDelete(row)"]')).click();
                    expect(rowData.first().getText()).toBe(element(by.repeater('row in ctrl.data').row(0)).getText());
                    expect(rowData.first().$$('td').get(5).getText()).toEqual('');
    
                    //---------------------- when delete is clicked - check the row content ---------------------
                    data[0].element(by.css('[ng-click="ctrl.confirmDelete(row)"]')).click();
                    data[0].element(by.css('[ng-click="ctrl.delete(row)"]')).click();
                    element.all(by.repeater('row in ctrl.data')).then(function(data) {
                        if(data.length > 0) {
                            expect(element(by.repeater('row in ctrl.data').row(0)).getText()).not.toEqual(initialRowInfoBeforeDelete);
                        } else {
                            expect($$('.table.table-striped.table-bordered.table-hover tbody').get(0).getText()).toBe('');
                        }
                    });
                }
            });
        });
    });
    
    describe('when add button is clicked- ', function() {
        console.log('add goes here');
        it('should navigate to add page', function() {
            credentialListPage.clickCredentialAddButton();
            expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8000/#/layout/credential/add?accountId=2');
        });
    });
});
