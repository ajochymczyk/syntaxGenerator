import React from "react";

const NegationSelector = ({ setUseNegation }) => (
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
);

export default NegationSelector;
