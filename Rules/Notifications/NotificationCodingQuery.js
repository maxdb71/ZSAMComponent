//import notification from '../../../SAPAssetManager/Rules/Notifications/NotificationLibrary';
import libCom from '../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function NotificationCodingQuery(context) {
//    return notification.NotificationCodingQuery(context, 'D', 'ZCodingGroup');
     let zcodinggroup = context.getPageProxy().binding.QMCodeGroup;
     let cat = '';
		cat = libCom.getAppParam(context, 'CATALOGTYPE', 'ZCatTypeCoding');
     return "$filter=Catalog eq '" + cat + "' and CodeGroup eq '" + zcodinggroup + "'&$orderby=Code,CodeGroup,Catalog";
}