import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IConfiguration, IControl } from '@/types/configurations'

export const useConstructorStore = defineStore('constructor', () => {
  const machineType = ref<IConfiguration>()
  const standType = ref<IControl>()
  const xSize = ref<number>()
  const ySize = ref<number>()
  const zSize = ref<number>()
  const diameter = ref<number>()
  const uploadedStlFileUrl = ref('')
  const isUploadErrorExist = ref(false)
  const isFileUploaded = ref(false)
  const isDiameterEnabled = ref(false)

  const resetStore = () => {
    machineType.value = undefined
    standType.value = undefined
    xSize.value = undefined
    ySize.value = undefined
    zSize.value = undefined
    diameter.value = undefined
    uploadedStlFileUrl.value = ''
    isUploadErrorExist.value = false
    isFileUploaded.value = false
    isDiameterEnabled.value = false
  }

  return {
    machineType,
    standType,
    xSize,
    ySize,
    zSize,
    diameter,
    uploadedStlFileUrl,
    isUploadErrorExist,
    isFileUploaded,
    isDiameterEnabled,
    resetStore
  }
})
