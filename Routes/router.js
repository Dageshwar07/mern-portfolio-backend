const express = require("express");
const router = new express.Router();
const users = require("../models/userSchema");
const nodemailer = require("nodemailer");

// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});


//register user details
router.post("/register", async (req, res) => {
    const { fname, lname, email, mobile, message } = req.body;

    if (!fname || !lname || !email || !mobile) {
        res.status(401).json({ status: 401, error: "All Input require" })
    }

    try {
        const preuser = await users.findOne({ email: email });

        if (preuser) {
            const userMessage = await preuser.Messagesave(message);
            console.log(userMessage);
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "sending email by bhaijan",
                html:'<h1>Welcome</h1><p>That was easy!</p>',
                amp: `<!doctype html>
                <html ⚡4email>
                  <head>
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                  </head>
                  <body>
                    <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                    <p>GIF (requires "amp-anim" script in header):<br/>
                      <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
                  </body>
                </html>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error" + error)
                } else {
                    console.log("Email sent" + info.response);
                    res.status(201).json({ status: 201, message: "Email sent SUccesfully" })
                }
            });
        } else {
            const finalUser = new users({
                fname, lname, email, mobile, messages:{message:message}
            });

            const storeData = await finalUser.save();

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "sending email for new users",
                html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
                amp: `<!doctype html>
                <html ⚡4email>
                  <head>
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                  </head>
                  <body>
                    <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                    <p>GIF (requires "amp-anim" script in header):<br/>
                      <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
                  </body>
                </html>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error" + error)
                } else {
                    console.log("Email sent" + info.response);
                    res.status(201).json({ status: 201, message: "Email sent SUccesfully" })
                }
            });
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(401).json({ status: 401, error: "All Input require" });
        console.log("catch error")
    }

})




module.exports = router;