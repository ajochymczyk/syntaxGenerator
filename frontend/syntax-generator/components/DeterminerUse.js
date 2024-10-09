import React from "react";

const DeterminerUse = ({
  setUseDeterminer,
  setSelectedDeterminer,
  setDeterminerType,
}) => (
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
);

export default DeterminerUse;
