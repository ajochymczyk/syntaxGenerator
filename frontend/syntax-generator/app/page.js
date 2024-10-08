"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [subjectType, setSubjectType] = useState("");
  const [numberType, setNumberType] = useState("");
  const [subject, setSubject] = useState("");
  const [verb, setVerb] = useState("");
  const [object_, setObject] = useState("");
  const [sentence, setSentence] = useState("");
  const [verbs, setVerbs] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [pronouns, setPronouns] = useState({ singular: [], plural: [] });
  const [adjectives, setAdjectives] = useState([]);
  const [determiners, setDeterminers] = useState([]);
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
          {/* Typ podmiotu */}
          <div className="col-md-12">
            <label className="form-label">Wybierz typ podmiotu:</label>
            <div>
              <input
                type="radio"
                id="pronoun"
                name="subjectType"
                value="pronoun"
                onChange={(e) => {
                  setSubjectType(e.target.value);
                  setSubject("");
                  setNumberType("");
                }}
                required
              />
              <label htmlFor="pronoun" className="ms-2">
                Zaimki
              </label>

              <input
                type="radio"
                id="nounPhrase"
                name="subjectType"
                value="nounPhrase"
                onChange={(e) => {
                  setSubjectType(e.target.value);
                  setSubject("");
                  setNumberType("");
                }}
                className="ms-3"
                required
              />
              <label htmlFor="nounPhrase" className="ms-2">
                Fraza rzeczownikowa
              </label>
            </div>
          </div>

          {/* Wybór liczby dla zaimków */}
          {subjectType === "pronoun" && (
            <div className="col-md-12">
              <label className="form-label">Wybierz liczbę:</label>
              <div>
                <input
                  type="radio"
                  id="singular"
                  name="numberType"
                  value="singular"
                  onChange={(e) => {
                    setNumberType(e.target.value);
                    setSubject("");
                  }}
                  required
                />
                <label htmlFor="singular" className="ms-2">
                  Liczba pojedyncza
                </label>

                <input
                  type="radio"
                  id="plural"
                  name="numberType"
                  value="plural"
                  onChange={(e) => {
                    setNumberType(e.target.value);
                    setSubject("");
                  }}
                  className="ms-3"
                  required
                />
                <label htmlFor="plural" className="ms-2">
                  Liczba mnoga
                </label>
              </div>
            </div>
          )}

          {/* Wybór zaimka */}
          {subjectType === "pronoun" && numberType && (
            <div className="col-md-12">
              <label className="form-label">Wybierz zaimek:</label>
              <select
                className="form-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Wybierz zaimek...</option>
                {pronouns[numberType].map((pronoun, index) => (
                  <option key={index} value={pronoun}>
                    {pronoun}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Pytanie o użycie określnika */}
          {subjectType === "nounPhrase" && (
            <div className="col-md-12">
              <label className="form-label">
                Czy chcesz użyć określnika przed rzeczownikiem?
              </label>
              <div>
                <input
                  type="radio"
                  id="determinerYes"
                  name="useDeterminer"
                  value="yes"
                  onChange={(e) => setUseDeterminer(e.target.value)}
                  required
                />
                <label htmlFor="determinerYes" className="ms-2">
                  Tak
                </label>

                <input
                  type="radio"
                  id="determinerNo"
                  name="useDeterminer"
                  value="no"
                  onChange={(e) => {
                    setUseDeterminer(e.target.value);
                    setDeterminerType("");
                    setSelectedDeterminer("");
                  }}
                  className="ms-3"
                  required
                />
                <label htmlFor="determinerNo" className="ms-2">
                  Nie
                </label>
              </div>
            </div>
          )}

          {/* Wybór rodzaju określnika */}
          {useDeterminer === "yes" && (
            <div className="col-md-12">
              <label className="form-label">Wybierz rodzaj określnika:</label>
              <select
                className="form-select"
                value={determinerType}
                onChange={(e) => setDeterminerType(e.target.value)}
                required
              >
                <option value="">Wybierz rodzaj określnika...</option>
                {Object.keys(determiners).map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Wybór konkretnego określnika */}
          {determinerType && (
            <div className="col-md-12">
              <label className="form-label">Wybierz określnik:</label>
              <select
                className="form-select"
                value={selectedDeterminer}
                onChange={(e) => setSelectedDeterminer(e.target.value)}
                required
              >
                <option value="">Wybierz określnik...</option>
                {determiners[determinerType].map((determiner, index) => (
                  <option key={index} value={determiner}>
                    {determiner}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Wybór frazy rzeczownikowej */}
          {subjectType === "nounPhrase" && (
            <div className="col-md-12">
              <label className="form-label">Wybierz frazę rzeczownikową:</label>
              <div>
                <input
                  type="radio"
                  id="nounOnly"
                  name="nounPhraseType"
                  value="nounOnly"
                  onChange={() => setSubjectType("nounOnly")}
                  required
                />
                <label htmlFor="nounOnly" className="ms-2">
                  Rzeczownik
                </label>

                <input
                  type="radio"
                  id="nounWithAdjective"
                  name="nounPhraseType"
                  value="nounWithAdjective"
                  onChange={() => setSubjectType("nounWithAdjective")}
                  className="ms-3"
                  required
                />
                <label htmlFor="nounWithAdjective" className="ms-2">
                  Rzeczownik z przymiotnikiem
                </label>
              </div>
            </div>
          )}

          {/* Wybór rzeczownika */}
          {subjectType === "nounOnly" && (
            <div className="col-md-12">
              <label className="form-label">Wybierz rzeczownik:</label>
              <select
                className="form-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Wybierz rzeczownik...</option>
                {nouns.map((noun, index) => (
                  <option key={index} value={noun}>
                    {noun}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Rzeczownik z przymiotnikiem */}
          {subjectType === "nounWithAdjective" && (
            <div className="col-md-12">
              <label className="form-label">Wybierz rzeczownik:</label>
              <select
                className="form-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Wybierz rzeczownik...</option>
                {nouns.map((noun, index) => (
                  <option key={index} value={noun}>
                    {noun}
                  </option>
                ))}
              </select>

              <label className="form-label mt-3">Wybierz przymiotnik:</label>
              <select
                className="form-select"
                value={object_}
                onChange={(e) => setObject(e.target.value)}
                required
              >
                <option value="">Wybierz przymiotnik...</option>
                {adjectives.map((adj, index) => (
                  <option key={index} value={adj}>
                    {adj}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-md-4">
            <label className="form-label">Wybierz czasownik:</label>
            <select
              className="form-select"
              value={verb}
              onChange={(e) => setVerb(e.target.value)}
              required
            >
              <option value="">Wybierz czasownik...</option>
              {verbs.map((verb, index) => (
                <option key={index} value={verb}>
                  {verb}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Wybierz dopełnienie:</label>
            <select
              className="form-select"
              value={object_}
              onChange={(e) => setObject(e.target.value)}
              required
            >
              <option value="">Wybierz dopełnienie...</option>
              {nouns.map((noun, index) => (
                <option key={index} value={noun}>
                  {noun}
                </option>
              ))}
            </select>
          </div>
          {/* Pytanie o negację */}
          <div className="col-md-12">
            <label className="form-label">Czy dodać negację?</label>
            <div>
              <input
                type="radio"
                id="negationYes"
                name="useNegation"
                value="True"
                onChange={(e) => setUseNegation(e.target.value)}
              />
              <label htmlFor="negationYes" className="ms-2">
                Tak
              </label>
            </div>
          </div>

          {/* Wybór czasu */}
          <div className="col-md-12">
            <label className="form-label">
              Wybierz czas (domyślnie teraźniejszy):
            </label>
            <div>
              <input
                type="radio"
                id="past"
                name="tense"
                value="past"
                onChange={(e) => setTense(e.target.value)}
              />
              <label htmlFor="past" className="ms-2">
                Przeszły
              </label>

              <input
                type="radio"
                id="future"
                name="tense"
                value="future"
                onChange={(e) => setTense(e.target.value)}
                className="ms-3"
              />
              <label htmlFor="future" className="ms-2">
                Przyszły
              </label>
            </div>
          </div>

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
