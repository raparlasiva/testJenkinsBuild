function VehicleAdd() {

    this.vehicleDescription  =  element(by.model('ctrl.frmData.description'));

    this.saveButton   =  element(by.css('save-button button'));
    this.backButton   =  element(by.css('back-button a'));

    this.clickBackButton = function() {
        this.backButton.click();
    };

    this.clickSaveButton = function() {
        this.saveButton.click();
    };
}

module.exports = VehicleAdd;