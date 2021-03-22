import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

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
	const updates: any[] = [];
	return (
		<>
			{updates.length ? (
				<DataTable value={updates} className="p-datatable-striped">
					{updates.map(() => {
						return <Column field="name" header="Project Name" body={""}></Column>;
					})}
				</DataTable>
			) : (
				<SkeletonProjectUpdates />
			)}
		</>
	);
}

export default DashboardProjectUpdates;
