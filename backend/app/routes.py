from flask import Blueprint, request, jsonify
from .sentence_generator import generate_sentence
from .data import *
api = Blueprint("api", __name__)


@api.route("/generate_sentence", methods=["POST"])
def generate_sentence_endpoint():
    data = request.get_json()

    subject = data.get("subject")
    verb = data.get("verb")
    object_ = data.get("object_")

    if not (subject or verb or object_):
        return jsonify({"error": "Brak danych!"}), 400

    sentence = generate_sentence(subject, verb, object_)

    return jsonify({"sentence": sentence})


@api.route("/verbs", methods=["GET"])
def get_verbs():
    return jsonify(verbs)


@api.route("/nouns", methods=["GET"])
def get_nouns():
    return jsonify(nouns)


@api.route("/pronouns", methods=["GET"])
def get_pronouns():
    return jsonify(pronouns)


@api.route("/adjectives", methods=["GET"])
def get_adjectives():
    return jsonify(adjectives)


@api.route("/determiners", methods=["GET"])
def get_determiners():
    return jsonify(determiners)