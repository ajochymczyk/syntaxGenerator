const DeterminerType = ({
  setDeterminerType,
  setSelectedDeterminer,
  determinerType,
  determiners,
  selectedDeterminer,
}) => (
  <div className="col-md-12">
    <label className="form-label">Wybierz rodzaj określnika:</label>
    <select
      className="form-select"
      value={determinerType}
      onChange={(e) => setDeterminerType(e.target.value)}
      required
    >
      <option value="">Wybierz rodzaj określnika...</option>
      {Object.keys(determiners).length > 0 &&
        Object.keys(determiners).map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
    </select>

    <div className="col-md-12">
      <label className="form-label">Wybierz określnik:</label>
      <select
        className="form-select"
        value={selectedDeterminer}
        onChange={(e) => setSelectedDeterminer(e.target.value)}
        required
        disabled={
          !determinerType ||
          !determiners[determinerType] ||
          !Array.isArray(determiners[determinerType])
        }
      >
        <option value="">Wybierz określnik...</option>
        {determinerType &&
          determiners[determinerType] &&
          Array.isArray(determiners[determinerType]) &&
          determiners[determinerType].length > 0 &&
          determiners[determinerType].map((determiner, index) => (
            <option key={index} value={determiner}>
              {determiner}
            </option>
          ))}
      </select>
    </div>
  </div>
);
export default DeterminerType;
