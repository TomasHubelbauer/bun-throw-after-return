# Bun test `throw` after `return`

I've come across this head-scratcher of a test scenario.

I have a function that returns a promise that later resolves and I can test it
by awaiting the function in the async test.

However, the same function later throws on a different tick, which causes an
uncaught error to be emitted.

I don't see a way for Bun to catch this uncaught error and assert it as a part
of the test.

Wrapping the `test` function nor the `await` call itself in a `try`-`catch`
block doesn't catch the error.
The error doesn't seem to be catchable via `process.on('unhandledRejection')`.

Reproduce using `bun test`.

I've filed a Bun feature request for adding an API to catch the error:
https://github.com/oven-sh/bun/issues/10226
