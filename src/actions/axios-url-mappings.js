let URLMapping = function () {
    this.ServerURL="http://localhost:9090/"

    this.GetCustomerList = this.ServerURL+'customerList';
    this.GetDocumentTypes = this.ServerURL+'documentTypes';
    this.GetSelectedCustomerData = this.ServerURL+'selectedCustomerData';
    this.SaveTableData = this.ServerURL+'updateCustomerData';
    this.GetGroupedElementsByDocId = this.ServerURL+'getGroupedDocumentElements';
    this.GetSampleDocumentByDocId = this.ServerURL+'getSampleDocument';
    this.GetAllGroupsCSVData = this.ServerURL+'getAllGroupsCSVData';
    this.SaveGroupedElementData = this.ServerURL+'saveGroupedDocumentElements';
    this.AddNewCustomer = this.ServerURL+'addNewCustomer';
    this.AddNewDocumentType = this.ServerURL+'addNewDocumentType';
};

export default new URLMapping();

