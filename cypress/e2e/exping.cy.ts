import { selectors } from '../helpers/selectors';

describe('exping', () => {
  beforeEach(() => {
    cy.visit('/exp');
  });

  it('page is available', () => {
    cy.get(selectors.expingContainer).should('contain', 'Калькулятор Опыта');
  });

  describe('exping results', () => {
    it('result is not available when no data filled', () => {
      cy.get(selectors.expLevelResult).should('not.exist');
    });

    it('result is not available when only <from> is filled', () => {
      cy.get(selectors.levelFromInput).type('91');
      cy.get(selectors.expLevelResult).should('not.exist');
    });

    it('result is not available when only <to> is filled', () => {
      cy.get(selectors.levelToInput).type('92');
      cy.get(selectors.expLevelResult).should('not.exist');
    });

    it('result is available when <from> and <to> fields filled', () => {
      cy.get(selectors.levelFromInput).type('91');
      cy.get(selectors.levelToInput).type('92');
      cy.get(selectors.expLevelResult).should('exist');
    });

    it('result is correct', () => {
      cy.get(selectors.levelFromInput).type('0');
      cy.get(selectors.levelToInput).type('92');
      cy.get(selectors.expLevelResult).should('have.text', '219.72kkkk');
    });
  });

  describe('exping speed', () => {
    it('result is not available when <exp speed> or <exp time> is not filled', () => {
      cy.get(selectors.levelFromInput).type('0');
      cy.get(selectors.levelToInput).type('92');
      cy.get(selectors.expSpeedResult).should('not.exist');
    });

    it('result is not available when <from> and <to> not filled', () => {
      cy.get(selectors.expTimeInput).type('1h');
      cy.get(selectors.expSpeedInput).type('45kkk');
      cy.get(selectors.expSpeedResult).should('not.exist');
    });

    it('exists when all the data filled', () => {
      cy.get(selectors.levelFromInput).type('0');
      cy.get(selectors.levelToInput).type('80');
      cy.get(selectors.expSpeedInput).type('38kkk');
      cy.get(selectors.expTimeInput).type('1h');

      cy.get(selectors.expSpeedResult).should('have.text', '1h');
    });
  });
});
