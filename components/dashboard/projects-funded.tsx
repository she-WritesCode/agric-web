import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import qs from "qs";
import { useCurrentUser } from "../../utils/user";
import { useInvestments } from "../../utils/projectsFunded";
import Image from "../elements/image";
import { Investment } from "../../interfaces/user";
import { toCurrency } from "../../utils/helpers";
import Link from "next/link";

function SkeletonProjectFunded() {
	const products = new Array(3);

	const bodyTemplate = () => {
		return <Skeleton></Skeleton>;
	};
	return (
		<>
			<DataTable value={products} className="p-datatable-striped">
				<Column field="name" header="Project Name" body={bodyTemplate}></Column>
				<Column field="stage" header="stage" body={bodyTemplate}></Column>
				<Column field="createdAt" header="Date" body={bodyTemplate}></Column>
				<Column field="action" header="Action" body={bodyTemplate}></Column>
			</DataTable>
		</>
	);
}

function ProjectsFunded() {
	const { user } = useCurrentUser();
	const { investments, isError, isLoading } = useInvestments(
		qs.stringify({
			_where: { "user.id": user.id },
			_limit: 3,
			_sort: "created_at:DESC",
		}),
	);

	const bodyActionTemplate = (data: Investment) => {
		return (
			<>
				<div className="">{data.project.title}</div>
				<div className="flex gap-2">
					<Link href={`/projects/${data.project.slug}`}>
						<a className="p-button p-component p-button-outline text-xs block rounded-3xl">Details</a>
					</Link>
					<Link href={`/dashboard/project-updates/${data.project.id}`}>
						<a className="p-button p-component text-xs block rounded-3xl">Updates</a>
					</Link>
				</div>
			</>
		);
	};
	const bodyAmountTemplate = (data: Investment) => {
		return <div>{toCurrency(data.amountPerSlot)}</div>;
	};
	const bodyTotalTemplate = (data: Investment) => {
		return <div>{toCurrency(data.quantity * data.amountPerSlot)}</div>;
	};
	const bodyDateTemplate = (data: Investment) => {
		return <div>{new Date(data.created_at).toDateString()}</div>;
	};

	const bodyImgTemplate = (data: Investment) => {
		if (data.project.mainImage) {
			return <Image media={data.project.mainImage} />;
		}
		return <img className="shadow w-full" src="/images/default.png" />;
	};
	return (
		<>
			<div className="flex flex-col">
				<h1 className="text-2xl">Projects Funded</h1>
				<p className="">View all projects you have invested in so far</p>
			</div>

			<div className="p-card p-component ">
				<div className="p-card-body">
					{!isLoading && !!investments ? (
						<DataTable
							value={investments}
							scrollable
							style={{ width: "99%", overflowY: "unset" }}
							loading={isLoading}
							className="p-datatable-striped max-w-full"
						>
							<Column
								field="project.mainImage"
								className="w-12"
								style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
								body={bodyImgTemplate}
							/>
							<Column field="project.title" className="w-52" header="Project Name" body={bodyActionTemplate} />
							<Column field="quantity" className="w-20" header="No of slots" />
							<Column field="amountPerSlot" className="w-32" header="Amount per slot" body={bodyAmountTemplate} />
							<Column header="Total" className="w-32" body={bodyTotalTemplate} />
							<Column header="Funded on" className="w-40" body={bodyDateTemplate}></Column>
						</DataTable>
					) : (
						<SkeletonProjectFunded />
					)}
				</div>
			</div>
		</>
	);
}

export default ProjectsFunded;
