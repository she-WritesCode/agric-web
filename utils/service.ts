import axios, {AxiosResponse} from "axios";
import { getStrapiURL } from "./api";

export class Service<PrimaryType, PayloadType = Record<string, any>> {
    url: string

    constructor(url: string) {
        this.url = getStrapiURL(url)
    }

    getOne(id: number | string, queryString="") {
        return axios.get(`${this.url}/${id}${queryString ? '?'+queryString : ''}`)
        .then((response: AxiosResponse<PrimaryType>) => {
            return response.data;
        })
    }

    getAll(queryString="") {
        return axios.get(`${this.url}/${queryString ? '?'+queryString : ''}`)
        .then((response: AxiosResponse<PrimaryType[]>) => {
            return response.data;
        })
    }

    create(payload: PayloadType) {
        return axios.post(`${this.url}`, payload)
        .then((response: AxiosResponse<PrimaryType>) => {
            return response.data;
        })
    }

    update(id: number | string, payload: PayloadType) {
        return axios.patch(`${this.url}/${id}`, payload)
        .then((response: AxiosResponse<PrimaryType>) => {
            return response.data;
        })
    }

    delete(id: number | string) {
        return axios.delete(`${this.url}/${id}`)
        .then((response: AxiosResponse<any>) => {
            return response.data;
        })
    }
}