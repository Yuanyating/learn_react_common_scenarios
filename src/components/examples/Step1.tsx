import React, { useState } from 'react';
import { Button, Flex } from 'antd';

let renderTimes = 0;

const Inside = ({ title }: { title: string }) => {
  return (
    <Flex align="center" style={{ border: '1px solid #000', padding: 16, background: '#fff' }}>
      <p>{title}</p>
      <span>渲染次数：{renderTimes++}</span>
    </Flex>
  );
};

const Wrapper = ({ title, subTitle }: { title: string; subTitle: string }) => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: '1px solid #000', padding: 16, background: '#ccc' }}>
      <Flex align="center">
        <p>{title}</p>
        <Button size="small" onClick={() => setCount((count) => count + 1)}>
          触发渲染
        </Button>
        <span>渲染次数：{count}</span>
      </Flex>
      <Inside title={subTitle} />
    </div>
  );
};

const App = () => {
  const title = 'wrapper';
  const subTitle = 'inside';

  return (
    <div style={{ border: '1px solid #000', padding: 16, background: '#fff' }}>
      <p>App</p>
      <Wrapper title={title} subTitle={subTitle} />
    </div>
  );
};

export default App;
