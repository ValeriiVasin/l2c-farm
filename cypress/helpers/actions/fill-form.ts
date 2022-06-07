import { selectors } from '../selectors';

export function fillForm({ time = '', adena = '', exp = '' }: { time?: string; exp?: string; adena?: string }) {
  if (exp) {
    cy.get(selectors.inputs.exp).type(exp);
  }
  if (adena) {
    cy.get(selectors.inputs.adena).type(adena);
  }
  if (time) {
    cy.get(selectors.inputs.time).type(time);
  }
}
