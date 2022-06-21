import Logger from '../../../../SAPAssetManager/Rules/Log/Logger';
import myPicker from './GetStores';
import UpdateOnlineQueryOptions from './UpdateOnlineQueryOptions'

export default async function StorageLocationDefault(context) {
    try {
        let stores = await myPicker.GetStores(context);
        let myStore = '';
        if (stores.length = 1) {
            myStore = stores[0].ReturnValue;
            context.binding.myStore = myStore;
            return myStore;
        } else {
            context.binding.myStore = myStore;
            return '';
        }
    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(),`PartLibrary.partCreateUpdateOnChange(PlantLstPkr) error: ${err}`);
    }
}