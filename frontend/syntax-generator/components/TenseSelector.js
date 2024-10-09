import React from "react";

const TenseSelector = ({ tense, setTense }) => (
  <div className="col-md-12">
    <label className="form-label">Wybierz czas:</label>
    <div>
      <input
        type="radio"
        id="present"
        name="tense"
        value="present"
        checked={tense === "present"}
        onChange={(e) => setTense(e.target.value)}
      />
      <label htmlFor="present" className="ms-2">
        Teraźniejszy
      </label>

      <input
        type="radio"
        id="past"
        name="tense"
        value="past"
        checked={tense === "past"}
        onChange={(e) => setTense(e.target.value)}
        className="ms-3"
      />
      <label htmlFor="past" className="ms-2">
        Przeszły
      </label>

      <input
        type="radio"
        id="future"
        name="tense"
        value="future"
        checked={tense === "future"}
        onChange={(e) => setTense(e.target.value)}
        className="ms-3"
      />
      <label htmlFor="future" className="ms-2">
        Przyszły
      </label>
    </div>
  </div>
);

export default TenseSelector;
