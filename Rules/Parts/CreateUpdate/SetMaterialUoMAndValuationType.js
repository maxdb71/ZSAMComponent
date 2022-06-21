import Logger from '../../../../SAPAssetManager/Rules/Log/Logger';
import libCommon from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function SetMaterialUoMAndValuationType(context) {
    //On material change, re-filter MaterialUOMLstPkr by material
    try {
        let materialUOMListPicker = context.getPageProxy().evaluateTargetPathForAPI('#Control:MaterialUOMLstPkr');
        let materialUOMLstPkrSpecifier = materialUOMListPicker.getTargetSpecifier();
        let materialUOMLstPkrQueryOptions = '$select=UOM&$orderby=UOM';
        let materialUOMs = '';

        if (context.getValue().length > 0) {
            materialUOMs = context.getValue()[0].ReturnValue + '/Material/MaterialUOMs';

            materialUOMListPicker.setValue('');
        } else {
            materialUOMs = 'MaterialUOMs';
            materialUOMLstPkrQueryOptions += '&$filter=MaterialNum eq \'\'';
        }
        materialUOMLstPkrSpecifier.setEntitySet(materialUOMs);
        if (context.getPageProxy().evaluateTargetPathForAPI('#Control:OnlineSwitch').getValue()) {
            //materialUOMLstPkrSpecifier.setService('/SAPAssetManager/Services/OnlineAssetManager.service');
        }
        materialUOMLstPkrSpecifier.setQueryOptions(materialUOMLstPkrQueryOptions);
        materialUOMListPicker.setTargetSpecifier(materialUOMLstPkrSpecifier);
        if (context.binding['@odata.type'] === '#sap_mobile.BOMItem') {
            materialUOMListPicker.setValue(context.binding.UoM);
            materialUOMListPicker.setEditable(false);
        }

        //Enel Customisation to update the Valuation type based on Material selected
        var selection = context.getValue();
        let plantObj = libCommon.getTargetPathValue(context.getPageProxy(), '#Page:PartCreateUpdatePage/#Control:PlantLstPkr/#Value');

        let plant = plantObj[0].ReturnValue;
        let valuationTypeLstPkr = context.getPageProxy().evaluateTargetPathForAPI('#Control:ValuationTypeLstPkr');
        let valuationTypeLstPkrSpecifier = valuationTypeLstPkr.getTargetSpecifier();
        let queryOptions;

        if (selection.length > 0) {
            let matBatches = context.getValue()[0].ReturnValue + '/Material/MaterialBatch_Nav';
            valuationTypeLstPkrSpecifier.setEntitySet(matBatches);
            // REM: --> matBatches = "MaterialSLocs(Plant='USZ0',StorageLocation='W001',MaterialNum='2000948477')/Material/MaterialBatch_Nav"
            let myArray = context.getValue()[0].ReturnValue.split("=");
            let relevantPart = myArray[2];
            let myStore = relevantPart.substring(1, 5);
            let storageLocationLstPkr = context.getPageProxy().evaluateTargetPathForAPI('#Control:StorageLocationLstPkr');
            let storageLocationLstPkrSpecifier = storageLocationLstPkr.getTargetSpecifier();
            let storagelocationQueryOptions = `$orderby=StorageLocation&$filter=Plant eq '${plant}' and StorageLocation eq '${myStore}'`;
            storageLocationLstPkrSpecifier.setEntitySet('StorageLocations');
            storageLocationLstPkrSpecifier.setQueryOptions(storagelocationQueryOptions);
            storageLocationLstPkrSpecifier.setReturnValue('{StorageLocation}');
            storageLocationLstPkrSpecifier.setDisplayValue('{{#Property:StorageLocation}} - {{#Property:StorageLocationDesc}}');
            storageLocationLstPkrSpecifier.setService("/SAPAssetManager/Services/AssetManager.service");
            storageLocationLstPkr.setTargetSpecifier(storageLocationLstPkrSpecifier);
            storageLocationLstPkr.setValue(myStore);
            context.binding.comingFromMaterial = true;
        } else {
            plant = '----';
        }

        queryOptions = "$filter=Plant eq '" + plant + "'&";
        queryOptions = queryOptions + "$orderby=Batch";
        valuationTypeLstPkrSpecifier.setQueryOptions(queryOptions);
        valuationTypeLstPkr.setTargetSpecifier(valuationTypeLstPkrSpecifier);
        valuationTypeLstPkr.setValue('');

    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(), `PartLibrary.partCreateUpdateOnChange(MaterialLstPkr) error: ${err}`);
    }
}
