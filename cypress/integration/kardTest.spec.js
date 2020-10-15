describe('The cart work as expected', () => {
  it('Allows User add and delete cart items', () => {
    cy.visit('/tienda');

    cy.get('[data-cy=galery-item-id-1]').should('be.visible').click();
    cy.get('[data-cy=button-add-to-kart]')
      .should('be.visible')
      .contains('agregar al carrito')
      .click();

    cy.get('[data-cy=number-kart-nav-web]').contains('1');
    cy.get('[data-cy=number-kart-nav-mobile]').contains('1');
    cy.get('[data-cy=input-qty-items-to-kart]')
      .should('have.value', '1')
      .clear()
      .type('3');

    cy.get('[data-cy=button-add-to-kart]').click();
    cy.get('[data-cy=number-kart-nav-web]').contains('1');
    cy.get('[data-cy=number-kart-nav-mobile]').contains('1');

    cy.get('[data-cy=product-button-next ]').click();
    cy.get('[data-cy=button-add-to-kart]').click();
    cy.get('[data-cy=number-kart-nav-web]').contains('2');
    cy.get('[data-cy=number-kart-nav-mobile]').contains('2');
    cy.get('[data-cy=icon-kart-nav-mobile]').click();

    cy.get('[data-cy="product-wrapper-on-kart"]')
      .children()
      .should('have.length', 3);
    // .then((sometext) => cy.log(sometext));

    cy.contains('blue pants');
    cy.contains('gray pants');

    cy.get('[data-cy="button-delete-item-from-kart-id-1"]').click();
    cy.get('[data-cy="product-wrapper-on-kart"]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy="button-delete-item-from-kart-id-2"]').click();
    cy.get('[data-cy="product-wrapper-on-kart"]')
      .children()
      .should('have.length', 0);
  });
});
