import { UserEmail } from '@domain/value-objects/UserEmail';

describe('UserEmail Value Object', () => {
  describe('create', () => {
    it('should create a valid email', () => {
      const email = 'test@example.com';
      const userEmail = UserEmail.create(email);
      
      expect(userEmail.getValue()).toBe(email);
    });

    it('should normalize email to lowercase', () => {
      const email = 'TEST@EXAMPLE.COM';
      const userEmail = UserEmail.create(email);
      
      expect(userEmail.getValue()).toBe('test@example.com');
    });

    it('should trim whitespace', () => {
      const email = '  test@example.com  ';
      const userEmail = UserEmail.create(email);
      
      expect(userEmail.getValue()).toBe('test@example.com');
    });

    it('should throw error for invalid email format', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test.example.com',
        '',
        ' ',
      ];

      invalidEmails.forEach(email => {
        expect(() => UserEmail.create(email)).toThrow();
      });
    });
  });

  describe('getDomain', () => {
    it('should return the domain part of email', () => {
      const userEmail = UserEmail.create('test@example.com');
      
      expect(userEmail.getDomain()).toBe('example.com');
    });
  });

  describe('getLocalPart', () => {
    it('should return the local part of email', () => {
      const userEmail = UserEmail.create('test@example.com');
      
      expect(userEmail.getLocalPart()).toBe('test');
    });
  });

  describe('toString', () => {
    it('should return the email as string', () => {
      const email = 'test@example.com';
      const userEmail = UserEmail.create(email);
      
      expect(userEmail.toString()).toBe(email);
    });
  });

  describe('equals', () => {
    it('should return true for same email values', () => {
      const email1 = UserEmail.create('test@example.com');
      const email2 = UserEmail.create('test@example.com');
      
      expect(email1.equals(email2)).toBe(true);
    });

    it('should return false for different email values', () => {
      const email1 = UserEmail.create('test1@example.com');
      const email2 = UserEmail.create('test2@example.com');
      
      expect(email1.equals(email2)).toBe(false);
    });

    it('should handle case normalization in equality', () => {
      const email1 = UserEmail.create('TEST@example.com');
      const email2 = UserEmail.create('test@EXAMPLE.COM');
      
      expect(email1.equals(email2)).toBe(true);
    });
  });
}); 