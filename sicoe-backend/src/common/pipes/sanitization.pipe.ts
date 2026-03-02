import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * Sanitization Pipe
 * Removes potentially dangerous characters from input
 */
@Injectable()
export class SanitizationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      return this.sanitizeString(value);
    }

    if (typeof value === 'object' && value !== null) {
      return this.sanitizeObject(value);
    }

    return value;
  }

  /**
   * Sanitize string input
   */
  private sanitizeString(input: string): string {
    // Remove null bytes
    let sanitized = input.replace(/\0/g, '');

    // Encode < and > to prevent XSS
    sanitized = sanitized
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Remove potential SQL injection characters (but preserve normal apostrophes)
    // This is an additional layer; main protection comes from parameterized queries
    const dangerousPatterns = [
      /;\s*drop\s/i,
      /;\s*delete\s/i,
      /;\s*insert\s/i,
      /;\s*update\s/i,
      /;\s*create\s/i,
      /union\s+select/i,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(sanitized)) {
        throw new BadRequestException('Input contains potentially malicious content');
      }
    }

    return sanitized;
  }

  /**
   * Recursively sanitize object
   */
  private sanitizeObject(obj: any): any {
    const sanitized: any = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (typeof value === 'string') {
          sanitized[key] = this.sanitizeString(value);
        } else if (typeof value === 'object' && value !== null) {
          sanitized[key] = this.sanitizeObject(value);
        } else {
          sanitized[key] = value;
        }
      }
    }

    return sanitized;
  }
}
