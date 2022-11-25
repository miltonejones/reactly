import ReactlyBox from './ReactlyBox/ReactlyBox';
import { ReactlyBoxStyles } from './ReactlyBox/ReactlyBox';
import ReactlyButton, { ReactlyButtonSettings, ReactlyButtonEvents, ReactlyButtonStyles } from './ReactlyButton/ReactlyButton';
import ReactlyTextbox, { ReactlyTextboxSettings } from './ReactlyTextbox/ReactlyTextbox';
import { ReactlyTextboxEvents } from './ReactlyTextbox/ReactlyTextbox';

export const Settings = {
  'Button': ReactlyButtonSettings,
  'Textbox': ReactlyTextboxSettings
}
 
export const Styles = {
  'Box': ReactlyBoxStyles, 
  'Button': ReactlyButtonStyles
}
 
export const Events = {
  'Button': ReactlyButtonEvents,  
  'Textbox': ReactlyTextboxEvents
}
 


const Library = {
  Box: ReactlyBox,
  Button: ReactlyButton,
  Textbox: ReactlyTextbox
}

export default Library;