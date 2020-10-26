describe('The cart work as expected', () => {
  it('Allows User add and delete cart items', () => {
    cy.visit('/tienda');

    cy.get('[data-cy=galery-large-item-id-1]').should('be.visible').click();
    cy.get('[data-cy=button-add-to-cart]')
      .should('be.visible')
      .contains('agregar al carrito')
      .click();

    cy.get('[data-cy=number-cart-nav-web]').contains('1');
    cy.get('[data-cy=number-cart-nav-mobile]').contains('1');
    cy.get('[data-cy=input-qty-items-to-cart]')
      .should('have.value', '1')
      .clear()
      .type('3');

    cy.get('[data-cy=button-add-to-cart]').click();
    cy.get('[data-cy=number-cart-nav-web]').contains('1');
    cy.get('[data-cy=number-cart-nav-mobile]').contains('1');

    cy.get('[data-cy=galery-item-id-2]').should('be.visible').click();
    cy.get('[data-cy=button-add-to-cart]').click();
    cy.get('[data-cy=number-cart-nav-web]').contains('2');
    cy.get('[data-cy=number-cart-nav-mobile]').contains('2');
    cy.get('[data-cy=number-cart-nav-mobile]').click();

    cy.get('[data-cy="product-wrapper-on-cart"]')
      .children()
      .should('have.length', 3);
    // .then((sometext) => cy.log(sometext));

    cy.contains('Buso botón');
    cy.contains('Buso clásico');

    cy.get('[data-cy="button-delete-item-from-cart-id-1"]').click();
    cy.get('[data-cy="product-wrapper-on-cart"]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy="button-delete-item-from-cart-id-2"]').click();
    cy.get('[data-cy="product-wrapper-on-cart"]')
      .children()
      .should('have.length', 0);
  });
});
