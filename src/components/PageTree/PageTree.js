import React from 'react';
import { styled, List, Link, ListItemButton, Typography,
  ListItemIcon, ListItemText, ListItemSecondaryAction 
  } from "@mui/material";
  import { Article, MoreVert, Close, Delete } from "@mui/icons-material";
  import { QuickMenu, Tiny, DeleteConfirmMenu } from "..";
  
 
const PageTree = ({tree = [], selected, setPage, dropPage, duplicatePage, onClick}) => {
 return (
   <List dense>
   {tree.filter(f => !f.pageID || f.pageID === 'null').map(c => <Pages 
   dropPage={dropPage}
   setPage={setPage}
   duplicatePage={duplicatePage}
   selected={selected} onClick={onClick} key={c.PageName} tree={c} trees={tree}/> )}
   </List>
 );
}

const Pages = ({tree, trees, onClick, setPage, dropPage, duplicatePage, selected, indent = 0}) => {
  const kids = trees.filter(t => t.pageID === tree.ID);
  const [over, setOver] = React.useState(false);
  const options = [
    {
      name: 'Add child page',
      action: () => setPage(tree.ID)
    }, 
    {
      name: 'Duplicate',
      action: () => duplicatePage(tree.ID)
    }, 
    {
      name: '-', 
    },
    {
      name: <b style={{color: 'red'}}>Delete Page</b> ,
      action: () =>  dropPage (tree.ID)
    }
  ]

  const on = selected === tree.PageName; 

  return (
    <>
      <ListItemButton sx={{ ml:indent , p: 0 }}
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        >
        <ListItemIcon sx={{minWidth: 24}}>
           <Tiny icon={Article} />
        </ListItemIcon>
        <ListItemText  
          onClick={() => {
            onClick && onClick(null);
            setTimeout(() => {
              onClick && onClick(tree.PageName)
            }, 99)
          }} primary={<><Typography 
          sx={{ fontWeight: selected === tree.PageName ? 600 : 400, fontSize: '0.85rem' }}
            variant="body1">{tree.PageName}</Typography></>}/>
         {!!tree && <ListItemSecondaryAction>

          {on && <Tiny onClick={() =>  onClick && onClick() }  icon={Close}  sx={{mr: 1}} />}


          <DeleteConfirmMenu hidden={!(on || over)}  sx={{mr: 1}} message={`Delete page ${tree.PageName}?`} 
              onDelete={(e) => !!e && dropPage(tree.ID, true)}/>


          {/* <Tiny hidden={!(on || over)} onClick={() => dropPage && dropPage(tree.ID)}  icon={Delete}  sx={{mr: 1}} /> */}
          
          <QuickMenu options={options.map(f => f.name)} 
          onChange={value => {
            const { action } = options.find(f => f.name === value);
            !!action && action()
          }}
          label={<Tiny icon={MoreVert} />}/>
        </ListItemSecondaryAction>}
      </ListItemButton>
      {!!kids && <>{kids.map(c => <Pages 
            dropPage={dropPage}
            setPage={setPage} selected={selected}  onClick={onClick} 
            indent={indent + 3} 
            key={c.PageName} 
            duplicatePage={duplicatePage}
            trees={trees} 
            tree={c} /> )}</>}
    </>
  )
}
PageTree.defaultProps = {};
export default PageTree;
