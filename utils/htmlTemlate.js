// templates/verifyEmail.js
// utils/emailTemplates.js

// register Email verify
export const verifyEmailTemplate = (userName, link) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f7;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4CAF50;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .body {
      padding: 30px;
      text-align: center;
    }
    .body h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .body p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
    }
    .btn {
      display: inline-block;
      padding: 12px 25px;
      font-size: 16px;
      color: white;
      background-color: #4CAF50;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .btn:hover {
      background-color: #45a049;
    }
    .footer {
      background-color: #f4f4f7;
      padding: 20px;
      font-size: 12px;
      text-align: center;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HostMost</h1>
    </div>
    <div class="body">
      <h2>Hello ${userName}!</h2>
      <p>Thanks for registering. Click the button below to verify your email address and activate your account.</p>
      <a href="${link}" class="btn">Verify Email</a>
    </div>
    <div class="footer">
      <p>If you did not create an account, please ignore this email.</p>
      <p>&copy; ${new Date().getFullYear()} HostMost. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// reset password verify
export const resetPasswordTemplate = (userName, link) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f7;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background-color: #FF5722;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .body {
      padding: 30px;
      text-align: center;
    }
    .body h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .body p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
    }
    .btn {
      display: inline-block;
      padding: 12px 25px;
      font-size: 16px;
      color: white;
      background-color: #FF5722;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .btn:hover {
      background-color: #e64a19;
    }
    .footer {
      background-color: #f4f4f7;
      padding: 20px;
      font-size: 12px;
      text-align: center;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HostMost</h1>
    </div>
    <div class="body">
      <h2>Hello ${userName}!</h2>
      <p>We received a request to reset your password. Click the button below to set a new password.</p>
      <a href="${link}" class="btn">Reset Password</a>
      <p>If you didn’t request a password reset, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} HostMost. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// method free hosting aproved mail 
export const freeServiceApprovedTemplate = (userName) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Service Approved</title>
  </head>
  <body style="margin:0; padding:0; background:#f5f6fa; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin-top:40px; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#0a0a0a; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0;">🎉 Congratulations!</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                
                <h2 style="margin-top:0;">Hi ${userName}, 👋</h2>
                
                <p style="color:#555; font-size:16px; line-height:1.6;">
                  We’re excited to inform you that your application for our <strong>Free Hosting Service</strong> has been <strong>successfully approved</strong>.
                </p>

                <p style="color:#555; font-size:16px; line-height:1.6;">
                  Your account is now in the setup phase. You will receive your <strong>cPanel access details</strong> within 
                  <strong>3 to 5 business days</strong>.
                </p>

                <p style="color:#555; font-size:16px; line-height:1.6;">
                  Please keep an eye on your email for further updates and instructions.
                </p>

                <!-- Highlight Box -->
                <div style="background:#f1f2f6; padding:15px; border-radius:6px; margin:20px 0;">
                  <p style="margin:0; color:#333; font-size:15px;">
                    ⏳ Estimated Setup Time: <strong>3–5 Business Days</strong><br/>
                    📩 Access Details: Will be sent via email
                  </p>
                </div>

                <p style="color:#777; font-size:14px;">
                  If you have any questions, feel free to contact our support team.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f5f6fa; padding:20px; text-align:center; font-size:12px; color:#999;">
                © ${new Date().getFullYear()} HostMost. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

// cpanel access info mail
export const cpanelAccessInfo = (userName, cpanelUrl) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>cPanel Access Granted</title>
</head>

<body style="margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f4f4;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#000; color:#fff; padding:20px; text-align:center;">
<h2 style="margin:0;">🎉 cPanel Access Granted</h2>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:30px; color:#333;">

<h3>Hello ${userName} 👋</h3>

<p>
🎉 <strong>Congratulations!</strong><br/>
You have successfully received your cPanel access.
</p>

<p><strong>🔐 Your Login Details:</strong></p>

<table width="100%" cellpadding="10" cellspacing="0" style="background:#f9f9f9; border-radius:5px;">
<tr>
<td><strong>Username:</strong></td>
<td>${userName}</td>
</tr>

<tr>
<td><strong>cPanel URL:</strong></td>
<td>
<a href="${cpanelUrl}" style="color:#007bff;">${cpanelUrl}</a>
</td>
</tr>
</table>

