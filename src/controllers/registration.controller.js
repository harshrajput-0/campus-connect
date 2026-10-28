import { Registration } from "../models/registration.model";
import { Event } from "../models/event.model";

import { EMAILREGEX, PHONEREGEX } from "../constants.js";





export const registration = async (req, res) => {
    const { studentName, email, phone, eventsID } = req.body; 

    if (!studentName || studentName.trim().length < 4) {
        
    }
}


// TO FETCH REGISTRAIONTS USING EMAIL ID =================
export const getRegistration = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    };

    try {
        const registrations = await Registration.find({ email: email.toLowerCase() }).populate("event");

        res.json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to load registraion" });
    }
}