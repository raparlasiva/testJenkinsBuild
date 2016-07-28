function VehicleDetailPage() {

    this.vehicleDataId =  element(by.css('ctrl.data.id'));
    this.backButton   =  element(by.css('back-button'));

    this.getPanelHeading = function() {
        return $$('.panel-heading');
    };

    this.getPanelBody = function() {
        return $$('.panel-body');
    };

    this.clickBackButton = function() {
        this.backButton.click();
    };
}

module.exports = VehicleDetailPage;