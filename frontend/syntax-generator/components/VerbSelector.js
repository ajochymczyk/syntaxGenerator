import React from "react";

const VerbSelector = ({ verb, setVerb, verbs }) => (
  <div className="col-md-4">
    <label className="form-label">Wybierz czasownik:</label>
    <select
      className="form-select"
      value={verb}
      onChange={(e) => setVerb(e.target.value)}
      required
    >
      <option value="">Wybierz czasownik...</option>
      {verbs.map((verbItem) => (
        <option key={verbItem} value={verbItem}>
          {verbItem}
        </option>
      ))}
    </select>
  </div>
);

export default VerbSelector;
