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

const wrappers = {
  pinnedResultsTable: () => createWrapper().findTable(testId('pinned-results-table')),
  pinnedResultsRows: () => wrappers.pinnedResultsTable().findRows(),
  resultTableCell: (rowIndex: number, columnIndex: ResultTableField) =>
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
  resultTableCell: (row: number, cell: ResultTableField) => wrappers.resultTableCell(row, cell).toSelector(),

  editCharacterNameButton: (timestamp: number) => testId(`edit-character-button-${timestamp}`),
  editCharacterNameInput: (timestamp: number) =>
    createWrapper()
      .findInput(testId(`edit-character-input-${timestamp}`))
      .findNativeInput()
      .toSelector(),
  characterName: (timestamp: number) => testId(`character-${timestamp}`),

  comment: (timestamp: number) => testId(`comment-${timestamp}`),
  editCommentButton: (timestamp: number) => testId(`edit-comment-button-${timestamp}`),
  editCommentInput: (timestamp: number) =>
    createWrapper()
      .findInput(testId(`edit-comment-input-${timestamp}`))
      .findNativeInput()
      .toSelector(),
  resultLink: (timestamp: number) =>
    createWrapper()
      .findLink(testId(`results-link-${timestamp}`))
      .toSelector(),
};
