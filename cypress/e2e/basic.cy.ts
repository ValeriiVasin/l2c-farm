import { testId } from '../helpers/test-id';

const selectors = {
  results: testId('results'),
  clearButton: testId('clear-button'),
  inputs: {
    adena: `${testId('adena')} input[type=text]`,
    exp: `${testId('exp')} input[type=text]`,
    time: `${testId('time')} input[type=text]`,
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
};

describe('basic tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('having proper tytle', () => {
    cy.title().should('equal', 'Фарм - Lineage 2 Classic');
  });

  it('do not display results on init', () => {
    cy.get(selectors.results).should('not.exist');
  });

  it('calculates exp and adena', () => {
    cy.get(selectors.inputs.exp).type('10kkk');
    cy.get(selectors.inputs.adena).type('1kk');
    cy.get(selectors.inputs.time).type('1h');

    cy.get(selectors.sections.hourly.exp).should('have.text', '10kkk');
    cy.get(selectors.sections.hourly.adena).should('have.text', '1kk');
    cy.get(selectors.sections.daily.exp).should('have.text', '240kkk');
    cy.get(selectors.sections.daily.adena).should('have.text', '24kk');
  });

  it('entering exp and time only', () => {
    cy.get(selectors.inputs.exp).type('10kkk');
    cy.get(selectors.inputs.time).type('1h');

    cy.get(selectors.sections.hourly.exp).should('have.text', '10kkk');
    cy.get(selectors.sections.hourly.adena).should('have.text', '-');
    cy.get(selectors.sections.daily.exp).should('have.text', '240kkk');
    cy.get(selectors.sections.daily.adena).should('have.text', '-');
  });

  it('entering adena and time only', () => {
    cy.get(selectors.inputs.adena).type('1kk');
    cy.get(selectors.inputs.time).type('1h');

    cy.get(selectors.sections.hourly.exp).should('have.text', '-');
    cy.get(selectors.sections.hourly.adena).should('have.text', '1kk');
    cy.get(selectors.sections.daily.exp).should('have.text', '-');
    cy.get(selectors.sections.daily.adena).should('have.text', '24kk');
  });

  it('results not visible when time not entered', () => {
    cy.get(selectors.inputs.adena).type('1kk');
    cy.get(selectors.inputs.exp).type('10kkk');

    cy.get(selectors.results).should('not.exist');
  });

  describe('clear button', () => {
    beforeEach(() => {
      cy.get(selectors.inputs.exp).type('10kkk');
      cy.get(selectors.inputs.adena).type('1kk');
      cy.get(selectors.inputs.time).type('1h');
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
        cy.get(selectors.inputs.exp).type('10kk');
        cy.url().should('contain', 'exp=10kk');
      });
    });

    describe('adena', () => {
      it('initial', () => {
        cy.visit('/?adena=10kk');
        cy.get(selectors.inputs.adena).should('have.value', '10kk');
      });

      it('updates', () => {
        cy.get(selectors.inputs.adena).type('10kk');
        cy.url().should('contain', 'adena=10kk');
      });
    });

    describe('time', () => {
      it('initial', () => {
        cy.visit('/?time=1h20m');
        cy.get(selectors.inputs.time).should('have.value', '1h20m');
      });

      it('updates', () => {
        cy.get(selectors.inputs.time).type('1h20m');
        cy.url().should('contain', 'time=1h20m');
      });
    });
  });
});
