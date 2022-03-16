const MailGen = require('mailgen')
const sgMail = require('@sendgrid/mail')

const getEmail = (name = '') => {
    return {
        body: {
            name,
            intro: 'Bienvenido a Disney Alkemy',
        },
    }
}

const generateTemplate = (email = {}) => {
    const mailGenerator = new MailGen({
        theme: 'salted',
        product: {
            name: 'Disney Alkemy',
            link: 'https://www.alkemy.org/'
        },
    })
    const emailTemplate = mailGenerator.generate(email)
    require('fs').writeFileSync(`./www/preview.html`, emailTemplate, 'utf8')
    return emailTemplate
}

const getMsg = (to = '', subject = '', html) => {
    return {
        to,
        from: process.env.SENDER_EMAIL,
        subject,
        html
    }
}

const sendMail = async (msg = {}) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        return sgMail.send(msg)
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    getEmail,
    generateTemplate,
    getMsg,
    sendMail
}