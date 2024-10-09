"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SubjectTypeSelector from "../components/SubjectTypeSelector";
import NumberTypeSelector from "../components/NumberTypeSelector";
import PronounSelector from "../components/PronounSelector";
import NounPhraseOptions from "../components/NounPhraseOptions";
import NounPhraseSelector from "../components/NounPhraseSelector";
import DeterminerUse from "../components/DeterminerUse";
import DeterminerType from "../components/DeterminerType";
import VerbSelector from "../components/VerbSelector";
import ObjectSelector from "../components/ObjectSelector";
import AdjectiveSelector from "../components/AdjectiveSelector";
import TenseSelector from "../components/TenseSelector";
import NegationSelector from "../components/NegationSelector";

export default function Home() {
  const [subjectType, setSubjectType] = useState("");
  const [numberType, setNumberType] = useState("");
  const [subject, setSubject] = useState("");
  const [verb, setVerb] = useState("");
  const [adjective, setAdjective] = useState("");
  const [object_, setObject] = useState("");
  const [sentence, setSentence] = useState("");
  const [verbs, setVerbs] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [pronouns, setPronouns] = useState({ singular: [], plural: [] });
  const [adjectives, setAdjectives] = useState([]);
  const [determiners, setDeterminers] = useState({
    possessive: [],
    definite: [],
    indefinite: [],
    demonstrative: [],
  });
  const [useDeterminer, setUseDeterminer] = useState("");
  const [determinerType, setDeterminerType] = useState("");
  const [selectedDeterminer, setSelectedDeterminer] = useState("");
  const [useNegation, setUseNegation] = useState("");
  const [tense, setTense] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      const [
        verbsResponse,
        nounsResponse,
        pronounsResponse,
        adjectivesResponse,
        determinersResponse,
      ] = await Promise.all([
        fetch("http://localhost:5000/verbs"),
        fetch("http://localhost:5000/nouns"),
        fetch("http://localhost:5000/pronouns"),
        fetch("http://localhost:5000/adjectives"),
        fetch("http://localhost:5000/determiners"),
      ]);

      const [verbs, nouns, pronouns, adjectives, determiners] =
        await Promise.all([
          verbsResponse.json(),
          nounsResponse.json(),
          pronounsResponse.json(),
          adjectivesResponse.json(),
          determinersResponse.json(),
        ]);

      setVerbs(verbs);
      setNouns(nouns);
      setPronouns(pronouns);
      setAdjectives(adjectives);
      setDeterminers(determiners);
    };

    fetchWords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/generate_sentence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        verb,
        object_,
        determiner: selectedDeterminer,
        negation: useNegation,
        tense,
        adjective,
      }),
    });

    const data = await response.json();

    if (data.sentence) {
      setSentence(data.sentence);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ borderRadius: "10px" }}>
        <h1 className="text-center mb-4">
          Wygeneruj zdanie w sztucznym języku Interlingua
        </h1>
        <form onSubmit={handleSubmit} className="row g-3">
          <SubjectTypeSelector
            setSubjectType={setSubjectType}
            setSubject={setSubject}
            setNumberType={setNumberType}
          />
          {subjectType === "pronoun" && (
            <NumberTypeSelector
              numberType={numberType}
              setNumberType={setNumberType}
              setSubject={setSubject}
              pronouns={pronouns}
            />
          )}
          {subjectType === "pronoun" && numberType && (
            <PronounSelector
              setSubject={setSubject}
              subject={subject}
              pronouns={pronouns}
              numberType={numberType}
            />
          )}
          {subjectType === "nounPhrase" && (
            <DeterminerUse
              setUseDeterminer={setUseDeterminer}
              setSelectedDeterminer={setSelectedDeterminer}
              setDeterminerType={setDeterminerType}
            />
          )}
          {useDeterminer === "yes" && (
            <DeterminerType
              setDeterminerType={setDeterminerType}
              setSelectedDeterminer={setSelectedDeterminer}
              determinerType={determinerType}
              determiners={determiners}
              selectedDeterminer={selectedDeterminer}
              object_={object_}
            />
          )}
          {subjectType === "nounPhrase" && (
            <NounPhraseOptions setSubjectType={setSubjectType} />
          )}
          {subjectType === "nounOnly" && (
            <NounPhraseSelector
              setSubject={setSubject}
              subject={subject}
              nouns={nouns}
            />
          )}
          {subjectType === "nounWithAdjective" && (
            <AdjectiveSelector
              setAdjective={setAdjective}
              setSubject={setSubject}
              subject={subject}
              nouns={nouns}
              object_={object_}
              adjectives={adjectives}
            />
          )}

          <VerbSelector verb={verb} setVerb={setVerb} verbs={verbs} />
          <ObjectSelector
            object_={object_}
            setObject={setObject}
            nouns={nouns}
          />

          <NegationSelector setUseNegation={setUseNegation} />
          <TenseSelector tense={tense} setTense={setTense} />

          <div className="col-md-4 d-flex align-items-end">
            <button type="submit" className="btn btn-primary">
              Wygeneruj zdanie
            </button>
          </div>
        </form>

        {sentence && (
          <div className="alert alert-success mt-4" role="alert">
            Wygenerowane zdanie: {sentence}
          </div>
        )}
      </div>
    </div>
  );
}
