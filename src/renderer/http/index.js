import Path from './path'
import request from './request'

export const getBacklogModules = params => {
  return request.get(Path.getBacklogModules, { params })
}

export const updateBacklogModule = params => {
  return request.post(Path.updateBacklogModule, params)
}

export const updateBacklog = params => {
  return request.post(Path.updateBacklog, params)
}

export const deleteBacklog = params => {
  return request.delete(Path.deleteBacklog, { params })
}

export const createBacklog = params => {
  return request.post(Path.createBacklog, params)
}

export const getSchedules = params => {
  return request.get(Path.getSchedules, { params })
}

export const createSchedule = params => {
  return request.post(Path.createSchedule, params)
}
