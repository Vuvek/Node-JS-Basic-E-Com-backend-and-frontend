import {v4} from 'uuid'
import SessionModal from '../db-connection/modals/session.js';
import UserModal from '../db-connection/modals/users.js';


export const signUpHandler = async (req,res) => {
    const {email : username , name , password} = req.body;

    if (!username || !name || !password ) {
        res.status(401).end()
        return;
    }

    const userData = UserModal(req.body)
    const data = await userData.save()

    const now = new Date()
    const expiresAt = new Date(+now + 1200 * 1000)

    const sessionToken = v4()

    const sessionData = SessionModal({email : username,expires : expiresAt , sessionId : sessionToken})
    const session = await sessionData.save();

    res.cookie("session_token",sessionToken,{expiresAt : expiresAt,httpOnly : true,sameSite : "None",secure : true,origin : 'http://localhost:1234'})

    res.send({data,session})
}


export const signInHandler = async (req, res) => {
    const { email : username , password } = req.body;
    if (!username || !password) {
        res.status(401).end()
        return
    }
    
    const sessionToken = v4();
    const now = new Date();
    const expiresAt = new Date(+now + 1200 * 1000);
    
    const sessionInfo = await SessionModal.updateOne({email : username},{$set : {sessionId : sessionToken , expires : expiresAt,origin : 'http://localhost:1234'}})

    if (sessionInfo?.modifiedCount) {
        console.log('slakjflksajdflkjdsakfj',sessionToken)
        const user = await UserModal.findOne(req.body).select('-password')
        if (user) {
            res.cookie("session_token", sessionToken, { expiresAt: expiresAt,httpOnly:true,sameSite : 'None',secure : true })
            res.send({session : sessionInfo,user,error : null})
        } else {
            res.send({user : null,error : 'User Not Found'})
        }
    } else {
        res.status(401).end()
    }
}


export const validateSession = (req, res,next) => {
    console.log(req.cookies,'sklajflksa')

    if (!req.cookies) {
        res.status(200).send({error : 'Cookies Expired'})
        return;
    }

    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
        res.status(200).send({error : 'Cookies Expired'})
        return;
    }

   
    const userSession = SessionModal.find({sessionId : sessionToken})
    if (!userSession) {
        res.status(200).send({error : 'Cookies Expired'});
        return;
    }
    
    if (userSession.sessionId < Date.now()) {
        res.cookie("session_token", "", { expires: new Date() })
        res.status(200).send({error : 'Cookies Expired'})
        return;
    }
    next()
}


export const logoutHandler =async (req, res) => {
    if (!req.cookies) {
        res.status(401).end()
        return;
    }

    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
        res.status(401).end()
        return;
    }

    const result = await SessionModal.findOne({sessionId : sessionToken})
    console.log(result,'rejkjlsadjfresult')
    if (result) {
        res.cookie("session_token", "", { expires: new Date() })
        res.send({success : true,error : null})
    } else {
        res.send({success : false,error : "Something is wrong"})
    }

}



