import { selectors } from '../selectors';

export function fillForm({ time = '', adena = '', exp = '' }: { time?: string; exp?: string; adena?: string }) {
  if (exp) {
    cy.get(selectors.inputs.exp).clear().type(exp);
  }
  if (adena) {
    cy.get(selectors.inputs.adena).clear().type(adena);
  }
  if (time) {
    cy.get(selectors.inputs.time).clear().type(time);
  }
}
