import User from "../models/postgres-user.js";
import { sendPasswordChangeReminderEmail } from "../services/email.service.js";

const passwordRenewal = async () => {
    try {
        const users = await User.findAll();

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 60);

        for (const user of users) {
            if (user.passwordUpdatedAt <= currentDate) {
                await sendPasswordChangeReminderEmail(user.email);
            }
        }
    } catch (error) {
        console.error("Error in password renewal cron job:", error);
    }
};

export default passwordRenewal;