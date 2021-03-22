import { Media } from "./elements";

export interface Project {
	mainImage: Media;
	images: Media[];
	id: number;
	title: string;
	slug: string;
	description: string;
	location: string;
	duration: number;
	roi: number;
	investmentFee: number;
	availableSlots: number;
	slotsCapacity: string;
	insuredBy: string;
	shortDescription: string;
	published_at: Date;
	created_at: Date;
	updated_at: Date;
	project_categories: ProjectCategory[];
	order_products: any[];
}

export interface ProjectCategory {
    id:           number;
    title:        string;
    description:  null;
    published_at: Date;
    created_at:   Date;
    updated_at:   Date;
    projects:     Project[];
}