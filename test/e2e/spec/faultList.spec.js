var FaultListPage = require('../pages/faultListPage');

describe('Fault List Page - ', function() {
    var faultListPage = new FaultListPage();

    
    it('should match the Fault table column Names', function() {
        var list = faultListPage.getTableColNames();
        expect(list.get(0).getText()).toBe('Code ');
        expect(list.get(1).getText()).toBe('Description ');
        expect(list.get(2).getText()).toBe('Guidance ');
        
        expect(list.get(3).isDisplayed()).toBe(false);
        expect(list.get(3).getAttribute('class')).toContain('ng-hide');

        expect(list.get(4).getText()).toBe('Fault Date ');
        expect(list.get(4).isDisplayed()).toBe(true);
        expect(list.get(4).getAttribute('class')).not.toEqual('ng-show');
        
    });

    it('should display "n" rows of data', function() {
        var rowData = faultListPage.getTableRowData();
        expect(rowData.count()).toEqual(faultListPage.faultData.count());
    });

    it('should display fault data', function() {
        var rowData = faultListPage.getTableRowData();
        expect(rowData.first().$$('td').get(0).getText())
            .toBe(element(by.repeater('row in ctrl.data').row(0).column('row.code')).getText());
        
        expect(rowData.first().$$('td').get(1).getText())
            .toBe(element(by.repeater('row in ctrl.data').row(0).column('row.description')).getText());
        expect(rowData.first().$$('td').get(2).getText())
            .toBe(element(by.repeater('row in ctrl.data').row(0).column('row.guidance')).getText());

        expect(rowData.first().$$('td').get(3).getAttribute('class'))
            .toContain('ng-hide');

        expect(rowData.first().$$('td').get(4).getAttribute('class'))
            .not.toEqual('ng-hide');

        expect(rowData.first().$$('td').get(4).getText())
            .toBe(element(by.repeater('row in ctrl.data').row(0).column('row.faultDate')).getText());

        browser.get('/#/layout/externalInterface?accountId=1');
    });
});