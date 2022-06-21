import libPart from '../PartLibrary';

export default function PartValuationTypeQueryOptions(pageClientAPI) {

    if (!pageClientAPI) {
        throw new TypeError('Context can\'t be null or undefined');
    }

    return libPart.partValuationTypeQueryOptions(pageClientAPI);

}
