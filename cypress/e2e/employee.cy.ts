describe('Employee', () => {
    it('Deberia de ir a la pagina de gestion de empleados, crear un nuevo contrato y luego despedirlo', () => {
        cy.visit('http://localhost:4200/session/login');

        cy.get('input[name="email"]').type('hr@mail.com');
        cy.get('input[name="password"]').type('contra123');
        cy.get('button[type="submit"]').click();

        // Ir a la pagina de gestion de empleados
        cy.get('button[data-cy="go-gestion"]').click();

        // Esperar a que se cargue la pagina de gestion de empleados
        cy.contains('Area de gestion de Emplados').should('exist');

        // Ir a la informacion del empleado
        cy.get('button[data-cy="go-employee"]').click();

        // Crear un nuevo contrato
        cy.get('button[data-cy="new-contract"]').click();

        // Esperar a que se cargue el modal de nuevo contrato
        cy.contains('Contrato nuevo').should('exist');

        // Llenar el formulario de nuevo contrato
        cy.get('input[name="salary"]').clear().type('5000.00');
        cy.get('input[name="iggs"]').clear().type('4.83');
        cy.get('input[name="irtra"]').clear().type('1.00');
        cy.get('button[data-cy="create-contract"]').click();

        // Esperar a que se cargue el modal de respuesta
        cy.contains('Nuevo Contrato Registrado').should('exist');

        //Cerrar el modal de respuesta
        cy.get('button[data-cy="close-modal"]').first().click();

        //Validar que esta en la pagina de gestion de empleados
        cy.contains('Area de gestion de Emplados').should('exist');

        // Ir a la informacion del empleado
        cy.get('button[data-cy="go-employee"]').click();

        //Despedir al empleado
        cy.get('button[data-cy="dismissal"]').click();

        // Esperar a que se cargue el modal de respuesta
        cy.contains('Despido de empleado').should('exist');

        // Llenar el formulario de despido
        cy.get('input[data-cy="finish-contract-description"]').type('Despido por desempeño');

        // Finalizar el contrato
        cy.get('button[data-cy="finish-contract"]').click();
    })
})