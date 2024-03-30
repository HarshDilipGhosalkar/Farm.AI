from flask import Flask, request, jsonify
from googletrans import Translator

app = Flask(__name__)

@app.route('/translate', methods=['GET'])
def translate():
    # Get sentence from form data
    sentence = request.form.get('sentence')
    print(sentence)

    # Translate the sentence
    translations = translate_sentence(sentence)

    return jsonify(translations)

def translate_sentence(sentence):
    translator = Translator()

    # Translate to English
    english_translation = translator.translate(sentence, dest='en').text

    # Translate to Hindi
    hindi_translation = translator.translate(sentence, dest='hi').text

    # Translate to Tamil
    tamil_translation = translator.translate(sentence, dest='ta').text

    # Translate to Telugu
    telugu_translation = translator.translate(sentence, dest='te').text

    # Translate to Punjabi
    punjabi_translation = translator.translate(sentence, dest='pa').text

    # Translate to Bengali
    bengali_translation = translator.translate(sentence, dest='bn').text

    return {
        'English': english_translation,
        'Hindi': hindi_translation,
        'Tamil': tamil_translation,
        'Telugu': telugu_translation,
        'Punjabi': punjabi_translation,
        'Bengali': bengali_translation
    }

if __name__ == '__main__':
    app.run(debug=True)