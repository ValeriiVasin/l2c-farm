import createWrapper from '@awsui/components-react/test-utils/selectors';
import { testId } from '../helpers/test-id';

// 1-indexed cell order
export const enum ResultTableField {
  Datetime = 1,
  Character = 2,
  Exp = 3,
  Adena = 4,
  Comment = 5,
  Actions = 6,
}

export const wrappers = {
  pinnedResultsTable: () => createWrapper().findTable(testId('pinned-results-table')),
  pinnedResultsRows: () => wrappers.pinnedResultsTable().findRows(),
  indexedRowCell: (rowIndex: number, columnIndex: ResultTableField) =>
    wrappers.pinnedResultsTable().findBodyCell(rowIndex, columnIndex),
};

export const selectors = {
  results: testId('results'),
  clearButton: testId('clear-button'),
  inputs: {
    adena: createWrapper().findInput(testId('adena')).findNativeInput().toSelector(),
    exp: createWrapper().findInput(testId('exp')).findNativeInput().toSelector(),
    time: createWrapper().findInput(testId('time')).findNativeInput().toSelector(),
  },
  sections: {
    hourly: {
      adena: testId('section-adena-hourly'),
      exp: testId('section-exp-hourly'),
    },
    daily: {
      adena: testId('section-adena-daily'),
      exp: testId('section-exp-daily'),
    },
  },
  pinButton: createWrapper().findButton(testId('pin-button')).toSelector(),
  pinnedResultsTable: wrappers.pinnedResultsTable().toSelector(),
  pinnedResultsRows: wrappers.pinnedResultsRows().toSelector(),
  clearPinnedResultsButton: testId('clear-pinned-results-button'),
  removeItemButton: (timestamp: number) => testId(`remove-item-${timestamp}`),
};
