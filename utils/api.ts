import { Project } from "../interfaces/project"
import axios,{ AxiosResponse, AxiosRequestConfig } from 'axios';

export function getStrapiURL(path: string) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
    }${path}`
}

export function fetcher<T>(url: string) { 
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  } as AxiosRequestConfig;
  const mergedOptions = {
    ...defaultOptions,
  }
  return axios.get(getStrapiURL(url), mergedOptions)
    .then(({data}: AxiosResponse<T> ) => {
      console.log(data,"Data fetcg")
      return data
    })
    .catch((error) => {
      console.log(error);
    throw error
    })
}

// Helper to make GET requests to Strapi

export async function fetchAPI(path: string, options: Record<string, any> = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data // as Record<string, any>
}

export async function getPageData(slug: string, preview = false) {
  // Find the pages that match this slug
  const pagesData = await fetchAPI(
    `/pages?slug=${slug}&status=published${preview ? '&status=draft' : ''}`
  )

  // Make sure we found something, otherwise return null
  if (pagesData == null || pagesData.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return pagesData[0]
}

export async function getProjects(params = "") {
  // Find the pages that match this slug
  const projects = await fetchAPI(
    `/projects?${params}`
  )

  // Make sure we found something, otherwise return null
  if (projects == null || projects.length === 0) {
    return null
  }

  return projects as Project[]
}

export async function getProjectData(slug: string, params = "") {
  // Find the pages that match this slug
  const projects = await fetchAPI(
    `/projects?slug=${slug}&${params}`
  )
  
  // Make sure we found something, otherwise return null
  if (projects == null || projects.length === 0) {
    return null
  }

  return projects[0] as Project;
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData() {
  const global = await fetchAPI('/global')
  return global as Record<string, any>
}
