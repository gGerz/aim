export interface IDraft {
  id: number
  stl_file_url: string
  is_saved: false
  machine_type: number
  control_system: number
  x_size: number
  y_size: number
  z_size: number
  stl_processed_data: null
  created_at: string
  user: number
  diameter: number
}

export interface IControl {
  id: number
  type: string
  name: string
}
export interface ITool {
  id: number
  type: string
  name: string
}

export interface IConfiguration {
  id: number
  type: string
  name: string
  controls: IControl[]
}

export interface IGcode {
  gcode: string;
  message: string;
  saved: boolean
}
