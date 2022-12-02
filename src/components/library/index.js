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
import { Box } from '@mui/material';
import { East } from '@mui/icons-material';
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

const ReactlySpacer = {
  Component: () => <Box sx={{ flexGrow: 1}} />,
  Icon: East
}
 
const Library = {
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
  Snackbar: ReactlySnackbar
}

export default Library;