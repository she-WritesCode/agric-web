import { Media } from "./elements";
import { Investment } from "./user";

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
    investments:        Investment[];
}

export interface ProjectCategory {
    id:           number;
    title:        string;
    description:  string;
    published_at: Date;
    created_at:   Date;
    updated_at:   Date;
    projects:     Project[];
}

export interface ProjectUpdate {
    id:           number;
    title:        string;
    content:  string;
    stage:  string;
    published_at: Date;
    created_at:   Date;
    updated_at:   Date;
    project:     Project;
}