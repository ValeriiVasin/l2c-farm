import { selectors } from '../selectors';
import { fillForm } from './fill-form';

export function pinItem({ time, adena = '', exp = '' }: { time: string; exp?: string; adena?: string }) {
  fillForm({ exp, adena, time });
  cy.get(selectors.pinButton).click();
}
