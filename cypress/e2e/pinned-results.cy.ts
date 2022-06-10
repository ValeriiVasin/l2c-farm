import { fillForm } from '../helpers/actions/fill-form';
import { pinItem } from '../helpers/actions/pin-item';
import { ResultTableField, selectors } from '../helpers/selectors';

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
    cy.get(selectors.resultTableCell(1, ResultTableField.Character)).should('have.text', 'не указан');
  });

  it('adding pin for the first time sets default comment', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(selectors.resultTableCell(1, ResultTableField.Comment)).should('have.text', 'не указан');
  });

  it('pinned item is having proper date', () => {
    pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
    cy.get(selectors.resultTableCell(1, ResultTableField.Datetime)).should('have.text', '31.05.2022 00:00');
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
    cy.get(selectors.resultTableCell(1, ResultTableField.Datetime)).should('contain', '31.05.2022 00:01');
  });

  describe('edit character name', () => {
    beforeEach(() => {
      pinItem({ adena: '1kk', time: '1h', exp: '1kkk' });
    });

    it('clicking on edit starts edit and focuses input', () => {
      cy.get(selectors.editCharacterNameButton(timestamp)).click();
      cy.get(selectors.editCharacterNameInput(timestamp)).should('have.focus');
    });

    it('edit character with no name set starts from the empty input', () => {
      cy.get(selectors.editCharacterNameButton(timestamp)).click();
      cy.get(selectors.editCharacterNameInput(timestamp)).should('have.value', '');
    });

    it('Escape cancels the edit', () => {
      cy.get(selectors.editCharacterNameButton(timestamp)).click();
      cy.get(selectors.editCharacterNameInput(timestamp)).type('{esc}');
      cy.get(selectors.editCharacterNameInput(timestamp)).should('not.exist');
    });

    it('Enter key updates the name', () => {
      cy.get(selectors.editCharacterNameButton(timestamp)).click();
      cy.get(selectors.editCharacterNameInput(timestamp)).type('NSDQ{enter}');
      cy.get(selectors.editCharacterNameInput(timestamp)).should('not.exist');
      cy.get(selectors.characterName(timestamp)).should('have.text', 'NSDQ');
    });

    it('start typing and cancel resets the value', () => {
      cy.get(selectors.editCharacterNameButton(timestamp)).click();
      cy.get(selectors.editCharacterNameInput(timestamp)).type('NSDQ{esc}');
      cy.get(selectors.editCharacterNameInput(timestamp)).should('not.exist');
      cy.get(selectors.characterName(timestamp)).should('have.text', 'не указан');
      cy.get(selectors.editCharacterNameButton(timestamp)).click();
      cy.get(selectors.editCharacterNameInput(timestamp)).should('have.value', '');
    });

    it('submitting empty field sets default name', () => {
      cy.get(selectors.editCharacterNameButton(timestamp)).click();
      cy.get(selectors.editCharacterNameInput(timestamp)).type('{enter}');
      cy.get(selectors.characterName(timestamp)).should('have.text', 'не указан');
    });

    it('adding pin is using previous character name', () => {
      cy.get(selectors.editCharacterNameButton(timestamp)).click();
      cy.get(selectors.editCharacterNameInput(timestamp)).type('NSDQ{enter}');

      clock.tick(60 * 1000);
      pinItem({ time: '1h', exp: '1kkk', adena: '1kk' });
      cy.get(selectors.characterName(timestamp + 60 * 1000)).should('have.text', 'NSDQ');
    });
  });

  describe.skip('edit comment', () => {
    // TBD
  });

  it('date field is having a link');
});
