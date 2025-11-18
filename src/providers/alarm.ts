import { createStore } from "solid-js/store";
import { Alarm } from "./api/alarm";

export const [get, set] = createStore<{
	alarms: Alarm[];
	unique: Map<symbol, Alarm>;
}>({
	alarms: [],
	unique: new Map(),
});

export const alarm$ = {
	get,
	create(name: string, time: string): void {
		set("alarms", () => {
			const alarm = new Alarm(name, time);
			get.unique.set(alarm.id, alarm);

			return [...get.unique.values()].sort();
		});
	},
	delete(id: symbol): void {
		set("alarms", () => {
			if (get.unique.has(id)) {
				get.unique.get(id)!.clear();
				get.unique.delete(id);
			}

			return [...get.unique.values()].sort();
		});
	},
	update(id: symbol, name: string, time: string): void {
		set("alarms", () => {
			if (get.unique.has(id)) {
				get.unique.get(id)!.Name = name;
				get.unique.get(id)!.Time = time;
			}

			return [...get.unique.values()].sort();
		});
	},
	toggle(id: symbol): void {
		set("alarms", () => {
			const alarm = get.unique.get(id);

			switch (alarm?.Active) {
				case true:
					alarm.clear();
					break;
				case false:
					alarm.schedule();
					break;
			}

			return [...get.unique.values()].sort();
		});
	},
} as const;
