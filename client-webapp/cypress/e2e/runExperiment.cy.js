describe('dashboard spec', () => {
  it('passes', () => {
    cy.visit('http://169.254.2.163:5173/');

    //login
    cy.findByRole('textbox', { name: /your email/i }).type('usr1@example.com');
    cy.findByLabelText(/password/i).type('mail12345');
    cy.findByRole('button', { name: /sign in/i }).click();
    cy.findByText(/archive/i);

    //setup experiment
    cy.findByRole('button', { name: /setup experiment/i }).click();
    cy.findByRole('button', { name: /next/i }).click();
    // cy.get('[data-testid="image-wheel"]').trigger('mousedown', { which: 1 }); // initiate drag
    // cy.get('[data-testid="container-TF"]').trigger('mousemove').trigger('mouseup'); // drop on target

    cy.findByRole('button', {  name: /next/i}).click();

    cy.findByText(/archive/i);

    cy.findByRole('button', {  name: /admin/i}).click();

    cy.findByText(/pending experiments/i)




   
  });
  
}) 