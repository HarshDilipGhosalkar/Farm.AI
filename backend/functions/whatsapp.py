from twilio.rest import Client
import os

client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)


def send_whatpsapp_message(number, message):
    message = client.messages.create(
        from_='whatsapp:+14155238886',
        body=message,
        to=f'whatsapp:+91{number}'
    )

    if message.sid:
        return {"error": False, "message": "Message sent successfully"}
    else:
        return {"error": True, "message": "Message not sent"}