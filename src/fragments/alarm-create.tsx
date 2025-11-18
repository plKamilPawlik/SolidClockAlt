import { alarm$ } from "~/providers/alarm";
import { AlarmEdit } from "./alarm-edit";

export function AlarmCreate() {
	// component logic
	const submit = (name: string, time: string): void => {
		alarm$.create(name, time);
	};

	// component layout
	return <AlarmEdit defaultName="New Alarm" defaultTime="" handleSubmit={submit} />;
}
