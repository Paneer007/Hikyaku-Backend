const nodemailer= require('nodemailer')
let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODE_EMAIL,
      pass: process.env.NODE_EMAIL_PASSWORD,
    }
  });
const senderMailOptions=(email,hash)=>{
  const mailOptions = {
    from: 'sanjaikumar.mani@gmail.com', // Sender address
    to: email, // List of recipients
    subject: 'Login To ChatApp', // Subject line
    html: `
    <h2>Welcome to ChatApp</h2>
    <p>Click <a href="http://localhost:3001/api/signup/verify/${hash}">this link</a> to verify that it is you</p>
    `
  }
  return mailOptions
}
const sendLoginMail = (email,hash)=>{
  console.log(email,hash)
  transport.sendMail(senderMailOptions(email,hash),(err,info)=>{
    if(err){
      console.log(err)
    }else{
      console.log(info)
    }
  })
}
module.exports=sendLoginMail