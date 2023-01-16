import { useState, useEffect } from "react"
import db from '../firebaseConfig/fbConfig'
import { collection, onSnapshot } from "firebase/firestore"

export const useDocument = (fbCollection, id) => {

  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {

    const docRef = collection(db, fbCollection, id)
    const unsub = onSnapshot(docRef, (snapShot) => {
      setDocument({...snapShot.data(), id: snapShot.id})
    }, (error) => {
      console.log(`document fetch error`, error.message)
      setError(`Failed to get document`, id)
    })

    return () => unsub()
    
  }, [collection, id])
  
  return {error, document}

}