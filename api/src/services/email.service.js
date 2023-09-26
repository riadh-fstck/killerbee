import mailTransporter from "../config/mail-config.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (email, subject, template) => {
    try {
        await mailTransporter.sendMail({
            from: process.env.MAIL_SMTP_USER,
            to: email,
            subject,
            html: template,
        });
    } catch (error) {
        console.error(error);
    }
};

export const sendEmailConfirmation = async (email, token) => {
    try {
        const confirmationLink = `http://localhost:3000/auth/validate?email=${email}&token=${token}`;

        const subject = "Confirmation de votre compte";

        const htmlTemplate = fs.readFileSync(
            path.join(__dirname, "../templates/email-confirmation.html"),
            "utf8"
        );

        const template = htmlTemplate.replace(
            "{{confirmationLink}}",
            confirmationLink
        );

        await sendEmail(email, subject, template);

        return true;
    } catch (error) {
        console.error(`Error sending confirmation email : ${error}`);
    }
};

export const sendBlockedAccountEmail = async (email) => {
    try {
        const htmlTemplate = fs.readFileSync(
            path.join(__dirname, "../templates/blocked-user-notification.html"),
            "utf8"
        );

        const subject = "Compte temporairement bloqué";

        await sendEmail(email, subject, htmlTemplate);

        return true;
    } catch (error) {
        console.error(`Error sending blocked account email : ${error}`);
    }
};

export const sendPasswordChangeReminderEmail = async (email) => {
    try {
        const htmlTemplate = fs.readFileSync(
            path.join(__dirname, "../templates/password-change-reminder.html"),
            "utf8"
        );

        const subject = "Changement de mot de passe nécessaire";

        const passwordResetLink = `http://localhost:3000/users/reset-password?email=${email}`;

        const template = htmlTemplate.replace(
            "{{passwordResetLink}}",
            passwordResetLink
        );

        await sendEmail(email, subject, template);

        return true;
    } catch (error) {
        console.error(
            `Error sending password change reminder email : ${error}`
        );
    }
};

export const sendDeletedAccountEmail = async (email, encryptionKey) => {
    try {
        const htmlTemplate = fs.readFileSync(
            path.join(
                __dirname,
                "../templates/deleted-account-notification.html"
            ),
            "utf8"
        );

        const recoveryLink = `http://localhost:3000/users/recover?email=${email}&key=${encryptionKey}`;

        const subject = "Votre compte a bien été supprimé";

        const template = htmlTemplate
            .replace("{{key}}", encryptionKey)
            .replace("{{recoveryLink}}", recoveryLink);

        await sendEmail(email, subject, template);

        return true;
    } catch (error) {
        console.error(`Error sending deleted account email : ${error}`);
    }
};
