"use client";
import "bootstrap/dist/css/bootstrap.min.css";

const NounPhraseOptions = ({ setSubjectType }) => (
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
      />
      <label htmlFor="nounWithAdjective" className="ms-2">
        Rzeczownik z przymiotnikiem
      </label>
    </div>
  </div>
);

export default NounPhraseOptions;
