
import libCom from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';

export default function GetMalFunctionStartTime(context) {
 let breakdown = libCom.getControlProxy(context,'BreakdownSwitch').getValue();
    let start = null;

    if (breakdown) {
        let date = libCom.getControlProxy(context,'StartTimePicker').getValue();
        date.setSeconds(0);
        let odataDate = new ODataDate(date);
        start = odataDate.toLocalTimeString();//odataDate.toDBTimeString(context); per annullare offset
    }
    return start;
}
