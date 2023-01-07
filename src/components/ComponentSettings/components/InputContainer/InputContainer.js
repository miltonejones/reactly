import React from 'react';
import { styled, ToggleButtonGroup, ToggleButton, Card, Box } from '@mui/material';
import { Edit, Code, AddLink } from "@mui/icons-material";
import { AppStateContext } from '../../../../context'; 
 
const Layout = styled(Box)(({ theme }) => ({
 display: 'flex',
 position:  'relative',
 border: 'solid 1px 1px 1px 6px red',
 padding: theme.spacing(0, 1),
//  borderColor: 'white',
 width:  'calc(100% - 8px)', 
 '--editor-opacity':  0,
 '&:hover': {
  borderColor: theme.palette.grey[700], 
   '--editor-opacity':  1,
 }
}));

const EditTip = styled(Card)(({ theme }) => ({ 
  position:  'absolute', 
  top: theme.spacing(-2), 
  right: theme.spacing(4),  
  cursor: 'pointer',
  opacity: 'var(--editor-opacity)',
  backgroundColor: theme.palette.grey[200]
}));
 

const Ico = ({icon: Icon, active}) => <Icon sx={{
  color : t => active 
    ? t.palette.primary.main 
    : t.palette.grey[400],
  '&:hover': {
    color: t => t.palette.primary.main 
  }  }} />

const EditGroup = ({ view, setView, ...props }) => {
  // const [view, setView] = React.useState('edit');

  // React.useEffect(() => {
  //   console.log ({ props });
  // }, [props]);

  // const handleChange = (event, nextView) => {
  //   switch (nextView) {
  //     case 'bind':
  //       bindPropertyClicked && bindPropertyClicked();
  //       break;
  //     default: 
  //       alert(`Unknown action ${nextView}`);

  //   }
  //   setView(nextView);
  // };

   //   onChange={handleChange}
  const views = {
    edit: <Ico icon={Edit} active={view==='edit'}/>,
    code: <Ico icon={Code} active={view==='code'} />,
    bind: <Ico icon={AddLink}  active={view==='bind'}  />,
  }

  return (
  <> 
  
   <ToggleButtonGroup  
      value={view}
      exclusive
      
    >
      {Object.keys(views).map(v => (
      <ToggleButton 
        sx={{ width: 32,  height: 32, p: 1 }}
        key={v} 
        size="small" 
        onClick={() => setView(v)}
        value={v}>
        {views[v]}
      </ToggleButton>))}


      {/* <ToggleButton size="small" value="code" >
        <Code />
      </ToggleButton>
      <ToggleButton size="small" value="bind">
        <AddLink />
      </ToggleButton> */}
    </ToggleButtonGroup>
  </>
  )
}
 
const def = (label) => `function transform (component, options) {
  const { getState, setState, api } = options;
  // add your code here

  return ${label};
}`

const InputContainer = ({ children, label, onScriptChange, ...props }) => {
  const { isBound, scripts, bindPropertyClicked } = props;
  const type = isBound?.boundTo?.indexOf('scripts') === 0 ? 'code' : 'bind';
  const view = isBound ? type : 'edit';

  const [ scope, scriptID ] = isBound?.boundTo?.split('.') || [];
  const isScript = scope === 'scripts';
  const code = !(isScript && scripts && scriptID) ? def(label) : scripts.find(f =>  f.ID === scriptID).code;
 

  const {  
    EditCode, 
  } = React.useContext(AppStateContext);


  const resetBinding = () => {
    !!isBound && bindPropertyClicked();
  }
  const setView = async (v) => {
    switch(v) {
      case 'edit':
        resetBinding();
        break;
      case 'code':
        !isScript && resetBinding();
        const js = await EditCode(code,  label + ' transformer');
        !!js && onScriptChange && onScriptChange (scriptID, label + '_transformer', js)
        break;
      case 'bind':
        bindPropertyClicked();
        break;
      default:
        // do nothing
    }
    
  }

 return (
   <Layout>
    <EditTip {...props}><EditGroup setView={setView} view={view} /></EditTip>
     { children }
   </Layout>
 );
}
InputContainer.defaultProps = {};
export default InputContainer;
