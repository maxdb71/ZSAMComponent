import libCom from '../../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import libVal from '../../../../../SAPAssetManager/Rules/Common/Library/ValidationLibrary';

export default function WorkOrderOperationCreateUpdateDuration(context) {

    let durationControlValue = libCom.getControlProxy(context,'DurationPkr').getValue();
    if ( !libVal.evalIsEmpty(durationControlValue.toString())){
    	return durationControlValue.toString();
    }
    else
    {
    	return 0;
    }
}
