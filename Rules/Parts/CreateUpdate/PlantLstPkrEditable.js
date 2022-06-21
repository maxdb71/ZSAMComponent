import libCommon from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function PlantLstPkrEditable(context) {
    let decide = false;
    return decide;
    let isLocal = libCommon.getTargetPathValue(context, '#Property:@sap.isLocal');
    if (isLocal) {
        return true;
    } else {
        return false;
    }
}


