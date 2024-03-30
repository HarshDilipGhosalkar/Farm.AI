import cloudinary.uploader
import os

cloudinary.config(
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key = os.getenv("CLOUDINARY_API_KEY"),
    api_secret = os.getenv("CLOUDINARY_API_SECRET")
)

def image_to_url(image):
    upload_result = cloudinary.uploader.upload(image)
    image_url = upload_result['secure_url']

    if image_url:
        return image_url
    else:
        None

def images_to_url(images):
    image_urls = []
    for image in images:
        upload_result = cloudinary.uploader.upload(image)
        image_urls.append(upload_result['secure_url'])

    return {"error": False, "data": image_urls}