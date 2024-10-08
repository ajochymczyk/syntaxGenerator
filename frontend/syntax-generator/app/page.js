"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [verb, setVerb] = useState("");
  const [object_, setObject] = useState("");
  const [sentence, setSentence] = useState("");

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
        object_: object_,
      }),
    });

    const data = await response.json();

    if (data.sentence) {
      setSentence(data.sentence);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Wygeneruj zdanie w sztucznym jezyku Interlingua
      </h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Podmiot</label>
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Czasownik</label>
          <input
            type="text"
            className="form-control"
            value={verb}
            onChange={(e) => setVerb(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Dopełnienie</label>
          <input
            type="text"
            className="form-control"
            value={object_}
            onChange={(e) => setObject(e.target.value)}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
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
  );
}
