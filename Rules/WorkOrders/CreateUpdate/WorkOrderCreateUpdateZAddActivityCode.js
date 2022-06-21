import {WorkOrderControlsLibrary as LibWoControls} from '../WorkOrderLibrary';

export default function WorkOrderCreateUpdateZAddActivityCode(pageProxy) {
    return LibWoControls.getZAddActivityCode(pageProxy);
}
