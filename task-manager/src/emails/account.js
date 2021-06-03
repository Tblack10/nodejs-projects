const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'travisb.dev@gmail.com',
        subject: 'Thanks for joining!',
        text: `Welcome to the app, ${name}. Let us know how you like the app!`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'travisb.dev@gmail.com',
        subject: 'Sorry to see you go!',
        text: `${name} Is there anything we could have done better? Let us know!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}