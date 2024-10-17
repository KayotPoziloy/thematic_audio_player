describe('Broken Test Suite', () => {
  it('should fail when clicking a non-existent button', () => {
    cy.get('button').contains('Non-existent Button').click();
  });
});

