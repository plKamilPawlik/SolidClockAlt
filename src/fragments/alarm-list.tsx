import { MaterialSymbol } from "~/components/material-symbol";
import { alarm$ } from "~/providers/alarm";
import type { Alarm } from "~/providers/api/alarm";

export function AlarmList() {
	// component logic

	// component layout
	return (
		<ul class="flex flex-col gap-4">
			{alarm$.get.alarms.map((alarm) => (
				<AlarmCard alarm={alarm} />
			))}
		</ul>
	);
}

function AlarmCard(props: { alarm: Alarm }) {
	// component logic
	const deleteAlarm = (): void => {
		if (confirm("Are you sure you want to permanently delete this alarm?")) {
			alarm$.delete(props.alarm.id);
		}
	};

	const editAlarm = (): void => {};

	const toggleAlarm = (): void => {
		alarm$.toggle(props.alarm.id);
	};

	// component layout
	return (
		<li class="stats bg-base-200 drop-shadow-lg">
			<div class="stat">
				<p class="stat-title">{props.alarm.Name}</p>
				<p class="stat-value">
					<time class="tabular-nums">{props.alarm.Time}</time>
				</p>
				<div class="stat-actions flex justify-end gap-2">
					<label class="label mr-auto">
						<input
							checked={props.alarm.Active}
							class="toggle toggle-success"
							type="checkbox"
							on:change={toggleAlarm}
						/>
						Active
					</label>
					<button
						class="btn btn-error btn-square btn-soft btn-sm"
						type="button"
						on:click={deleteAlarm}
					>
						<MaterialSymbol name="delete" />
					</button>
					<button
						class="btn btn-info btn-square btn-soft btn-sm"
						type="button"
						on:click={editAlarm}
					>
						<MaterialSymbol name="edit_note" />
					</button>
				</div>
			</div>
		</li>
	);
}
