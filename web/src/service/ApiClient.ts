import axios, { AxiosPromise, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import {Todo} from '../store/interface'

export class ApiClient {
    private static _axiosInstance: AxiosInstance
    // number of milliseconds before the request times out
    private static _timeout: number = 3000
    private static _url: string = '/task'

    static async getTasks () {
        return this.get(this._url)
    }

    static async createTask (title: string) {
        return this.post(this._url, { title: title })
        
    }

    static async deleteTask (id: number) {
        return this.delete(this._url + '/' + id)
    }

    static async updateTask (todo: Todo) {
        return this.put(this._url + '/' + todo.id, todo)
    }


    private static async get (url: string, config?: AxiosRequestConfig | undefined) {
        return this.axiosInstance
        .then((api: AxiosInstance) => {
            console.log('call Web Service (get): ' + url)
            return api.get(url, config)
        })
    }

    private static async post (url: string, data: any, config?: AxiosRequestConfig | undefined) {
        return this.axiosInstance
        .then((api: AxiosInstance) => {
            console.log('call Web Service (post): ' + url)
            return api.post(url, data, config)
        })
    }

    private static async delete (url: string, config?: AxiosRequestConfig | undefined) {
        return this.axiosInstance
        .then((api: AxiosInstance) => {
            console.log('call Web Service (delete): ' + url)
            return api.delete(url, config)
        })
    }

    private static async put (url: string, data: any, config?: AxiosRequestConfig | undefined) {
        return this.axiosInstance
        .then((api: AxiosInstance) => {
            console.log('call Web Service (put): ' + url)
            return api.put(url, data, config)
        })
    }


    private static get axiosInstance (): Promise<AxiosInstance> {
        return new Promise((resolve, reject) => {
            if (this._axiosInstance === undefined) {
                this.getFile().then((path) => {
                    this._axiosInstance = axios.create({ baseURL: path as string, timeout: this._timeout })
                    resolve(this._axiosInstance)
                }).catch((error) => {
                    console.log('Error createAxiosInstance: ' + error)
                    reject(error)
                })
            } else {
                console.log('No creation AxiosInstance')
                resolve(this._axiosInstance)
            }
            console.log('End createAxiosInstance')
        })
    }


    private static async getFile () {
        return new Promise(function (resolve, reject) {
            axios.get('/api-url.json')
            .then(response => {
                resolve(response.data.path)
            })
        })
    }

}
