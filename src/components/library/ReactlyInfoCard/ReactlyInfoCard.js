import React from 'react';
import { Card, CardHeader, IconButton, CardMedia, Typography, CardContent, Avatar } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Icons } from '../icons';
import { iconSettings } from '../settings';
import { ContactMail , MoreVert} from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { RepeaterContext } from '../../../context';
import { useRepeater } from '../../../hooks/useRepeater';
import { truncate } from '../ReactlyTable/ReactlyTable';
  
const DEFAULT_IMAGE = 'https://www.sky-tunes.com/assets/default_album_cover.jpg';


export const useImageLoader = (src, defaultImage) => {
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    if (src) {
      const im = new Image()
      im.onload = () => {
        setImage(src);
      }
      im.onerror = () => {
        setImage(defaultImage || DEFAULT_IMAGE)
      }
      im.src = src;
    }
  }, [image, src, defaultImage, DEFAULT_IMAGE]);

  return { image }
}

const ReactlyComponentInfoCard = (props) => {
  const { children, onCardClick, onMenuClick, settings = []} = props;
 
  const { repeaterProps, ...repeater } = useRepeater(props);
  const { index, selectedIndex } = repeaterProps;

  const args = getSettings(repeater.settings || settings);
   const { image } = useImageLoader(args.image, args.defaultImage)
  // const { image: photo } = args;
  // const [image, setImage] = React.useState(photo)


  const selected = repeater.selectionCompare(selectedIndex, index)

  const Icon = Icons[args.action_icon];
  
  const avatar = !!args.avatar_image || args.avatar_text 
  ? <Avatar src={args.avatar_image} alt={args.label}>
    {args.avatar_text}
  </Avatar> : null;

  const action = !!Icon
      ? <IconButton onClick={e => onMenuClick && onMenuClick(e)}>
      <Icon />
    </IconButton> : null;

  const label = props.label || args.label;
  const subtext = args.subtext
  const fontWeight = selected ? 600 : 400
  const maxWidth = '100%';
  const overflow = 'hidden'

  const titleBar = <CardHeader
        avatar={avatar}
        action={action}
        sx={{overflow, maxWidth}}
        title={<Typography sx={{fontWeight, overflow, maxWidth}}> 
          {typeof label !== 'string' ? `"object"` : truncate(label, args.truncate)}</Typography>}
        subheader={typeof subtext === 'object' ? JSON.stringify(subtext) : truncate(subtext, args.truncate)}
      />
      const header = args.below_image ? <i /> : titleBar;
      const footer = !args.below_image ? <i /> : titleBar;
 return (
  <> 
 
  <ReactlyComponent elevation={selected ? 8 : 1} component={Card} {...props} >
    
{header} 

     {(!!args.image || args.use_image) && <CardMedia 
      onClick={e => {
        onCardClick && onCardClick(e, repeaterProps)
      }}
        component="img"
        height={args.image_height || 200}
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


