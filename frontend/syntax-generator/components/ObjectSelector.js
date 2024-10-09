import React from "react";

const ObjectSelector = ({ object_, setObject, nouns }) => (
  <div className="col-md-4">
    <label className="form-label">Wybierz dopełnienie:</label>
    <select
      className="form-select"
      value={object_}
      onChange={(e) => setObject(e.target.value)}
      required
    >
      <option value="">Wybierz dopełnienie...</option>
      {nouns.map((noun) => (
        <option key={noun} value={noun}>
          {noun}
        </option>
      ))}
    </select>
  </div>
);

export default ObjectSelector;
