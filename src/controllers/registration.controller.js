import { Registration } from "../models/registration.model.js";
import { Event } from "../models/event.model.js";

import { EMAILREGEX, PHONEREGEX } from "../constants.js";



// -------------------------------------------------------------------
// REGISTRATION: FOR REGISTERIGN EVENTS |=============================
// -------------------------------------------------------------------
export const registration = async (req, res) => {
    const { studentName, email, phone, eventId } = req.body; 

    // Validatiating fields 
    if (!studentName || studentName.trim().length < 5) {
        return res.status(400).json({
            message: "Student name must be at least of 5 characters"
        });
    };

    if (!email || !EMAILREGEX.test(email)) {
        return res.status(400).json({
            message: "Enter a valid email"
        });
    };

    if (!phone || !PHONEREGEX.test(phone)) {
        return res.status(400).json({
            message: "Enter a 10 digit phone number"
        })
    }


    let event;

    if (!eventId) {
        return res.status(400).json({
            message: "Please select an event"
        });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({ message: "Event not found" });
        }
        // Create registration 
        const registration = await Registration.create({
            studentName,
            email,
            phone,
            event: eventId,
        });

        res.status(201).json({ message: "Registered Successfully", registration});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not save registration"});
    }
};

// --------------------------------------------------------
// TO FETCH REGISTRAIONTS USING EMAIL ID |=================
// --------------------------------------------------------
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