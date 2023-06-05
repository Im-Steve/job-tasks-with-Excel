import consoleColors from './consoleColors';
import showElapsedTime from './showElapsedTime';

export default function normalizeColumn(table, selectedColumnName) {
  const newTable = [];
  const normalizedColumnName = `${selectedColumnName}_normalized`;
  let numberOfProcesses = 1;
  const tableLength = table.length;

  console.log('%cStart normalizeColumn();', `color:${consoleColors.step}`);
  const startTime = new Date();
  console.log(startTime);

  table.forEach((row) => {
    newTable.push({
      ...row,
      [normalizedColumnName]: typeof row[selectedColumnName] === 'string'
        ? row[selectedColumnName].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        : row[selectedColumnName],
    });
    console.log(numberOfProcesses, '/', tableLength, 'processed rows');
    numberOfProcesses += 1;
  });

  showElapsedTime(startTime);
  console.log('%cTask completed!', `color:${consoleColors.success}`);
  return newTable;
}
