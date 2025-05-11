describe('Login E2E', () => {
    it('debería permitir al usuario iniciar sesión exitosamente', () => {
      cy.visit('http://localhost:4200/session/login');
  
      // Llenar el formulario
      cy.get('input[name="email"]').type('brayan.quialo@gmail.com'); //Est usuario de farmacia
      cy.get('input[name="password"]').type('contra123');
  
      // Enviar el formulario
      cy.get('button[type="submit"]').click();
  
      // Esperar redirección al dashboard correspondiente
      cy.url().should('include', '/pharmacy'); 
    });
  
    it('debería mostrar un error con credenciales incorrectas', () => {
      cy.visit('http://localhost:4200/session/login');
  
      cy.get('input[name="email"]').type('fake@ejemplo.com');
      cy.get('input[name="password"]').type('incorrecto');
  
      cy.get('button[type="submit"]').click();
  
      // Espera un mensaje de error
      cy.contains('El email o la contraseña es incorrecta').should('exist');
    });
  });
  