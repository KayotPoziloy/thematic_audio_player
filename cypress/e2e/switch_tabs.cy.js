describe('Tab Switching Test Suite', () => {
  beforeEach(() => {
    // Переход на главную страницу перед каждым тестом
    cy.visit('http://localhost:3000');
  });

  it('should switch between tabs with 2-second intervals', () => {
    // Проверка, что мы находимся на "Главная" при загрузке
    cy.url().should('include', '/'); // Главная страница

    // Переход на вкладку "Аккаунт" через 2 секунды
    cy.wait(2000);
    cy.get('a.nav-link').contains('Аккаунт').click();
    cy.url().should('include', '/account'); // проверка URL для Аккаунт

    // Переход на вкладку "Вход" через 2 секунды
    cy.wait(4000);
    cy.get('a.nav-link').contains('Вход').click();
    cy.url().should('include', '/login'); // проверка URL для Вход

    // Переход на вкладку "Регистрация" через 2 секунды
    cy.wait(4000);
    cy.get('a.nav-link').contains('Регистрация').click();
    cy.url().should('include', '/register'); // проверка URL для Регистрация

    // Возвращаемся на вкладку "Главная" через 2 секунды
    cy.wait(4000);
    cy.get('a.nav-link').contains('Главная').click();
    cy.url().should('include', '/'); // проверка URL для Главная
  });
});
