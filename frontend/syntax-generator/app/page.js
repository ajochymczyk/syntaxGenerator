"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [verb, setVerb] = useState("");
  const [object_, setObject] = useState("");
  const [sentence, setSentence] = useState("");
  const [verbs, setVerbs] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchVerbs = async () => {
      const response = await fetch("http://localhost:5000/verbs");
      const data = await response.json();
      setVerbs(data);
    };

    fetchVerbs();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch("http://localhost:5000/nouns");
      const data = await response.json();
      setSubjects(data);
    };

    fetchSubjects();
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
          Wygeneruj zdanie w sztucznym jezyku Interlingua
        </h1>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Podmiot</label>
            <select
              className="form-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">Wybierz Podmiot...</option>
              {subjects.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Czasownik</label>
            <select
              className="form-select"
              value={verb}
              onChange={(e) => setVerb(e.target.value)}
              required
            >
              <option value="">Wybierz czasownik...</option>
              {verbs.map((v, index) => (
                <option key={index} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Dopełnienie</label>
            <input
              type="text"
              className="form-control"
              value={object_}
              onChange={(e) => setObject(e.target.value)}
              placeholder="Wpisz dopełnienie..."
              required
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Wygeneruj zdanie
            </button>
          </div>
        </form>

        {sentence && (
          <div className="mt-4 text-center">
            <h2>Wygenerowane zdanie:</h2>
            <p className="fs-4">{sentence}</p>
          </div>
        )}
      </div>
    </div>
  );
}
