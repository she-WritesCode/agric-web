import { Skeleton } from "primereact/skeleton";
function CardSkeleton() {
	return (
		<div className="custom-skeleton shadow-xl rounded-2xl">
			<Skeleton className="rounded-t-2xl" width="100%" height="8rem"></Skeleton>
			<div className="p-mb-3 px-4 py-6">
				<Skeleton width="85%" className="p-mb-2"></Skeleton>
				<Skeleton width="50%" className="p-mb-2"></Skeleton>
				<div className="p-d-flex p-jc-between p-mt-3">
					<Skeleton width="40%" height="1.5rem"></Skeleton>
					<Skeleton width="40%" height="1.5rem"></Skeleton>
				</div>
				<div className="p-d-flex p-jc-center p-mt-3">
					<Skeleton width="50%" height="1.5rem"></Skeleton>
				</div>
			</div>
		</div>
	);
}

export default CardSkeleton;
