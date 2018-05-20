import {toast} from 'react-toastify'

export function notify(level, message) {
  switch(level) {
    case 'SUCCESS':
      toast.success(message)
      break
    case 'ERROR':
      toast.error(message)
      break
    default:
      toast(message)
      break
  }
}