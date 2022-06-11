import { fillForm } from '../helpers/actions/fill-form';
import { selectors } from '../helpers/selectors';

describe('basic tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('having proper title', () => {
    cy.title().should('equal', 'Фарм - Lineage 2 Classic');
  });

  it('do not display results on init', () => {
    cy.get(selectors.results).should('not.exist');
  });

  it('calculates exp and adena', () => {
    fillForm({ exp: '10kkk', adena: '1kk', time: '1h' });

    cy.get(selectors.sections.hourly.exp).should('have.text', '10kkk');
    cy.get(selectors.sections.hourly.adena).should('have.text', '1kk');
    cy.get(selectors.sections.daily.exp).should('have.text', '240kkk');
    cy.get(selectors.sections.daily.adena).should('have.text', '24kk');
  });

  it('entering exp and time only', () => {
    fillForm({ exp: '10kkk', time: '1h' });

    cy.get(selectors.sections.hourly.exp).should('have.text', '10kkk');
    cy.get(selectors.sections.hourly.adena).should('have.text', '-');
    cy.get(selectors.sections.daily.exp).should('have.text', '240kkk');
    cy.get(selectors.sections.daily.adena).should('have.text', '-');
  });

  it('entering adena and time only', () => {
    fillForm({ adena: '1kk', time: '1h' });

    cy.get(selectors.sections.hourly.exp).should('have.text', '-');
    cy.get(selectors.sections.hourly.adena).should('have.text', '1kk');
    cy.get(selectors.sections.daily.exp).should('have.text', '-');
    cy.get(selectors.sections.daily.adena).should('have.text', '24kk');
  });

  it('results not visible when time not entered', () => {
    fillForm({ adena: '1kk', exp: '10kkk' });

    cy.get(selectors.results).should('not.exist');
  });

  describe('clear button', () => {
    beforeEach(() => {
      fillForm({ exp: '10kkk', adena: '1kk', time: '1h' });
    });

    it('clear button clears all inputs', () => {
      cy.get(selectors.clearButton).click();
      cy.get(selectors.inputs.exp).should('have.value', '');
      cy.get(selectors.inputs.adena).should('have.value', '');
      cy.get(selectors.inputs.time).should('have.value', '');
    });

    it('clear button moves focus into exp input', () => {
      cy.get(selectors.clearButton).click();
      cy.get(selectors.inputs.exp).should('have.focus');
    });
  });

  describe('url sync', () => {
    describe('exp', () => {
      it('initial', () => {
        cy.visit('/?exp=10kk');
        cy.get(selectors.inputs.exp).should('have.value', '10kk');
      });

      it('updates', () => {
        fillForm({ exp: '10kk' });
        cy.url().should('contain', 'exp=10kk');
      });
    });

    describe('adena', () => {
      it('initial', () => {
        cy.visit('/?adena=10kk');
        cy.get(selectors.inputs.adena).should('have.value', '10kk');
      });

      it('updates', () => {
        fillForm({ adena: '10kk' });
        cy.url().should('contain', 'adena=10kk');
      });
    });

    describe('time', () => {
      it('initial', () => {
        cy.visit('/?time=1h20m');
        cy.get(selectors.inputs.time).should('have.value', '1h20m');
      });

      it('updates', () => {
        fillForm({ time: '1h20m' });
        cy.url().should('contain', 'time=1h20m');
      });
    });
  });
});
