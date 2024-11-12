'use client';

import { Button } from '@nextui-org/react';

async function fetchData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');

  const data = await res.json();
  return data;
}

export default async function AsyncComponent() {
  const data = await fetchData();
  return (
    <div>
      <h2>Fetched Data:</h2>
      <p>{data.title}</p>
    </div>
  );
}
