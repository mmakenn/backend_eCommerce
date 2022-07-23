import { createTransport } from "nodemailer";
import { serverEmail, serverEmailPassword, adminEmail } from "../../config.js";
import logger from "../middleware/logger.js";

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: serverEmail,
        pass: serverEmailPassword
    }
});

function createOptionsEmailNewUser(infoUser) {
    return {
        from: "Server",
        to: adminEmail,
        subject: "Nuevo registro",
        html: `<h1>Nuevo usuario registrado: ${infoUser.username}</h1>
            <h2>Estos son los datos de afiliación:</h2>
            <spam>Nombre: ${infoUser.name}</spam>
            <spam>Edad: ${infoUser.age}</spam>
            <spam>Celular: ${infoUser.phone}</spam>
            <spam>Dirección: ${infoUser.adress}</spam>`
    } 
}

async function sendEmailNewUser(infoUser) {
    const options = createOptionsEmailNewUser(infoUser)
    try {
        await transporter.sendMail(options)
    } catch (error) {
        logger.error(`Error while sending email to Admin about new singUp.\n
                    ${error}`)
    }
}

export function sendEmailToAdmin(req, res, next) {
    sendEmailNewUser(req.body)
    next()
}