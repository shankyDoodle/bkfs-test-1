let URLMapping = function () {
    this.ServerURL="http://localhost:9090/"

    this.GetCustomerList = this.ServerURL+'customerList';
    this.GetDocumentTypes = this.ServerURL+'documentTypes';
    this.GetSelectedCustomerData = this.ServerURL+'selectedCustomerData';
    this.GetSelectedDocumentSamples = this.ServerURL+'selectedDocumentSamples';
};

export default new URLMapping();

