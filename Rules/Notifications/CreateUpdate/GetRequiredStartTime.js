import libCom from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';

export default function GetRequiredStartTime(context) {
 let breakdown = libCom.getControlProxy(context,'BreakdownSwitch').getValue();
    let start = null;

    if (breakdown) {
        let requiredtime = libCom.getControlProxy(context,'RequiredStartTimePicker').getValue();
        requiredtime.setSeconds(0);
        let odataDate = new ODataDate(requiredtime);
        start = odataDate.toLocalTimeString();//odataDate.toDBTimeString(context);
    }
    return start;
}
