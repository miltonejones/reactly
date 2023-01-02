import React from 'react';
import {  List, ListItemButton, Typography,
  ListItemIcon, ListItemText, ListItemSecondaryAction 
  } from "@mui/material";
  import { Article, MoreVert, Close } from "@mui/icons-material";
  import { QuickMenu, Tiny, DeleteConfirmMenu } from "..";
import ParameterPopover from '../pages/Editor/components/ParameterPopover/ParameterPopover';
import { useReactly } from '../../hooks';
import { AppStateContext, EditorStateContext } from '../../hooks/AppStateContext';
  
 
const PageTree = () => {

  const [parameters, setParameters] = React.useState(null)
  const [pageName, setPageName] = React.useState(null)

  const [anchorEl, setAnchorEl] = React.useState(null); 

  const { appContext, selectedPage = {} } = React.useContext(AppStateContext);
  const { handlePageNavigate: onClick } = React.useContext(EditorStateContext);
  
  const tree = appContext.pages || [];
  const selected = selectedPage?.PageName

  const reactly = useReactly();

  const handlePopoverClick =  (event, name, params) => {  
    setParameters(params);
    setPageName(name);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => { 
    setAnchorEl(null); 
  };

  const handleButtonClick = (event) => {
    if (parameters && Object.keys(parameters).length) {
      return handlePopoverClick(event);
    } 
  }

  const handleParameterChange = param => event => {
    setParameters(params => ({
      ...params,
      [param]: event.target.value 
    }))
  }


  const openPage = () => { 
    onClick(pageName, parameters) ;
    handlePopoverClose ()
  }

  const popProps = {
    handlePopoverClick,
    handlePopoverClose,
    handleButtonClick
  }



 return (
  <>
   <List dense>
   {tree.filter(f => !f.pageID || f.pageID === 'null').map(c => <Pages 
   dropPage={reactly.dropPage}
   setPage={reactly.createPage}
   duplicatePage={reactly.duplicatePage}
   {...popProps}
   selected={selected} onClick={onClick} key={c.PageName} tree={c} trees={tree}/> )}
   </List>
   <ParameterPopover 
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          handleParameterChange={handleParameterChange}
          openPage={openPage}
          parameters={parameters}
    />
   </>
 );
}

const Pages = ({tree, trees, onClick, setPage, dropPage, duplicatePage, selected, indent = 0, ...props}) => {
  const {
    handlePopoverClick,
    handlePopoverClose,
    handleButtonClick
  } = props;
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
          onClick={(e) => {
            if (tree.parameters && Object.keys(tree.parameters).length) {
              handlePopoverClick(e, tree.PageName, tree.parameters)
              return; // alert ('Cannot go directly here.')
            }
            onClick && onClick(null);
            setTimeout(() => {
              onClick && onClick(tree.PageName)
            }, 99)
          }} 
          
          primary={<>

          <Typography 
            sx={{ 
              fontWeight: selected === tree.PageName ? 600 : 400, 
              fontSize: '0.85rem',
              color: !!tree.parameters && !!Object.keys(tree.parameters).length 
                ? 'gray'
                : 'black'
            }}
            variant="body1"
          >{tree.PageName}</Typography>
            
            </>}
            
            />


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
            {...props}
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
