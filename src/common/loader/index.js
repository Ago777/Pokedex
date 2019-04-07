import React from 'react';

const AppLoader = (props) => {

  return (
    <div className={`${props['isAppLoader'] ? 'appLoader' : 'loader'}`}/>
  );
};

export default AppLoader;