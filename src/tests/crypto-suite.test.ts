import { providers } from '../lib/crypto-providers';

const testVectors = [
  { 
    key: '0123456789abcdef0123456789abcdef0123456789abcdef', 
    plain: 'VNTU2026',
    desc: 'Стандартні буквено-цифрові дані'
  },
  { 
    key: 'ffffffffffffffffffffffffffffffffffffffffffffffff', 
    plain: '12345678',
    desc: 'Максимальне значення Hex-ключа'
  },
  { 
    key: '000000000000000000000000000000000000000000000000', 
    plain: 'Security',
    desc: 'Нульовий ключ'
  },
  { 
    key: 'a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5', 
    plain: '!@#$%^&*',
    desc: 'Спеціальні символи'
  }
];

describe.each(Object.values(providers))('комплексний набір тестів для $name', (provider) => {
  
  describe('коректність та тестові вектори ', () => {
    test.each(testVectors)('має коректно шифрувати та дешифрувати: $desc', ({ key, plain }) => {
      const encrypted = provider.encrypt(plain, key);
      const decrypted = provider.decrypt(encrypted, key);
      
      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe('string');
      expect(decrypted).toBe(plain);
    });
  });

  describe('цілісність та обмеження даних', () => {
    test(' ає коректно обробляти довгі рядки (декілька блоків 3DES)', () => {
      const longPlain = 'цей довгий рядок використовується для тестування розбиття на блоки та заповнення  в алгоритмі Triple DES.';
      const key = testVectors[0].key;
      
      const encrypted = provider.encrypt(longPlain, key);
      const decrypted = provider.decrypt(encrypted, key);
      
      expect(decrypted).toBe(longPlain);
    });

    test('має повертати помилку при невірній довжині ключа', () => {
      const invalidKey = '1234'; 
      expect(() => {
        provider.encrypt('тестові дані', invalidKey);
      }).toThrow();
    });
  });
});

describe('сумісність між бібліотеками', () => {
  test('обидві бібліотеки мають бути взаємозамінними (Cross-check)', () => {
    const data = 'CrossLibraryTest';
    const key = testVectors[0].key;

    const nodeEnc = providers.nodeCrypto.encrypt(data, key);
    const jsDec = providers.cryptoJS.decrypt(nodeEnc, key);

    expect(jsDec).toBe(data);
  });
});

describe('порівняння продуктивності ', () => {
  test(' node:crypto проти crypto-js', () => {
    const data = 'ТестПродуктивності2026';
    const key = testVectors[0].key;
    const iterations = 5000;

    const startNode = performance.now();
    for(let i = 0; i < iterations; i++) providers.nodeCrypto.encrypt(data, key);
    const endNode = performance.now();

    const startJS = performance.now();
    for(let i = 0; i < iterations; i++) providers.cryptoJS.encrypt(data, key);
    const endJS = performance.now();

    console.table([
      { 'Бібліотека': 'node:crypto', 'Час виконання (ms)': (endNode - startNode).toFixed(2) },
      { 'Бібліотека': 'crypto-js', 'Час виконання (ms)': (endJS - startJS).toFixed(2) }
    ]);

    expect(endNode - startNode).toBeLessThan(endJS - startJS);
  });
});