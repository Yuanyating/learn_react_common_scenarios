---
nav:
  title: Components
  path: /components
  order: 1
---

## 依赖项浅比较引发的问题

useEffect、useMemo 和 useCallback 的依赖项都是通过浅比较来确定是否需要重新计算或执行。这意味着只有当依赖项的引用发生变化时，React 才会认为依赖项发生了变化。

可能会产生以下两种情况：

1.对象引用不变，但是内容发生了变化

```tsx
import { Button } from 'antd';
import React, { useEffect } from 'react';

const Demo = () => {
  const obj = { key: 'value' };

  const handleChange = () => {
    obj.key = 'newValue'; // obj 的引用不变，但内容变化
  };

  useEffect(() => {
    console.log('111');
    //todo
  }, [obj]);

  return <Button onClick={handleChange}>change</Button>;
};

export default Demo;
```

2.对象重新创建

```tsx
import { Collapse, Modal } from 'antd';
import React, { useMemo } from 'react';
import { useState } from 'react';

const Demo = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const scope = {
    a: 'xxx',
  };

  const form = useMemo(() => {
    Modal.info({ title: 'create the form ' });
    //return form
  }, [scope]);

  const handleChange = (keys: string[]) => {
    setActiveKeys(keys);
  };

  return (
    <Collapse activeKey={activeKeys} onChange={handleChange}>
      <Collapse.Panel key="1" header="collapse 1">
        1
      </Collapse.Panel>
      <Collapse.Panel key="2" header="collapse 2">
        2
      </Collapse.Panel>
    </Collapse>
  );
};

export default Demo;
```
