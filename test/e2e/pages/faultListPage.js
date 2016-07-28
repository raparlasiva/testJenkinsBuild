function FaultListPage() {

    this.faultData   =  element.all(by.repeater('row in ctrl.data'));

    // this.vehicleId   =  element.all(by.css('ctrl.vehicleId'));

    this.getTableRowData = function() {
        return $$('.table.table-striped.table-bordered.table-hover tbody tr');
    };

    this.getTableColNames = function() {
        return $$('.table.table-striped.table-bordered.table-hover thead tr th');
    };
}

module.exports = FaultListPage;
