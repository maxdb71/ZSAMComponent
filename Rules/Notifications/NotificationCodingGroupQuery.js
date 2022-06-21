import notification from './NotificationLibrary';
import libCom from '../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
import Logger from '../../../SAPAssetManager/Rules/Log/Logger';

export default function NotificationCodingGroupQuery(context) {
	let query = notification.getCodingGroupQuery(context);
	return query;

	//Determine if we are on create
	let onCreate = libCom.IsOnCreate(context.getPageProxy());
	let floc = context.getPageProxy().binding.HeaderFunctionLocation;
	let equi = context.getPageProxy().binding.HeaderEquipment;
	let cat = libCom.getAppParam(context, 'CATALOGTYPE', 'ZCatTypeCoding');
	if (onCreate) {
		if (equi) {
			let equiQuery = "$filter=EquipId eq  '" + equi + "' and length(CatalogProfile) gt 0";
			return context.read('/SAPAssetManager/Services/AssetManager.service', 'MyEquipments', [], equiQuery).then(function (results) {
				if (results.length > 0) {
					return "$filter=Catalog eq '" + cat + "' and CatalogProfile eq '" + results.getItem(0).CatalogProfile + "'&$orderby=CodeGroup";
				} else if (floc) {
					let flocQuery = "$filter=FuncLocIdIntern eq  '" + floc + "' and length(CatalogProfile) gt 0";
					return context.read('/SAPAssetManager/Services/AssetManager.service', 'MyFunctionalLocations', [], flocQuery).then(function (results) {
						if (results.length > 0) {
							return "$filter=Catalog eq '" + cat + "' and CatalogProfile eq '" + results.getItem(0).CatalogProfile + "'&$orderby=CodeGroup";
						} 
					});
				}
			});
		} else if (floc) {
			let flocQuery = "$filter=FuncLocIdIntern eq  '" + floc + "' and length(CatalogProfile) gt 0";
			return context.read('/SAPAssetManager/Services/AssetManager.service', 'MyFunctionalLocations', [], flocQuery).then(function (results) {
				if (results.length > 0) {
					return "$filter=Catalog eq '" + cat + "' and CatalogProfile eq '" + results.getItem(0).CatalogProfile + "'&$orderby=CodeGroup";
				} else {
					let type = '';
					type = libCom.getAppParam(context, 'NOTIFICATION', 'NotificationType');
					let NotifTypeQuery = "$filter=NotifType eq '" + type + "' and length(CatalogProfile) gt 0";
					return context.read('/SAPAssetManager/Services/AssetManager.service', 'NotificationTypes', [], NotifTypeQuery).then(function (
						results) {
						if (results.length > 0 && results.getItem(0).CatalogProfile) {
							return "$filter=Catalog eq '" + cat + "' and CatalogProfile eq '" + results.getItem(0).CatalogProfile + "'&$orderby=CodeGroup";
						}
					});
				}
			});
		} else {
			let type = '';
			type = libCom.getAppParam(context, 'NOTIFICATION', 'NotificationType');
			let NotifTypeQuery = "$filter=NotifType eq '" + type + "' and length(CatalogProfile) gt 0";
			return context.read('/SAPAssetManager/Services/AssetManager.service', 'NotificationTypes', [], NotifTypeQuery).then(function (results) {
				if (results.length > 0 && results.getItem(0).CatalogProfile) {
					return "$filter=Catalog eq '" + cat + "' and CatalogProfile eq '" + results.getItem(0).CatalogProfile + "'&$orderby=CodeGroup";
				}
			});
		}
	} else {
		return notification.NotificationSubjectCodingGroupQuery(context);
	}
}
