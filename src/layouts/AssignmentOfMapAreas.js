import React, { useState } from 'react';
import PropTypes from 'prop-types';

import assignMapAreas from '../lib/assignMapAreas';
import { uploadCSVGoogleMyMapsFile } from '../lib/uploadDownloadFile';

function AssignmentOfMapAreas({
  mainTable,
  setMainTable,
  areaTable,
  setAreaTable,
}) {
  const [proporCoefficient, setProporCoefficient] = useState('1');

  function startAssignment() {
    setMainTable(assignMapAreas(mainTable, areaTable, proporCoefficient));
  }

  return (
    <div className="d-flex align-items-center">
      <div className="w-50">
        <label className="form-label" htmlFor="formCSVFile">
          Importer un fichier CSV de Google My Maps
          <br />
          <p className="text-danger">(sauvegardez le fichier dans Excel avant)</p>
        </label>
        <input
          className="form-control"
          type="file"
          id="formCSVFile"
          onChange={(event) => uploadCSVGoogleMyMapsFile(event, setAreaTable)}
        />

        <div className="form-group mt-2">
          <label htmlFor="proporCoefficientInput">
            Coefficient de proportionnalité:
          </label>
          <input
            className="ms-2"
            type="number"
            step="0.001"
            id="proporCoefficientInput"
            placeholder={proporCoefficient}
            onChange={(event) => setProporCoefficient(event.target.value)}
          />
        </div>
      </div>

      {areaTable.length > 0 && (
        <button className="btn btn-success ms-3" onClick={startAssignment} type="button">
          Déclencher l&apos;attribution
        </button>
      )}
    </div>
  );
}

AssignmentOfMapAreas.propTypes = {
  mainTable: PropTypes.array.isRequired,
  setMainTable: PropTypes.func.isRequired,
  areaTable: PropTypes.array.isRequired,
  setAreaTable: PropTypes.func.isRequired,
};

export default AssignmentOfMapAreas;
