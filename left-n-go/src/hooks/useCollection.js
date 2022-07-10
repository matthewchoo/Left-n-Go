import { useEffect, useState } from "react"

//firebase imports
import { collection, onSnapshot } from "firebase/firestore"
import { firestore } from "../config/firebaseConfig"

export const useCollection = (collectionName) => {
    const [ documents, setDocuments ] = useState([])
    
    useEffect(() => {
        let ref = collection(firestore, collectionName)

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id })
            })

            setDocuments(results)
        })

        return () => unsub()

    }, [collectionName])

    return { documents }
}