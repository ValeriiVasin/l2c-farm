import { fillForm } from '../helpers/actions/fill-form';
import { pinItem } from '../helpers/actions/pin-item';
import { ResultTableField, selectors, wrappers } from '../helpers/selectors';

describe('Pinned results', () => {
  let timestamp: number;
  let clock: Cypress.Chainable<Cypress.Clock>;

  beforeEach(() => {
    cy.visit('/');
    timestamp = Date.parse('2022-05-31 00:00:00');
    clock = cy.clock(timestamp);
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('pin button is disabled when result is not valid', () => {
    cy.get(selectors.pinButton).should('be.disabled');
  });

  it('pin button is enabled when result can be pinned', () => {
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

  it('pinned item is being preserved', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.reload();
    cy.get(selectors.pinnedResultsRows).should('have.length', 1);
  });

  it('adding pin for the first time sets default character name', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(wrappers.indexedRowCell(1, ResultTableField.Character).toSelector()).should('have.text', 'не указан');
  });

  it('pinned item is having proper date', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(wrappers.indexedRowCell(1, ResultTableField.Datetime).toSelector()).should('have.text', '31.05.2022 00:00');
  });

  it('pinned results clear', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(selectors.clearPinnedResultsButton).click();
    cy.get(selectors.pinnedResultsTable).should('not.exist');
  });

  it('remove single saved item removes the section', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(selectors.removeItemButton(timestamp)).click();
    cy.get(selectors.pinnedResultsTable).should('not.exist');
  });

  it('latest pinned result is on-top', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    clock.tick(1000 * 60);
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(wrappers.indexedRowCell(1, ResultTableField.Datetime).toSelector()).should('contain', '31.05.2022 00:01');
  });

  xit('edit character name');
  xit('adding pin is using previous character name');
  xit('edit comment');
});
