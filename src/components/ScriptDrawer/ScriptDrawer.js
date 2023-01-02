import React from "react";
import Highlight from "react-highlight";
import {
  styled,
  FormControlLabel,
  Box,
  IconButton,
  Drawer,
  TextField,
  Collapse,
  Divider,
  Typography,
  Stack,
  Grid,
  Card,
  Tabs,
  Switch,
  Alert,
  Pagination,
} from "@mui/material";
import {
  CodePane,
  DeleteConfirmMenu,
  Flex,
  useClipboard,
  Spacer,
  TextBtn,
  Tiny,
  TinyButton,
  Text,
  TextInput,
  TextBox,
  TabButton,
  QuickMenu,
  SearchBox,
  PillMenu,
  PopoverPrompt
} from "..";
import {
  CopyAll,
  Close,
  Settings,
  Gamepad,
  Edit,
  CloseFullscreen,
  OpenInFull,
  Add,
  ExpandMore,
  NodeAdd,
  Remove,
  AutoStories,
  MoreVert,
  CreateNewFolder,
  Help,
  RecentActors,
  Code,
  Delete,
  Save,
} from "@mui/icons-material";
import { PopoverInput } from "../Control/Control";
import { AppStateContext, EditorStateContext } from "../../hooks/AppStateContext";
import { useReactly } from '../../hooks';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ScriptLine, RefsMenu, Bar } from "./components";
import { CodeTabs } from "./components";
import { ScriptTree } from "./components";
import { useRunScript } from "../../hooks/subhook/useRunScript";
import { definitionMenu } from "./definitions";
import ScriptAssist from "./components/ScriptAssist/ScriptAssist";
import { downloadApplicationScripts } from "../../connector/sqlConnector";
import { DrawerNavigation } from "../pages/Editor/components";

const Layout = styled(Box)(({ theme, big }) => ({
  padding: theme.spacing(2),
  minHeight: big ? "90vh" : "40vh",
  transition: "all 0.2s linear",
}));

const SearchItem = styled(Box)(({ theme, active }) => ({
  cursor: "pointer",
  padding: theme.spacing(1),
  color: active ? "white" : "#222",
  backgroundColor: active ? theme.palette.primary.main : "white",
  borderRadius: 5,
  marginRight: theme.spacing(1),
  "&:hover": {
    color: active ? "cyan" : theme.palette.primary.main,
    "& .hover": {
      textDecoration: "underline",
    },
  },
}));

const SearchLine = ({ children, active, filter, onClick }) => {
  if (!(children && typeof children === "string")) {
    return <i />;
  }
  const [first, last] = children.split(filter);
  const prefix = first?.substr(first.length - 40);
  const suffix = last?.substr(0, 40);

  return (
    <code onClick={onClick} style={{ letterSpacing: 0.1, fontSize: "0.9rem" }}>
      ...{prefix}
      <b style={{ color: active ? "lime" : "red" }}>{filter}</b>
      {suffix}...
    </code>
  );
};

