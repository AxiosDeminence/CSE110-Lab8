describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider')
      .then(($el) => expect($el).to.have.value(75));
  });

  it('Volume input changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input').then(() => {
        cy.get('#volume-number').then($el => expect($el).to.have.value(33));
    });
  });

  it('Audio volume changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input').then(() => {
      cy.get('audio').then($el => expect($el).to.have.prop('volume', 0.33));
    });
  });

  it('Image and sound sources change selecting party horn radio buttons', () => {
    cy.get('#radio-party-horn').check().trigger('change').then(() => {
      cy.get('#sound-image').then($el => expect($el).to.have.attr('src', './assets/media/images/party-horn.svg'));
      cy.get('#horn-sound').then($el => expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3'));
    });
  });

  it('Volume image changes when increasing volumes', () => {
    cy.get('#volume-number').clear().type('0').then(() => {
      cy.get('#volume-image').then($el => expect($el).to.have.attr('src', './assets/media/icons/volume-level-0.svg'));
    });

    cy.get('#volume-number').clear().type('1').then(() => {
      cy.get('#volume-image').then($el => expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg'));
    });

    cy.get('#volume-number').clear().type('34').then(() => {
      cy.get('#volume-image').then($el => expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg'));
    });

    cy.get('#volume-number').clear().type('67').then(() => {
      cy.get('#volume-image').then($el => expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg'));
    });
  });

  it('Honk button is disabled when textbox input is empty or non-number', () => {
    cy.get('#volume-number').clear().trigger('input').then(() => {
      cy.get('#honk-btn').should('be.disabled');
    });

    cy.get('#volume-number').clear().type('2').trigger('input').then(() => {
      cy.get('#honk-btn').should('not.be.disabled');
    });

    cy.get('#volume-number').clear().type('not a number').trigger('input').then(() => {
      cy.get('#honk-btn').should('be.disabled');
    });
  });

  it('Error is shown when volume outside range is given', () => {
    cy.get('#volume-number').clear().type('101');
    cy.get('input:invalid').should('have.length', 1);
  });
});
