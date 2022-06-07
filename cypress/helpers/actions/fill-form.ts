import { selectors } from '../selectors';

export function fillForm({ time = '', adena = '', exp = '' }: { time?: string; exp?: string; adena?: string }) {
  if (time) {
    cy.get(selectors.inputs.time).type(time);
  }
  if (adena) {
    cy.get(selectors.inputs.adena).type(adena);
  }
  if (exp) {
    cy.get(selectors.inputs.exp).type(exp);
  }
}
