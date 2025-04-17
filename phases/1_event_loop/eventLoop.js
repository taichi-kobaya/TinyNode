// 最小のイベントループ実装
export const createEventLoop = () => {
    let queue = [];
  
    const enqueue = (fn, delay) => {
      const runAt = Date.now() + delay;
      queue.push({ fn, runAt });
    };
  
    const loop = () => {
      const timer = setInterval(() => {
        const now = Date.now();
        queue = queue.filter(task => {
          if (task.runAt <= now) {
            task.fn();
            return false;
          }
          return true;
        });
  
        if (queue.length === 0) clearInterval(timer);
      }, 10);
    };
  
    return { enqueue, loop };
  };
  