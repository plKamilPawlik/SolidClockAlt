export class Alarm {
	readonly id: symbol;

	private hours24!: number;
	private minutes!: number;
	private timeout?: number;

	constructor(
		private name: string,
		private time: string,
	) {
		this.id = Symbol("alarm-id");
		this.Name = name;
		this.Time = time;
		this.schedule();
	}

	get Name(): string {
		return this.name;
	}

	get Time(): string {
		return this.time;
	}

	set Name(name: string) {
		this.name = name;
	}

	set Time(time: string) {
		this.clear();
		this.hours24 = Number.parseInt(time.slice(0, 2), 10);
		this.minutes = Number.parseInt(time.slice(3, 5), 10);
	}

	alarm(): void {
		this.alert();
		this.clear();
		this.schedule();
	}

	alert(): void {
		alert(`Alarm! [${this.name}]`);
	}

	clear(): void {
		clearTimeout(this.timeout);
	}

	schedule(): void {
		this.clear();

		const targetDate = new Date();
		targetDate.setHours(this.hours24);
		targetDate.setMinutes(this.minutes);
		targetDate.setSeconds(0, 0);

		if (targetDate.getTime() <= Date.now()) {
			targetDate.setDate(targetDate.getDate() + 1);
		}

		const delayMS = targetDate.getTime() - Date.now();
		this.timeout = setTimeout(() => this.alarm(), delayMS);
	}

	toString(): string {
		return `${this.time} - ${this.name}`;
	}
}
