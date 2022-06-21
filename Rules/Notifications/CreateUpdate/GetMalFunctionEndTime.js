
import libCom from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';

export default function GetMalFunctionEndTime(context) {
 let breakdown = libCom.getControlProxy(context,'BreakdownSwitch').getValue();
    let end = null;

    if (breakdown) {
        let date = libCom.getControlProxy(context,'EndTimePicker').getValue();
        date.setSeconds(0);
        let odataDate = new ODataDate(date);
        end = odataDate.toLocalTimeString(); //odataDate.toDBTimeString(context);
    }
    return end;
}
