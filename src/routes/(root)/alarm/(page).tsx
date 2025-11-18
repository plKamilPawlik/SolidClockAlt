import { PageView } from "~/components/page-view";
import { AlarmCreate } from "~/fragments/alarm-create";
import { AlarmList } from "~/fragments/alarm-list";

export default function () {
	// component logic

	// component layout
	return (
		<PageView class="flex flex-col items-center gap-6 p-6">
			<section class="w-full max-w-lg">
				<AlarmCreate />
			</section>
			<div class="divider px-4 sm:px-12 md:px-24">
				<span>Your Alarms</span>
			</div>
			<section class="w-full max-w-lg">
				<AlarmList />
			</section>
		</PageView>
	);
}
