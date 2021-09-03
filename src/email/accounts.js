const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email , name) => {
    sgMail.send({ 
        to:email,
        from:'kanekaryash.11@gmail.com',
        subject:'Welcome to the task manager app',
        text:`Hello ${name}, we are delighted to have you! Feel free to send us feedback regarding the app.`
     })
}

const sendDeleteEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:'kanekaryash.11@gmail.com',
        subject:'We are sorry to let you go',
        text:`Hello ${name}, we are sorry to see you go. send feedback.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail,
}


