import {OperationControlLibrary as libOperationControl} from '../WorkOrderOperationLibrary';

export default function WorkOrderOperationCreateUpdateMainWorkUnit(pageProxy) {
    return libOperationControl.getWorkUnit(pageProxy);
}
