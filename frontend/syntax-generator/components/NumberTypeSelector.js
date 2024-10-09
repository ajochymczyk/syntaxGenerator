"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NumberTypeSelector = ({ numberType, setNumberType, setSubject }) => (
  <div className="col-md-12">
    <label className="form-label">Wybierz liczbę:</label>
    <div>
      <input
        type="radio"
        id="singular"
        name="numberType"
        value="singular"
        onChange={(e) => {
          setNumberType(e.target.value);
          setSubject("");
        }}
        required
      />
      <label htmlFor="singular" className="ms-2">
        Liczba pojedyncza
      </label>
      <input
        type="radio"
        id="plural"
        name="numberType"
        value="plural"
        onChange={(e) => {
          setNumberType(e.target.value);
          setSubject("");
        }}
        className="ms-3"
        required
      />
      <label htmlFor="plural" className="ms-2">
        Liczba mnoga
      </label>
    </div>
  </div>
);

export default NumberTypeSelector;
