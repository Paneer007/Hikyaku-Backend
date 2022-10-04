let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });
const mailOptions = {
  from: 'sender@gmail.com', // Sender address
  to: 'receiver@gmail.com', // List of recipients
  subject: 'Node Mailer', // Subject line
  text: 'Hello People!, Welcome to Bacancy!',
}
const sendLoginMail = ()=>{

}
export default sendLoginMail