import Logger from '../../../../SAPAssetManager/Rules/Log/Logger';
import libCommon from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
//import myPicker from './GetStore';
export default class {
    static async GetStores(context) {
        try {

            let odataType = context.binding['@odata.type'];
            let entitySet = context.binding['@odata.id'];
            let properties = '';
            let queryOptions = '';

            if (odataType == "#sap_mobile.MyWorkOrderHeader") {
                properties = 'FunctionalLocation/MaintPlant';
                queryOptions = '$expand=FunctionalLocation';
            } else {
                properties = 'WOHeader/FunctionalLocation/MaintPlant';
                queryOptions = '$expand=WOHeader($expand=FunctionalLocation)';
            }

            return context.read('/SAPAssetManager/Services/AssetManager.service', entitySet, [properties], queryOptions)
                .then(result => {
                    if (result && result.length > 0) {
                        let options = '';
                        let maintPlant = '';
                        let item = result.getItem(0);
                        if (item.FunctionalLocation == undefined) {
                            maintPlant = item.WOHeader.FunctionalLocation.MaintPlant;
                        } else {
                            maintPlant = item.FunctionalLocation.MaintPlant;
                        }
                        if (maintPlant == '' | maintPlant == undefined) {
                            options = "$orderby=StorageLocation";
                        } else {
                            options = "$orderby=StorageLocation&$filter=Plant eq '" + maintPlant + "'";
                        }
                        return context.read("/SAPAssetManager/Services/AssetManager.service", "StorageLocations", [], options)
                            .then(function (result) {
                                let jsonResult = [];
                                result.forEach(function (element) {
                                    jsonResult.push(
                                        {
                                            'DisplayValue': `${element.StorageLocation} - ${element.StorageLocationDesc}`,
                                            'ReturnValue': element.StorageLocation
                                        });
                                });
                                const uniqueSet = new Set(jsonResult.map(item => JSON.stringify(item)));
                                let finalResult = [...uniqueSet].map(item => JSON.parse(item));
                                return finalResult;
                            }).catch(function () {
                                return [];
                            });
                    } else {
                        return [];
                    }
                }).catch(function () {
                    return [];
                });
        } catch (err) {
            /**Implementing our Logger class*/
            Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(), `PartLibrary.partCreateUpdateOnChange(PlantLstPkr) error: ${err}`);
        }
    }
}

