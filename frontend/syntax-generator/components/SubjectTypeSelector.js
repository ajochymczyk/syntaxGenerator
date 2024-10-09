"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

const SubjectTypeSelector = ({ setSubjectType, setSubject, setNumberType }) => (
  <div className="col-md-12">
    <label className="form-label">Wybierz typ podmiotu:</label>
    <div>
      <input
        type="radio"
        id="pronoun"
        name="subjectType"
        value="pronoun"
        onChange={(e) => {
          setSubjectType(e.target.value);
          setSubject("");
          setNumberType("");
        }}
        required
      />
      <label htmlFor="pronoun" className="ms-2">
        Zaimek
      </label>
      <input
        type="radio"
        id="nounPhrase"
        name="subjectType"
        value="nounPhrase"
        onChange={(e) => {
          setSubjectType(e.target.value);
          setSubject("");
          setNumberType("");
        }}
        className="ms-3"
        required
      />
      <label htmlFor="nounPhrase" className="ms-2">
        Fraza rzeczownikowa
      </label>
    </div>
  </div>
);

export default SubjectTypeSelector;
