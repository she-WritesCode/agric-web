import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import { getStrapiURL } from "./api";
import { getToken } from "./helpers";

export class Service<PrimaryType, PayloadType = Record<string, any>> {
    url: string
    axiosConfig = {} as AxiosRequestConfig

    constructor(url: string, useAuth = false) {
        this.url = getStrapiURL(url)
        if (useAuth) {
            this.axiosConfig = {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        }
    }

    getOne(id: number | string, queryString="") {
        return axios.get(`${this.url}/${id}${queryString ? '?'+queryString : ''}`, this.axiosConfig)
        .then((response: AxiosResponse<PrimaryType>) => {
            return response.data;
        })
    }

    getAll(queryString="") {
        return axios.get(`${this.url}/${queryString ? '?'+queryString : ''}`, this.axiosConfig)
        .then((response: AxiosResponse<PrimaryType[]>) => {
            return response.data;
        })
    }

    create(payload: PayloadType) {
        return axios.post(`${this.url}`, payload, this.axiosConfig)
        .then((response: AxiosResponse<PrimaryType>) => {
            return response.data;
        })
    }

    update(id: number | string, payload: PayloadType) {
        return axios.patch(`${this.url}/${id}`, payload, this.axiosConfig)
        .then((response: AxiosResponse<PrimaryType>) => {
            return response.data;
        })
    }

    delete(id: number | string) {
        return axios.delete(`${this.url}/${id}`, this.axiosConfig)
        .then((response: AxiosResponse<any>) => {
            return response.data;
        })
    }
}