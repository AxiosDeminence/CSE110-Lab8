const formatVolumeIconPath = require('../assets/scripts/main.js');
const main = require('../assets/scripts/main.js');

describe('volume icon path grabber', () => {
    test('level 3 icon path', () => {
        expect(formatVolumeIconPath(67)).toBe(`./assets/media/icons/volume-level-3.svg`);
    });
    test('level 2 icon path', () => {
        expect(formatVolumeIconPath(34)).toBe(`./assets/media/icons/volume-level-2.svg`);
    });
    test('level 1 icon path', () => {
        expect(formatVolumeIconPath(1)).toBe(`./assets/media/icons/volume-level-1.svg`);
    });
    test('level 0 icon path', () => {
        expect(formatVolumeIconPath(0)).toBe(`./assets/media/icons/volume-level-0.svg`);
    });
});