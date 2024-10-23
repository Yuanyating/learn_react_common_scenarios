---
nav:
  title: Components
  path: /components
  order: 0
---

## React Internals Explorer

https://jser.dev/2024-05-11-introducing-rie/

https://jser.pro/ddir/rie?reactVersion=18.3.1&snippetKey=hq8jm2ylzb9u8eh468

说明: https://jser.dev/series/react-source-code-walkthrough  


> React Internals Explorer - easily see how React works

Fiber 是 React 16 之后提出的架构，优势主要体现在以下三部分：

- 异步可中断渲染
- 优先级调度（Lane）
- 双缓冲机制（workInProgress tree, current tree)

### 异步可中断渲染
由于长时间的计算任务可能会占用线程导致页面卡顿的问题，React推出了时间切片的技术。  
> 将VDOM的执行过程，拆分为一个一个的独立的宏任务，将每个宏任务的执行时间限制在一定的范围内（5ms）  

### 优先级调度

而Scheduler调度器实现了一套基于Lane模型的优先级算法，Lane是为了标记更新的优先级，我们也可以说标记一项工作的优先级。

![更新源码](./pic2.png "更新源码")


### 双缓冲机制
Fiber架构的工作原理类似于显卡的工作原理。  
> 绘制的最终产物是一张图片，这张图片被发送给显卡后即可显示在屏幕上。
Fiber架构中同时存在两棵Fiber Tree，一棵是真实UI对应的Fiber Tree，可理解为前缓冲区。另一棵正在内存中构建的Fiber Tree，可理解为后缓冲区。  
  
`fiberRootNode`负责管理Current Fiber Tree和Wip Fiber tree之间的切换。

![双缓冲机制](./pic1.png "双缓冲机制")