from flask_mail import Mail, Message

def send_otp_mail(email, otp):
    msg_title = "All Stackers - Verify your email"
    sender = "noreply@app.com"
    msg = Message(msg_title,sender=sender,recipients=[email])
    msg.body = "Your OTP is " + otp
    mail = Mail()
    
    try:
        mail.send(msg)
        return {"error": False, "message": "Email sent successfully"}
    except Exception as e:
        return f"The email was not sent. Error: {e}"
    