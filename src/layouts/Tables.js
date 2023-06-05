import React from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';

function Tables({ mainTable, secondTable }) {
  return (
    <div className="accordion mt-3" id="accordionTables">
      {secondTable.length > 0 && (
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Table du second fichier
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <ReactJson src={secondTable} />
            </div>
          </div>
        </div>
      )}

      {mainTable.length > 0 && (
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Table du fichier Excel
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <ReactJson src={mainTable} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Tables.propTypes = {
  mainTable: PropTypes.array.isRequired,
  secondTable: PropTypes.array.isRequired,
};

export default Tables;
