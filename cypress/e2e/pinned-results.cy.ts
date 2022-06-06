import createWrapper from '@awsui/components-react/test-utils/selectors';
import { testId } from '../helpers/test-id';

const selectors = {
  pinButton: createWrapper().findButton(testId('pin-button')).toSelector(),
};

describe('Pinned results', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('pin button is disabled when result is not valid', () => {
    cy.get(selectors.pinButton).should('be.disabled');
  });

  xit('pinned section is not displayed when nothing was pinned');
  xit('adding pin for the first time sets default character name');
  xit('adding pin is using previous character name');
  xit('remove single saved item');
  xit('pinned results are ordered by the timestamp');
  xit('edit character');
  xit('edit comment');
});
