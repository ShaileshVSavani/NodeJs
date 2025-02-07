const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'svs.rnw23@gmail.com',
        pass:'dodb hcgl gzkc djng'
    }
})

const sendMail = async (to,subject,content)=>{
    try {
        const mailOptions ={
            from:'svs.rnw23@gmail.com',
            to:to,
            subject:subject,
            html:content
        }
        let res = await transport.sendMail(mailOptions)
    } catch (error) {
        console.error(error);
        
    }
}

module.exports = sendMail