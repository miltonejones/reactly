import React from 'react';
import { Card, CardHeader, IconButton, CardMedia, Typography, CardContent, Avatar } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Icons } from '../icons';
import { iconSettings } from '../settings';
import { ContactMail , MoreVert} from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { RepeaterContext } from '../../../hooks/AppStateContext';
  
const DEFAULT_IMAGE = 'https://www.sky-tunes.com/assets/default_album_cover.jpg';


export const useImageLoader = (src, defaultImage) => {
  const [image, setImage] = React.useState(defaultImage || DEFAULT_IMAGE);

  React.useEffect(() => {
    if (src) {
      const im = new Image()
      im.onload = () => {
        setImage(src);
      }
      im.src = src;
    }
  }, [image, src]);

  return { image }
}

const ReactlyComponentInfoCard = ({ children, onCardClick, onMenuClick, settings = [], ...props }) => {


  const { row, index, selectedIndex, ID } = React.useContext(RepeaterContext);

  if (row) {
    Object.keys(row).map(item => {
      const binding =  row[item];
      const setting = binding.SettingName;
      const value = binding.record[item];
      settings = settings?.find(f => f.SettingName === setting)
        ? settings?.map(f => f.SettingName === setting ? {...f, SettingValue: value} : f)
        : settings.concat( {SettingName: setting,SettingValue: value } )
    }) 
  }

 
  const args = getSettings(settings);

  const Icon = Icons[args.action_icon];
  
  const avatar = !!args.avatar_image || args.avatar_text 
  ? <Avatar src={args.avatar_image} alt={args.label}>
    {args.avatar_text}
  </Avatar> : null
  const action = !!Icon
      ? <IconButton onClick={e => onMenuClick && onMenuClick(e)}>
      <Icon />
    </IconButton> : null

  const label = props.label || args.label;
  const subtext = args.subtext
  const on = index?.toString() === selectedIndex?.toString()
  const fontWeight = on ? 600 : 400

  const { image } = useImageLoader(args.image, args.defaultImage)

  const titleBar = <CardHeader
        avatar={avatar}
        action={action}
        title={<Typography sx={{fontWeight}}>{typeof label !== 'string' ? `"object"` : label?.substr(0, 15)}</Typography>}
        subheader={typeof subtext !== 'string' ? JSON.stringify(subtext) : subtext?.substr(0, 15)}
      />
      const header = args.below_image ? <i /> : titleBar;
      const footer = !args.below_image ? <i /> : titleBar;
 return (
  <> 
 
  <ReactlyComponent elevation={on ? 8 : 1} component={Card} {...props} >
    
{header} 

     {(!!args.image || args.use_image) && <CardMedia 
      onClick={e => {
        onCardClick && onCardClick(e, {
          ...row,
          index, 
          selectedIndex,
          ID
        })
      }}
        component="img"
        height="194"
        image={image}
        alt={args.label}
      />}


      {footer}

      {!!args.description && <CardContent>
        <Typography variant="body2" color="text.secondary">
          {args.description} 
        </Typography>
      </CardContent> }
   </ReactlyComponent>
  </>
 );
}
 


const ReactlyInfoCard = { 
  Component: ReactlyComponentInfoCard, 
}
 

export default ReactlyInfoCard;


