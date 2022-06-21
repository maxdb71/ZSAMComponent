import libCom from '../../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
export default function GetDuration(context) {
    let durationControlValue = libCom.getControlProxy(context,'DurationPkr').getValue();
    let duration = durationControlValue/60;
    return duration.toString();
}
