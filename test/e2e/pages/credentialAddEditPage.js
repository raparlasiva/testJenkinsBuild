function CredentialAddEditPage() {
    this.username     =  element(by.model('ctrl.frmData.username'));
    this.password     =  element(by.model('ctrl.frmData.password'));
    this.validFrom    =  element(by.model('ctrl.frmData.validFrom'));
    this.validTo      =  element(by.model('ctrl.frmData.validTo'));

    this.saveButton   =  element(by.css('save-button button'));
    this.backButton   =  element(by.css('back-button a'));

    this.clickBackButton = function() {
        this.backButton.click();
    };

    this.clickSaveButton = function() {
        this.saveButton.click();
    };
}

module.exports = CredentialAddEditPage;