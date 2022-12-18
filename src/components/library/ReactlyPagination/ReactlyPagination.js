import React from 'react';
import { Pagination } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Pin } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentPagination = ({ children, ...props }) => {
  const args = getSettings(props.settings);

  if (!props.count) {
    return <>Loading...</>
  }

  if (args.hideone && props.count === 1) {
    return <i />
  }
  
  return (<> 
    <ReactlyComponent component={Pagination} {...props} page={parseInt(props.page)} 
        onChange={(e, page) => props.onPageChange && props.onPageChange(e, { page })}/>
  </>
  );
}

 

const ReactlyPagination = { 
  Component: ReactlyComponentPagination, 
}
 

export default ReactlyPagination;


