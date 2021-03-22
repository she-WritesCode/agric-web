import { Project, ProjectCategory } from "../../interfaces/project";
import ProjectCard from "./project-card";
import { Dropdown } from "primereact/dropdown";
import { ListBox } from "primereact/listbox";
import { useEffect, useState } from "react";
import { useProjectCategories, useProjects } from "../../utils/projects";
import CardSkeleton from "../elements/card-skeleton";
import qs from "qs";
import { id } from "date-fns/locale";

function getQueryString(arr: string[]) {
	return arr.join("&");
}

function ProjectList() {
	const sortOptions = [
		{ label: "(A-Z) Newest first", key: "_sort=created_at:DESC" },
		{ label: "(Z-A) Oldest first", key: "_sort=created_at:ASC" },
	];

	const [sortValue, setSortValue] = useState("_sort=created_at:DESC");
	const [filterValue, setFilterValue] = useState("");
	const [filterRawValue, setFilterRawValue] = useState<number[]>([]);
	const { projects, isLoading, isError } = useProjects(getQueryString([sortValue, filterValue]));
	const { categories, isLoading: categoriesIsLoading, isError: categoriesIsError } = useProjectCategories();

	if (isError) return <div>an error occured</div>;

	function setFilter(value: number[]) {
		setFilterRawValue(value);
		setFilterValue(
			qs.stringify({
				_where: [{ project_categories: filterRawValue }],
			}),
		);
	}

	return (
		<>
			<section className="w-full px-10">
				<div className="mx-auto max-w-5xl">
					<div className="container py-24">
						<div className="flex flex-col lg:flex-row gap-10">
							<div className="w-full lg:w-3/12">
								<div className="flex lg:flex-col gap-6">
									<div className="p-field">
										<label className="text-lg font-semibold mr-2" htmlFor="sort">
											Sort by:
										</label>
										<Dropdown
											value={sortValue}
											onChange={(e) => {
												setSortValue(e.value);
											}}
											optionValue="key"
											optionLabel="label"
											options={sortOptions}
										/>
									</div>
									<div className="hidden">
										<div className="text-lg font-semibold">Filter by Category</div>
										<div className="flex lg:flex-col">
											<ListBox
												value={filterValue}
												options={categories}
												onChange={(e) => setFilter(e.value)}
												multiple
												filter
												optionLabel="title"
												optionValue="id"
												style={{ width: "100%" }}
												listStyle={{ maxHeight: "100%" }}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full">
								<div className="grid md:grid-cols-3 gap-12">
									{isLoading ? (
										<div className="grid md:grid-cols-3 gap-12">
											{[1, 2, 3, 4, 5, 6].map((n) => (
												<div key={n}>
													<CardSkeleton />
												</div>
											))}
										</div>
									) : (
										projects.map((project) => {
											return (
												<div key={project.id}>
													<ProjectCard project={project} />
												</div>
											);
										})
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default ProjectList;
