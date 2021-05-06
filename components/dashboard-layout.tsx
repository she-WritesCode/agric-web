import DashboardNav from "./dashboard/dashboard-nav";

function DashboardLayout({ children }: any) {
	return (
		<>
			<div className="w-full px-10 bg-green-5 bg-gray-100 inset-0">
				<div className=" mx-auto max-w-5xl">
					<div className="py-12 w-full m-0">
						<div className="flex flex-col lg:flex-row gap-10 w-full">
							<div className="w-full lg:w-3/12">
								<div className=" bg-white shadow rounded w-full">
									<div className="hidden lg:block w-full h-48 bg-green-100"></div>
									<DashboardNav />
								</div>
							</div>
							<div className="w-full max-w-full lg:w-9/12">{children}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DashboardLayout;
