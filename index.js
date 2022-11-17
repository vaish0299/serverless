console.log("Starting Function");
//import { Context, Callback } from 'aws-lambda';
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
console.log("hi before");
exports.handler = async function (event, context, callback) {
  console.log("inside handler");

  let message = event.Records[0].Sns.Message;
  console.log("Message received from SNS:", message);
  console.log("message from sns");
  let data = JSON.parse(message);
  console.log(data);
  let fromAddress = data.fromAddress;
  let toAddress = data.toAddress;
  let userName = data.userName;
  let link = data.link;
  // let params = {
  //   Destination:
  //   {
  //     ToAddresses: [toAddress],
  //   },
  //   Message:
  //   {
  //     Body:
  //     {
  //       Html:
  //       {
  //         Data:
  //           ` <!DOCTYPE html>
  //             <html>
  //               <head>
  //                 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  //                 <title>Account Verification</title>
  //                 <style>
  //                   body {
  //                     background-color: #FFFFFF;
  //                     padding: 10px;
  //                     margin: 10px;
  //                   }
  //                 </style>
  //               </head>
  //               <body style="background-color: #FFFFFF; padding: 10px; margin: 10px;">
  //               <article>
  //                 <h1>
  //                   Hi ${userName},
  //                 </h1>
  //                 <br>
  //                 <h2>
  //                   Welcome to ${data.domain},
  //                 </h2>
  //                 <p> Please user <a href=${link}>link</a> to verify your account.  </p>
  //                 <br>
  //                 <p> if you are unable to user the link, copy paste the below link in your browser</p>
  //                 <p>${link}</p>
  //               </article>
  //               </body>
  //             </html>`
  //       },
  //     },
  //     Subject: { Data: `Account Verification - ${data.toAddress}` },
  //   },
  //   Source: fromAddress,
  // };
  // const msg = {
  // 	to: {
  // 		email: event?.to?.email,
  // 		name: event?.to?.name,
  // 	},
  // 	from: {
  // 		email: event?.from?.email,
  // 		name: event?.from?.name,
  // 	},
  // 	templateId: event.template_id,
  // 	dynamic_template_data: event.dynamic_template_data,
  // };
  // const msg = {

  // 	templateId: "d-bbbc74a2f0bf4246b086ffae2fd02986",
  // 	dynamic_template_data: event.dynamic_template_data,
  // };

  const msg = {
    to: toAddress,
    from: "no-reply@demo.vaishnavisai.me", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: ` <!DOCTYPE html>
              <html>
                <head>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <title>Account Verification</title>
                  <style>
                    body {
                      background-color: #FFFFFF;
                      padding: 10px;
                      margin: 10px;
                    }
                  </style>
                </head>
                <body style="background-color: #FFFFFF; padding: 10px; margin: 10px;">
                <article>
                  <h1>
                    Hi ${userName},
                  </h1>
                  <br>
                  <h2>
                    Welcome to demo.vaishnavisai.me,
                  </h2>
                  <p> Please user <a href=${link}>link</a> to verify your account.  </p>
                  <br>
                  <p> if you are unable to user the link, copy paste the below link in your browser</p>
                  <p>${link}</p>
                </article>
                </body>
              </html>`,
  };
  console.log("after msg elroy");
  sgMail
    .send(msg)
    .then((mailResponse) => {
      console.log("Email sent finally");
      callback(null, mailResponse);
    })
    .catch((error) => {
      console.error(error);
      callback("Error occurred while sending an email", error);
    });
};
