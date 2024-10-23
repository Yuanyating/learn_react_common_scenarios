---
nav:
  title: Components
  path: /components
  order: 4
---

### useRef 多样性

- 访问 DOM 元素  
  React 强调声明式编程，减少直接操作 DOM 的情况。然而，有时我们仍然需要直接与 DOM 交互，或者访问某个组件的具体实例。当我们需要直接与 DOM 元素进行交互（例如，手动获取焦点或测量元素尺寸）时，可以使用 useRef。

  ```tsx
  import React, { useRef } from 'react';
  import { Input, Button, Space } from 'antd';

  const TextInput = () => {
    const inputRef = useRef(null);

    function focusInput() {
      inputRef.current.focus();
    }

    return (
      <Space>
        <Input ref={inputRef} />
        <Button onClick={focusInput}>Focus the input</Button>
      </Space>
    );
  };

  export default TextInput;
  ```

- 持久化变量  
  `useRef` 可以用来存储不需要重新渲染的值，这些值在组件重新渲染时不会改变。这和 useState 不同，useRef 改变不会引发组件重新渲染。示例：定时器

  ```tsx
  import React, { useRef, useEffect } from 'react';

  const Timer = () => {
    const timerRef = useRef(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        timerRef.current++;
        console.log('Timer running...');
      }, 1000);

      // 清除定时器
      return () => clearInterval(intervalId);
    }, []);

    return (
      <div>
        <p>{timerRef.current}</p>
      </div>
    );
  };

  export default Timer;
  ```

- 闭包陷阱  
  在异步函数中（如 setTimeout），由于闭包的特性，可能会捕获到旧的状态值。useRef 可以帮助持久化最新的值，以避免捕获到旧的状态。

  ```tsx
  import React, { useRef, useState, useEffect } from 'react';

  const DelayedCount = () => {
    const [count, setCount] = useState(0);
    const countRef = useRef(count);

    useEffect(() => {
      countRef.current = count; // 同步最新的 count 到 ref
    }, [count]);

    const handleDelayedIncrement = () => {
      setTimeout(() => {
        // 通过 ref 访问最新的 count 值，而不是闭包中的旧值
        setCount(countRef.current + 1);
      }, 3000);
    };

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={handleDelayedIncrement}>Increment after 3 seconds</button>
      </div>
    );
  };

  export default DelayedCount;
  ```
