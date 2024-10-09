"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AdjectiveSelector({
  setSubject,
  setAdjective,
  subject,
  nouns,
  adjectives,
}) {
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

      <label className="form-label mt-3">Wybierz przymiotnik:</label>
      <select
        className="form-select"
        onChange={(e) => setAdjective(e.target.value)}
        required
      >
        <option value="">Wybierz przymiotnik...</option>
        {adjectives.map((adj, index) => (
          <option key={index} value={adj}>
            {adj}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdjectiveSelector;
