import { Band } from './band';

describe('Band', () => {
  let band: Band;

  beforeEach(() => {
    band = new Band();
    band.band_id = 1;
    band.band_colour = '#FFFFFF';
  })

  it('should create an instance', () => {
    expect(new Band()).toBeTruthy();
  });

  it('should be the right colour', () => {
    expect(band.band_colour).toBe('#FFFFFF')
  });

  it('should be the correct band id', () => {
    expect(band.band_id).toBe(1)
  });
  it('should create an instance', () => {
    expect(new Band()).toBeTruthy();
  });
});
