describe('Audio Player Test Suite', () => {
  beforeEach(() => {
    // Переход на главную страницу перед каждым тестом
    cy.visit('http://localhost:3000');
  });

  it('should start, stop, restart, and finally stop the audio', () => {
    // Кликаем по кнопке Start и проверяем, что аудио запускается
    cy.get('button.btn-success').contains('Start').click();
    
    // Проверяем, что элемент <audio> начал воспроизведение
    cy.get('audio').should('have.prop', 'paused', false);

    // Ждем 3 секунды для симуляции воспроизведения
    cy.wait(3000);

    // Кликаем по кнопке Stop и проверяем, что аудио остановлено
    cy.get('button.btn-danger').contains('Stop').click();
    cy.get('audio').should('have.prop', 'paused', true);

    // Ждем 3 секунды перед повторным запуском
    cy.wait(3000);

    // Снова кликаем по кнопке Start для перезапуска аудио
    cy.get('button.btn-success').contains('Start').click();
    cy.get('audio').should('have.prop', 'paused', false);

    // Ждем 3 секунды для симуляции повторного воспроизведения
    cy.wait(3000);

    // Кликаем по кнопке Stop и проверяем, что аудио окончательно остановлено
    cy.get('button.btn-danger').contains('Stop').click();
    cy.get('audio').should('have.prop', 'paused', true);
  });
});



