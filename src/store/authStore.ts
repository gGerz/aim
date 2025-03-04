import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
}
type TokenType = 'access' | 'refresh'

const getTokenFromCookies = (type: TokenType): string | null => {
  console.log('Cookies.get(`${type}_token`) || null', Cookies.get(`${type}_token`) || null)
  return Cookies.get(`${type}_token`) || null
}

const setTokenInCookies = (type: TokenType, token: string) => {
  Cookies.set(`${type}_token`, token)
}

const removeTokenFromCookies = (type: TokenType) => {
  Cookies.remove(`${type}_token`)
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: getTokenFromCookies('access'),
    refreshToken: getTokenFromCookies('refresh'),
  }),

  getters: {
    isAuthenticated(state): boolean {
      return state.accessToken !== null
    },
  },

  actions: {
    login({ access, refresh }: { access: string; refresh: string }) {
      this.accessToken = access
      setTokenInCookies('access', access)
      this.refreshToken = refresh
      setTokenInCookies('refresh', refresh)
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      removeTokenFromCookies('access')
      removeTokenFromCookies('refresh')
    },
  },
})
