import React, { useState } from 'react';
import PropTypes from 'prop-types';

import normalizeColumn from '../lib/normalizeColumn';

function Normalization({ mainTable, setMainTable }) {
  const [selectedColumnName, setSelectedColumnName] = useState('');

  function startNormalization() {
    setMainTable(normalizeColumn(mainTable, selectedColumnName));
  }

  return (
    <div className="d-flex align-items-center">
      <select className="form-select w-50" onChange={(event) => setSelectedColumnName(event.target.value)}>
        <option defaultValue value="">Choisir une colonne à normaliser</option>
        {Object.keys(mainTable[0]).map((columnName) => (
          <option value={columnName} key={columnName}>{columnName}</option>))}
      </select>

      {selectedColumnName !== '' && (
        <button className="btn btn-success ms-3" onClick={startNormalization} type="button">
          Déclencher la normalisation
        </button>
      )}
    </div>
  );
}

Normalization.propTypes = {
  mainTable: PropTypes.array.isRequired,
  setMainTable: PropTypes.func.isRequired,
};

export default Normalization;
