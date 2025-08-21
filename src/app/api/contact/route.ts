import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, message, subject, pageUrl } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_EMAIL_USER, // Gmail
        pass: process.env.NEXT_EMAIL_PASS, // Gmail App Password
      },
    })

    const mailOptions = {
      from: process.env.NEXT_EMAIL_USER,  // ✅ must match authenticated user
      replyTo: email,                     // reply goes to user input
      to: process.env.NEXT_EMAIL_TO,      // ✅ actual recipient email
      subject: `New Query Submission from ${name} for ${subject}`,
      text: message,
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
              <title>New Contact Form Submission</title>
              <style>
                body {
                  margin: 0;
                  font-family: 'Segoe UI', Roboto, Arial, sans-serif;
                  background-color: #f5f7fa;
                  padding: 20px;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: auto;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .header {
                  background: linear-gradient(135deg, #007bff, #00bfff);
                  color: white;
                  text-align: center;
                  padding: 24px;
                }
                .header h1 {
                  margin: 0;
                  font-size: 22px;
                  font-weight: 600;
                }
                .content {
                  padding: 24px;
                }
                .content p {
                  margin: 8px 0;
                  font-size: 15px;
                  line-height: 1.5;
                }
                .label {
                  font-weight: 600;
                  color: #555;
                }
                .message-box {
                  background: #f5f7fa;
                  padding: 16px;
                  border-radius: 8px;
                  margin-top: 10px;
                  font-size: 14px;
                  color: #333;
                }
                .footer {
                  background: #fafafa;
                  padding: 16px;
                  text-align: center;
                  font-size: 13px;
                  color: #777;
                }
                .btn {
                  display: inline-block;
                  margin-top: 12px;
                  background: #007bff;
                  color: #fff !important;
                  text-decoration: none;
                  padding: 10px 18px;
                  border-radius: 6px;
                  font-size: 14px;
                }
                .btn:hover {
                  background: #0056b3;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📩 New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <p><span class="label">Name:</span> ${name}</p>
                  <p><span class="label">Email:</span> ${email}</p>
                  <p><span class="label">Subject:</span> ${subject}</p>

                  <p class="label">Message:</p>
                  <div class="message-box">
                    ${message}
                  </div>
                </div>
                <div class="footer">
                  <p>This message was sent via your portfolio contact form.</p>
                  <p class="label">Submitted from:</p>
                  <a href=${pageUrl} class="btn">View Page</a>
                </div>
              </div>
            </body>
            </html>
            `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email sent successfully!' }, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Email sending error:', error.message)
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      )
    }

    console.error('Unknown error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
