export const getOtpHtml = (otp)=>{
return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f9;">

  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">

        <table width="400" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:30px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

          <tr>
            <td align="center">
              <h2 style="margin-bottom:20px; color:#333;">🔐 OTP Verification</h2>
            </td>
          </tr>

          <tr>
            <td>
              <p style="color:#555; font-size:14px;">
                Hello,
              </p>
              <p style="color:#555; font-size:14px;">
                Use the OTP below to verify your account:
              </p>

              <div style="text-align:center; margin:20px 0;">
                <span style="display:inline-block; font-size:24px; font-weight:bold; color:#007bff; letter-spacing:5px;">
                  ${otp}
                </span>
              </div>

              <p style="color:#777; font-size:13px;">
                ⏳ This code is valid for 5 minutes.
              </p>

              <p style="color:#777; font-size:13px;">
                🔒 Do not share this code with anyone.
              </p>

              <p style="color:#777; font-size:13px;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top:20px;">
              <p style="font-size:12px; color:#aaa;">
                © 2026 Your Company. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`
};