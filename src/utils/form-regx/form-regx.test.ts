import { describe, it } from 'vitest';
import {
  passwordRegxAnyLetters,
  passwordRegxAnyNumbers,
  emailRegx,
} from './form-regx';

describe('Form RegEx Functions', () => {
  describe('passwordRegxAnyLetters', () => {
    it('should return true if password contains at least one letter', () => {
      const mockPassword = 'Abc123';
      const result = passwordRegxAnyLetters(mockPassword);
      expect(result).toBe(true);
    });

    it('should return false if password does not contain any letters', () => {
      const mockPassword = '123456';
      const result = passwordRegxAnyLetters(mockPassword);
      expect(result).toBe(false);
    });
  });

  describe('passwordRegxAnyNumbers', () => {
    it('should return true if password contains at least one number', () => {
      const mockPassword = 'Abc123';
      const result = passwordRegxAnyNumbers(mockPassword);
      expect(result).toBe(true);
    });

    it('should return false if password does not contain any numbers', () => {
      const mockPassword = 'Abcdef';
      const result = passwordRegxAnyNumbers(mockPassword);
      expect(result).toBe(false);
    });
  });

  describe('emailRegx', () => {
    it('should return true if email is in a valid format', () => {
      const mockEmail = 'test@example.com';
      const result = emailRegx(mockEmail);
      expect(result).toBe(true);
    });

    it('should return false if email is not in a valid format', () => {
      const mockEmail = 'test.example.com';
      const result = emailRegx(mockEmail);
      expect(result).toBe(false);
    });
  });
});
