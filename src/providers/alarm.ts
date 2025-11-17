import { createStore, produce } from "solid-js/store";
import { Alarm } from "./api/alarm";

export const [get, set] = createStore<{
	list: Alarm[];
}>({
	list: [],
});

export const alarm$ = {
	get,
	create(name: string, time: string): void {
		set(
			produce((state) => {
				state.list.push(new Alarm(name, time));
				state.list.sort();
			}),
		);
	},
	delete(id: symbol): void {
		set(
			produce((state) => {
				state.list.find((alarm) => alarm.id === id)?.clear();
				state.list = state.list.filter((alarm) => alarm.id !== id);
			}),
		);
	},
	update(id: symbol, name: string, time: string): void {
		set(
			produce((state) => {
				const alarm = state.list.find((alarm) => alarm.id === id);

				if (alarm) {
					alarm.Name = name;
					alarm.Time = time;
					state.list.sort();
				}
			}),
		);
	},
} as const;
