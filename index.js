console.log("Starting Function");
const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey("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");
console.log("hi before");


async function send(mailData) {
    var response;
    sgMail.setApiKey("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");
    const link = mailData.link;
    const msg = {
        to: 'saivaishnavi11@gmail.com',// Change to your recipient
        from: 'vaishu0299@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'Verify Link: ' + link,
        html: <p>{{ link }}</p>,
    }
    await sgMail
        .send(msg)
        .then(() => {
            response = 'EmailSent!!';
        })
        .catch((err) => {
            response = err;
        })
        return response;
}

exports.handler = async (event) => {
    let message = event.Records[0].Sns.Message;
    console.log('Message received from SNS:', message);
    let data = JSON.parse(message);
    console.log(data);
    var response = await send(data);
    console.log("It's Done!!!")
    return {
        statusCode: 200,
        body: response
    }
}

    // exports.handler = async function (event, context, callback) {
    // console.log("inside handler");

    // let message = event.Records[0].Sns.Message;
    // console.log('Message received from SNS:', message);
    // let data = JSON.parse(message);
    // console.log(data);
    // let fromAddress = data.fromAddress;
    // let toAddress = data.toAddress;
    // let userName = data.userName;
    // let link = data.link;
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
//   to: 'saivaishnavi11@gmail.com',// Change to your recipient
//   from: 'vaishu0299@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// console.log("after msg")
// sgMail.send(msg)
//   .then((response) => {
//     console.log('Email sent');
//    callback(null, response);
//   })
//   .catch((error) => {
//     console.log(error)
//    callback(error)
//   })

//   console.log("end of handler");
// };
