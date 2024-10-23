// import { DeleteOutlined } from '@ant-design/icons';
// import { Button, Flex, Input, Space } from 'antd';
// import React, { useState } from 'react';

// // 列表项组件，使用 React.memo
// const ListItem = React.memo(({ item, onDelete }: any) => {
//   console.log(`Rendering ListItem: ${item.text}`);

//   return (
//     <Flex justify="space-between">
//       <span>{item.text}</span>
//       <Button size="small" icon={<DeleteOutlined />} onClick={() => onDelete(item.id)}></Button>
//     </Flex>
//   );
// });

// // 列表组件
// const List = ({ items, onDelete }: any) => {
//   console.log('Rendering List');

//   return (
//     <div>
//       {items.map((item) => (
//         <ListItem key={item.id} item={item} onDelete={onDelete} />
//       ))}
//     </div>
//   );
// };

// // 主应用组件
// const App = () => {
//   const [items, setItems] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const handleAddItem = () => {
//     if (inputValue) {
//       setItems([...items, { id: Date.now(), text: inputValue }]);
//       setInputValue('');
//     }
//   };

//   const handleDeleteItem = (id) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   return (
//     <div>
//       <h3>Todo List</h3>
//       <Space>
//         <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
//         <Button onClick={handleAddItem}>+</Button>
//       </Space>
//       <List items={items} onDelete={handleDeleteItem} />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';

// 列表项组件，使用 React.memo
const ListItem = React.memo(({ item }) => {
  console.log(`Rendering ListItem: ${item}`);

  return <div style={{ padding: '5px', border: '1px solid #ccc', margin: '5px' }}>{item}</div>;
});

// 列表组件
const List = ({ items }) => {
  console.log('Rendering List');

  return (
    <div>
      {items.map((item) => (
        <ListItem key={item} item={item} />
      ))}
    </div>
  );
};

// 主应用组件
const App = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(['Item 1', 'Item 2', 'Item 3']);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <h2>List</h2>
      <List items={items} />
    </div>
  );
};

export default App;
