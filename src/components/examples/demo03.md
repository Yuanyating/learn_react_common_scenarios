---
nav:
  title: Components
  path: /components
  order: 3
---
# useLayoutEffect

## useLayoutEffect 使用

> useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.

使用场景：

- 需要同步读取或更改 DOM：例如，你需要读取元素的大小或位置并在渲染前进行调整。
- 防止闪烁：在某些情况下，异步的 useEffect 可能会导致可见的布局跳动或闪烁。例如，动画的启动或某些可见的快速 DOM 更改。

```tsx
/**
 * title: 使用useEffect
 * description: 点击按钮，页面闪烁
 */

import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'antd';

function Example() {
  const [text, setText] = useState('');
  const [height, setHeight] = useState(50);
  useEffect(() => {
    if (height === 50) {
      setHeight(100);
    }
  }, [height]);

  return (
    <>
      <div style={{ width: 100, height, background: 'pink' }}>{text}</div>
      <button
        onClick={() => {
          setText('changed');
          setHeight(50);
        }}
      >
        change height
      </button>
    </>
  );
}

export default Example;
```

```tsx
/**
 * title: 使用useLayoutEffect
 * description: 点击按钮，页面不会闪烁，因为useLayoutEffect发生在浏览器绘制之前
 * 
 */

import React, { useRef, useState, useLayoutEffect } from 'react';
import { Button } from 'antd';

function Example() {
  const [text, setText] = useState('');
  const [height, setHeight] = useState(50);
  useLayoutEffect(() => {
    if (height === 50) {
      setHeight(100);
    }
  }, [height]);

  return (
    <>
      <div style={{ width: 100, height, background: 'pink' }}>{text}</div>
      <button
        onClick={() => {
          setText('changed');
          setHeight(50);
        }}
      >
        change height
      </button>
    </>
  );
}

export default Example;
```

注意事项：

- 避免过度使用 useLayoutEffect，因为它是同步的，可能会影响应用的性能。只有当你确实需要同步的 DOM 操作时才使用它。


## useLayoutEffect 原理
