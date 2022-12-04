import React from 'react';
import { Card, CardHeader, IconButton, CardMedia, Typography, CardContent, Avatar } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Icons } from '../icons';
import { iconSettings } from '../settings';
import { ContactMail , MoreVert} from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { RepeaterContext } from '../../../hooks/AppStateContext';
  
const ReactlyComponentInfoCard = ({ children, onCardClick, onMenuClick, settings = [], ...props }) => {


  const { row, index, selectedIndex, ID } = React.useContext(RepeaterContext);

  if (row) {
    Object.keys(row).map(item => {
      const binding =  row[item];
      const setting = binding.SettingName;
      const value = binding.record[item];
      settings = settings?.map(f => f.SettingName === setting ? {...f, SettingValue: value} : f)
 
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

  const titleBar = <CardHeader
        avatar={avatar}
        action={action}
        title={<Typography sx={{fontWeight}}>{label?.substr(0, 15)}</Typography>}
        subheader={subtext?.substr(0, 15)}
      />
      const header = args.below_image ? <i /> : titleBar;
      const footer = !args.below_image ? <i /> : titleBar;
 return (
  <> 
 {/* <pre> {JSON.stringify(settings,0,2)}</pre>
 <hr /> */}
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
        image={args.image}
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


const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Label',
          label: 'label' ,
          bindable: !0,
        }, 
        {
          title: 'Place label below image',
          label: 'below_image',
          type: 'boolean' ,
          when: p => p.use_image
        } ,
        {
          title: 'Subtext',
          label: 'subtext' ,
          bindable: !0,
        } ,
        {
          title: 'Card Description',
          label: 'description' ,
          bindable: !0,
          multiline: !0
        } ,

      ]
    },
    {
      name: 'Images',
      settings: [ 
      
        {
          title: 'Card Image',
          label: 'image'  ,
          bindable: !0,
          when: p => p.use_image
        } ,
        {
          title: 'Use Image',
          label: 'use_image',
          type: 'boolean' 
        } ,
        {
          title: 'Avatar Image',
          bindable: !0,
          label: 'avatar_image'  ,
          when: p => p.use_avatar
        } ,
        {
          title: 'Avatar Text',
          label: 'avatar_text' ,
          when: p => p.use_avatar
        } ,
        {
          title: 'Use Avatar',
          label: 'use_avatar',
          type: 'boolean' 
        } ,
      ]
    },
    {
      name: 'Icons',
      settings: [ 
      
        {
          title: 'Action Icon',
          label: 'action_icon',
          bindable: !0,
          ...iconSettings,
          when: p => p.use_action
        },

        {
          title: 'Use Card Action',
          label: 'use_action',
          type: 'boolean' 
        } ,
      ]
    },
  ]
}


const Events =  [
  {
    name: 'onCardClick',
    title: 'Card is clicked',
    description: 'User clicks on the card.',
    emits: ['index', 
    'ID',
      'selectedIndex']
  }, 
  {
    name: 'onMenuClick',
    title: 'Menu icon in the card is clicked',
    description: 'User clicks on the menu icon at the right of a card.'
  }, 
]



const ReactlyInfoCard = {
  Icon: ContactMail,
  Component: ReactlyComponentInfoCard,
  Settings,
  Events, 
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyInfoCard;


