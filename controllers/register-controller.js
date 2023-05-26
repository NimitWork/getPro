const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodemailer = require("nodemailer");

module.exports.register = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let Originalpassword = req.body.password;
  console.log(req.body);
  try {
    let password = await bcrypt.hash(Originalpassword, 10);
    let existUsername = await User.findOne({ username: req.body.username });
    let existEmail = await User.findOne({ email: req.body.email });
    if (existUsername === null) {
      if (existEmail === null) {
        if (req.body.password === req.body.confirmPassword) {
          axios
            .get(
              "https://ipgeolocation.abstractapi.com/v1/?api_key=3047534b15b94214bf312c827d8bb4d7"
            )
            .then(async (response) => {
              console.log("thissssss", response.data);

              // CREATE USER

              const userData = new User({
                username: username,
                email: email,
                password: password,
                status: "active",
                wallet: 0,
                IP_Address: response.data.ip_address,
                registerTime: new Date().toLocaleString(),
                loginTime: "Not Login",
                type: "user",
                location:
                  response.data.city +
                  " " +
                  response.data.region +
                  " " +
                  response.data.country,
                logintype: "register",
              });
              await userData.save();

              // SEND EMAIL TO ADMIN

              const mailTransporter = nodemailer.createTransport({
                host: `smtp.gmail.com`,
                port: 465,
                secure: true,
                auth: {
                  user: "bablusaini90310@gmail.com",
                  pass: "ugczuoedytcgkqtr",
                },
              });
              let mailDetails = {
                from: "bablusaini90310@gmail.com",
                to: "bablusaini90310@gmail.com",
                subject: "Test mail",
                html: `

                <!doctype html>
                <html lang="en">
                  <head>
                  
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                
                   
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                
                    <title>Hello, world!</title>
                    <style>
                          .background{
                           
                          }
                   </style>
                  </head>
                 
                  <body>
                  <div style="width:450px">
                  <label style="background:#03979c;display:block;text-align:center;color:white;padding:80px 0px">
                      <h1 style="margin:0;">
                      A new registration successfully
                      </h1>
                      <p style="margin:0;font-size:14px;">User Details</p>
                  </label>
                  <label style="width:100%;display:block;background:#ebebeb;padding:14px;box-sizing:border-box;font-size:14px">
                       <p style="margin-top:0"> username :<b style="margin-left:40px">${username}</b></p>
                   
                        <p> email :<b style="margin-left:40px">${email}</b></p>
                  </label>
              </div> 
                 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
                 </body>
                </html>
                `,
              };

              mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).json({
                    message: "mail have sent successfully",
                  });
                }
              });

              //  EMAIL SENT TO USER

              const usermailTransporter = nodemailer.createTransport({
                host: `smtp.gmail.com`,
                port: 465,
                secure: true,
                auth: {
                  user: "bablusaini90310@gmail.com",
                  pass: "ugczuoedytcgkqtr",
                },
              });
              let usermailDetails = {
                from: "bablusaini90310@gmail.com",
                to: `${email}`,
                subject: "Test mail",
                html: `

                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                 <head> 
                  <meta charset="UTF-8"> 
                  <meta content="width=device-width, initial-scale=1" name="viewport"> 
                  <meta name="x-apple-disable-message-reformatting"> 
                  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
                  <meta content="telephone=no" name="format-detection"> 
                  <title>Get Pro Writer</title> 
                  <!--[if (mso 16)]>
                    <style type="text/css">
                    a {text-decoration: none;}
                    </style>
                    <![endif]--> 
                  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
                  <!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG></o:AllowPNG>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
                <![endif]--> 
                  <style type="text/css">
                a {
                  font-family:arial, 'helvetica neue', helvetica, sans-serif;
                  font-size:14px;
                  text-decoration:none;
                }
                #outlook a {
                  padding:0;
                }
                .ExternalClass {
                  width:100%;
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height:100%;
                }
                .es-button {
                  mso-style-priority:100!important;
                  text-decoration:none!important;
                }
                a[x-apple-data-detectors] {
                  color:inherit!important;
                  text-decoration:none!important;
                  font-size:inherit!important;
                  font-family:inherit!important;
                  font-weight:inherit!important;
                  line-height:inherit!important;
                }
                .es-desk-hidden {
                  display:none;
                  float:left;
                  overflow:hidden;
                  width:0;
                  max-height:0;
                  line-height:0;
                  mso-hide:all;
                }
                @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:14px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:left; line-height:120%!important } h2 { font-size:20px!important; text-align:left; line-height:120%!important } h3 { font-size:16px!important; text-align:left; line-height:120%!important } h1 a { font-size:30px!important; text-align:left } h2 a { font-size:20px!important; text-align:left } h3 a { font-size:16px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:11px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button { font-size:18px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .stack { display:block!important } .h-resize20px { height:20px!important } .reveal-mobile-2 { display:block!important; width:100%!important; max-height:inherit!important; overflow:visible!important; text-align:right!important } .content-open { border-radius:30px; padding:4px; display:inline-block; text-align:center; width:20px; height:20px; position:relative; top:12px; font-size:18px; font-family:Arial, sans-serif; margin-right:10px; vertical-align:middle!important } .body-content-1, .body-content-2, .body-content-3 { max-height:0; overflow:hidden; margin:0 } #content-1:target div.body-content-1, #content-2:target div.body-content-2, #content-3:target div.body-content-3 { -webkit-transition:all 0.5s ease-in-out; -moz-transition:all 0.5s ease-in-out; -ms-transition:all 0.5s ease-in-out; -o-transition:all 0.5s ease-in-out; transition:all 0.5s ease-in-out; max-height:999px } }
                </style> 
                 </head> 
                 <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
                  <div class="es-wrapper-color" style="background-color:#F7F7F7"> 
                
                            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
                     <tr style="border-collapse:collapse"> 
                      <td valign="top" style="padding:0;Margin:0"> 
                       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                         <tr style="border-collapse:collapse"> 
                          <td class="es-adaptive" align="center" style="padding:0;Margin:0"> 
                           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:white;width:610px" cellspacing="0" cellpadding="0" bgcolor="#a77638" align="center"> 
                             <tr style="border-collapse:collapse"> 
                              <td style="Margin:0;padding-top:20px;padding-bottom:20px; padding-right:10px;background-color:white" bgcolor="#9d641e" align="left"> 
                               <!--[if mso]><table style="width:570px" cellpadding="0" 
                                        cellspacing="0"><tr><td style="width:275px" valign="top"><![endif]--> 
                               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:275px"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                      <td class="es-m-p0l es-m-txt-c" align="left" style="padding:0;Margin:0;font-size:0px">
                            <a href="https://getprowriter.com/" target="_blank" style="font-family:arial, helvetica, sans-serif;font-size:14px;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#3D5CA3"><img src="https://i.ibb.co/k16XxZM/logo-get-pro-writer.png" alt style="width: 100%; padding-left: 15px; display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                               </table> 
                               <!--[if mso]></td><td style="width:20px"></td><td style="width:275px" valign="top"><![endif]--> 
                               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td align="left" style="padding:0;Margin:0;width:275px"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                     
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                               </table> 
                               <!--[if mso]></td></tr></table><![endif]--></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"> 
                           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#AA7637;width:610px" cellspacing="0" cellpadding="0" bgcolor="#aa7637" align="center"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="padding:0;Margin:0"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                 <tr style="border-collapse:collapse"> 
                                
                                 </tr> 
                               </table></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"> 
                           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#fef8f0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#f6fbfb;width:610px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td valign="top" align="center" style="padding:0;Margin:0;width:570px"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                      <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#0B5394"><strong>Hi Christopher Smith&nbsp;</strong></h2></td> 
                                     </tr> 
                                     <tr style="border-collapse:collapse"> 
                                      <td align="left" style="padding:0;Margin:0;padding-bottom:5px">
                            <h3 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, helvetica, sans-serif;font-size:17px;font-style:normal;font-weight:normal;color:#333333">
                            <br></h3>
                            <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, helvetica, sans-serif;line-height:21px;color:#333333">This is an auto confirmation of your posted question. We will respond back to you shortly after we have evaluated your question details.&nbsp;<br><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, helvetica, sans-serif;line-height:21px;color:#333333">If you would like to make any changes in the question or have not received any response from us in 2 hours, please contact via email or WhatsApp.</p></td> 
                                     </tr> 
                           
                           <tr style="border-collapse:collapse"> 
                                      <td align="center" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:transparent;background:transparent;border-width:15px;display:inline-block;border-radius:4px;width:auto">
                            <a href="https://getprowriter.com/" class="es-button" target="_blank" 
                            style="font-family:arial, helvetica, sans-serif;font-size:16px;text-decoration:none;mso-style-priority:100 !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF; padding: 10px; border-style:solid;border-color:#049899;border-width:0px 15px;display:inline-block;background:#049899;border-radius:4px;font-weight:bold;font-style:normal;line-height:19px;width:auto;text-align:center">Read More</a></span>
                            </td> 
                                     </tr> 
                           
                                   </table></td> 
                                 </tr> 
                               </table></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"> 
                          <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:610px"> 
                             <tr style="border-collapse:collapse"> 
                              <td style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px;background-color:#049899" bgcolor="#cb7d1d" align="left"> 
                               <!--[if mso]><table style="width:590px" cellpadding="0" 
                                            cellspacing="0"><tr><td style="width:206px" valign="top"><![endif]--> 
                               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:186px"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px;font-size:0"><img src="https://hsvthz.stripocdn.email/content/guids/CABINET_66498ea076b5d00c6f9553055acdb37a/images/39911527588288171.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="24"></td> 
                                     </tr> 
                                     <tr style="border-collapse:collapse"> 
                                      <td align="center" style="padding:0;Margin:0;padding-left:5px;padding-right:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#FFFFFF">&nbsp;R-51, Kailashpuri, Near Manoharpura, Jagatpura, Jaipur 302017</p></td> 
                                     </tr> 
                                   </table></td> 
                                  <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td> 
                                 </tr> 
                               </table> 
                               <!--[if mso]></td><td style="width:182px" valign="top"><![endif]--> 
                               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:182px"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px;font-size:0"><img src="https://hsvthz.stripocdn.email/content/guids/CABINET_66498ea076b5d00c6f9553055acdb37a/images/35681527588356492.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="24"></td> 
                                     </tr> 
                                     <tr style="border-collapse:collapse"> 
                                      <td esdev-links-color="#ffffff" align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF">support@getprowriter.com</p></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                               </table> 
                               <!--[if mso]></td><td style="width:20px"></td><td style="width:182px" valign="top"><![endif]--> 
                               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td align="center" style="padding:0;Margin:0;width:182px"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px;font-size:0"><img src="https://hsvthz.stripocdn.email/content/guids/CABINET_66498ea076b5d00c6f9553055acdb37a/images/50681527588357616.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="24"></td> 
                                     </tr> 
                                     <tr style="border-collapse:collapse"> 
                                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#FFFFFF">+1-412-530-5373&nbsp;<br>+91-9828671065</p></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                               </table> 
                               <!--[if mso]></td></tr></table><![endif]--></td> 
                             </tr> 
                           </table>
                       </td> 
                         </tr> 
                       </table>
                
                   
                       <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"> 
                           <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:610px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px"> 
                            
                               <table class="es-left" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:95px"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                      <td class="es-m-txt-c" esdev-links-color="#666666" align="right" style="padding:0;Margin:0;padding-top:5px"><h4 style="Margin:0;line-height:200%; text-align:center; mso-line-height-rule:exactly;font-family:arial, helvetica, sans-serif;color:#666666">
                            Follow us:</h4></td> 
                                     </tr> 
                                   </table></td> </tr>
                                 
                           <tr style="border-collapse:collapse"> 
                                  <td align="center" style="padding:0;Margin:0;"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                      <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;font-size:0"> 
                                       <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                         <tr style="border-collapse:collapse"> 
                                          <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://www.facebook.com/Getprowriter" style="font-family:arial, helvetica, sans-serif;font-size:12px;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#666666"><img title="Facebook" src="https://hsvthz.stripocdn.email/content/assets/img/social-icons/rounded-gray/facebook-rounded-gray.png" alt="Fb" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                          <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://twitter.com/Getprowriter" style="font-family:arial,  helvetica, sans-serif;font-size:12px;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#666666"><img title="Twitter" src="https://hsvthz.stripocdn.email/content/assets/img/social-icons/rounded-gray/twitter-rounded-gray.png" alt="Tw" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                          <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><a target="_blank" href="https://www.instagram.com/getprowriter/" style="font-family:arial,  helvetica, sans-serif;font-size:12px;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#666666"><img title="Instagram" src="https://hsvthz.stripocdn.email/content/assets/img/social-icons/rounded-gray/instagram-rounded-gray.png" alt="Inst" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                          <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://in.pinterest.com/Getprowriter/" style="font-family:arial,  helvetica, sans-serif;font-size:12px;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#666666"><img title="Pinterest" src="https://hsvthz.stripocdn.email/content/assets/img/social-icons/rounded-gray/pinterest-rounded-gray.png" alt="P" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
                                         </tr> 
                                       </table></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr>
                         
                               </table> 
                               <!--[if mso]></td><td style="width:20px"></td><td style="width:375px" valign="top"><![endif]--> 
                              
                               <!--[if mso]></td></tr></table><![endif]--></td> 
                             </tr> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:10px;padding-right:10px"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td valign="top" align="center" style="padding:0;Margin:0;width:590px"> 
                                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr style="border-collapse:collapse"> 
                                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, helvetica, sans-serif;line-height:18px;color:#666666">This mail is auto generated and&nbsp;was sent to csmith0050@gmail.com&nbsp;from Get Pro Writer&nbsp;because you subscribed.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, helvetica, sans-serif;line-height:18px;color:#666666">If you would not like to receive this email unsubscribe here.</p></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                               </table></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"> 
                           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:610px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                 <tr style="border-collapse:collapse"> 
                                  <td valign="top" align="center" style="padding:0;Margin:0;width:570px"> 
                              
                                 </tr> 
                               </table></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table> 
                  </div>  
                 </body>
                </html>
                `,
              };

              usermailTransporter.sendMail(
                usermailDetails,
                function (err, data) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(otp);

                    res.status(200).json({
                      message: "mail have sent successfully",
                    });
                  }
                }
              );
            })
            .catch((error) => {
              console.log(error);
            });

          res.status(201).json({
            message: "successfully register",
          });
        } else {
          res.status(404).json({
            message: "please enter same password",
          });
        }
      } else {
        res.status(404).json({
          message: "your email id is already exist",
        });
      }
    } else {
      res.status(404).json({
        message: "your username is already exist",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
