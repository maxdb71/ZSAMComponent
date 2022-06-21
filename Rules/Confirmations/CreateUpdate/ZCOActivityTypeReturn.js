/**
* Retuns the list of ZCOActivityTypes
* @param {IClientAPI} context
*/
export default function ZCOActivityTypeReturn(context) {
    return context.read('/SAPAssetManager/Services/AssetManager.service', 'ZCOActivityTypes', [], '')
        .then(function (result) {
            let array = [];
            if (result && result.length > 0) {
                for (let index = 0; index < result.length; index++) {
                    const element = result.getItem(index);
                    array.push(
                        {
                            'DisplayValue': `${element.ActivityType} - ${element.ActivityTypeDesc}`,
                            'ReturnValue': element.ActivityType
                        });
                }
                return array;
            } else {
                return [];
            }
        }).catch(function () {
            return [];
        });
}