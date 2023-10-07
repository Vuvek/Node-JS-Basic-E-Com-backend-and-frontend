import mongoose from "mongoose";

const SessionSchema = mongoose.Schema( { 
    sessionId : String,
    expires : String,
    email : String,
})

const SessionModal = mongoose.model('sessions',SessionSchema)

export default SessionModal;