import { Skeleton } from "primereact/skeleton";
import qs from "qs";
import { useInvestments } from "../../utils/projectsFunded";
import { useCurrentUser } from "../../utils/user";
function SkeletonProject() {
	return (
		<>
			<div className="grid grid-flow-col items-center my-1">
				<div className="flex items-center">
					<Skeleton height="2.5rem" width="3.5rem" shape="circle" className="mr-2 h-10 w-10" />
					<div className="mr-2 w-full">
						<Skeleton height="0.8rem" width="100%" className="mb-2">
							&nbsp;
						</Skeleton>
						<Skeleton height="0.5rem" width="70%" />
					</div>
				</div>
				<div className="justify-self-end block">
					<div className="font-semibold text-white text-xs">
						<div>{"some dummy text"}</div>
						<Skeleton height="0.8rem" width="70%" className="h-3 w-10">
							&nbsp;
						</Skeleton>
						<div>{"some dummy text"}</div>
					</div>
				</div>
			</div>
		</>
	);
}

function DashboardProjectFunded() {
	const { user } = useCurrentUser();

	const { investments, isLoading, isError } = useInvestments(
		qs.stringify({
			_where: { "user.id": user.id },
			_limit: 3,
			_sort: "created_at:DESC",
		}),
	);

	return (
		<>
			{isError ? (
				<div className="">Error fetching your investments</div>
			) : !isLoading ? (
				<div className="grid grid-flow-row gap-2 ">
					{investments.map((investment) => {
						const imageUrl = investment.project.mainImage ? investment.project.mainImage.url : "/images/default.png";
						return (
							<div className="grid grid-flow-col items-center gap-2 my-1">
								<div className="flex items-center">
									<div className="h-10 w-10 rounded-full bg-green-200 mr-2">
										<img
											className="w-full h-full shadow object-cover object-center rounded-full"
											src={imageUrl}
											alt={investment.project.title}
										/>
									</div>
									<div className="mr-2 w-ful">
										<div className="font-semibold">
											{investment.project.title} ({investment.quantity})
										</div>
										<div className="text-sm">{new Date(investment.created_at).toDateString()}</div>
									</div>
								</div>
								<div className="justify-self-end">
									<div className="font-semibold text-primary-500">{investment.amountPerSlot * investment.quantity}</div>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				new Array(3).map(() => {
					return <SkeletonProject />;
				})
			)}
		</>
	);
}

export default DashboardProjectFunded;
