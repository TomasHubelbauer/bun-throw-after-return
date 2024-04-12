import { test, expect } from 'bun:test';

// This function returns a promise that resolves but it also later throws
async function demo() {
  const { promise, resolve, reject } = Promise.withResolvers();

  setImmediate(() => {
    resolve(42);
  });

  setImmediate(() => {
    throw new Error('Uncaught!');
  });

  return await promise;
}

test('returns and then throws', async () => {
  const result = await demo();
  expect(result).toBe(42);
});

test('returns and then throws with try-catch', async () => {
  try {
    const result = await demo();
    expect(result).toBe(42);
  }
  catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});

try {
  test('returns and then throws', async () => {
    const result = await demo();
    expect(result).toBe(42);
  });
}
catch (error) {
  expect(error).toBeInstanceOf(Error);
}

process.on('unhandledRejection', (error) => {
  console.log('Caught!');
});
