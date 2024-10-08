def generate_sentence(subject: str, verb: str, object_: str, determiner: str = "", adjective: str = "", tense: str = "present", negation: bool = False) -> str:
    # fraza podmiotu
    subject_phrase = subject
    if determiner:
        subject_phrase = f"{determiner} {subject_phrase}"
    if adjective:
        subject_phrase = f"{subject_phrase} {adjective}"

    # dodanie negacji
    if negation:
        verb = f"non {verb}"

    # czas
    if tense == "past":
        verb += "va" 
    elif tense == "future":
        verb += "ra" 

    # fraza dopełnienia
    object_phrase = object_
    if determiner:
        object_phrase = f"{determiner} {object_phrase}"
    if adjective:
        object_phrase = f"{object_phrase} {adjective}"

    
    sentence = f"{subject_phrase} {verb} {object_phrase}."
    return sentence
