import { toast } from 'react-toastify'

export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const time = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  const formattedDate = `${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()} at ${time}`
  return formattedDate
}

// shows a succesful toast
export const showSuccessToast = (msg: string) => {
  toast.success(msg || `Compiled Successfully!`, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

// displays an error toast
export const showErrorToast = (msg: string, timer: number) => {
  toast.error(msg || `Something went wrong! Please try again.`, {
    position: 'top-right',
    autoClose: timer ? timer : 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
