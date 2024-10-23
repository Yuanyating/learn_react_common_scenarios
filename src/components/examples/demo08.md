---
nav:
  title: Components
  path: /components
  order: 2
---

## React.memo

根据上述情况，React 提供了一种更符合使用习惯的优化方式，那就是 React.memo，这个 API 的作用就是让组件变成一个纯组件，也就是说，如果组件的 props 没有变化，那么就不会重新渲染。

虽然`React.memo`可以优化组件性能，但是大部分情况下，即便不做任何优化，React 的性能也是足够的。因此对于简单组件和 props 常变的组件，通常不需要使用 memo。

除了上述提到的原因，不常使用 memo 的另一个原因是 React.memo 很容易被“破坏”

`memo`会在发现组件需要重新渲染的时候，先去 check 一遍组件的`props`是否变化，`React`将使用`Object.is`（浅比较）比较「每个 prop」。如果它们没有发生变化，就可以跳过重新渲染。

`函数`、`对象`和`数组`等非基本数据类型，它们是存在堆中的，也就是在引用它们的时候，我们只是引用了它存在堆中的地址（`指针`），因此对于 prop 中出现上述情况，实际比较是不准确的。

解决方案是自定义比较函数，通过 `React.memo` 的第二个参数传入，可以实现更复杂的比较逻辑。

```yml
import React from 'react';

const MyComponent = React.memo( (props) => { /* 组件逻辑 */ }, (prevProps, nextProps) => { // 自定义比较逻辑 return prevProps.someProp === nextProps.someProp; } );

export default MyComponent;
```

但是需要注意的是： 对于复杂的比较逻辑，可能会导致额外的性能开销，特别是在频繁更新的组件中。

综上所述，可以知道在大型组件树中，某些子组件不需要每次父组件渲染的时候都重新渲染，这时候是使用 React.memo 的时机：

```tsx
import React from 'react';
import { Step3 } from 'dumi-demo';

export default () => <Step3 />;
```
