import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IConfiguration, IControl, IMaterial } from '@/types/configurations'

export const useConstructorStore = defineStore('constructor', () => {
  const machineType = ref<IConfiguration>()
  const standType = ref<IControl>()
  const material = ref<IMaterial>()
  const xSize = ref<number>()
  const ySize = ref<number>()
  const zSize = ref<number>()
  const diameter = ref<number>()
  const uploadedStlFileUrl = ref('')
  const isUploadErrorExist = ref(false)
  const isFileUploaded = ref(false)
  const isDiameterEnabled = ref(false)

  const resetStore = () => {
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
    material,
    xSize,
    ySize,
    zSize,
    diameter,
    uploadedStlFileUrl,
    isUploadErrorExist,
    isFileUploaded,
    isDiameterEnabled,
    resetStore,
  }
})
