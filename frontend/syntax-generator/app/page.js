"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const subjects = [
  "amigo",
  "casa",
  "libro",
  "musica",
  "jardin",
  "lingua",
  "familia",
  "sol",
  "luna",
  "aqua",
  "flor",
  "pais",
  "tiempo",
  "historia",
  "natura",
  "amor",
  "montania",
  "oceano",
  "animal",
  "arbo",
  "fructo",
  "vento",
  "paisage",
  "umbra",
  "comida",
  "planeta",
  "energia",
  "solitudine",
  "memora",
  "spirito",
  "arte",
  "musica",
  "vita",
  "pace",
  "guerra",
  "idea",
  "mundo",
  "gente",
  "infante",
  "nocte",
  "sonio",
  "continente",
  "vehiculo",
  "aventura",
  "silva",
  "parola",
  "festa",
  "planeta",
  "fortuna",
  "libertate",
];

const verbs = [
  "amar",
  "parlar",
  "scriber",
  "leger",
  "audir",
  "vider",
  "esser",
  "haber",
  "dar",
  "prender",
  "portar",
  "laborar",
  "jocar",
  "pensar",
  "sperar",
  "caminar",
  "saltar",
  "nadar",
  "dormir",
  "vender",
  "comprar",
  "aperir",
  "cluder",
  "apprender",
  "comprender",
  "estudiar",
  "finir",
  "iniciar",
  "aperception",
  "construer",
  "destruer",
  "percer",
  "cuisinar",
  "lavar",
  "responder",
  "viver",
  "morir",
  "changer",
  "inventar",
  "describer",
  "reguardar",
  "comparar",
  "guidar",
  "salvar",
  "celebrar",
  "enviar",
  "reciper",
  "feriar",
  "examinar",
  "cantar",
];

const objects = ["kota", "psa", "królika"];
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
              <option value="">Wybierz podmiot...</option>
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
            <select
              className="form-select"
              value={object_}
              onChange={(e) => setObject(e.target.value)}
              required
            >
              <option value="">Wybierz dopełnienie...</option>
              {objects.map((o, index) => (
                <option key={index} value={o}>
                  {o}
                </option>
              ))}
            </select>
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
