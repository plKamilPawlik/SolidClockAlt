import { createStore, produce } from "solid-js/store";
import { Alarm } from "./api/alarm";

export const [get, set] = createStore<{
	alarms: Alarm[];
}>({
	alarms: [],
});

export const alarm$ = {
	get,
	create(name: string, time: string): void {
		set(
			produce((state) => {
				state.alarms.push(new Alarm(name, time));
				state.alarms.sort();
			}),
		);
	},
	delete(id: symbol): void {
		set(
			produce((state) => {
				state.alarms.find((alarm) => alarm.id === id)?.clear();
				state.alarms = state.alarms.filter((alarm) => alarm.id !== id);
			}),
		);
	},
	update(id: symbol, name: string, time: string): void {
		set(
			produce((state) => {
				const alarm = state.alarms.find((alarm) => alarm.id === id);

				if (alarm) {
					alarm.Name = name;
					alarm.Time = time;
					state.alarms.sort();
				}
			}),
		);
	},
	toggle(id: symbol): void {
		set(
			produce((state) => {
				const alarm = state.alarms.find((alarm) => alarm.id === id);

				switch (alarm?.Active) {
					case true:
						return alarm.clear();
					case false:
						return alarm.schedule();
				}
			}),
		);
	},
} as const;
