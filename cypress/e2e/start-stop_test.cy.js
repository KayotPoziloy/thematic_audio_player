// describe('Audio Player Test Suite', () => {
//   beforeEach(() => {
//     // Переход на главную страницу перед каждым тестом
//     cy.visit('http://localhost:3000');
//   });
//
//   it('should start, stop, restart, and finally stop the audio', () => {
//     // Кликаем по кнопке Start и проверяем, что аудио запускается
//     cy.get('button.btn-success').contains('Start').click();
//
//     // Проверяем, что элемент <audio> начал воспроизведение
//     cy.get('audio').should('have.prop', 'paused', false);
//
//     // Ждем 3 секунды для симуляции воспроизведения
//     cy.wait(3000);
//
//     // Кликаем по кнопке Stop и проверяем, что аудио остановлено
//     cy.get('button.btn-danger').contains('Stop').click();
//     cy.get('audio').should('have.prop', 'paused', true);
//
//     // Ждем 3 секунды перед повторным запуском
//     cy.wait(3000);
//
//     // Снова кликаем по кнопке Start для перезапуска аудио
//     cy.get('button.btn-success').contains('Start').click();
//     cy.get('audio').should('have.prop', 'paused', false);
//
//     // Ждем 3 секунды для симуляции повторного воспроизведения
//     cy.wait(3000);
//
//     // Кликаем по кнопке Stop и проверяем, что аудио окончательно остановлено
//     cy.get('button.btn-danger').contains('Stop').click();
//     cy.get('audio').should('have.prop', 'paused', true);
//   });
// });

describe('start-stop', () => {
  beforeEach(() => {
    // Переход на главную страницу перед каждым тестом
    cy.visit('http://localhost:3000');
  });

  it('should switch between tabs with 2-second intervals', () => {
    // Проверка, что мы находимся на "Главная" при загрузке
    cy.url().should('include', '/'); // Главная страница

    // Переход на вкладку "Вход" через 2 секунды
    cy.wait(4000);
    cy.get('a.nav-link').contains('Вход').click();
    cy.url().should('include', '/login'); // проверка URL для Вход

    // Переход на вкладку "Регистрация" через 2 секунды
    cy.wait(4000);
    cy.get('a.nav-link').contains('Регистрация').click();
    cy.url().should('include', '/register'); // проверка URL для Регистрация

  });
});


