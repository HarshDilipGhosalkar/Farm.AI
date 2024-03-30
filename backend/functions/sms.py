import os
from twilio.rest import Client

client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)

def send_otp(number):
    verification = client.verify \
        .v2 \
        .services('VA7e64a86c7e0d139780d5b3f77367f38d') \
        .verifications \
        .create(to=f'+91{number}', channel='sms')
    
    if verification.sid:
        return {"error": False, "message": "OTP sent successfully"}
    else:
        return {"error": True, "message": "OTP not sent"}


def verify_otp(number, otp):
    verification_check = client.verify \
        .services('VA7e64a86c7e0d139780d5b3f77367f38d') \
        .verification_checks \
        .create(to=f'+91{number}', code=otp)
    
    if verification_check.status == 'approved':
        return {"error": False, "message": "OTP verified successfully"}
    else:
        return {"error": True, "message": "OTP verification failed"}
    

def send_sms(number, message):
    message_log = client.messages.create(
        from_=os.getenv("TWILIO_SENDER_NUMBER"),
        body=message,
        to=f'+91{number}'
    )

    if message_log.sid:
        return {"error": False, "message": "Message sent successfully"}
    else:
        return {"error": True, "message": "Message not sent"}