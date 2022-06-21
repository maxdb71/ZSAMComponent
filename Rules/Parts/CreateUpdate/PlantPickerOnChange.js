import Logger from '../../../../SAPAssetManager/Rules/Log/Logger';
import UpdateOnlineQueryOptions from '../../../../SAPAssetManager/Rules/Parts/CreateUpdate/UpdateOnlineQueryOptions';

export default function PlantPickerOnChange(context) {
    try {
        let plant = '';

        if (context.getValue().length > 0) {
            plant = context.getValue()[0].ReturnValue;
        }

        if (plant) {
            let storageLocationLstPkr = context.getPageProxy().evaluateTargetPathForAPI('#Control:StorageLocationLstPkr');
            let storageLocationLstPkrSpecifier = storageLocationLstPkr.getTargetSpecifier();
            let storagelocationQueryOptions = `$orderby=StorageLocation&$filter=Plant eq '${plant}' `;
            storageLocationLstPkrSpecifier.setEntitySet('StorageLocations');
            storageLocationLstPkrSpecifier.setQueryOptions(storagelocationQueryOptions);
            storageLocationLstPkrSpecifier.setReturnValue('{StorageLocation}');
            storageLocationLstPkrSpecifier.setDisplayValue('{{#Property:StorageLocation}} - {{#Property:StorageLocationDesc}}');
            storageLocationLstPkrSpecifier.setService("/SAPAssetManager/Services/AssetManager.service");
            storageLocationLstPkr.setTargetSpecifier(storageLocationLstPkrSpecifier);
            let pageProxy = context.getPageProxy();
            pageProxy.getControls()[0].redraw();
            //pageProxy.redraw();
            //storageLocationLstPkr.redraw();
            UpdateOnlineQueryOptions(context);
        }
    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(),`PartLibrary.partCreateUpdateOnChange(PlantLstPkr) error: ${err}`);
    }
}

