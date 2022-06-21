import {OperationControlLibrary as libOperationControl} from '../WorkOrderOperationLibrary';

export default function WorkOrderOperationCreateUpdateDurationUOM(pageProxy) {
    return libOperationControl.getDurationUOM(pageProxy);
}
