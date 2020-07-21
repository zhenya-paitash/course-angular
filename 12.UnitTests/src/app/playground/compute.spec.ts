import {compute} from './compute';

// объявляем какой компонент тестируем
describe('compute', () => {

  // описание теста
  it('should return 0 if negative input', () => {
    // тест
    const result = compute(-1);
    // сравнение то что ожидали/получили
    expect(result).toBe(0);
  });

  it('should return increment if positive input', () => {
    const result = compute(2);
    expect(result).toBe(3);
  });

});
