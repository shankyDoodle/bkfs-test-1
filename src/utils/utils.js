import * as appConstants from "../constants/appConstants";
import _ from 'lodash';

export const Utils = {
    makeObjectDirty: function(oObjectToMakeDirty){
        if (!oObjectToMakeDirty.clonedObject) {
            oObjectToMakeDirty.clonedObject = _.cloneDeep(oObjectToMakeDirty);
            oObjectToMakeDirty.isDirty = true;
        }
        return oObjectToMakeDirty
    },

    getDirtyData: function (oData) {
        oData = this.makeObjectDirty(oData);
        return oData.clonedObject
    },

}