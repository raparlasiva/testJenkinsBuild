function ExtInterfaceListPage() {

    this.addButton              =  element(by.css('[click="ctrl.add()"]'));
    
    this.extInterfaceListData   =  element.all(by.repeater('row in ctrl.data'));
    
    this.clickExternalIntrefaceAddButton = function() {
        this.addButton.click();
    };
    
    this.getTableRowData = function() {
        return $$('.table.table-striped.table-bordered.table-hover tbody tr');
    };

    this.getTableColNames = function() {
        return $$('.table.table-striped.table-bordered.table-hover thead tr th');
    };
}

module.exports = ExtInterfaceListPage;
