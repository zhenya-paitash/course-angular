import { countries } from './countries';

describe('countries', () => {

  it('should contain countries codes', () => {
    expect(countries()).toContain('RU');
    expect(countries()).toContain('UA');
    expect(countries()).toContain('BY');
  });

});
