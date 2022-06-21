
export default function SearchCriteriaFieldsVisibility(context) {
 let toggle = false;

    if (context.getValue() === true) {
        toggle = true;
    }
    context.getPageProxy().evaluateTargetPath('#Control:StartDatePicker').setVisible(toggle);
    context.getPageProxy().evaluateTargetPath('#Control:StartTimePicker').setVisible(toggle);
    context.getPageProxy().evaluateTargetPath('#Control:RequiredDatePicker').setVisible(toggle);
    context.getPageProxy().evaluateTargetPath('#Control:RequiredTimePicker').setVisible(toggle);
/* revert Piervincenzo modification */
    context.getPageProxy().evaluateTargetPath('#Control:EndDatePicker').setVisible(toggle);
    context.getPageProxy().evaluateTargetPath('#Control:EndTimePicker').setVisible(toggle);
    context.getPageProxy().evaluateTargetPath('#Control:RequiredStartDatePicker').setVisible(toggle);
    context.getPageProxy().evaluateTargetPath('#Control:RequiredStartTimePicker').setVisible(toggle);

}
