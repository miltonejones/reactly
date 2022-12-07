import ReactlyAlert from './ReactlyAlert/ReactlyAlert';
import ReactlyAppBar from './ReactlyAppBar/ReactlyAppBar';
import ReactlyAvatar from './ReactlyAvatar/ReactlyAvatar';
import ReactlyBox from './ReactlyBox/ReactlyBox'; 
import ReactlyButton from './ReactlyButton/ReactlyButton';
import ReactlyChip from './ReactlyChip/ReactlyChip';
import ReactlyCollapse from './ReactlyCollapse/ReactlyCollapse';
import ReactlyFab from './ReactlyFab/ReactlyFab';
import ReactlyIconButton from './ReactlyIconButton/ReactlyIconButton';
import ReactlyLink from './ReactlyLink/ReactlyLink';
import ReactlyList from './ReactlyList/ReactlyList';
import ReactlyPaper from './ReactlyPaper/ReactlyPaper';
import ReactlyTextbox from './ReactlyTextbox/ReactlyTextbox';  
import ReactlyTypography from './ReactlyTypography/ReactlyTypography';
import ReactlyTable from './ReactlyTable/ReactlyTable';
import ReactlyDialog from './ReactlyDialog/ReactlyDialog';
import ReactlyMenu from './ReactlyMenu/ReactlyMenu';
import ReactlyAudio from './ReactlyAudio/ReactlyAudio';
import ReactlySelect from './ReactlySelect/ReactlySelect';
import ReactlyBadge from './ReactlyBadge/ReactlyBadge';
import ReactlyCard from './ReactlyCard/ReactlyCard';
import ReactlyRepeater from './ReactlyRepeater/ReactlyRepeater';
import ReactlyInfoCard from './ReactlyInfoCard/ReactlyInfoCard';
import ReactlyCarousel from './ReactlyCarousel/ReactlyCarousel';
import ReactlyDrawer from './ReactlyDrawer/ReactlyDrawer';
import ReactlyPagination from './ReactlyPagination/ReactlyPagination';
import ReactlyLinearProgress from './ReactlyLinearProgress/ReactlyLinearProgress';
import ReactlyCircularProgress from './ReactlyCircularProgress/ReactlyCircularProgress';
import ReactlySnackbar from './ReactlySnackbar/ReactlySnackbar';
import ReactlyToggleButtonGroup from './ReactlyToggleButtonGroup/ReactlyToggleButtonGroup';
import ReactlyToggleButton from './ReactlyToggleButton/ReactlyToggleButton';
import ReactlyDivider from './ReactlyDivider/ReactlyDivider';
import ReactlyTabs from './ReactlyTabs/ReactlyTabs';
import ReactlyTab from './ReactlyTab/ReactlyTab';
import ReactlyPopover from './ReactlyPopover/ReactlyPopover';
import ReactlySlider from './ReactlySlider/ReactlySlider';
import ReactlyImage from './ReactlyImage/ReactlyImage';
import ReactlyScrollCouple from './ReactlyScrollCouple/ReactlyScrollCouple';
import { Box } from '@mui/material';
import { East } from '@mui/icons-material';
import { reduceLibrary } from './library';
import { expandLibrary } from './library';
import { expandComponent } from './library';
import config from './library.json'
import ReactlyFieldset from './ReactlyFieldset/ReactlyFieldset';

const ReactlySpacer = {
  Component: () => <Box sx={{ flexGrow: 1}} />,
  Icon: East
}
 
const ComponentList = {
  Box: ReactlyBox,
  Button: ReactlyButton,
  Textbox: ReactlyTextbox,
  Avatar: ReactlyAvatar,
  Alert: ReactlyAlert,
  Typography: ReactlyTypography,
  Paper: ReactlyPaper,
  IconButton: ReactlyIconButton,
  Link: ReactlyLink,
  Fab: ReactlyFab,
  Chip: ReactlyChip,
  AppBar: ReactlyAppBar,
  Collapse: ReactlyCollapse,
  List: ReactlyList,
  Spacer: ReactlySpacer,
  DataGrid: ReactlyTable,
  Dialog: ReactlyDialog,
  Menu: ReactlyMenu,
  AudioPlayer: ReactlyAudio,
  Select: ReactlySelect,
  Badge: ReactlyBadge,
  Card: ReactlyCard,
  Repeater: ReactlyRepeater,
  InfoCard: ReactlyInfoCard,
  Carousel: ReactlyCarousel,
  Drawer: ReactlyDrawer,
  Pagination: ReactlyPagination,
  LinearProgress: ReactlyLinearProgress,
  CircularProgress: ReactlyCircularProgress,
  Snackbar: ReactlySnackbar,
  ToggleButtons: ReactlyToggleButtonGroup,
  ToggleButton: ReactlyToggleButton,
  Divider: ReactlyDivider,
  Tabs: ReactlyTabs,
  Tab: ReactlyTab,
  Popover: ReactlyPopover,
  Slider: ReactlySlider,
  Image: ReactlyImage,
  ScrollCouple: ReactlyScrollCouple,
  Fieldset: ReactlyFieldset
}

export {
  expandLibrary ,
  config
}

// const Library = expandLibrary(ComponentList); 


export default ComponentList;