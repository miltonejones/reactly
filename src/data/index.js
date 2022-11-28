export const AppData = [
  {
    "Name": "Demo Application",
    "path": "demo-application",
    "ID": 1,
    "pages": [
      {
        "ID": 1,
        "PageName": "Home Page",
        "PagePath": "home-page",
        "components": [
          {
            "ID": 11,
            "ComponentType": "Box",
            "ComponentName": "Box 1",
            "children": true,
            "order": 100,
            "events": [],
            "styles": [
              {
                "Key": "display",
                "Value": "grid"
              },
              {
                "Key": "gap",
                "Value": 8
              },
              {
                "Key": "padding",
                "Value": "Lg/1"
              },
              {
                "Key": "margin",
                "Value": 8
              },
              {
                "Key": "align-items",
                "Value": "center"
              },
              {
                "Key": "flex-wrap",
                "Value": true
              },
              {
                "Key": "grid-template-columns",
                "Value": "4"
              },
              {
                "Key": "grid-template-rows",
                "Value": "2"
              },
              {
                "Key": "justify-items",
                "Value": "center"
              },
              {
                "Key": "border-width",
                "Value": "Xxs/0.125"
              },
              {
                "Key": "border-style",
                "Value": "dotted"
              },
              {
                "Key": "border-color",
                "Value": "{\"name\":\"Primary 1\",\"value\":\"rgb(79,82,189)\"}"
              },
              {
                "Key": "border-radius",
                "Value": "Sm/0.5"
              }
            ]
          },
          {
            "ComponentType": "Button",
            "ComponentName": "another name??",
            "order": 200,
            "ID": 14,
            "componentID": 11,
            "events": [
              {
                "ID": 1,
                "event": "onClick",
                "action": {
                  "type": "setState",
                  "target": "search_state",
                  "value": false
                }
              },
              {
                "event": "onClick",
                "action": {
                  "type": "openLink",
                  "target": 2
                },
                "ID": 2
              }
            ],
            "styles": [
              {
                "Key": "text-transform",
                "Value": "capitalize"
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Button!"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              }
            ]
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox 1",
            "componentID": null,
            "order": 300,
            "ID": 15,
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "value",
                "SettingValue": "Textbox"
              },
              {
                "SettingName": "label",
                "SettingValue": "Enter Text"
              },
              {
                "SettingName": "placeholder",
                "SettingValue": "Placeholder Text"
              },
              {
                "SettingName": "bound",
                "SettingValue": "value"
              },
              {
                "SettingName": "target",
                "SettingValue": "search_type"
              },
              {
                "SettingName": "icon",
                "SettingValue": "Bolt"
              },
              {
                "SettingName": "disabled",
                "SettingValue": false
              }
            ]
          },
          {
            "ComponentType": "Button",
            "ComponentName": "another button",
            "componentID": 11,
            "children": false,
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Sm/0.5"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "term": "search_type"
                  }
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Button"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              },
              {
                "SettingName": "icon",
                "SettingValue": "Abc"
              },
              {
                "SettingName": "end",
                "SettingValue": "AccessibilityNew"
              },
              {
                "SettingName": "bound",
                "SettingValue": "label"
              },
              {
                "SettingName": "target",
                "SettingValue": "search_state"
              },
              {
                "SettingName": "disabled",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 16,
            "order": 250
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "av",
            "children": false,
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Xl/1.5"
              },
              {
                "Key": "width",
                "Value": "66px"
              },
              {
                "Key": "height",
                "Value": "66px"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "children",
                "SettingValue": "MJ?"
              },
              {
                "SettingName": "variant",
                "SettingValue": "circular"
              },
              {
                "SettingName": "color",
                "SettingValue": "error"
              },
              {
                "SettingName": "src",
                "SettingValue": "https://cdndoe.xyz/files/upload/127597_1592473062.jpg"
              },
              {
                "SettingName": "size",
                "SettingValue": "large"
              },
              {
                "SettingName": "sizes",
                "SettingValue": "large"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 17,
            "order": 400,
            "componentID": 11
          },
          {
            "ComponentType": "Paper",
            "ComponentName": "paper1!",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Lg/1"
              },
              {
                "Key": "padding",
                "Value": "Sm/0.5"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "something goes here"
              },
              {
                "SettingName": "variant",
                "SettingValue": "elevation"
              },
              {
                "SettingName": "elevation",
                "SettingValue": 3
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 22,
            "order": 800
          },
          {
            "ComponentType": "Button",
            "ComponentName": "bb",
            "componentID": 11,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "setState",
                  "target": "collapsed",
                  "value": false
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Button"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 23,
            "order": 900
          },
          {
            "ComponentType": "Link",
            "ComponentName": "sdfsf",
            "componentID": 11,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Link"
              },
              {
                "SettingName": "underline",
                "SettingValue": "hover"
              },
              {
                "SettingName": "children",
                "SettingValue": "my link"
              },
              {
                "SettingName": "href",
                "SettingValue": "http://google.com"
              },
              {
                "SettingName": "variant",
                "SettingValue": "button"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 25,
            "order": 1100
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "fff",
            "componentID": 11,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "children",
                "SettingValue": "MJ"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 26,
            "order": 150
          },
          {
            "ComponentType": "Fab",
            "ComponentName": "fab",
            "componentID": 11,
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Lg/1"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "icon",
                "SettingValue": "AccessibilityNew"
              },
              {
                "SettingName": "color",
                "SettingValue": "info"
              },
              {
                "SettingName": "variant",
                "SettingValue": "circular"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 27,
            "order": 1200
          },
          {
            "ComponentType": "Chip",
            "ComponentName": "collapse trigger",
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Md/0.75"
              },
              {
                "Key": "padding",
                "Value": "Sm/0.5"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "setState",
                  "target": "collapsed",
                  "value": "toggle"
                },
                "ID": 1
              },
              {
                "event": "onClick",
                "action": {
                  "type": "scriptRun",
                  "target": 5
                },
                "ID": 3
              },
              {
                "event": "onDelete",
                "action": {
                  "type": "setState",
                  "target": "search_state",
                  "value": "toggle"
                },
                "ID": 4
              }
            ],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "Click to expand the collapse"
              },
              {
                "SettingName": "icon",
                "SettingValue": "AdUnits"
              },
              {
                "SettingName": "deleteIcon",
                "SettingValue": "AddHome"
              },
              {
                "SettingName": "variant",
                "SettingValue": "filled"
              },
              {
                "SettingName": "color",
                "SettingValue": "error"
              },
              {
                "SettingName": "size",
                "SettingValue": "medium"
              },
              {
                "SettingName": "disabled",
                "SettingValue": false
              },
              {
                "SettingName": "clickable",
                "SettingValue": true
              },
              {
                "SettingName": "bound",
                "SettingValue": "icon"
              },
              {
                "SettingName": "target",
                "SettingValue": "icon_name"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 28,
            "order": 1300,
            "componentID": 22
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "dsf",
            "componentID": 29,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "children",
                "SettingValue": "MJ"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 30,
            "order": 1400
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "v",
            "componentID": 31,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "children",
                "SettingValue": "MJ"
              },
              {
                "SettingName": "src",
                "SettingValue": "https://cdndoe.xyz/files/upload/127597_1592473062.jpg"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 33,
            "order": 1600
          },
          {
            "ComponentType": "Box",
            "ComponentName": "header",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 34,
            "order": 87
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "welcome",
            "componentID": 34,
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Sm/0.5"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Typography text"
              },
              {
                "SettingName": "variant",
                "SettingValue": "h4"
              },
              {
                "SettingName": "children",
                "SettingValue": "Welcome to the application!"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 35,
            "order": 1700
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "collapse",
            "componentID": 22,
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "in",
                "SettingValue": false
              },
              {
                "SettingName": "bound",
                "SettingValue": "in"
              },
              {
                "SettingName": "target",
                "SettingValue": "collapsed"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 36,
            "order": 1050
          },
          {
            "ComponentType": "List",
            "ComponentName": "li",
            "state": [],
            "styles": [
              {
                "Key": "width",
                "Value": "400px"
              }
            ],
            "events": [
              {
                "event": "onItemClick",
                "action": {
                  "type": "scriptRun",
                  "target": 6
                },
                "ID": 2
              },
              {
                "event": "onSecondaryClick",
                "action": {
                  "type": "scriptRun",
                  "target": 7
                },
                "ID": 3
              }
            ],
            "settings": [
              {
                "SettingName": "dense",
                "SettingValue": true
              },
              {
                "SettingName": "disablePadding",
                "SettingValue": false
              },
              {
                "SettingName": "items",
                "SettingValue": "[{\"ID\":2,\"text\":\"the matrix\",\"startIcon\":\"AccessTime\",\"endIcon\":\"AddCard\",\"subtext\":\"what is the matrix??\"},{\"ID\":6,\"text\":\"star trek\",\"startIcon\":\"Star\",\"endIcon\":null,\"subtext\":\"the motion picture\"},{\"ID\":7,\"text\":\"modern warfare\",\"startIcon\":\"LocalFireDepartment\",\"endIcon\":null,\"subtext\":\"a next level game\"},{\"ID\":8,\"text\":\"demo item I am adding\",\"startIcon\":\"BookmarkBorder\",\"endIcon\":null,\"subtext\":\"just to see if it works\"}]"
              },
              {
                "SettingName": "heading",
                "SettingValue": "This is  my list"
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":1,\"bindings\":{\"text\":\"trackName\",\"subtext\":\"artistName\"}}"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 38,
            "order": 450,
            "componentID": 36
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "desc",
            "componentID": 22,
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Sm/0.5"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Typography text"
              },
              {
                "SettingName": "variant",
                "SettingValue": "subtitle2"
              },
              {
                "SettingName": "children",
                "SettingValue": "Simple collapse demo"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 39,
            "order": 1025
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "app",
            "componentID": 31,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Typography text"
              },
              {
                "SettingName": "variant",
                "SettingValue": "h6"
              },
              {
                "SettingName": "children",
                "SettingValue": "My first application"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 40,
            "order": 1800
          },
          {
            "ComponentType": "DataGrid",
            "ComponentName": "grid",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onCellClick",
                "action": {
                  "type": "scriptRun",
                  "target": 8
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":1,\"bindings\":{\"artistName\":\"Artist Name\",\"trackName\":\"Track Name\",\"artworkUrl100\":\"Image\",\"trackPrice\":\"Price\",\"trackNumber\":\"Track No\"}}"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 41,
            "order": 94,
            "componentID": null
          },
          {
            "ComponentType": "Box",
            "ComponentName": "listbox",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 42,
            "order": 150
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-4",
            "componentID": null,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Button"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 43,
            "order": 1900
          },
          {
            "ComponentType": "IconButton",
            "ComponentName": "IconButton-1",
            "componentID": null,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 44,
            "order": 2000
          },
          {
            "ComponentType": "Alert",
            "ComponentName": "Alert-2",
            "componentID": null,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "severity",
                "SettingValue": "info"
              },
              {
                "SettingName": "children",
                "SettingValue": "This will be your alert text"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 45,
            "order": 2100
          },
          {
            "ComponentType": "Box",
            "ComponentName": "searr",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "display",
                "Value": "flex"
              },
              {
                "Key": "align-items",
                "Value": "center"
              },
              {
                "Key": "gap",
                "Value": "8px"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 48,
            "order": 91
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "searcm",
            "componentID": 48,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "Enter some text"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "value",
                "SettingValue": "Textbox component"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "bound",
                "SettingValue": "value"
              },
              {
                "SettingName": "target",
                "SettingValue": "search_type"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 49,
            "order": 2400
          },
          {
            "ComponentType": "Button",
            "ComponentName": "ygj",
            "componentID": 48,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "term": "search_type"
                  }
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Button"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 50,
            "order": 2500
          }
        ],
        "state": [
          {
            "ID": 1,
            "Key": "search_param"
          },
          {
            "Key": "search_type",
            "Value": "song",
            "ID": 2
          },
          {
            "ID": 3,
            "Type": "boolean",
            "Key": "search_state",
            "Value": true
          },
          {
            "Key": "collapsed",
            "Value": true,
            "Type": "boolean",
            "ID": 4
          },
          {
            "Key": "icon_name",
            "Value": "ExpandMore",
            "ID": 5
          }
        ],
        "scripts": [
          {
            "name": "collapse control",
            "code": "function runscript(page, options) {\n  const { state, setState } = options; \n  setState(s => ({...s, icon_name: state.collapsed\n             ? \"ExpandLess\"\n             : \"ExpandMore\" }))\n}",
            "ID": 5
          },
          {
            "name": "list item test",
            "code": "function listItemTest (page, options) {\n  const { state, setState, data } = options;   \n  setState(s => ({...s, search_type: data.text}))\n}\n",
            "ID": 6
          },
          {
            "name": "secondary click test",
            "code": "function secondaryClickTest (page, options) {\n  const { state, setState } = options; \n  alert ('Icon click!!')\n}\n",
            "ID": 7
          },
          {
            "name": "Table click test",
            "code": "function tableClickTest (page, options) {\n  const { state, setState, data } = options; \n \nsetState(e => ({...e, search_type: data['Artist Name']}))\n \n}\n",
            "ID": 8
          }
        ],
        "data": []
      },
      {
        "PageName": "Album List",
        "PagePath": "album-list",
        "ID": 2,
        "pageID": 1,
        "components": [
          {
            "ComponentType": "AppBar",
            "ComponentName": "toolbar",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "padding",
                "Value": "Sm/0.5"
              },
              {
                "Key": "display",
                "Value": "flex"
              },
              {
                "Key": "align-items",
                "Value": "center"
              },
              {
                "Key": "flex-direction",
                "Value": "row"
              },
              {
                "Key": "gap",
                "Value": "12px"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "position",
                "SettingValue": "static"
              },
              {
                "SettingName": "color",
                "SettingValue": "primary"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 14,
            "order": 600
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "logo",
            "componentID": 14,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "children",
                "SettingValue": "MJ"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 15,
            "order": 700
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "space",
            "componentID": 14,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 17,
            "order": 900
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "search",
            "componentID": 14,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "Search"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "value",
                "SettingValue": "Textbox component"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "placeholder",
                "SettingValue": "Search for music"
              },
              {
                "SettingName": "bound",
                "SettingValue": "value"
              },
              {
                "SettingName": "target",
                "SettingValue": "search_param"
              },
              {
                "SettingName": "color",
                "SettingValue": "primary"
              },
              {
                "SettingName": "end",
                "SettingValue": "MusicNote"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 18,
            "order": 1000
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "logo",
            "componentID": 14,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Typography text"
              },
              {
                "SettingName": "variant",
                "SettingValue": "h6"
              },
              {
                "SettingName": "children",
                "SettingValue": "Boombot"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 19,
            "order": 1100
          },
          {
            "ComponentType": "Button",
            "ComponentName": "fire",
            "componentID": 14,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "term": "search_param"
                  }
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Search"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              },
              {
                "SettingName": "end",
                "SettingValue": "Search"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 20,
            "order": 1200
          },
          {
            "ComponentType": "DataGrid",
            "ComponentName": "grid",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onRowClick",
                "action": {
                  "type": "scriptRun",
                  "target": 1
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":1,\"bindings\":{\"trackNumber\":\"track no\",\"trackName\":\"title\",\"previewUrl\":\"previewUrl\",\"artistName\":\"artist\"}}"
              },
              {
                "SettingName": "size",
                "SettingValue": "medium"
              },
              {
                "SettingName": "padding",
                "SettingValue": "normal"
              },
              {
                "SettingName": "stickyHeader",
                "SettingValue": true
              },
              {
                "SettingName": "bound",
                "SettingValue": "selectedIndex"
              },
              {
                "SettingName": "target",
                "SettingValue": "selected_row"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 21,
            "order": 1300
          },
          {
            "ComponentType": "Dialog",
            "ComponentName": "Dialog-1",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "fullWidth",
                "SettingValue": true
              },
              {
                "SettingName": "fullScreen",
                "SettingValue": false
              },
              {
                "SettingName": "maxWidth",
                "SettingValue": "sm"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 22,
            "order": 1400
          },
          {
            "ComponentType": "Box",
            "ComponentName": "inner",
            "componentID": 22,
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "padding",
                "Value": "Xs/0.25"
              },
              {
                "Key": "width",
                "Value": "100%"
              },
              {
                "Key": "min-width",
                "Value": "200px"
              },
              {
                "Key": "display",
                "Value": "flex"
              },
              {
                "Key": "align-items",
                "Value": "flex-end"
              },
              {
                "Key": "justify-content",
                "Value": "center"
              },
              {
                "Key": "height",
                "Value": "200px"
              },
              {
                "Key": "margin",
                "Value": "Xxl/2"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 23,
            "order": 1500
          },
          {
            "ComponentType": "Button",
            "ComponentName": "btn",
            "componentID": 23,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 22
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Button"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 24,
            "order": 1600
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-3",
            "state": [],
            "styles": [
              {
                "Key": "text-transform",
                "Value": "capitalize"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "open": true,
                  "target": 22
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Open DIalog"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              },
              {
                "SettingName": "size",
                "SettingValue": "medium"
              },
              {
                "SettingName": "color",
                "SettingValue": "error"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 25,
            "order": 1700
          },
          {
            "ComponentType": "Menu",
            "ComponentName": "Menu-1",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "items",
                "SettingValue": "[{\"ID\":1,\"text\":\"home\",\"startIcon\":\"Home\",\"endIcon\":null,\"subtext\":null},{\"ID\":2,\"text\":\"about\",\"startIcon\":\"Info\",\"endIcon\":\"AccessTime\",\"subtext\":null},{\"ID\":3,\"text\":\"contact\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null}]"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 26,
            "order": 1800
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-4",
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Sm/0.5"
              },
              {
                "Key": "text-transform",
                "Value": "capitalize"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 26,
                  "open": true
                },
                "ID": 1
              },
              {
                "event": "onClick",
                "action": {
                  "type": "dataReset",
                  "target": 1
                },
                "ID": 2
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Open Menu"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "end",
                "SettingValue": "MoreHoriz"
              },
              {
                "SettingName": "color",
                "SettingValue": "warning"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 27,
            "order": 1900
          },
          {
            "ComponentType": "AudioPlayer",
            "ComponentName": "player",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "src",
                "SettingValue": ""
              },
              {
                "SettingName": "autoPlay",
                "SettingValue": false
              },
              {
                "SettingName": "autoplay",
                "SettingValue": true
              },
              {
                "SettingName": "controls",
                "SettingValue": false
              },
              {
                "SettingName": "bound",
                "SettingValue": "src"
              },
              {
                "SettingName": "target",
                "SettingValue": "media_url"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 28,
            "order": 2000
          },
          {
            "ComponentType": "List",
            "ComponentName": "List-1",
            "state": [],
            "styles": [
              {
                "Key": "width",
                "Value": "400px"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "items",
                "SettingValue": "[{\"ID\":1,\"text\":\"tom\",\"value\":\"tome\",\"startIcon\":\"Accessible\",\"endIcon\":\"Adb\",\"subtext\":\"this is the subtext\"},{\"ID\":2,\"text\":\"dick\",\"value\":\"dick\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":3,\"text\":\"harry\",\"value\":\"harry\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null}]"
              },
              {
                "SettingName": "heading",
                "SettingValue": "list header"
              },
              {
                "SettingName": "dense",
                "SettingValue": true
              },
              {
                "SettingName": "disablePadding",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 29,
            "order": 2100
          }
        ],
        "state": [
          {
            "Key": "search_param",
            "ID": 1
          },
          {
            "Key": "media_url",
            "Value": "",
            "ID": 2
          },
          {
            "Key": "select_value",
            "Value": "harry",
            "ID": 3
          },
          {
            "Key": "selected_row",
            "Value": "2",
            "ID": 4
          }
        ],
        "scripts": [
          {
            "name": "handle list click",
            "code": "function handleListClick (page, options) {\n  const { state, setState, data , api} = options; \n  console.log({options, data})\n  setState(value => ({...value, \n    selected_row: data.row,\n    media_url: data.previewUrl}))\n\n  setTimeout (() => {\n    const player = api.getRef(28); \n    player.play();\n  }, 888)\n}\n",
            "ID": 1
          }
        ],
        "data": []
      },
      {
        "PageName": "demo",
        "PagePath": "demo",
        "components": [
          {
            "ComponentType": "Box",
            "ComponentName": "Box-1",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "display",
                "Value": "flex"
              },
              {
                "Key": "gap",
                "Value": "12px"
              },
              {
                "Key": "margin",
                "Value": "Sm/0.5"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 1,
            "order": 100
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-1",
            "componentID": 1,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "Enter some text"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "value",
                "SettingValue": "Textbox component"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "bound",
                "SettingValue": "value"
              },
              {
                "SettingName": "target",
                "SettingValue": "search_param"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 2,
            "order": 200
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-1",
            "componentID": 1,
            "state": [],
            "styles": [
              {
                "Key": "text-transform",
                "Value": "capitalize"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "term": "search_param"
                  }
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "find music"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "end",
                "SettingValue": "Search"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 3,
            "order": 300
          },
          {
            "ComponentType": "DataGrid",
            "ComponentName": "DataGrid-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onRowClick",
                "action": {
                  "type": "scriptRun",
                  "target": 1
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":1,\"bindings\":{\"artistName\":\"artistName\",\"trackNumber\":\"trackNumber\",\"previewUrl\":\"previewUrl\",\"trackName\":\"trackName\"}}"
              },
              {
                "SettingName": "bound",
                "SettingValue": "selectedIndex"
              },
              {
                "SettingName": "target",
                "SettingValue": "selected_index"
              },
              {
                "SettingName": "truncate",
                "SettingValue": "35"
              },
              {
                "SettingName": "padding",
                "SettingValue": "normal"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "stickyHeader",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 4,
            "order": 400
          },
          {
            "ComponentType": "AudioPlayer",
            "ComponentName": "player",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "controls",
                "SettingValue": false
              },
              {
                "SettingName": "autoplay",
                "SettingValue": false
              },
              {
                "SettingName": "bound",
                "SettingValue": "src"
              },
              {
                "SettingName": "target",
                "SettingValue": "player_url"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 5,
            "order": 500
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-2",
            "componentID": 1,
            "state": [],
            "styles": [
              {
                "Key": "text-transform",
                "Value": "capitalize"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataReset",
                  "target": 1
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Reset"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "end",
                "SettingValue": "ClearAll"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 6,
            "order": 600
          }
        ],
        "ID": 3,
        "state": [
          {
            "Key": "search_param",
            "ID": 1
          },
          {
            "Key": "selected_index",
            "ID": 2
          },
          {
            "Key": "player_url",
            "ID": 3
          }
        ],
        "scripts": [
          {
            "name": "handle user click",
            "code": "function handleListClick (page, options) {\n  const { state, setState, data , api} = options;  \n  setState(value => ({...value, \n    selected_index: data.row,\n    player_url: data.previewUrl\n  }));\n\n  setTimeout (() => {\n    const player = api.getRef(5);  \n    player.play();\n  }, 1888)\n\n}\n",
            "ID": 1
          }
        ]
      }
    ],
    "resources": [
      {
        "ID": 1,
        "connectionID": 1,
        "name": "Term Search",
        "path": "/search",
        "method": "GET",
        "format": "querystring",
        "node": "results",
        "columns": [
          "artistName",
          "trackName",
          "previewUrl",
          "trackPrice",
          "trackNumber"
        ],
        "values": [
          {
            "key": "term"
          }
        ]
      }
    ],
    "connections": [
      {
        "ID": 1,
        "type": "rest",
        "root": "https://itunes.apple.com",
        "name": "iTunes Search API"
      }
    ]
  },
  {
    "Name": "Another Application",
    "path": "another-application",
    "ID": 2,
    "pages": [],
    "connections": []
  }
]