<p style="margin-top:20px;">
You can now log in and start managing your hosting services.
</p>

<!-- Button -->
<div style="text-align:center; margin:30px 0;">
<a href="${cpanelUrl}" 
style="padding:12px 25px; background:#000; color:#fff; text-decoration:none; border-radius:5px;">
Login to cPanel
</a>
</div>

<p style="font-size:12px; color:#777;">
⚠️ Keep your login details secure. Do not share them with anyone.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#555;">
© 2026 HostMost. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

// your site live soon info mail
export const siteLiveSoonEmail = (userName,cpanelUrl) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Website Activation in Progress</title>
</head>

<body style="margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f4f4;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#000; color:#fff; padding:20px; text-align:center;">
<h2 style="margin:0;">🚀 Website Setup in Progress</h2>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:30px; color:#333;">

<h3 style="margin-top:0;">Hello ${userName} 👋</h3>

<p>
🎉 <strong>Good News!</strong><br/>
Your website setup process has started successfully.
</p>

<p>
⏳ <strong>Your website will be live within 72 hours (3 business days).</strong>
</p>

<p>
Once your website is ready, we will send you another email with your live website link.
</p>

<p>
🔗 <strong>Your Live Link:</strong><br/>
<span style="color:#999;">Will be shared after activation</span>
</p>

<!-- Button -->
<div style="text-align:center; margin:30px 0;">
<a href="${cpanelUrl}" 
style="padding:12px 25px; background:#000; color:#fff; text-decoration:none; border-radius:5px;">
View Website (Coming Soon)
</a>
</div>

<p>
If you have any questions, feel free to contact our support team anytime.
</p>

<p style="font-size:12px; color:#777;">
⚠️ Please wait while we complete your setup. You will be notified soon.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#555;">
© 2026 HostMost. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

// amin email info method free hosting service
export const adminNewApplicationTemplate = (userName, userEmail) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Free Hosting Application</title>
</head>

<body style="margin:0; padding:0; background:#f5f6fa; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin-top:40px; border-radius:10px; overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#111; padding:20px; text-align:center;">
<h1 style="color:#fff; margin:0;">📥 New Application Received</h1>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:30px;">

<h2 style="margin-top:0;">Hello Admin 👋</h2>

<p style="color:#555; font-size:16px; line-height:1.6;">
A new user has applied for the <strong>Free Hosting Service</strong>.
</p>

<!-- User Info -->
<div style="background:#f1f2f6; padding:15px; border-radius:6px; margin:20px 0;">
<p style="margin:0; font-size:15px; color:#333;">
👤 <strong>User Name:</strong> ${userName} <br/>
📧 <strong>Email:</strong> ${userEmail}
</p>
</div>

<p style="color:#555; font-size:16px;">
Please review the application and take necessary action.
</p>

<!-- Button -->
<div style="text-align:center; margin:30px 0;">
<a href="${process.env.ADMIN_PANEL_URL || "#"}"
style="padding:12px 25px; background:#000; color:#fff; text-decoration:none; border-radius:5px;">
Go to Admin Panel
</a>
</div>

<p style="color:#777; font-size:14px;">
This is an automated notification email from your system.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f5f6fa; padding:20px; text-align:center; font-size:12px; color:#999;">
© ${new Date().getFullYear()} HostMost Admin System
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

// admin site setup started info mail
export const adminSiteSetupStartedTemplate = (userName, userEmail, cpanelUrl) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Site Setup Started</title>
</head>

<body style="margin:0; padding:0; background:#f4f4f4; font-family: Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#111; color:#fff; padding:20px; text-align:center;">
<h2 style="margin:0;">🚀 Site Setup Started</h2>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:30px; color:#333;">

<h3>Hello Admin 👋</h3>

<p>
A user's website setup process has been successfully started.
</p>

<!-- User Info -->
<table width="100%" cellpadding="10" cellspacing="0" style="background:#f9f9f9; border-radius:5px; margin:20px 0;">
<tr>
<td><strong>User Name:</strong></td>
<td>${userName}</td>
</tr>
<tr>
<td><strong>Email:</strong></td>
<td>${userEmail}</td>
</tr>
<tr>
<td><strong>cPanel URL:</strong></td>
<td>
<a href="${cpanelUrl}" style="color:#007bff;">${cpanelUrl}</a>
</td>
</tr>
</table>

