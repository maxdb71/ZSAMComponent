
import libCom from '../../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import ODataDate from '../../../../../SAPAssetManager/Rules/Common/Date/ODataDate';

// Enel Customization
// date/time W/O conversion to DB date/time

export default function GetStartTimeWoConversion(context) {
    let date = libCom.getControlProxy(context, 'StartTimePicker').getValue();
    date.setSeconds(0);
    let odataDate = new ODataDate(date);
    //return odataDate.toDBTimeString(context);
    return odataDate.toLocalTimeString(context);
}

