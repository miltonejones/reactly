import React from 'react';
import { styled, Box, Collapse } from '@mui/material';
import { Flex } from '..';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {a11yDark, atomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coyWithoutShadows, coy, 
  darcula, dark, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, gruvboxDark, 
  gruvboxLight, holiTheme, hopscotch, lucario, materialDark, materialLight, materialOceanic, nightOwl, nord, okaidia, oneDark, oneLight, 
  pojoaque, prism, shadesOfPurple, solarizedDarkAtom, solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai, zTouch} from 'react-syntax-highlighter/dist/esm/styles/prism'

const stylenames = {a11yDark, atomDark, cb, base16AteliersulphurpoolLight, coldarkCold, coldarkDark, coyWithoutShadows, coy, darcula, dark, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, gruvboxDark, gruvboxLight, holiTheme, hopscotch, lucario, materialDark, materialLight, materialOceanic, nightOwl, nord, okaidia, oneDark, oneLight, pojoaque, prism, shadesOfPurple, solarizedDarkAtom, solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai, zTouch}


 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(0)
}));
 
const CodePane = ({ code,  onCodeChange, style, css, font, externalRef, ...props }) => {
  const syntaxRef = React.useRef(null) 
  const [bs, setBS] = React.useState(code);
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const args = {
    ref: externalRef || syntaxRef
  }

  const fontSizes = {
    sm: '0.8em',
    med: '0.9em',
    lg: '1em'
  }

  const theme = stylenames[css] || coyWithoutShadows;
 return (
   <Layout data-testid="test-for-CodePane" {...args}>

{!code && (<Flex 
      sx={{ justifyContent: 'center', border: 1, borderColor: 'divider', height: args.ref.current?.offsetHeight}}>
    No code in the abode
    </Flex>)} 
 
    {!!code && ( 
        <SyntaxHighlighter 
          {...props} 
          style={theme}
          showLineNumbers={showLineNumbers} 
          contentEditable 
          language="javascript"  
          onKeyUp={e => setBS(e.target.innerText)} 
          onFocus={() =>setShowLineNumbers(false)}
          onBlur={e => {
            try {
              setShowLineNumbers(true) 
              if (!bs || code === bs) return;
              onCodeChange(''); 
              setTimeout(() => onCodeChange(bs), 9)
            } catch (e) {
              console.log(e.message)
            }
         }} 
          customStyle={{  minHeight: 400,  fontSize: fontSizes[font], ...style }}> 
         {code}
       </SyntaxHighlighter>)}



   </Layout>
 );
}
CodePane.defaultProps = {};
export default CodePane;
 