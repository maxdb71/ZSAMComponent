import Logger from '../../../../SAPAssetManager/Rules/Log/Logger';
import myPicker from './GetStores';

export default async function StorageLocationsPkrLst(context) {
    try {
        let myStores = await myPicker.GetStores(context);
        return myStores;
    } catch (err) {
        /**Implementing our Logger class*/
        Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryParts.global').getValue(),`PartLibrary.partCreateUpdateOnChange(PlantLstPkr) error: ${err}`);
    }
}
