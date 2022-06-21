export default function DigitalImpactOnValueChange(context) {
	// run the on value change if material is not batch enabled
	var selection = context.getValue();

    let digImpCatLstPkr = context.getPageProxy().evaluateTargetPathForAPI('#Control:ZDigitalImpactCategoryTypeLstPkr');
    let digImpCatLstPkrSpecifier = digImpCatLstPkr.getTargetSpecifier();
    digImpCatLstPkrSpecifier.setEntitySet("ZDigitalImpactCategorys");
    digImpCatLstPkrSpecifier.setService('/SAPAssetManager/Services/AssetManager.service');
    digImpCatLstPkrSpecifier.setReturnValue('{DIG_CAT}');
    
    let queryOptions;
    if (selection.length > 0) {
    	var digImp = selection[0].ReturnValue;
        queryOptions = "$filter=DIG_IMP  eq '" + digImp + "'&";
    }
    
    queryOptions = queryOptions + "$orderby=DIG_CAT";
    digImpCatLstPkrSpecifier.setQueryOptions(queryOptions);
    return digImpCatLstPkr.setTargetSpecifier(digImpCatLstPkrSpecifier);
 }
