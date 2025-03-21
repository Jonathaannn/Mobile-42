export default function FormateDate(date: Date) {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return {
		date: `${day}/${month}/${year}`,
		minDate: `${day}/${month}`,
		time: `${hours}:${minutes}`,
	};
}
