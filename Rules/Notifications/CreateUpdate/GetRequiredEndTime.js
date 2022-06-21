import libCom from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';

export default function GetRequiredEndTime(context) {
 let breakdown = libCom.getControlProxy(context,'BreakdownSwitch').getValue();
    let end = null;

    if (breakdown) {
        let requiredtime = libCom.getControlProxy(context,'RequiredTimePicker').getValue();
        requiredtime.setSeconds(0);
        let odataDate = new ODataDate(requiredtime);
        end = odataDate.toLocalTimeString();//odataDate.toDBTimeString(context);
    }
    return end;
}
