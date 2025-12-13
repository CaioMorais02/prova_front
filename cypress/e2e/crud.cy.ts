describe('Employee CRUD Scenarios', () => {
  const mockEmployees = [
    { id: 1, name: 'Ana', email: 'ana@teste.com', role: 'Dev', active: true },
    { id: 2, name: 'Bruno', email: 'bruno@teste.com', role: 'QA', active: false }
  ];

  beforeEach(() => {
    cy.intercept('GET', '**/employees', { body: mockEmployees }).as('getEmployees');
  });

  it('1. Listar: Deve exibir a tabela com os dados', () => {
    cy.visit('/');
    cy.wait('@getEmployees');

    cy.contains('Ana').should('be.visible');
    cy.contains('Bruno').should('be.visible');
    cy.get('table tbody tr').should('have.length', 2);
  });

  it('2. Buscar: Deve filtrar resultados e exibir "sem resultados"', () => {
    cy.intercept('GET', '**/employees?q=Xyz', { body: [] }).as('searchEmpty');
    
    cy.visit('/');
    cy.wait('@getEmployees');

    const input = cy.get('input[placeholder*="Buscar"]');
    input.type('Xyz');

    cy.contains('Nenhum funcionário encontrado').should('be.visible');
  });

  it('3. Criar: Deve preencher formulário e voltar para lista', () => {
    cy.intercept('POST', '**/employees', { 
      statusCode: 201, 
      body: { id: 3, name: 'Carlos', email: 'carlos@teste.com', role: 'PO', active: true } 
    }).as('createEmployee');

    cy.visit('/employees/new');

    cy.get('input[formControlName="name"]').type('Carlos');
    cy.get('input[formControlName="email"]').type('carlos@teste.com');
    cy.get('input[formControlName="role"]').type('PO');
    
    cy.get('button[type="submit"]').click();

    cy.wait('@createEmployee');
    
    cy.url().should('include', '/employees');
  });

  it('4. Editar: Deve carregar dados e salvar', () => {
    cy.intercept('GET', '**/employees/1', { 
      body: mockEmployees[0] 
    }).as('getEmployeeById');

    cy.intercept('PUT', '**/employees/1', { 
      statusCode: 200, 
      body: { ...mockEmployees[0], name: 'Ana Editada' } 
    }).as('updateEmployee');

    cy.visit('/employees/1/edit');
    cy.wait('@getEmployeeById');

    cy.get('input[formControlName="name"]').should('have.value', 'Ana');

    cy.get('input[formControlName="name"]').clear().type('Ana Editada');
    cy.get('button[type="submit"]').click();

    cy.wait('@updateEmployee');
    cy.url().should('include', '/employees');
  });

  it('5. Deletar: Deve confirmar exclusão e atualizar lista', () => {
    cy.visit('/');
    cy.wait('@getEmployees');

    cy.intercept('DELETE', '**/employees/1', { statusCode: 200 }).as('deleteEmployee');
    
    cy.intercept('GET', '**/employees', { 
        body: [mockEmployees[1]] // Só o Bruno sobrou
    }).as('getEmployeesAfterDelete');

    cy.on('window:confirm', () => true);

    cy.contains('Excluir').first().click();

    cy.wait('@deleteEmployee');
    
    cy.wait('@getEmployeesAfterDelete');
    
    cy.contains('Ana').should('not.exist');
  });

  it('6. Erro: Deve exibir mensagem amigável quando API falhar', () => {
    cy.intercept('GET', '**/employees', { 
      statusCode: 500, 
      body: { error: 'Server Error' } 
    }).as('getError');

    cy.visit('/');
    cy.wait('@getError');

    cy.contains('Erro ao carregar dados').should('be.visible');
  });
});