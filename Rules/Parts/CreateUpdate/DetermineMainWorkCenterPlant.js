import Logger from '../../../../SAPAssetManager/Rules/Log/Logger';
import libCommon from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';


export default async function DetermineMainWorkCenterPlant(context) {
    try {
        //let isLocal = libCommon.getTargetPathValue(context, '#Property:@sap.isLocal');
        let odataType = context.binding['@odata.type'];
        let properties = '';
        let queryOptions = '';

        if (odataType == "#sap_mobile.MyWorkOrderHeader") {
            properties = 'FunctionalLocation/MaintPlant';
            queryOptions = '$expand=FunctionalLocation';
        } else {
            properties = 'WOHeader/FunctionalLocation/MaintPlant';
            queryOptions = '$expand=WOHeader($expand=FunctionalLocation)';
        }

        let entitySet = context.binding['@odata.id'];
        return context.read('/SAPAssetManager/Services/AssetManager.service', entitySet, [properties], queryOptions)
            .then(function (result) {
                if (result && result.length > 0) {
                    let maintPlant = '';
                    let item = result.getItem(0);
                    if (item.FunctionalLocation == undefined) {
                        maintPlant = item.WOHeader.FunctionalLocation.MaintPlant;
                    } else {
                        maintPlant = item.FunctionalLocation.MaintPlant;
                    }
                    if (maintPlant == '' | maintPlant == undefined) {
                        return [];
                    } else {
                        return maintPlant;
                    }
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