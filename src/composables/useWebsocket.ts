import type { IMessage } from '@/types/messages'
import { ref, onUnmounted, type Ref } from 'vue'

interface WebSocketError {
  message: string
  code: number
}

interface UseWebSocket {
  connect: () => void
  send: (data: string | object) => void
  disconnect: () => void
  isConnected: Ref<boolean>
  messages: Ref<IMessage[]>
  lastMessage: Ref<IMessage | null>
  error: Ref<WebSocketError | null>
}

export function useWebSocket(url: string, protocols: string[] = []): UseWebSocket {
  const socket = ref<WebSocket | null>(null)
  const isConnected = ref<boolean>(false)
  const messages = ref([])
  const lastMessage = ref<IMessage | null>(null)
  const error = ref<WebSocketError | null>(null)

  function connect() {
    socket.value = new WebSocket(url, protocols)

    socket.value.onopen = () => {
      isConnected.value = true
      console.log('WebSocket connected')
    }

    socket.value.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as IMessage
        messages.value.push(data)
        lastMessage.value = data
      } catch (e) {
        console.error('Invalid JSON', e)
      }
    }

    socket.value.onerror = (e: Event) => {
      // error.value = { message: e.message, code: e.code }
      console.error('WebSocket error:', e)
    }

    socket.value.onclose = () => {
      isConnected.value = false
      console.log('WebSocket closed')
    }
  }

  function send(data: string | object) {
    if (socket.value && isConnected.value) {
      const message = typeof data === 'string' ? data : JSON.stringify(data)
      socket.value.send(message)
    }
  }

  function disconnect() {
    if (socket.value) {
      socket.value.close()
    }
  }

  onUnmounted(() => {
    disconnect()
  })

  return {
    connect,
    send,
    disconnect,
    isConnected,
    messages,
    lastMessage,
    error,
  }
}
