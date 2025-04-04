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
  }
})
