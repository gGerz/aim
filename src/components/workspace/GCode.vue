<template>
  <Card class="g-code">
    <template #title>
      <div class="g-code__header">
        <div class="g-code__header-title">
          G-Code
        </div>
      <AimButton :is-full-width="false" color="orange" @click="downloadGcode">Скачать файл</AimButton>
      </div>
    </template>
    <div class="g-code__content">
      <pre v-html="gCode"></pre>
    </div>
  </Card>
</template>
<script lang="ts" setup>
import { Card } from 'ant-design-vue';
import AimButton from '@/ui/buttons/AimButton.vue';

interface IProps {
  gCode: string
}
const props = defineProps<IProps>()

const downloadGcode = () => {
  const blob = new Blob([props.gCode], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url

  // Получаем текущую дату и время
  const now = new Date()
  // @ts-ignore
  const pad = (n) => n.toString().padStart(2, '0')
  const formattedDate = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear().toString().slice(-2)} ${pad(now.getHours())}:${pad(now.getMinutes())}`

  link.download = `gcode ${formattedDate}.txt`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

</script>

<style lang="scss" scoped>
 .g-code {
  background-color: var(--color-cyan);
  color: var(--color-white);
  border-color: transparent;
  border-radius: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  &__content {
    overflow: auto;
    height: 600px;

    ::v-deep(pre) {
      margin: 0;
    }
  }

  ::v-deep(.ant-card-head) {
    color: var(--color-white);
    border-color: var(--color-orange);
  }
  ::v-deep(.ant-card-body) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1px;
    height: 610px;
    padding: 12px 0 20px 24px;

    &:after {
      display: none;
    }
    &:before {
      display: none;
    }
  }

  /* Styling the scrollbar */
  ::-webkit-scrollbar {
    width: 12px; /* Adjust width to match the design */
    background-color: #1e2d2f; /* Background color similar to the UI */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #4f7a7f; /* Thumb color (can be adjusted to match the design better) */
    border-radius: 10px; /* Round the edges for a more polished look */
    border: 3px solid #1e2d2f; /* Border color around the thumb */
  }

  ::-webkit-scrollbar-track {
    background-color: #1e2d2f; /* Track background color */
    border-radius: 10px; /* Rounded track edges */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #3b5a5c; /* Hover effect for the thumb */
  }
 }
</style>
