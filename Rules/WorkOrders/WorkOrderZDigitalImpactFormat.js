
export default function WorkOrderZDigitalImpactFormat(context) {
	let binding = context.getBindingObject();

	if (binding) {       
        return context.read('/SAPAssetManager/Services/AssetManager.service',
                    'ZDigitalImpacts',
                    [],
                    "$filter=dig_imp eq '" + binding.ZDigitalImpact + "'" )
                    .then(digimp => {
                        if (digimp.getItem(0) && digimp.getItem(0).des_imp) {
                            return digimp.getItem(0).dig_imp + "-" + digimp.getItem(0).des_imp;
                        } else {
                            return digimp.getItem(0).dig_imp;
                        }
                    });
			
        }
    return ' ';

}