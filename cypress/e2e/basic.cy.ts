describe('basic tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('having proper tytle', () => {
    cy.title().should('equal', 'Фарм - Lineage 2 Classic');
  });
});