<p>
⏳ The website is expected to go live within <strong>72 hours</strong>.
</p>

<p>
You can monitor the progress or take further action if required.
</p>

<!-- Button -->
<div style="text-align:center; margin:30px 0;">
<a href="${process.env.ADMIN_PANEL_URL || "#"}"
style="padding:12px 25px; background:#000; color:#fff; text-decoration:none; border-radius:5px;">
Open Admin Panel
</a>
</div>

<p style="font-size:12px; color:#777;">
This is an automated system notification.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#555;">
© ${new Date().getFullYear()} HostMost Admin System
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};


// user website live link
export const siteLiveEmailTemplate = (userName, cpanelUrl, liveUrl) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your Website is Live 🎉</title>
</head>

<body style="margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f4f4;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">

<!-- Header -->
<tr>
<td style="background:#000; color:#fff; padding:20px; text-align:center;">
<h2 style="margin:0;">🚀 Your Website is Now Live!</h2>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:30px; color:#333;">

<h3 style="margin-top:0;">Hello ${userName} 👋</h3>

<p style="font-size:16px; line-height:1.6;">
🎉 <strong>Congratulations!</strong><br/>
Your website has been successfully launched and is now live on the internet.
</p>

<p style="font-size:16px; line-height:1.6;">
You can now access your website using the link below and start sharing it with the world 🌍
</p>

<!-- Live Link Box -->
<div style="background:#f1f2f6; padding:15px; border-radius:6px; margin:20px 0;">
<p style="margin:0; font-size:15px;">
🌐 <strong>Live Website:</strong><br/>
<a href="${liveUrl}" style="color:#007bff;">${liveUrl}</a>
</p>
</div>

<!-- Buttons -->
<div style="text-align:center; margin:30px 0;">

<a href="${liveUrl}" 
style="display:inline-block; margin:10px; padding:12px 25px; background:#28a745; color:#fff; text-decoration:none; border-radius:5px;">
View Website
</a>

<a href="${cpanelUrl}" 
style="display:inline-block; margin:10px; padding:12px 25px; background:#000; color:#fff; text-decoration:none; border-radius:5px;">
Go to cPanel
</a>

</div>

<p style="font-size:15px; color:#555;">
You can now manage your website, upload files, and customize everything through your cPanel.
</p>

<p style="font-size:14px; color:#777;">
If you need any help, feel free to contact our support team anytime.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#555;">
© ${new Date().getFullYear()} HostMost. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};


// export const welcomeEmailTemplate = (userName) => {
//   return `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <meta charset="UTF-8" />
//     <title>Welcome</title>
//   </head>
//   <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
    
//     <table width="100%" cellpadding="0" cellspacing="0">
//       <tr>
//         <td align="center">
          
//           <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin-top:40px; border-radius:10px; overflow:hidden;">
            
//             <!-- Header -->
//             <tr>
//               <td style="background:#000; padding:20px; text-align:center;">
//                 <h1 style="color:#fff; margin:0;">Welcome 🎉</h1>
//               </td>
//             </tr>

//             <!-- Body -->
//             <tr>
//               <td style="padding:30px;">
//                 <h2 style="margin-top:0;">Hi ${userName}, 👋</h2>
                
//                 <p style="color:#555; font-size:16px; line-height:1.6;">
//                   Welcome to our platform! We're excited to have you on board.
//                 </p>

//                 <p style="color:#555; font-size:16px; line-height:1.6;">
//                   Your account has been successfully created. You can now explore features, manage your account, and enjoy our services.
//                 </p>

//                 <!-- Button -->
//                 <div style="text-align:center; margin:30px 0;">
//                   <a href="${process.env.BASE_URL}" 
//                      style="background:#000; color:#fff; padding:12px 25px; text-decoration:none; border-radius:5px; font-size:16px;">
//                     Get Started
//                   </a>
//                 </div>

//                 <p style="color:#999; font-size:14px;">
//                   If you have any questions, feel free to contact our support team.
//                 </p>
//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td style="background:#f4f4f4; padding:20px; text-align:center; font-size:12px; color:#777;">
//                 © ${new Date().getFullYear()} HostMost. All rights reserved.
//               </td>
//             </tr>

//           </table>

//         </td>
//       </tr>
//     </table>

//   </body>
//   </html>
//   `;
// };