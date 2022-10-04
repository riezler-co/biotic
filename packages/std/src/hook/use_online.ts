import { useState, useEffect } from 'react'

/**
 * Returns the current network status of the device.
 * true = online and false = offline
*/
export function useOnline() {
  let [online, setOnline] = useState(true)

  useEffect(() => {

  	function updateOnlineStatus(_event: Event) {
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
