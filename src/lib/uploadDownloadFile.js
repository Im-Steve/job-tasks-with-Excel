import * as XLSX from 'xlsx';

import consoleColors from './consoleColors';

export function uploadExcelFile(event, callback) {
  console.log('%cUpload the Excel file', `color:${consoleColors.step}`);
  console.log('upload in progress...');

  try {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const table = XLSX.utils.sheet_to_json(worksheet);

      if (table.length === 0) {
        console.log('%cEmpty Excel file', `color:${consoleColors.error}`);
        callback([]);
      } else {
        console.log('%cExcel file uploaded', `color:${consoleColors.success}`);
        callback(table);
      }
    };

    reader.readAsBinaryString(file);
  } catch (error) {
    console.log('%cError while uploading the Excel file', `color:${consoleColors.error}`);
    console.log(error);
  }
}

export function downloadExcelFile(table) {
  console.log('%cDownload data in a new Excel file', `color:${consoleColors.step}`);
  console.log('download in progress...');

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(table);

  try {
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'exportedExcelFile.xlsx');
    console.log('%cExcel file created', `color:${consoleColors.success}`);
  } catch (error) {
    console.log('%cError while downloading the Excel file', `color:${consoleColors.error}`);
    console.log(error);
  }
}

function formatCSVtable(CSVtable) {
  return CSVtable.map((row) => {
    const manipulatedRow = {};
    const finalRow = { areaName: '', coordinates: [] };
    let stopRowFormatting = false;

    Object.keys(row).forEach((key) => {
      if (typeof row[key] === 'string') {
        manipulatedRow[key] = row[key]
          .replace('POLYGON ((', '')
          .replace('))', '')
          .replace('GEOMETRYCOLLECTION (', '')
          .replace('LINESTRING (', '')
          .replace('(', '')
          .replace(')', '');
        manipulatedRow[key] = manipulatedRow[key].split(' ');

        if (manipulatedRow[key][0] === '') {
          manipulatedRow[key].shift();
        }

        manipulatedRow[key] = manipulatedRow[key].map((coordinate) => {
          const parsedCoordinate = parseFloat(coordinate);
          return !Number.isNaN(parsedCoordinate) ? parsedCoordinate : coordinate;
        });

        if (typeof manipulatedRow[key][0] === 'string' && !stopRowFormatting) {
          manipulatedRow[key] = row[key].replace('Â', '');
          stopRowFormatting = true;
          Object.keys(manipulatedRow).forEach((manipulatedRowKey) => {
            finalRow.coordinates.push(manipulatedRow[manipulatedRowKey]);
          });
        }
      }
    });

    finalRow.areaName = finalRow.coordinates.pop();
    finalRow.coordinates = finalRow.coordinates.map((subArray) => subArray.reverse());
    return finalRow;
  });
}

export function uploadCSVGoogleMyMapsFile(event, callback) {
  console.log('%cUpload the CSV file', `color:${consoleColors.step}`);
  console.log('upload in progress...');

  try {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const CSVtable = XLSX.utils.sheet_to_json(worksheet);

      const formattedTable = formatCSVtable(CSVtable);

      if (formattedTable.length === 0) {
        console.log('%cEmpty CSV file', `color:${consoleColors.error}`);
      } else {
        console.log('%cCSV file uploaded', `color:${consoleColors.success}`);
        callback(formattedTable);
      }
    };

    reader.readAsBinaryString(file);
  } catch (error) {
    console.log('%cError while uploading the CSV file', `color:${consoleColors.error}`);
    console.log(error);
  }
}
