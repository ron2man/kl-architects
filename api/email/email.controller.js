const {startEmail} = require('./email.service')


const sendEmail = async (req, res) => {
    const {emailData} = req.body
    let senderEmail = emailData.email
    let senderName = emailData.name
    let senderMsg = emailData.msg


    if (senderEmail && senderName && senderMsg) {
        await startEmail(senderEmail, senderName, senderMsg)
        res.status(200).send('email sent successfully')
    }
    else
        res.status(400).send('something wrong')
}


module.exports = {
    sendEmail
}