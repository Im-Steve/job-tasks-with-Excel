import React, { useState } from 'react';

import FileManager from './layouts/FileManager';
import Tables from './layouts/Tables';

function App() {
  const [mainTable, setMainTable] = useState([]);
  const [secondTable, setSecondTable] = useState([]);

  return (
    <div className="container mt-5">
      <h1>Fonctionnalités sympas avec Excel</h1>
      <h2>Pour se faciliter un peu la vie.</h2>

      <FileManager
        mainTable={mainTable}
        setMainTable={setMainTable}
        secondTable={secondTable}
        setSecondTable={setSecondTable}
      />

      <Tables
        mainTable={mainTable}
        secondTable={secondTable}
      />
    </div>
  );
}

export default App;
