import React, { useState } from 'react';
import PropTypes from 'prop-types';

import removeDuplicates from '../lib/removeDuplicates';

function RemovingDuplicates({ mainTable, setMainTable }) {
  const [selectedColumnName, setSelectedColumnName] = useState('');

  function startRemoving() {
    setMainTable(removeDuplicates(mainTable, selectedColumnName));
  }

  return (
    <div className="d-flex align-items-center">
      <select className="form-select w-50" onChange={(event) => setSelectedColumnName(event.target.value)}>
        <option defaultValue value="">Choisir la colonne avec les doublons</option>
        {Object.keys(mainTable[0]).map((columnName) => (
          <option value={columnName} key={columnName}>{columnName}</option>))}
      </select>

      {selectedColumnName !== '' && (
        <button className="btn btn-success ms-3" onClick={startRemoving} type="button">
          Déclencher la suppression
        </button>
      )}
    </div>
  );
}

RemovingDuplicates.propTypes = {
  mainTable: PropTypes.array.isRequired,
  setMainTable: PropTypes.func.isRequired,
};

export default RemovingDuplicates;
