import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(res => res.json())
      .then((data) => setDetailData(data));
  }, [id]);

  if (!detailData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Detail Page</h2>
      <p><strong>ID:</strong> {detailData.id}</p>
      <p><strong>Name:</strong> {detailData.name}</p>
      <p><strong>Email:</strong> {detailData.email}</p>
      <p><strong>Body:</strong> {detailData.body}</p>
    </div>
  );
}

export default Detail;
