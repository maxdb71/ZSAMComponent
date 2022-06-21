import fromOpsList from '../../../../../SAPAssetManager/Rules/WorkOrders/Operations/IsOperationCreateFromOperationsList';

export default function RequiredFields(context) {
    let req = [
        'DescriptionNote',
        'ControlKeyLstPkr',
    ];
    //kazzex
    let duration = '';
    let durationUOM = '';

    duration = context.evaluateTargetPath('#Control:DurationPkr/#Value');
    if (context.evaluateTargetPath('#Control:DurationUOMLstPkr/#Value').length > 0) {
        durationUOM = context.evaluateTargetPath('#Control:DurationUOMLstPkr/#SelectedValue');
    }

    if (duration) {
        req.push('DurationUOMLstPkr');
    }
    if (durationUOM) {
        req.push('DurationPkr');
    }
    if (duration || durationUOM) {
        req.push('WorkUnitLstPkr');
    }
    
    if (fromOpsList(context)) {
        req.push('WorkOrderLstPkr');
    }

    return req;
}