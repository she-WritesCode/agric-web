import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import qs from "qs";
import { useCurrentUser } from "../../utils/user";
import { useProjectUpdates } from "../../utils/projectUpdate";
import { useInvestments } from "../../utils/projectsFunded";
import { ProjectUpdate } from "../../interfaces/project";
import Image from "../elements/image";

function SkeletonProjectUpdates() {
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

function DashboardProjectUpdates() {
	const { user } = useCurrentUser();
	const { investments } = useInvestments(
		qs.stringify({
			_where: { "user.id": user.id },
			_limit: 3,
			_sort: "created_at:DESC",
		}),
	);
	const { updates, isLoading, isError } = useProjectUpdates(
		qs.stringify({
			_where: {
				_or: investments.map((invest) => ({ "project.id": invest.project.id })),
			},
			_limit: 5,
			_sort: "created_at:DESC",
		}),
	);

	const bodyDateTemplate = (data: ProjectUpdate) => {
		return <div>{new Date(data.created_at).toDateString()}</div>;
	};

	const bodyImgTemplate = (data: ProjectUpdate) => {
		if (data.project.mainImage) {
			return <Image media={data.project.mainImage} />;
		}
		return <img className="shadow w-full" src="/images/default.png" />;
	};

	return (
		<>
			{!isLoading && !!updates ? (
				<DataTable value={updates} header="" className="p-datatable-striped p-datatable-sm">
					<Column
						field="project.mainImage"
						className="w-10"
						style={{ paddingLeft: 0, paddingRight: 0 }}
						body={bodyImgTemplate}
					/>
					<Column field="project.title" header="Project Name" />
					<Column field="title" header="Update" />
					<Column field="stage" header="Stage" />
					<Column header="Created on" body={bodyDateTemplate}></Column>
				</DataTable>
			) : (
				<SkeletonProjectUpdates />
			)}
		</>
	);
}

export default DashboardProjectUpdates;
