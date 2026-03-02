import { BadRequestException } from '@nestjs/common';
import { SanitizationPipe } from './sanitization.pipe';

describe('SanitizationPipe', () => {
  let pipe: SanitizationPipe;

  beforeEach(() => {
    pipe = new SanitizationPipe();
  });

  describe('transform', () => {
    it('should return non-string values unchanged', () => {
      expect(pipe.transform(123)).toBe(123);
      expect(pipe.transform(true)).toBe(true);
      expect(pipe.transform(null)).toBe(null);
    });

    it('should sanitize string inputs', () => {
      const input = '<script>alert("xss")</script>';
      const result = pipe.transform(input);

      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
      expect(result).not.toContain('<script>');
    });

    it('should remove null bytes from strings', () => {
      const input = 'hello\0world';
      const result = pipe.transform(input);

      expect(result).toBe('helloworld');
    });

    it('should throw BadRequestException for SQL injection patterns', () => {
      const maliciousInputs = [
        '; DROP TABLE users',
        '; DELETE FROM users',
        'UNION SELECT * FROM passwords',
      ];

      maliciousInputs.forEach((input) => {
        expect(() => pipe.transform(input)).toThrow(BadRequestException);
      });
    });

    it('should sanitize objects recursively', () => {
      const input = {
        name: '<script>alert("xss")</script>',
        nested: {
          value: '<img onerror="alert(1)">',
        },
      };

      const result = pipe.transform(input);

      expect(result.name).toContain('&lt;');
      expect(result.nested.value).toContain('&lt;');
    });

    it('should sanitize arrays', () => {
      const input = ['<script>test</script>', 'normal text'];
      const result = pipe.transform(input);

      expect(result[0]).toContain('&lt;');
      expect(result[1]).toBe('normal text');
    });

    it('should preserve normal apostrophes', () => {
      const input = "It's a nice day";
      const result = pipe.transform(input);

      expect(result).toBe(input);
    });
  });
});
