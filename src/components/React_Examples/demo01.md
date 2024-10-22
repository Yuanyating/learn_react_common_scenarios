---
nav:
  title: Components
  path: /components
  order: 0
---

## useState 更新异步问题

```tsx
import { Button, List, Typography } from 'antd';
import React, { useState } from 'react';

type Item = {
  id: number;
  title: string;
  menu: string[];
};

const mutateData = (data: Item[]) => {
  return data.map((item) => ({
    ...item,
    title: `${item.title} -- update`,
  }));
};

const MockRequest = () => {
  const [dataSource, setDataSource] = useState<Item[]>([]);
  console.log('refresh');
  const handleClick = () => {
    fetch('http://rap2api.taobao.org/app/mock/259267/getMenu')
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setDataSource(res?.data);
        const newData = mutateData(res?.data);
        // setDataSource([...dataSource, ...newData]);
        setDataSource((prevState) => {
          return [...prevState, ...newData];
        });
      });
  };

  return (
    <>
      <Button onClick={handleClick}>请求接口</Button>
      <List
        bordered
        style={{ marginTop: 16 }}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>{item.title}</Typography.Text>
            <Typography.Paragraph>
              {Array.isArray(item.menu) ? item.menu.join(',') : ''}
            </Typography.Paragraph>
          </List.Item>
        )}
      />
    </>
  );
};

export default MockRequest;
```

### 函数式更新

当我们正常使用`setDataSource([...dataSource, ...newData])`直接更新时，这个值并不是即时生效的，这是因为状态更新是异步的，无法立即在更新后获取最新的状态。  
使用函数式更新可以基于 state 的最新状态，进行下一次的计算。

### 批处理

这里还可以发现另一个问题，React 的批处理在异步中失效了。

> 批处理是指 React 为了更好的性能而将多个状态更新分组到一个重新渲染进程中。

在同一个函数中进行了两次 setState，组件 re-render 了两次。  
因为当前使用的版本是 17.x，该问题在 React 18 版本中得到了优化。  
详情：https://github.com/reactwg/react-18/discussions/21

总结来说，17 中的批处理只能在合成事件中生效，针对 setTimeout、Promise、原生事件等场景无法生效，18 开始默认在任意事件中都可以批处理更新。
