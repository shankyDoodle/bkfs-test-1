let URLMapping = function () {
    this.ServerURL="http://localhost:9090/"

    this.GetCustomerList = this.ServerURL+'customerList';
    this.GetDocumentTypes = this.ServerURL+'documentTypes';
};

export default new URLMapping();