const ScriptDrawer = ( ) => {
 

  const { scriptOpen: open, setDrawerState} = React.useContext(EditorStateContext);
  const handleSwitch = state => setDrawerState(s => ({ ...s, ...state}));
  const handleClose = () =>  setDrawerState((s) => ({ ...s, scriptOpen: false }));

  const reactly = useReactly();
  const handleChange = (scriptID, name, code, fn, existingName, pageID) => {
    reactly.onScriptChange(scriptID, name, code, { fn, existingName, pageID });
  };

  const createScriptFolder = (scriptID, name, parentID) => {
    reactly.onScriptChange(scriptID, name, null, { parentID });
  };

  const addScriptComment = (script, comment) => {
    const { ID, name, code, parentID } = script;
    reactly.onScriptChange(ID, name, code, { parentID, comment });
  }

  const saveScriptToFolder = (scriptID, name, code, parentID, pageID) => {
    reactly.onScriptChange(scriptID, name, code, { pageID, parentID });

    // save updated code to tabs array
    setSelected({
      ID: scriptID,
      name,
      code,
      parentID,
    });
  };

  const { copy } = useClipboard();
  const ref = React.useRef(null);
  const [css, setCss] = React.useState(localStorage.getItem("js-theme"));
  const [font, setFont] = React.useState(
    localStorage.getItem("js-font") || "med"
  );
  const [showSettings, setShowSettings] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [assist, setAssist] = React.useState("");
  const [expanded, setExpanded] = React.useState({});
  const [selected, commitSelected] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);
  const [big, setBig] = React.useState(false);
  const [error, setError] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { ID, name, code, parentID } = selected;
  const [openScripts, setOpenScripts] = React.useState({});
  const { getApplicationScripts } = useRunScript();

  const onSelected = (object) => {
    if (typeof object === "function") {
      return commitSelected(object);
    }
    if (object.ID) {
      setOpenScripts((scripts) => ({
        ...scripts,
        [object.ID]: object,
      }));
    }
    commitSelected(object);
  };

  const setSelected = (object) => {
    commitSelected({ code: "" });
    setTimeout(() => {
      onSelected(object);
    }, 9);
  };

  const closeTab = (tabID) => {
    setOpenScripts((scripts) => {
      delete scripts[tabID];
      const keys = Object.keys(scripts);
      if (!!keys.length) {
        selected.ID === tabID && commitSelected(scripts[keys[0]]);
      } else {
        commitSelected({ code: "" });
      }
      return scripts;
    });
  };

  const { 
    appContext,
    EditCode,
    Alert: Shout, 
    selectedPage,
  } = React.useContext(AppStateContext);
  const { scripts = [] } = (selectedPage || appContext) ?? { scripts: [] };

  const [availableScripts, setAvailableScripts] = React.useState([])
  React.useEffect(() =>{
    (async() => {
       
      const scripts = await downloadApplicationScripts(appContext.ID);
      setAvailableScripts(scripts);

      // downloadApplicationScripts
    })();
  }, [appContext])

  const setCode = (text) => {
    try {
      eval(text);
      setError("");
    } catch (ex) {
      setError(ex.message);
    }
    setSelected({ ...selected, code: text });
  };

  const handleAliasOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAliasClose = (event) => {
    setAnchorEl(null);
  };

  const handleDrawerClose = (event) => {
    // setSelected({ code: "" });
    // setDirty(false);
    handleClose(event);
  };

  const scriptInsert = (data) => {
    if (!data) return;
    const menuItem = definitionMenu.find(item => item.label === data);
    // alert(menuItem.description)
    Shout(<ScriptAssist {...menuItem} />)
    // const target = ref.current;
    // setAssist("");
    // if (!target) return alert("Nope!");
    // setTimeout(() => {
    //   if (target.setRangeText) {
    //     //if setRangeText function is supported by current browser
    //     target.setRangeText(data);
    //   } else {
    //     target.focus();
    //     document.execCommand("insertText", false /*no UI*/, data);
    //   }
    // }, 1299);
  };

  const editJS = async (js, pageID) => {
    const script = await EditCode(js.code, js.name, true);
    if (!script) return;
    if (script === -1) {
      return setSelected(js);
    }

    return handleChange(
      js.ID,
      js.name,
      script,
      (res) => alert(js.name + " was saved!"),
      js.name,
      pageID
    );
  };

  const spaces = (s) =>
    s.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");

  const scriptList = getApplicationScripts();

  const appScripts = selectedPage?.PageName
    ? [
        {
          name: <b>Application</b>,
        },
      ].concat(
        scriptList
          .filter((script) => script.page === "application")
          .map((script) => ({
            ...script,
            action: () => editJS(script),
          }))
      )
    : [];

  const scriptMenu = appScripts.concat(
    appContext.pages
      ?.filter((f) => f.ID !== selectedPage?.ID)
      .reduce((items, page) => {
        !!page.scripts?.length &&
          items.push({
            name: <b>{page.PageName}</b>,
          });
        page.scripts?.map((js) => {
          items.push({
            ...js,
            action: () => editJS(js, page.ID), // handleChange (null, null, js.code, res => setSelected(res), js.name)
          });
        });
        return items;
      }, [])
  );

  const api = [
    "getRef",
    "getRefByName",
    "openLink",
    "openPath", 
    "pageResourceState",
    "Alert",
    "getResourceByName",
    "execResourceByName",
    "executeScriptByName",
    "execRefByName",
    "moment",
  ];

  const folderList = [];// scripts.filter((f) => !f.code);
  const filtered = scriptList
    .filter((f) => !!f.code)
    .filter(
      (f) =>
        f.code.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        f.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    );

  const toptLevel = scripts?.filter((f) => !f.code && !f.parentID);

  return (
    <Drawer open={open} anchor="bottom">
      <Layout big={big}>
        <Flex>
          <Typography variant="subtitle1">
            <b>{selectedPage?.PageName || "Application"} scripts</b>
          </Typography>

          <TextBtn onClick={handleAliasOpen} endIcon={<Add />}>
            Add
          </TextBtn>

         {!!availableScripts?.length && <QuickMenu
            title="Open script"
            options={availableScripts?.map((m) => !m.name ? <b>{m.label}</b> : m.label)}
            label={<TextBtn endIcon={<MoreVert />}>Open</TextBtn>}
            onChange={(val) => {
              alert (val);
              // const { action } = scriptMenu.find((f) => f.name === val);
              // !!action && action();
            }}
          />}

          <Box sx={{ mb: 1 }}>
            <TextInput
              buttons={
                !filter ? null : <TinyButton icon={Close} onClick={() => setFilter('')} />
              } 
              size="small"
              label="Search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Box>

          {!!selected.ID && !!selectedPage?.PageName && (
            <TextBtn
              sx={{ mb: 1 }}
              variant="contained"
              color="warning"
              onClick={async () => {
                const ok = await reactly.onScriptPromote(ID);
                // if (!ok) return;
                setSelected({ code: "" });
                setDirty(false);
              }}
            >
              promote "{name}"
            </TextBtn>
          )}

          <Spacer />

          <DrawerNavigation selected="scriptOpen" onClose={handleDrawerClose} horizontal /> 
       
        </Flex>
        <Divider />

        <Grid container spacing={1}>
          {!filter && (
            <Grid item xs={big ? 3 : 6} sx={{ pt: 0, pl: 0, pr: 1 }}>
              <Typography variant="caption">
                <b>Available scripts</b>
              </Typography>

              <Divider sx={{ mb: 1 }} />

             <Box
                sx={{
                  height: big ? "calc(90vh - 132px)" : 400,
                  mr: 1,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}>
             <ScriptTree
                expanded={expanded}
                setExpanded={setExpanded}
                scripts={scripts}
                createScriptFolder={createScriptFolder}
                big={big}
                activeID={ID}
                dirty={dirty}
                onFolderMove={saveScriptToFolder}
                onScriptComment={addScriptComment}
                setDirty={setDirty}
                folderList={folderList}
                setSelected={setSelected}
                handleChange={handleChange}
                handleDrop={reactly.onDropScript}
              />

             </Box>
            </Grid>
          )}

          {!!filter && (
            <Grid item xs={big ? 3 : 6}>
              <Typography variant="caption">
                <b>
                  {filtered.length} Scripts matching "{filter}"
                </b>
              </Typography>

              <Divider sx={{ mb: 1 }} />

              <Box
                sx={{
                  height: big ? 800 : 400,
                  mr: 1,
                  overflow: "auto",
                }}
              >
                {filtered.map((item) => (
                  <SearchItem
                    active={item.ID === ID}
                  
                  >
                   <Flex>
                    <RefsMenu title={item.name} ID={item.ID} onSelect={setSelected}/>
                    <Text  onClick={() => setSelected(item)} className="hover" small>
                      <b>{item.page}</b>.{item.name}
                    </Text>
                   </Flex>
                   <Flex sx={{ml: 3}}>
              
                    <Text fullWidth small muted={item.ID !== ID}>{item.comment}</Text>
                   </Flex>
                    <SearchLine  onClick={() => setSelected(item)}  active={item.ID === ID} filter={filter}>
                      {item.code}
                    </SearchLine>
                  </SearchItem>
                ))}
              </Box>
            </Grid>
          )}

          <Grid item xs={big ? 9 : 6} >
            <CodeTabs
              openScripts={openScripts}
              closeTab={closeTab}
              setSelected={setSelected}
              selectedID={selected.ID}
            />

            <Box sx={{ position: "relative" }}>
              <CodePane
                onMouseDown={(e) => {
                  !!assist && scriptInsert(assist);
                }}
                font={font}
                css={css}
                externalRef={ref}
                onCodeChange={(value) => {
                  setCode(value);
                  setDirty(true);
                }}
                className={["javascript", big ? "big" : ""].join(" ")}
                code={code}
              ></CodePane>
            </Box>

            <Flex nowrap>
              {!!error && <Alert severity="error">{error}</Alert>}

              <QuickMenu
                options={definitionMenu.map(d => d.label)}
                onChange={scriptInsert}
                value={assist}
                label={
                  <TextBtn endIcon={<Help />}>{assist || "methods"}</TextBtn>
                }
              />

              <TinyButton icon={CopyAll} onClick={() => copy(name)} />

              <TinyButton
                icon={Settings}
                deg={showSettings ? 0 : 360}
                onClick={() => setShowSettings(!showSettings)}
              />

              <Collapse in={showSettings} orientation="horizontal">
                <Flex nowrap>
                  <Text active small>
                    Theme
                  </Text>
                  {/* theme menu  */}
                  <QuickMenu
                    caret
                    options={styleNames}
                    small
                    label={<u>{spaces(css ? `${css}` : "Choose")}</u>}
                    value={css}
                    onChange={(e) =>
                      !!e &&
                      (() => {
                        setCss(e);
                        localStorage.setItem("js-theme", e);
                      })()
                    }
                  />

                  {/* font size menu  */}
                  <Text active small>
                    Font size
                  </Text>
                  <PillMenu
                    options={["sm", "med", "lg"]}
                    value={font}
                    onChange={(e) => {
                      setFont(e);
                      localStorage.setItem("js-font", e);
                    }}
                  />
                </Flex>
              </Collapse>

              <Spacer />

              <TextBtn
                onClick={() => {
                  setSelected({ code: "" });
                }}
              >
                cancel
              </TextBtn>

              <TextBtn
                onClick={() => {
                  setDirty(false);
                  saveScriptToFolder(ID, name, code, parentID, selected.pageID);
                }}
                endIcon={<Save />}
                variant="contained"
                disabled={!selected.code || !dirty || error}
              >
                save script
              </TextBtn>
              <IconButton
                onClick={() => {
                  setBig(!big);
                }}
              >
                {big ? <CloseFullscreen /> : <OpenInFull />}
              </IconButton>
            </Flex>
          </Grid>
        </Grid>

        {/* {JSON.stringify(scripts)} */}
      </Layout>

      <PopoverInput
        label="Add a client script"
        onChange={(scriptName) => {
          if (!scriptName) return handleAliasClose();
          const scr = `function ${camelize(scriptName)} (page, options) {
  const { state, setState } = options; 
  // add your code here
}
`;
          handleChange && handleChange(null, scriptName, scr);
          handleAliasClose();
        }}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </Drawer>
  );
};

ScriptDrawer.defaultProps = {};
export default ScriptDrawer;

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

const styleNames = [
  "a11yDark",
  "atomDark",
  "base16Ateliersulphurpoollight",
  "cb",
  "coldarkCold",
  "coldarkDark",
  "coyWithoutShadows",
  "coy",
  "darcula",
  "dark",
  "dracula",
  "duotoneDark",
  "duotoneEarth",
  "duotoneForest",
  "duotoneLight",
  "duotoneSea",
  "duotoneSpace",
  "funky",
  "ghcolors",
  "gruvboxDark",
  "gruvboxLight",
  "holiTheme",
  "hopscotch",
  "lucario",
  "materialDark",
  "materialLight",
  "materialOceanic",
  "nightOwl",
  "nord",
  "okaidia",
  "oneDark",
  "oneLight",
  "pojoaque",
  "prism",
  "shadesOfPurple",
  "solarizedDarkAtom",
  "solarizedlight",
  "synthwave84",
  "tomorrow",
  "twilight",
  "vs",
  "vscDarkPlus",
  "xonokai",
  "zTouch",
];
