import { useEffect, useRef, useState } from "react"

//firebase imports
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { firestore } from "../config/firebaseConfig"

export const useCollection = (collectionName, _query) => {
    const [ documents, setDocuments ] = useState([])

    //to make it a single reference point
    const q = useRef(_query).current
    
    useEffect(() => {
        let ref = collection(firestore, collectionName)

        //if there is q reference, need to do special query
        if (q) {
            //spread the array into 3 separate arguments, and pass it in
            ref = query(ref, where(...q))
        }

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id })
            })

            setDocuments(results)
        })

        return () => unsub()

    }, [collectionName, q])

    return { documents }
}