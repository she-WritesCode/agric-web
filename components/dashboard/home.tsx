import DashboardNav from "./dashboard-nav";
import DashboardProjectFunded from "./dashboard-projects-funded";
import DashboardProjectUpdates from "./dashboard-project-updates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import qs from "qs";
import { useInvestments } from "../../utils/projectsFunded";
import { useCurrentUser } from "../../utils/user";
import { toCurrency } from "../../utils/helpers";

export interface DashboardProps {
	summary: any;
	user: any;
	updates: any;
	projectsFunded: any;
}

function DashboardHome() {
	const { user } = useCurrentUser();

	const { investments, isLoading, isError } = useInvestments(
		qs.stringify({
			_where: { "user.id": user.id },
			_limit: 3,
			_sort: "created_at:DESC",
		}),
	);

	const totalInvestments = investments
		.map((investment) => investment.amountPerSlot * investment.quantity)
		.reduce((a, b) => a + b, 0);

	const totalProjectSlots = investments.map((investment) => investment.quantity).reduce((a, b) => a + b, 0);

	const nextEndCycleDate = investments
		.map((investment) => {
			const date = new Date(investment.created_at);
			return new Date(date.setMonth(date.getMonth() + investment.project.duration));
		})
		.sort((a, b) => a.getTime() - b.getTime())[0]
		?.toDateString();

	return (
		<>
			<div className="flex gap-4 py-2 border-b-2 mb-4">
				<div className="rounded-full bg-green-100 text-primary-600 w-16 h-16 font-bold flex items-center justify-center">
					BO
				</div>
				<div>
					<div className="text-xl font-bold">
						Welcome back, {user.firstname} {user.lastname}
					</div>
					<div>You can manage your account here</div>
				</div>
			</div>

			<div className="bg-primary-500 py-2 px-4 text-white mb-6 rounded">
				<div className="flex flex-wrap flex-row md:justify-between md:items-center text-sm">
					<div className="text-base font-semibold mb-2 w-full md:w-auto">Start Investing:</div>
					<div className="p-2 flex items-center md:justify-center">
						<div className="mr-2 font-bold border-2 border-white rounded-full h-8 w-8 flex items-center justify-center">
							1
						</div>
						<div>Basic Info</div>
					</div>
					<div className="p-2 flex items-center md:justify-center">
						<div className="mr-2 font-bold border-2 border-white rounded-full h-8 w-8 flex items-center justify-center">
							2
						</div>
						<div>Verify your account</div>
					</div>
					<div className="p-2 flex items-center md:justify-center">
						<div className="mr-2 font-bold border-2 border-white rounded-full h-8 w-8 flex items-center justify-center">
							3
						</div>
						<div>Fund a project</div>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-2 mb-4 gap-8">
				<div>
					<h4 className="text-lg font-semibold mb-2">Summary</h4>
					<div className="grid grid-cols-2 bg-white shadow rounded">
						<div className="col-span-2 bg-primary-500 text-white">
							<div className="flex flex-col items-center justify-center px-4 py-4 text-center">
								<div className="text-xs uppercase">Total Projects Funded</div>
								<div className="text-xl font-bold"> {toCurrency(totalInvestments)}</div>
							</div>
						</div>
						<div className="">
							<div className="flex flex-col items-center justify-center px-4 py-4 text-center">
								<div className="text-xl font-bold"> {totalProjectSlots}</div>
								<div className="text-xs uppercase">Project Slots Sponsored</div>
							</div>
						</div>
						<div className="">
							<div className="flex flex-col items-center justify-center px-4 py-4 text-center">
								<div className="text-xl font-bold">{nextEndCycleDate}</div>
								<div className="text-xs uppercase">Next End-Of-Cycle Date</div>
							</div>
						</div>
					</div>
				</div>
				<div className="">
					<h4 className="text-lg font-semibold align-bottom mb-2 inline-block">Projects Funded</h4>

					<a
						href="#"
						className="inline-block float-right text-sm text-primary-500 hover:bg-primary-500 hover:text-white rounded-3xl py-1 px-3 "
					>
						View all <FontAwesomeIcon icon={faArrowRight} />
					</a>

					<div className="shadow rounded py-2 bg-white px-4">
						<DashboardProjectFunded />
					</div>
				</div>
				<div className="md:col-span-2">
					<h4 className="text-lg font-semibold align-bottom mb-2 inline-block">Project Updates</h4>

					<a
						href="#"
						className="inline-block float-right text-sm text-primary-500 hover:bg-primary-500 hover:text-white rounded-3xl py-1 px-3 "
					>
						View all <FontAwesomeIcon icon={faArrowRight} />
					</a>
					<div className="shadow rounded bg-white py-4 px-4">
						<DashboardProjectUpdates />
					</div>
				</div>
			</div>
		</>
	);
}

export default DashboardHome;
