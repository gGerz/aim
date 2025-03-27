import axios from 'axios'
import Cookies from 'js-cookie'

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'

interface Tokens {
  access: string
  refresh: string
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.api.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const token = Cookies.get('access_token')
        if (token) {
          config.headers!['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )

    // Перехватчик ответа
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig

        // Если ошибка 401 (неавторизован) и запрос ещё не был повторён
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const newTokens = await this.refreshToken()
            if (newTokens) {
              Cookies.set('access_token', newTokens.access)
              Cookies.set('refresh_token', newTokens.refresh)

              originalRequest.headers!['Authorization'] = `Bearer ${newTokens.access}`
              return this.api(originalRequest)
            } else {
            }
          } catch (err) {
            window.location.reload()
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
            console.error('Ошибка при обновлении токена:', err)
          }
        }

        return Promise.reject(error)
      },
    )
  }

  private async refreshToken(): Promise<Tokens | null> {
    try {
      const refreshToken = Cookies.get('refresh_token')
      if (!refreshToken) {
        throw new Error('Refresh token not found')
      }

      const response: AxiosResponse<Tokens> = await axios.post(
        `${import.meta.env.VITE_API_URL}refresh-token`,
        {
          refresh: refreshToken,
        },
      )

      return response.data
    } catch (error) {
      console.error('Ошибка при запросе нового токена:', error)
      throw error
    }
  }

  public get<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config)
  }

  public post<T>(url: string, data: T, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return this.api.post<T>(url, data, config)
  }

  public postFormData<T extends { [key: string]: string | number | object }>(
    url: string,
    data: T,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse> {
    const formData = new FormData()

    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob)
      }
    }

    const headers = {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    }

    console.log('formdata', formData)

    return this.api.post<T>(url, formData, { ...config, headers })
  }

  public put<T>(url: string, data: T, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return this.api.put<T>(url, data, config)
  }

  public delete<R>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<R>> {
    return this.api.delete<R>(url, config)
  }
}

export default new ApiService()
