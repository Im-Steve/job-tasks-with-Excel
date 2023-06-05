import Polygon from 'polygon';
import Vec2 from 'vec2';

import consoleColors from './consoleColors';
import showElapsedTime from './showElapsedTime';

export default function assignMapAreas(mainTable, areaTable, proporCoefficient) {
  let numberOfProcesses = 1;
  const mainTableLength = mainTable.length;

  console.log('%cStart assignMapAreas();', `color:${consoleColors.step}`);
  const startTime = new Date();
  console.log(startTime);

  const newTable = mainTable.map((mainTableRow) => {
    const newTableRow = { ...mainTableRow, mapArea: '' };

    areaTable.forEach((areaTableRow) => {
      let isInside = false;

      const area = new Polygon(areaTableRow.coordinates);
      area.scale(parseFloat(proporCoefficient));

      if (mainTableRow.Latitude && mainTableRow.Longitude) {
        isInside = area.containsPoint(Vec2(mainTableRow.Latitude, mainTableRow.Longitude));
      }

      if (mainTableRow.latitude && mainTableRow.longitude) {
        isInside = area.containsPoint(Vec2(mainTableRow.latitude, mainTableRow.longitude));
      }

      if (mainTableRow.LATITUDE && mainTableRow.LONGITUDE) {
        isInside = area.containsPoint(Vec2(mainTableRow.LATITUDE, mainTableRow.LONGITUDE));
      }

      if (isInside) {
        newTableRow.mapArea = areaTableRow.areaName;
      }
    });

    console.log(numberOfProcesses, '/', mainTableLength, 'processed rows');
    numberOfProcesses += 1;
    return newTableRow;
  });

  showElapsedTime(startTime);
  console.log('%cTask completed!', `color:${consoleColors.success}`);
  return newTable;
}
