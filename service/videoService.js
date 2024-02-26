import dotenv from "dotenv";
dotenv.config();
import OpenTok from 'opentok';
const opentok = new OpenTok(process.env.VONAGE_API_KEY, process.env.VONAGE_SECRET);

// console.log('Vonage API Key:', process.env.VONAGE_API_KEY);
// console.log('Vonage Secret message XXXXXXX:', process.env.VONAGE_SECRET);

export const createSession = () => {
    return new Promise((resolve, reject) => {
        opentok.createSession({}), function(error, session) {
            if (error) {
                console.log("Error creating session:", error);
                reject(error);
            } else {
                console.log("Session ID: " + session.sessionId);
                resolve(session.sessionId);
            }
        };
    });
};

export const generateToken = (sessionId, role = "publisher", data = "") => {
    console.log("generate token function XXXXXXX")
    const tokenOptions = {
        role,
        data
    };
    const token = opentok.generateToken(sessionId, tokenOptions);
    console.log(token);
    return token;
}