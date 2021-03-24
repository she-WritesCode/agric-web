import { Project } from "../../interfaces/project";
import { Galleria } from "primereact/galleria";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import Image from "../elements/image";
import { Media } from "../../interfaces/elements";
import Markdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faMapMarkedAlt, faShieldAlt, faStopwatch, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { toCurrency } from "../../utils/helpers";
import React from "react";
import { useRouter } from "next/router";
import { useCheckout } from "../../utils/projects";
// import ImageBase from "next/image";

function itemTemplate(media: Media) {
	if (media) {
		return <Image media={media} className="w-full h-auto" />;
	}
	return <div>"No image"</div>;
}

function thumbnailTemplate(media: Media) {
	return <Image media={media} className="w-24 h-auto" />;
}

const responsiveOptions = [
	{
		breakpoint: "1024px",
		numVisible: 5,
	},
	{
		breakpoint: "768px",
		numVisible: 3,
	},
	{
		breakpoint: "560px",
		numVisible: 1,
	},
];

function ProjectDetails({ project }: { project: Project }) {
	const router = useRouter();
	const images: Media[] = project.mainImage?.url || project.images.length ? [project.mainImage, ...project.images] : []; //[{ url: "https://picsum.photos/300/210", alternativeText: "dummy image", mime: "image", id: 1 }];

	const [value, setValue] = useState(1);
	const [activeIndex, setActiveIndex] = useState(0);
	const [profitState, setProfitState] = useState({
		slotQuantity: 1,
		profit: 0,
		totalInvestment: 0,
	});

	function calculateProfit(slots: number) {
		const totalInvestment = slots * project.investmentFee;
		const interest = (totalInvestment * project.roi) / 100;
		setProfitState({ profit: interest, slotQuantity: slots, totalInvestment });
	}

	const profitSimulation = useRef<HTMLDivElement | null>(null);

	function showProfitSimlation() {
		setActiveIndex(1);
		if (profitSimulation.current) {
			profitSimulation.current?.scrollIntoView();
			return;
		}
	}

	function checkout() {
		const { storeProject } = useCheckout();
		storeProject(project, value);
		router.push("/[[slug]]", "/checkout");
	}

	return (
		<section className="w-full px-10">
			<div className="mx-auto max-w-5xl">
				<div className="container py-20">
					<div className="grid md:grid-cols-2 gap-10">
						<div className="md:col-span-1">
							{images.length ? (
								<Galleria
									value={images}
									responsiveOptions={responsiveOptions}
									numVisible={5}
									style={{ width: "100%" }}
									item={itemTemplate}
									thumbnail={thumbnailTemplate}
								/>
							) : (
								<img src="/images/default.png" className="w-full shadow h-auto" alt={project.title} />
							)}
						</div>
						<div className="md:col-span-1">
							<div className="inline">
								<div className="text-primary-500 text-2xl">{toCurrency(project.investmentFee)}</div>
							</div>
							<div className="title mb-4">{project.title}</div>
							<div className="prose prose-lg text-base">
								<div>
									<div className="my-2">
										<span className="mr-2">
											<FontAwesomeIcon icon={faStopwatch} />
										</span>
										Project Timeline: <b>{project.duration} month(s)</b>
									</div>
									<div className="my-2">
										<span className="mr-2">
											<FontAwesomeIcon icon={faChartLine} />
										</span>
										Return On Investment: <b>{project.roi}%</b>
									</div>
									<div className="my-2">
										<span className="mr-2">
											<FontAwesomeIcon icon={faShieldAlt} />
										</span>
										Insured by: <b>{project.insuredBy}</b>
									</div>
									<div className="my-2">
										<span className="mr-2">
											<FontAwesomeIcon icon={faMapMarkedAlt} />
										</span>
										Project Location: <b>{project.location}</b>
									</div>
									<div className="my-2">
										<span className="mr-2">
											<FontAwesomeIcon icon={faWarehouse} />
										</span>
										Slot Capacity: <b>{project.slotsCapacity}</b>
									</div>
								</div>
								<div>
									<Markdown source={project.shortDescription} />
								</div>
							</div>
							<span className="flex justify-between">
								<span className="bg-primary-100 text-primary-600 p-2 rounded mb-4">
									{project.availableSlots} unit(s) left
								</span>
								<span>
									<Button className="p-button-text" onClick={() => showProfitSimlation()}>
										View profit simulation
									</Button>
								</span>
							</span>
							<div className="mt-4 p-formgroup-inline">
								<div className="p-field">
									<InputNumber
										className="project-quantity"
										value={value}
										onValueChange={(e) => setValue(e.value)}
										step={1}
										min={1}
										max={project.availableSlots}
										showButtons
									/>
								</div>
								<div className="p-field">
									<Button
										icon="pi pi-dollar"
										onClick={checkout}
										label="Fund Project"
										className="rounded-3xl font-semibold"
									/>
								</div>
							</div>
						</div>
						<div ref={profitSimulation} className="md:col-span-2">
							<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
								<TabPanel header="Description">
									<div className="prose prose-lg">
										<Markdown source={project.description} />
									</div>
								</TabPanel>
								<TabPanel header="Profit Simulation">
									<div className="">
										<div className="p-field">
											<label className="mr-2" htmlFor="profit-simulation-quantity">
												Number of slots
											</label>
											<InputNumber
												id="profit-simulation-quantity"
												value={profitState.slotQuantity}
												onValueChange={(e) => calculateProfit(Number(e.value))}
												step={1}
												min={1}
												max={project.availableSlots}
												showButtons
											/>
										</div>
										<div className="">
											<div
												className="p-datatable p-component"
												data-scrollselectors=".p-datatable-scrollable-body, .p-datatable-unfrozen-view .p-datatable-scrollable-body"
											>
												<div className="p-datatable-wrapper">
													<table role="grid">
														<thead className="p-datatable-thead">
															<tr role="row">
																<th role="columnheader" className="">
																	<span className="p-column-title">Period in months</span>
																</th>
																<th role="columnheader" className="">
																	<span className="p-column-title">Net Profit</span>
																</th>
																<th role="columnheader" className="">
																	<span className="p-column-title">Return on Investment</span>
																</th>
															</tr>
														</thead>
														<tbody className="p-datatable-tbody">
															<tr role="row" className="">
																<td role="cell" className="">
																	{project.duration} month(s)
																</td>
																<td role="cell" className="">
																	{toCurrency(profitState.profit)}
																</td>
																<td role="cell" className="">
																	{project.roi}%
																</td>
															</tr>
															<tr role="row" className="">
																<td role="cell" className="">
																	Initial Investment
																</td>
																<td role="cell" className="">
																	{toCurrency(profitState.totalInvestment)}
																</td>
																<td role="cell" className=""></td>
															</tr>
															<tr role="row" className="">
																<td role="cell" className="">
																	Total
																</td>
																<td role="cell" className="">
																	{toCurrency(profitState.totalInvestment + profitState.profit)}
																</td>
																<td role="cell" className=""></td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</TabPanel>
							</TabView>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProjectDetails;
