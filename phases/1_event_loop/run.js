import { createEventLoop } from './eventLoop.js';

const { enqueue, loop } = createEventLoop();

enqueue(() => console.log('👋 Hello after 1s'), 1000);
enqueue(() => console.log('✅ Task 2 after 2s'), 2000);

loop();
