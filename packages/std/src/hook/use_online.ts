import { useState, useEffect } from 'react'

export function useOnline() {
  let [online, setOnline] = useState(true)

  useEffect(() => {

  	function updateOnlineStatus(event: Event) {
  	  setOnline(navigator.onLine)
  	}
  	
    window.addEventListener('online',  updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
    	window.removeEventListener('online',  updateOnlineStatus)
    	window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return online
}
