export default function FormatRequiredEndTime(context) {
	let obj = context.getBindingObject();
	let date = null;
	let time = null;
	if (obj.ZRequiredEndTime) {
		time = obj.ZRequiredEndTime;
		date = new Date(obj.RequiredEndDate);

	if (time) {
		let hours = 0;
		let minutes = 0;
		let seconds = 0;
		hours = time.substring(0, 2) * 1;
		minutes = time.substring(3, 5) * 1;
		seconds = time.substring(6, 8) * 1;
		date.setHours(hours, minutes, seconds, 0);
		return date;
	}
}
}