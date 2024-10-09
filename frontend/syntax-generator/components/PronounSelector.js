"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PronounSelector = ({ setSubject, subject, pronouns, numberType }) => (
  <div className="col-md-12">
    <label className="form-label">Wybierz zaimek:</label>
    <select
      className="form-select"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      required
    >
      <option value="">Wybierz zaimek</option>
      {pronouns[numberType].map((pronoun) => (
        <option key={pronoun} value={pronoun}>
          {pronoun}
        </option>
      ))}
    </select>
  </div>
);

export default PronounSelector;
