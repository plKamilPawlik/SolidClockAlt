import { MaterialSymbol } from "~/components/material-symbol";
import { alarm$ } from "~/providers/alarm";
import type { Alarm } from "~/providers/api/alarm";
import { AlarmEdit } from "./alarm-edit";

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
	let dialog!: HTMLDialogElement;

	const deleteAlarm = (): void => {
		if (confirm("Are you sure you want to permanently delete this alarm?")) {
			alarm$.delete(props.alarm.id);
		}
	};

	const toggleAlarm = (): void => {
		alarm$.toggle(props.alarm.id);
	};

	const openDialog = (): void => {
		dialog.showModal();
	};

	// component layout
	return (
		<li>
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
						on:click={openDialog}
					>
						<MaterialSymbol name="edit_note" />
					</button>
				</div>
				<EditDialog alarm={props.alarm} ref={dialog} />
			</div>
		</li>
	);
}

function EditDialog(props: { alarm: Alarm; ref: HTMLDialogElement }) {
	// component logic
	let form!: HTMLFormElement;

	const editAlarm = (name: string, time: string): void => {
		alarm$.update(props.alarm.id, name, time);
		form.submit();
	};

	// component layout
	return (
		<dialog class="modal" ref={props.ref}>
			<div class="modal-box">
				<AlarmEdit
					defaultName={props.alarm.Name}
					defaultTime={props.alarm.Time}
					handleSubmit={editAlarm}
				/>
				<div class="modal-action">
					<form method="dialog" ref={form}>
						<button class="btn btn-soft" type="submit">
							Close
						</button>
					</form>
				</div>
			</div>
		</dialog>
	);
}
