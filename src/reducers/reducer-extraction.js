import _ from 'lodash'

import {
    customerList,
    customerData,
    documentTypes
} from "../mockdata/mockData";

import * as appConstants from '../constants/appConstants';
import {Utils} from '../utils/utils';

export default {
    fetchDocumentTypes: function () {
        //implement server call here fro customer data
        return documentTypes;
    },

    fetchSampleFile: function(){
      //TODO: ideally fetch files from server
      return documentTypes;
    },

    switchToExtractionScreen: function(oRet){
        let documentTypes = this.fetchDocumentTypes();
        Object.assign(oRet, {documentTypes});
    },

}