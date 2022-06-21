import libCom from '../../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import libVal from '../../../../../SAPAssetManager/Rules/Common/Library/ValidationLibrary';

export default function WorkOrderOperationCreateUpdateNoOfCapacities(context) {

    let capControlValue = libCom.getControlProxy(context,'NoOfCapacitiesPkr').getValue();
    let capStr=capControlValue.toString();
   
    if ( !libVal.evalIsEmpty(capStr)){
    	return capStr;
    }
    else
    {
    	return 0;
    }
    	
}
