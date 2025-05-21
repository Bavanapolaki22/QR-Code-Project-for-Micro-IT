// Simple CSPRNG implementation for demo purposes
export class CSPRNG {
  static getRandomValues(array: Uint8Array): Uint8Array {
    // In a real implementation, this would use a cryptographically secure random number generator
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  }
}