import { createMemo, createSignal } from "solid-js";
import { MaterialSymbol } from "~/components/material-symbol";
import { alarm$ } from "~/providers/alarm";

export function AlarmCreate() {
	// component logic
	const [name, setName] = createSignal("New Alarm");
	const [time, setTime] = createSignal("");

	const locked = createMemo(() => !time());

	const submit = (e: SubmitEvent): void => {
		e.preventDefault();
		alarm$.create(name(), time());

		// restore defaults
		setName("New Alarm");
		setTime("");
	};

	// component layout
	return (
		<div class="font-semibold">
			<form class="grid gap-4" on:submit={submit}>
				<ActionLabel locked={locked()} name={name()} update={setName} />
				<TimeInput time={time()} update={setTime} />
			</form>
		</div>
	);
}

function ActionLabel(props: { locked: boolean; name: string; update(value: string): void }) {
	// component logic

	// component layout
	return (
		<div class="join">
			<label class="input input-lg input-ghost join-item w-full">
				<span class="label">
					<MaterialSymbol name="edit" />
				</span>
				<input
					type="text"
					value={props.name}
					on:change={(e) => props.update(e.target.value)}
				/>
			</label>
			<button
				class="btn btn-ghost btn-square btn-lg join-item"
				disabled={props.locked}
				type="submit"
			>
				<MaterialSymbol name="add" />
			</button>
		</div>
	);
}

function TimeInput(props: { time: string; update(value: string): void }) {
	// component logic

	// component layout
	return (
		<div>
			<label class="input input-xl input-ghost w-full">
				<span class="label">
					<MaterialSymbol name="alarm_add" />
				</span>
				<input
					type="time"
					value={props.time}
					on:change={(e) => props.update(e.target.value)}
				/>
			</label>
		</div>
	);
}
