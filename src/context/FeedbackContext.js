import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider= ({children}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        fetchFeedback()
    }, [])//the array of arguments is empty because it will only run once

    //Fetch Feedback
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }


    //add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        
        })

        const data = await response.json()

        setFeedback([data, ...feedback])//setFeedback is immutable, used to manipulate the state by basically making a copy of it.

    }

    // Delete feedback
    const deleteFeedback = async(id) => {
        if(window.confirm('Are you sure you want to delete?')){
            await fetch(`/feedback/${id}`, {method: 'DELETE'})
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    //Update feedback item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Conetent-Type': 'application/json',
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedback(
            feedback.map((item) => item.id === id ? {...item, ...data} : item)
        )
    }

    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider 
        value = {{
            feedbackEdit,// this is the actual piece of state that holds the item and the boolean
            feedback,
            isLoading,
            addFeedback,
            deleteFeedback,
            editFeedback,// this is the function
            updateFeedback,
            
    }}> 
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext