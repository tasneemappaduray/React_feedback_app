import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider= ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10,
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 9,
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 7,
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    //add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])//setFeedback is immutable, used to manipulate the state by basically making a copy of it.

    }

    // Delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?'))
        setFeedback(feedback.filter((item) => item.id !== id))
    }

    //Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
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
            addFeedback,
            deleteFeedback,
            editFeedback,// this is the function
            updateFeedback,
            
    }}> 
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext