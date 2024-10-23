---
nav:
  title: Components
  path: /components
  order: 5
---

## react 重复渲染分析

如果将递归嵌套式组件 → 利用 Children 实现组件结构，会有效减少重复渲染的情况

```tsx
import React from 'react';
import { Step1 } from 'dumi-demo';

export default () => <Step1 />;
```

从结果可看出，父组件无关的 state 变化，依然会触发子组件的重复渲染

利用 Children 改变组件结构：

```tsx
import React from 'react';
import { Step2 } from 'dumi-demo';

export default () => <Step2 />;
```

这种方式是利用 React 自身的优化算法，规避了渲染。

因为 React 的渲染原则是：在遍历过程中如果发现【节点本身】以及【祖先节点】没有更新，那么该节点也不会被重新渲染。

因为 Inside 节点是被 App 组件创建的，因此它的祖先节点为 App 组件而不是 Wrapper 组件，因此 Wrapper 组件重新渲染时，不会触发 Inside 组件的重新渲染。

### 但是为什么不建议使用这种方式来减少渲染呢

主要是因为其<mark style="background-color:pink">可维护性不高</mark>，因为你需要把具体某几个节点单独提出去声明，这让节点渲染脱离了常规的节点流，而等到业务变得复杂，可能很难避免需要传递一些 props 给该组件，这时候你就需要把这个组件提升到父组件中，那代码改起来就变得非常的麻烦。
