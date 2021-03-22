import { Skeleton } from "primereact/skeleton";
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
	const items: any[] = [];
	return (
		<>
			{items.length
				? items.map(() => {
						return (
							<div className="grid grid-flow-col items-center my-1">
								<div className="flex items-center">
									<div className="h-10 w-10 rounded-full bg-green-200 mr-2">
										<img
											className="w-full h-full object-cover object-center rounded-full"
											src="https://picsum.photos/300"
											alt=""
										/>
									</div>
									<div className="mr-2 w-ful">
										<div className="font-semibold">Catfish hatery at epe</div>
										<div className="text-sm">January 25 2021</div>
									</div>
								</div>
								<div className="justify-self-end">
									<div className="font-semibold text-primary-500">₦ 50,000.00</div>
								</div>
							</div>
						);
				  })
				: [1, 2, 3].map(() => {
						return <SkeletonProject />;
				  })}
		</>
	);
}

export default DashboardProjectFunded;
