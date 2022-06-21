/*import OnDateChanged from '../../../SAPAssetManager/Rules/Common/OnDateChanged';
import { JailbreakDetector } from 'nativescript-jailbreak-detector';
import {isIOS} from "tns-core-modules/platform";
import Logger from '../../../SAPAssetManager/Rules/Log/Logger';

export default function OverviewOnPageLoad(context) {
    // First time the page has loaded, call OnDateChanged
    OnDateChanged(context);
    if (isIOS && new JailbreakDetector().isJailBroken()) {
    Logger.error("JailBroken", "Device Error");
    return Promise.reject('jailbroken');
}
}*/
