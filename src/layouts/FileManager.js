import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AssignmentOfMapAreas from './AssignmentOfMapAreas';
import Normalization from './Normalization';
import RemovingDuplicates from './RemovingDuplicates';

import { downloadExcelFile, uploadExcelFile } from '../lib/uploadDownloadFile';
import featureList from '../lib/featureList';

function FileManager({
  mainTable,
  setMainTable,
  secondTable,
  setSecondTable,
}) {
  const [selectedFeatureKey, setSelectedFeatureKey] = useState('');

  function renderFeatureOptions() {
    switch (selectedFeatureKey) {
      case 'normalization':
        return (
          <Normalization
            mainTable={mainTable}
            setMainTable={setMainTable}
          />
        );
      case 'removingDuplicates':
        return (
          <RemovingDuplicates
            mainTable={mainTable}
            setMainTable={setMainTable}
          />
        );
      case 'assignmentOfMapAreas':
        return (
          <AssignmentOfMapAreas
            mainTable={mainTable}
            setMainTable={setMainTable}
            areaTable={secondTable}
            setAreaTable={setSecondTable}
          />
        );
      default:
        return null;
    }
  }

  function handleSelectFeatureChange(event) {
    setSelectedFeatureKey(event.target.value);
    setSecondTable([]);
  }

  return (
    <>
      <div className="mt-3">
        <label className="form-label" htmlFor="formExcelFile1">Importer un fichier Excel</label>
        <div className="d-flex align-items-center">
          <input
            className="form-control w-50"
            type="file"
            id="formExcelFile1"
            onChange={(event) => uploadExcelFile(event, setMainTable)}
          />
        </div>
      </div>

      {mainTable.length > 0 && (
        <div className="mt-3">
          <select className="form-select w-50" onChange={handleSelectFeatureChange}>
            <option defaultValue value="">Choisir une fonctionnalité</option>
            {featureList.map((feature) => (
              <option value={feature.key} key={feature.key}>{feature.text}</option>))}
          </select>

          {selectedFeatureKey !== '' && (
            <div className="mt-2">
              {renderFeatureOptions()}
            </div>
          )}
        </div>
      )}

      {mainTable.length > 0 && (
        <button
          className="btn btn-primary mt-3"
          type="button"
          onClick={() => downloadExcelFile(mainTable)}
        >
          Télécharger le nouveau Excel
        </button>
      )}
    </>
  );
}

FileManager.propTypes = {
  mainTable: PropTypes.array.isRequired,
  setMainTable: PropTypes.func.isRequired,
  secondTable: PropTypes.array.isRequired,
  setSecondTable: PropTypes.func.isRequired,
};

export default FileManager;
