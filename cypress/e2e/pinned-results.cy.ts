import { fillForm } from '../helpers/actions/fill-form';
import { pinItem } from '../helpers/actions/pin-item';
import { ResultTableField, selectors, wrappers } from '../helpers/selectors';

describe('Pinned results', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('pin button is disabled when result is not valid', () => {
    cy.get(selectors.pinButton).should('be.disabled');
  });

  it('pin button is enabled when result can be shown', () => {
    fillForm({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(selectors.pinButton).should('be.enabled');
  });

  it('pinned section is not displayed when nothing was pinned', () => {
    cy.get(selectors.pinnedResultsTable).should('not.exist');
  });

  it('pinning single result', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(selectors.pinnedResultsTable).should('exist');
    cy.get(selectors.pinnedResultsRows).should('have.length', 1);
  });

  it('adding pin for the first time sets default character name', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(wrappers.indexedRowCell(1, ResultTableField.Character).toSelector()).should('have.text', 'не указан');
  });

  xit('adding pin is using previous character name');
  xit('remove single saved item');
  xit('pinned results are ordered by the timestamp');
  xit('edit character');
  xit('edit comment');
});
