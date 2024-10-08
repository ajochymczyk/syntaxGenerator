from flask import Blueprint, request, jsonify
from .sentence_generator import generate_sentence

api = Blueprint("api", __name__)


@api.route("/generate_sentence", methods=["POST"])
def generate_sentence_endpoint():
    data = request.get_json()

    subject = data.get("subject")
    verb = data.get("verb")
    object_ = data.get("object")

    if not (subject or verb or object_):
        return jsonify({"error": "Brak danych!"}), 400

    sentence = generate_sentence(subject, verb, object_)

    return jsonify({"sentence": sentence})