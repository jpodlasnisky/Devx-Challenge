import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading: React.FC = () => {
  return (
    <div className="small-container">
        <Skeleton width={100} height={100}/>
        <Skeleton width={100} height={100}/>
        <Skeleton width={100} height={100}/>
        <Skeleton width={100} height={100}/>
  </div>
  );
}

export default Loading;