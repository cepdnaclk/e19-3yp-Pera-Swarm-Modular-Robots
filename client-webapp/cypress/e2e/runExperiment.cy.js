describe('dashboard spec', () => {
  it('passes', () => {
    cy.visit('http://169.254.2.163:5173/');
    
    //login
    cy.findByRole('textbox', {  name: /your email/i}).type('usr1@example.com');
    cy.findByLabelText(/password/i).type('mail12345');
    cy.findByRole('button', {  name: /sign in/i}).click();


  })
}) 