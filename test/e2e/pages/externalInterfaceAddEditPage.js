function ExtInterfaceAddEditPage() {
    this.type         =  element(by.model('ctrl.frmData.type'));
    this.username     =  element(by.model('ctrl.frmData.username'));
    this.password     =  element(by.model('ctrl.frmData.password'));
    this.wsdl         =  element(by.model('ctrl.frmData.wsdl'));
    this.url          =  element(by.model('ctrl.frmData.url'));

    this.saveButton   =  element(by.css('save-button button'));
    this.backButton   =  element(by.css('back-button a'));
    
    this.form         = element(by.css('ng-submit="ctrl.saveData(credentialFrm);"'));

    this.clickBackButton = function() {
        this.backButton.click();
    };

    this.clickSaveButton = function() {
        this.saveButton.click();
    };
}

module.exports = ExtInterfaceAddEditPage;