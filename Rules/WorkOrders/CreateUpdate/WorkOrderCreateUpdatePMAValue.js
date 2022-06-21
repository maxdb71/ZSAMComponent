import {WorkOrderControlsLibrary as LibWoControls} from '../WorkOrderLibrary';

export default function WorkOrderCreateUpdatePMAValue(pageProxy) {
    return LibWoControls.getPMActivityType(pageProxy);
}
