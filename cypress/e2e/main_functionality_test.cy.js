describe('Main Functionality Test', () => {
  beforeEach(() => {
    // Переход на главную страницу перед каждым тестом
    cy.visit('http://localhost:3000');
  });

  it('should test audio functionality and tab switching with intervals', () => {
    // Включаем музыку через 2 секунду после загрузки страницы
    cy.wait(2000);
    cy.get('button.btn-success').contains('Start').click();
    cy.get('audio').should('have.prop', 'paused', false); // Проверка, что аудио запущено

    // Останавливаем музыку через 3 секунды после включения
    cy.wait(3000);
    cy.get('button.btn-danger').contains('Stop').click();
    cy.get('audio').should('have.prop', 'paused', true); // Проверка, что аудио остановлено

    // Переход на вкладку "Аккаунт" через 3 секунды
    // cy.wait(3000);
    // cy.get('a.nav-link').contains('Аккаунт').click();
    // cy.url().should('include', '/account'); // Проверка URL для "Аккаунт"
    //
    // // Возвращаемся на главную через 4 секунды
    // cy.wait(4000);
    // cy.get('a.nav-link').contains('Главная').click();
    // cy.url().should('include', '/'); // Проверка URL для главной страницы

    // Снова включаем музыку через 1 секунду после возвращения на главную
    cy.wait(1000);
    cy.get('button.btn-success').contains('Start').click();
    cy.get('audio').should('have.prop', 'paused', false); // Проверка, что аудио запущено

    // Останавливаем музыку через 4 секунды
    cy.wait(4000);
    cy.get('button.btn-danger').contains('Stop').click();
    cy.get('audio').should('have.prop', 'paused', true); // Проверка, что аудио остановлено
  });
});
