import React from 'react';

type dtype = {
  key: string;
  value: string;
};

const dataSource: dtype[] = [
  { key: 'key1', value: 'value1' },
  { key: 'key2', value: 'value2' },
];

const Step4 = () => {
  return (
    <section>
      {dataSource.map((item) => (
        <div>{item.value}</div>
      ))}
    </section>
  );
};

export default Step4;
