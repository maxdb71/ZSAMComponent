export default function NotificationGetInfo(context) {

    let entitySet = '';
    if (context.getName() == "DamageGroupLstPkr" || context.getName() == "DamageDetailsLstPkr" || context.getName() == "ItemDescription" ) {
        entitySet = context.binding['@odata.readLink'] + '/Items';
        return context.read('/SAPAssetManager/Services/AssetManager.service', entitySet, [], '').then( results => {
            let value = '';
            if (results.length > 0) {
                let item = results.getItem(0);
                switch (context.getName()) {
                    case "DamageGroupLstPkr":
                        value = item.CodeGroup;
                        break;
                    case "DamageDetailsLstPkr":
                        value = item.DamageCode;
                        break;
                    case "ItemDescription":
                        value = item.ItemText;
                        break;
                    default:
                        return '';
                }
            }
            return value;
        })
        .catch(function(e) {
            return '';
        });
    } else {
        entitySet = context.binding['@odata.readLink'] + '/Items';
        return context.read('/SAPAssetManager/Services/AssetManager.service', entitySet, [], '').then( results => {
            let value = '';
            if (results.length > 0) {
                let item = results.getItem(0);
                entitySet = item['@odata.readLink'] + '/ItemCauses';
                return context.read('/SAPAssetManager/Services/AssetManager.service', entitySet, [], '').then( results => {
                    let value = '';
                    if (results.length > 0) {
                        let item = results.getItem(0);
                        switch (context.getName()) {
                            case "CauseGroupLstPkr":
                                value = item.CauseCodeGroup;
                                break;
                            case "CodeLstPkr":
                                value = item.CauseCode;
                                break;
                            case "CauseDescription":
                                value = item.CauseText;
                                break;
                            default:
                                return '';
                        }
                    }
                    return value;
                })
                .catch(function(e) {
                    return '';
                });
            }
            return value;
        })
    }

}
