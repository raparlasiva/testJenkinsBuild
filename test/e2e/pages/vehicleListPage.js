function VehicleListPage() {

    this.addButton   =  element(by.css('[click="ctrl.add()"]'));
    this.vehicleData =  element(by.model('ctrl.data'));

    this.get = function() {
        browser.get('/#/layout/vehicle?accountId=1');
    };

    this.clickVehicleAddButton = function() {
        this.addButton.click();
    };

    this.getTableRowData = function() {
        return $$('.table.table-striped.table-bordered.table-hover tbody tr');
    };

    this.getTableColNames = function() {
        return $$('.table.table-striped.table-bordered.table-hover thead tr th');
    };

    this.vehicleDescriptionClick = function() {
        this.getTableRowData().first().$$('td').get(0).$('a').click();
    };

    this.faultClick = function() {
        this.getTableRowData().first().$$('td').get(1).$('a').click();
    };
}

module.exports = VehicleListPage;