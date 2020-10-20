describe('the checkout process is working as expected', () => {
  it('check validation for info form on the first step of the checkout proccess', () => {
    cy.visit('/tienda');
    cy.clearCookie('cart');

    cy.get('[data-cy=galery-item-id-1]').should('be.visible').click();

    cy.get('[data-cy=button-add-to-cart]')
      .should('be.visible')
      .contains('agregar al carrito')
      .click();

    cy.go('back');

    cy.get('[data-cy=galery-item-id-2]').should('be.visible').click();

    cy.get('[data-cy=button-add-to-cart]')
      .should('be.visible')
      .contains('agregar al carrito')
      .click();

    cy.get('[data-cy="icon-cart-nav-mobile"]').click();

    cy.get('[data-cy="button-buy-cart"]').should('be.visible').click();

    cy.should('not.contain', 'ups! algo salio mal');

    cy.get('[data-cy="info-form-field-next-button"]').click();

    cy.contains('ups! algo salio mal');
    cy.contains('Nombre es Requerido');
    cy.contains('Apellido es Requerido');
    cy.contains('Ciudad es Requerido');
    cy.contains('Barrio es Requerido');
    cy.contains('Dirección es Requerido');
    cy.contains('Teléfono es Requerido');
    cy.contains('E-mail es Requerido');

    cy.get('[data-cy="input-address-info-form-field-name"]')
      .click()
      .type('Michael');
    cy.get('[data-cy="input-address-info-form-field-lastName"]')
      .click()
      .type('Jordan');
    cy.get('[data-cy="input-address-info-form-field-city"]')
      .click()
      .type('Chicago');
    cy.get('[data-cy="input-address-info-form-field-district"]')
      .click()
      .type('Streeterville');
    cy.get('[data-cy="input-address-info-form-field-address"]')
      .click()
      .type('1441 Tator Patch Road');
    cy.get('[data-cy="input-address-info-form-field-phone"]')
      .click()
      .type('123345670');
    cy.get('[data-cy="input-address-info-form-field-email"]')
      .click()
      .type('Michael_Jordan@chicago_bulls.com');

    cy.should('not.contain', 'ups! algo salio mal');

    cy.get('[data-cy="info-form-field-next-button"]').click();

    cy.contains('ups! esto no es un e-mail valido');
    cy.get('[data-cy="input-address-info-form-field-email"]')
      .click()
      .clear()
      .type('Michael_Jordan@chicago-bulls.com');
    cy.get('[data-cy="info-form-field-next-button"]').click();
  });

  it('check correct behavior for checkout step 2 nequi pagos', () => {
    cy.contains('Numero de cuenta Bancolombia');
    cy.contains('Nequi pagos');

    cy.get('[data-cy="link-nequi-payment-method"]').click();

    cy.contains('ESTO ES TEMPORAL Redireccionar a NEQUI PAGOS');
  });

  it('check correct behavior for checkout step 2', () => {
    cy.visit('/tienda');
    cy.clearCookie('cart');

    cy.get('[data-cy=galery-item-id-1]').should('be.visible').click();

    cy.get('[data-cy=button-add-to-cart]')
      .should('be.visible')
      .contains('agregar al carrito')
      .click();

    cy.get('[data-cy="icon-cart-nav-mobile"]').click();

    cy.get('[data-cy="button-buy-cart"]').should('be.visible').click();

    cy.get('[data-cy="input-address-info-form-field-name"]')
      .click()
      .type('Michael');
    cy.get('[data-cy="input-address-info-form-field-lastName"]')
      .click()
      .type('Jordan');
    cy.get('[data-cy="input-address-info-form-field-city"]')
      .click()
      .type('Chicago');
    cy.get('[data-cy="input-address-info-form-field-district"]')
      .click()
      .type('Streeterville');
    cy.get('[data-cy="input-address-info-form-field-address"]')
      .click()
      .type('1441 Tator Patch Road');
    cy.get('[data-cy="input-address-info-form-field-phone"]')
      .click()
      .type('123345670');
    cy.get('[data-cy="input-address-info-form-field-email"]')
      .click()
      .type('Michael_Jordan@chicago-bulls.com');

    cy.get('[data-cy="info-form-field-next-button"]').click();

    cy.get('[data-cy="acordeon-direct-to-bank-account"]')
      .click()
      .click()
      .click();

    cy.get('[data-cy=button-next-inside-accordeon]').click();
  });

  it('check correct behavior for checkout step 2', () => {
    cy.get('[data-cy="product-review-container-on-checkout"]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy="button-buy-review-page"]').click();

    cy.contains('EXITO!');

    cy.clearCookie('cart');

    cy.get('[data-cy="button-back-to-store"]').click();
  });
});
