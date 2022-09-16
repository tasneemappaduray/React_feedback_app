import FeedbackItem from "./FeedbackItem"
import {motion, AnimatePresence} from 'framer-motion'
import {useContext} from 'react'
import FeedbackContext from "../context/FeedbackContext"


function FeedbackList() {

    const {feedback} = useContext(FeedbackContext)

    if (!feedback || feedback.length === 0){
        return <p>No Feedback yet</p>
    }

    return ( //This version has animation
        <div className="feedback-list">
            <AnimatePresence>
            {feedback.map((item) => (
                <motion.div 
                    key={item.id}
                    initial={{opacity:0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <FeedbackItem key={item.id} item={item}/>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
  )

//     return ( //This version has NO animation
//         <div className="feedback-list">
//             {feedback.map((item) => (
//                 <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
//             ))}
//         </div>
//   )
}
/*FeedbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,            
        })
    )
}*/
export default FeedbackList