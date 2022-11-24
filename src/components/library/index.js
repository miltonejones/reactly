import ReactlyBox from './ReactlyBox/ReactlyBox';
import { ReactlyBoxStyles } from './ReactlyBox/ReactlyBox';
import ReactlyButton, { ReactlyButtonSettings } from './ReactlyButton/ReactlyButton';
import ReactlyTextbox, { ReactlyTextboxSettings } from './ReactlyTextbox/ReactlyTextbox';

export const Settings = {
  'Button': ReactlyButtonSettings,
  'Textbox': ReactlyTextboxSettings
}
 
export const Styles = {
  'Box': ReactlyBoxStyles, 
}
 


const Library = {
  Box: ReactlyBox,
  Button: ReactlyButton,
  Textbox: ReactlyTextbox
}

export default Library;