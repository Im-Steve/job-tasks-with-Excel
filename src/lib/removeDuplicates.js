import consoleColors from './consoleColors';
import showElapsedTime from './showElapsedTime';

export default function removeDuplicates(table, selectedColumnName) {
  const mergedRows = {};
  const newTable = [];
  let numberOfProcesses = 1;
  const tableLength = table.length;
  let newTableLength = 0;

  console.log('%cStart removeDuplicates();', `color:${consoleColors.step}`);
  const startTime = new Date();
  console.log(startTime);

  console.log('%cRemove duplicates', `color:${consoleColors.step}`);
  for (let i = 0; i < table.length; i += 1) {
    const row = table[i];
    const rowCode = row[selectedColumnName];

    if (!mergedRows[rowCode]) {
      mergedRows[rowCode] = row;
      newTableLength += 1;
    }

    console.log(numberOfProcesses, '/', tableLength, 'processed rows');
    numberOfProcesses += 1;
  }

  console.log('%cMerge rows', `color:${consoleColors.step}`);
  numberOfProcesses = 1;
  Object.keys(mergedRows).forEach((code) => {
    newTable.push(mergedRows[code]);
    console.log(numberOfProcesses, '/', newTableLength, 'merged rows');
    numberOfProcesses += 1;
  });

  showElapsedTime(startTime);
  console.log('Number of duplicates removed:', tableLength - newTableLength);
  console.log('%cTask completed!', `color:${consoleColors.success}`);
  return newTable;
}
