"use client";
import "bootstrap/dist/css/bootstrap.min.css";

function NounPhraseSelector({ setSubject, subject, nouns }) {
  return (
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
  );
}
export default NounPhraseSelector;
