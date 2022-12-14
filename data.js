exports.AppData = [
  {
    "Name": "Demo Application",
    "path": "demo-application",
    "ID": 1,
    "pages": [
      {
        "ID": 1,
        "PageName": "Home Page",
        "PagePath": "home-page",
        "appID": 1,
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
                "SettingValue": "square"
              },
              {
                "SettingName": "color",
                "SettingValue": "error"
              },
              {
                "SettingName": "src",
                "SettingValue": "https://media.pitchfork.com/photos/5929b36eb1335d7bf169a5c1/1:1/w_600/9b34bb44.jpeg"
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
        "data": [],
        "ThemeName": "another theme"
      },
      {
        "PageName": "Album List",
        "PagePath": "album-list",
        "appID": 1,
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
        "PageName": "Boombot",
        "PagePath": "boombot",
        "appID": 1,
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
                "Value": "8px"
              },
              {
                "Key": "margin",
                "Value": "Sm/0.5"
              },
              {
                "Key": "grid-template-columns",
                "Value": "4"
              },
              {
                "Key": "align-items",
                "Value": "center"
              },
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-top",
                "Value": "null"
              },
              {
                "Key": "margin-bottom",
                "Value": "Sm/0.5"
              },
              {
                "Key": "background-color-custom",
                "Value": false
              },
              {
                "Key": "border-color-custom",
                "Value": true
              },
              {
                "Key": "gap-free",
                "Value": false
              },
              {
                "Key": "margin-top-free",
                "Value": false
              },
              {
                "Key": "margin-right-free",
                "Value": false
              },
              {
                "Key": "margin-bottom-free",
                "Value": false
              },
              {
                "Key": "margin-left-free",
                "Value": false
              },
              {
                "Key": "margin-right",
                "Value": "null"
              },
              {
                "Key": "background-color-free",
                "Value": true
              },
              {
                "Key": "margin-free",
                "Value": false
              },
              {
                "Key": "border-width-free",
                "Value": false
              },
              {
                "Key": "padding-edges",
                "Value": false
              },
              {
                "Key": "padding-top",
                "Value": "Xxs/0.125"
              },
              {
                "Key": "background-color",
                "Value": "{\"name\":\"Background - Secondary\",\"value\":\"rgb(246,246,248)\"}"
              },
              {
                "Key": "justify-content",
                "Value": "flex-start"
              },
              {
                "Key": "padding-bottom",
                "Value": "Xxs/0.125"
              },
              {
                "Key": "padding",
                "Value": "Md/0.75"
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
                "SettingValue": "Search for music"
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
              },
              {
                "SettingName": "autoComplete",
                "SettingValue": "off"
              },
              {
                "SettingName": "end",
                "SettingValue": "MusicNote"
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
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 17,
                  "open": true
                },
                "ID": 7
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 18
                },
                "ID": 8
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 26,
                  "open": true
                },
                "ID": 9
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
            "styles": [
              {
                "Key": "padding-edges",
                "Value": false
              },
              {
                "Key": "padding-top-free",
                "Value": false
              }
            ],
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
                "SettingValue": "{\"resourceID\":1,\"bindings\":{\"artistName\":\"Artist\",\"trackNumber\":\"#\",\"previewUrl\":\"previewUrl\",\"trackName\":\"title\"}}"
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
              },
              {
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 4,
            "order": 400,
            "componentID": 18
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
            "componentID": 26,
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
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 26,
                  "open": false
                },
                "ID": 4
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
          },
          {
            "ComponentType": "Repeater",
            "ComponentName": "Repeater-1",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "display",
                "Value": "grid"
              },
              {
                "Key": "grid-template-columns",
                "Value": "5"
              },
              {
                "Key": "gap",
                "Value": "16px"
              },
              {
                "Key": "padding",
                "Value": "Sm/0.5"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":1,\"bindings\":{\"artistName\":{\"title\":\"InfoCard-2.subtext\",\"componentID\":13,\"SettingName\":\"subtext\"},\"trackName\":{\"title\":\"InfoCard-2.label\",\"componentID\":13,\"SettingName\":\"label\"},\"previewUrl\":\"previewUrl\",\"artworkUrl100\":{\"title\":\"InfoCard-2.image\",\"componentID\":13,\"SettingName\":\"image\"}}}"
              },
              {
                "SettingName": "selectedIndex",
                "SettingValue": ""
              },
              {
                "SettingName": "bound",
                "SettingValue": "selectedIndex"
              },
              {
                "SettingName": "target",
                "SettingValue": "selected_index"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 9,
            "order": 350,
            "componentID": 17
          },
          {
            "ComponentType": "InfoCard",
            "ComponentName": "InfoCard-2",
            "componentID": 9,
            "state": [],
            "styles": [
              {
                "Key": "width",
                "Value": "inherit"
              }
            ],
            "events": [
              {
                "event": "onCardClick",
                "action": {
                  "type": "scriptRun",
                  "target": 2
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "hello"
              },
              {
                "SettingName": "subtext",
                "SettingValue": "x"
              },
              {
                "SettingName": "description",
                "SettingValue": ""
              },
              {
                "SettingName": "use_image",
                "SettingValue": true
              },
              {
                "SettingName": "image",
                "SettingValue": "z"
              },
              {
                "SettingName": "use_avatar",
                "SettingValue": true
              },
              {
                "SettingName": "avatar_text",
                "SettingValue": "A"
              },
              {
                "SettingName": "use_action",
                "SettingValue": true
              },
              {
                "SettingName": "action_icon",
                "SettingValue": "MoreVert"
              },
              {
                "SettingName": "below_image",
                "SettingValue": true
              },
              {
                "SettingName": "avatar_image",
                "SettingValue": "https://www.sky-tunes.com/assets/icon-72x72.png"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 13,
            "order": 1200
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-1",
            "componentID": 1,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onImageLoad",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "term": "initial_search"
                  }
                },
                "ID": 1
              },
              {
                "event": "onImageLoad",
                "action": {
                  "type": "modalOpen",
                  "target": 24,
                  "open": true
                },
                "ID": 4
              },
              {
                "event": "onImageLoad",
                "action": {
                  "type": "modalOpen",
                  "target": 26,
                  "open": true
                },
                "ID": 5
              },
              {
                "event": "onImageLoad",
                "action": {
                  "type": "modalOpen",
                  "target": 17,
                  "open": true
                },
                "ID": 6
              },
              {
                "event": "onImageLoad",
                "action": {
                  "type": "setState",
                  "target": "collapse_icon",
                  "value": "ExpandLess"
                },
                "ID": 7
              }
            ],
            "settings": [
              {
                "SettingName": "children",
                "SettingValue": "MJ"
              },
              {
                "SettingName": "src",
                "SettingValue": "https://www.sky-tunes.com/assets/icon-72x72.png"
              },
              {
                "SettingName": "variant",
                "SettingValue": "circular"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 14,
            "order": 150
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-1",
            "componentID": 1,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "openLink",
                  "target": 6
                },
                "ID": 1
              }
            ],
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
            "ID": 15,
            "order": 175
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-1",
            "componentID": 1,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 16,
            "order": 187
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "repeater collapse",
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
                "SettingValue": "repeater_expanded"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 17,
            "order": 1300
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "grid collapse",
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
                "SettingValue": "grid_expanded"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 18,
            "order": 1400
          },
          {
            "ComponentType": "IconButton",
            "ComponentName": "IconButton-1",
            "componentID": 1,
            "state": [],
            "styles": [],
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
                "SettingName": "icon",
                "SettingValue": "Settings"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "color",
                "SettingValue": "default"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 21,
            "order": 1700
          },
          {
            "ComponentType": "Menu",
            "ComponentName": "Menu-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onMenuClick",
                "action": {
                  "type": "scriptRun",
                  "target": 5
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "items",
                "SettingValue": "[{\"ID\":1,\"text\":\"View as list\",\"value\":\"View as list\",\"startIcon\":\"List\",\"endIcon\":null,\"subtext\":null},{\"ID\":2,\"text\":\"View as grid\",\"value\":\"View as grid\",\"startIcon\":\"TableView\",\"endIcon\":null,\"subtext\":null}]"
              },
              {
                "SettingName": "bound",
                "SettingValue": "value"
              },
              {
                "SettingName": "target",
                "SettingValue": "menu_value"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 22,
            "order": 1800
          },
          {
            "ComponentType": "Carousel",
            "ComponentName": "Carousel-1",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "images",
                "SettingValue": "[{\"ID\":1,\"text\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/75/90/c5/7590c5ea-0431-c6ab-fafa-9888ee6fb827/source/1200x630sr.jpg\",\"value\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/75/90/c5/7590c5ea-0431-c6ab-fafa-9888ee6fb827/source/1200x630sr.jpg\",\"src\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/75/90/c5/7590c5ea-0431-c6ab-fafa-9888ee6fb827/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":2,\"text\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/b8/bc/bb/b8bcbbf6-7f86-1329-e302-f195388a3483/source/1200x630sr.jpg\",\"value\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/b8/bc/bb/b8bcbbf6-7f86-1329-e302-f195388a3483/source/1200x630sr.jpg\",\"src\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/b8/bc/bb/b8bcbbf6-7f86-1329-e302-f195388a3483/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":3,\"text\":\"https://is1-ssl.mzstatic.com/image/thumb/Music/v4/eb/5f/86/eb5f86d4-0ec7-3330-2e51-d6017f0ce4ba/source/1200x630sr.jpg\",\"value\":\"https://is1-ssl.mzstatic.com/image/thumb/Music/v4/eb/5f/86/eb5f86d4-0ec7-3330-2e51-d6017f0ce4ba/source/1200x630sr.jpg\",\"src\":\"https://is1-ssl.mzstatic.com/image/thumb/Music/v4/eb/5f/86/eb5f86d4-0ec7-3330-2e51-d6017f0ce4ba/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":4,\"text\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/9b/b6/ac/9bb6ac34-2ed4-e3d6-b32d-3c1b3e111c19/source/1200x630sr.jpg\",\"value\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/9b/b6/ac/9bb6ac34-2ed4-e3d6-b32d-3c1b3e111c19/source/1200x630sr.jpg\",\"src\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/9b/b6/ac/9bb6ac34-2ed4-e3d6-b32d-3c1b3e111c19/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":5,\"text\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/29/c2/eb/29c2ebac-dd71-447c-1fcc-d179d4a06815/source/1200x630sr.jpg\",\"value\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/29/c2/eb/29c2ebac-dd71-447c-1fcc-d179d4a06815/source/1200x630sr.jpg\",\"src\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/29/c2/eb/29c2ebac-dd71-447c-1fcc-d179d4a06815/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":6,\"text\":\"https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/19/60/91/19609166-bd55-fdc3-b121-a1cdb6e7aea8/source/1200x630sr.jpg\",\"value\":\"https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/19/60/91/19609166-bd55-fdc3-b121-a1cdb6e7aea8/source/1200x630sr.jpg\",\"src\":\"https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/19/60/91/19609166-bd55-fdc3-b121-a1cdb6e7aea8/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":7,\"src\":\"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/f7/e7/f2/f7e7f25a-1e4d-7a10-cdc8-f5a2f0ac31d6/pr_source.png/1200x630cw.png\"},{\"ID\":8,\"src\":\"https://is2-ssl.mzstatic.com/image/thumb/Music6/v4/cb/c5/f8/cbc5f8fc-fd7f-fda1-0416-fd4672cd924d/source/1200x630sr.jpg\"},{\"ID\":9,\"src\":\"https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/2e/d8/02/2ed8027a-7f78-4d2c-41e7-c18a85ea46f0/source/1200x630sr.jpg\"},{\"ID\":10,\"src\":\"https://is4-ssl.mzstatic.com/image/thumb/Music111/v4/cb/44/9a/cb449aab-5d52-2201-edf4-0a6486b04126/source/1200x630cw.png\"}]"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 23,
            "order": 1250,
            "componentID": 24
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "carousel collapse",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "bound",
                "SettingValue": "in"
              },
              {
                "SettingName": "target",
                "SettingValue": "carousel_expanded"
              },
              {
                "SettingName": "orientation",
                "SettingValue": "vertical"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 24,
            "order": 550
          },
          {
            "ComponentType": "IconButton",
            "ComponentName": "IconButton-2",
            "componentID": 1,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "open": "toggle",
                  "target": 24
                },
                "ID": 2
              },
              {
                "event": "onClick",
                "action": {
                  "type": "setState",
                  "target": "collapse_icon",
                  "value": "ExpandMore|ExpandLess"
                },
                "ID": 3
              }
            ],
            "settings": [
              {
                "SettingName": "bound",
                "SettingValue": "icon"
              },
              {
                "SettingName": "target",
                "SettingValue": "collapse_icon"
              },
              {
                "SettingName": "disabled",
                "SettingValue": false
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 25,
            "order": 1900
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "Collapse-4",
            "componentID": 1,
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "padding",
                "Value": "null"
              },
              {
                "Key": "padding-free",
                "Value": true
              },
              {
                "Key": "margin-free",
                "Value": true
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "bound",
                "SettingValue": "in"
              },
              {
                "SettingName": "target",
                "SettingValue": "show_reset"
              },
              {
                "SettingName": "orientation",
                "SettingValue": "horizontal"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 26,
            "order": 575
          },
          {
            "ComponentType": "Drawer",
            "ComponentName": "Drawer-1",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "padding",
                "Value": "Md/0.75"
              },
              {
                "Key": "width",
                "Value": "300px"
              },
              {
                "Key": "min-width",
                "Value": "300px"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "anchor",
                "SettingValue": "left"
              },
              {
                "SettingName": "elevation",
                "SettingValue": "24"
              },
              {
                "SettingName": "open",
                "SettingValue": false
              },
              {
                "SettingName": "bound",
                "SettingValue": false
              },
              {
                "SettingName": "hideBackdrop",
                "SettingValue": true
              },
              {
                "SettingName": "variant",
                "SettingValue": "null"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 27,
            "order": 2000
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-2",
            "componentID": 27,
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "width",
                "Value": "320px"
              },
              {
                "Key": "min-width",
                "Value": "320px"
              },
              {
                "Key": "padding",
                "Value": "Md/0.75"
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
                "Key": "justify-content",
                "Value": "flex-end"
              },
              {
                "Key": "height",
                "Value": "40px"
              },
              {
                "Key": "flex-direction",
                "Value": "row"
              },
              {
                "Key": "border-width",
                "Value": "Xxs/0.125"
              },
              {
                "Key": "border-style",
                "Value": "solid"
              },
              {
                "Key": "border-color",
                "Value": "{\"name\":\"Neutral 2\",\"value\":\"rgb(228,230,234)\"}"
              },
              {
                "Key": "background-color",
                "Value": "{\"name\":\"Background - Secondary\",\"value\":\"rgb(246,246,248)\"}"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 30,
            "order": 2300
          },
          {
            "ComponentType": "IconButton",
            "ComponentName": "IconButton-3",
            "componentID": 1,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 27,
                  "open": "toggle"
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "icon",
                "SettingValue": "Menu"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 31,
            "order": 125
          },
          {
            "ComponentType": "IconButton",
            "ComponentName": "IconButton-4",
            "componentID": 30,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 27
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "icon",
                "SettingValue": "Close"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 32,
            "order": 2400
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-2",
            "componentID": 30,
            "state": [],
            "styles": [
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-left",
                "Value": "Md/0.75"
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
                "SettingValue": "h6"
              },
              {
                "SettingName": "children",
                "SettingValue": "Boombot"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 33,
            "order": 2350
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-2",
            "componentID": 30,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 34,
            "order": 2375
          },
          {
            "ComponentType": "List",
            "ComponentName": "List-1",
            "componentID": 27,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onItemClick",
                "action": {
                  "type": "scriptRun",
                  "target": 8
                },
                "ID": 1
              },
              {
                "event": "onItemClick",
                "action": {
                  "type": "modalOpen",
                  "target": 27
                },
                "ID": 2
              }
            ],
            "settings": [
              {
                "SettingName": "items",
                "SettingValue": "[{\"ID\":1,\"text\":\"Home\",\"value\":\"Home\",\"startIcon\":\"Home\",\"endIcon\":null,\"subtext\":null},{\"ID\":2,\"text\":\"Search\",\"value\":\"Search\",\"startIcon\":\"Search\",\"endIcon\":null,\"subtext\":null},{\"ID\":3,\"text\":\"Library\",\"value\":\"Library\",\"startIcon\":\"LibraryMusic\",\"endIcon\":null,\"subtext\":null}]"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 35,
            "order": 2500
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-2",
            "componentID": 30,
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
                "SettingValue": "https://www.sky-tunes.com/assets/icon-72x72.png"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 36,
            "order": 2325
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
          },
          {
            "Key": "selected_value",
            "Value": "tom",
            "ID": 4
          },
          {
            "Key": "repeater_expanded",
            "Value": true,
            "Type": "boolean",
            "ID": 5
          },
          {
            "Key": "grid_expanded",
            "Value": false,
            "Type": "boolean",
            "ID": 6
          },
          {
            "Key": "menu_value",
            "Value": "View as grid",
            "ID": 7
          },
          {
            "Key": "collapse_icon",
            "Value": "ExpandLess",
            "ID": 8
          },
          {
            "Key": "carousel_expanded",
            "Value": true,
            "Type": "boolean",
            "ID": 9
          },
          {
            "Key": "initial_search",
            "Value": "prince",
            "ID": 10
          },
          {
            "Key": "show_reset",
            "Value": false,
            "Type": "boolean",
            "ID": 11
          }
        ],
        "scripts": [
          {
            "name": "handle user click",
            "code": "function handleListClick (page, options) {\n  const { state, setState, data , api} = options;  \n  setState(value => ({...value, \n    selected_index: data.row,\n    player_url: data.previewUrl\n  }));\n\n  setTimeout (() => {\n    const player = api.getRefByName('player');  \n    !!player && player.play();\n  }, 888)\n\n}\n",
            "ID": 1
          },
          {
            "name": "handle card click",
            "code": "function handleCardClick (page, options) {\n  const { api, setState, data } = options; \n  const player_url = data.trackName?.record?.previewUrl\n  \n  setState(value => ({...value, \n    selected_index: data.index,\n    player_url \n  }));\n\n  setTimeout (() => {\n    const player = api.getRefByName('player');  \n    !!player && player.play();\n  }, 888)\n\n}\n",
            "ID": 2
          },
          {
            "name": "expand_repeater",
            "code": "function expand_repeater (page, options) {\n  const { state, setState } = options; \n  setState(s => ({...s, repeater_expanded: true, grid_expanded: false}))\n}\n",
            "ID": 3
          },
          {
            "name": "expand grid",
            "code": "function expand_repeater (page, options) {\n  const { state, setState } = options; \n  setState(s => ({...s, grid_expanded: true, repeater_expanded: false}))\n}\n",
            "ID": 4
          },
          {
            "name": "handle menu click",
            "code": "function handleMenuClick (page, options) {\n  const { state, setState, data } = options; \n  const menu_value = data.text;\n  if (menu_value === 'View as list') {\n    return setState(s => ({...s, menu_value, grid_expanded: true, repeater_expanded: false}))\n  }\n  setState(s => ({...s, menu_value, grid_expanded: false, repeater_expanded: true}))\n} \n",
            "ID": 5
          },
          {
            "name": "toggle carousel",
            "code": "function toggleCarousel (page, options) {\n  const { state, setState } = options; \n  const { carousel_expanded } = state;\n  setState({...state, carousel_expanded: !carousel_expanded,\n   collapse_icon: carousel_expanded ? 'ExpandMore' : 'ExpandLess'})\n}\n",
            "ID": 6
          },
          {
            "name": "show reset button",
            "code": "function showResetButton (page, options) {\n  const { state, setState } = options; \n  setState({...state, show_reset: !state.show_reset})\n}\n",
            "ID": 7
          },
          {
            "name": "sidebar navigate",
            "code": "function sidebarNavigate (page, options) {\n  const { state, setState, data, api } = options;  \n  const paths = ['boombot', 'advanced-search','library']\n  api.openPath(paths[data.row]);\n}\n",
            "ID": 8
          }
        ],
        "ThemeName": "plain",
        "events": [
          {
            "event": "onPageLoad",
            "action": {
              "type": "dataExec",
              "target": 1,
              "terms": {
                "term": "initial_search"
              }
            },
            "ID": "lb33ddj0yhwfvekzrf"
          }
        ]
      },
      {
        "PageName": "Launch Page",
        "PagePath": "launch-page",
        "appID": 1,
        "components": [
          {
            "ComponentType": "Button",
            "ComponentName": "Button-1",
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Md/0.75"
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
                  "type": "openLink",
                  "target": 3
                },
                "ID": 1
              },
              {
                "event": "onClick",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "term": "initial_search"
                  }
                },
                "ID": 2
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Launch Application"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 1,
            "order": 100
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-1",
            "componentID": 11,
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "display",
                "Value": "grid"
              },
              {
                "Key": "grid-template-rows",
                "Value": "1"
              },
              {
                "Key": "gap",
                "Value": "16px"
              },
              {
                "Key": "width",
                "Value": "480px"
              },
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-top",
                "Value": "Lg/1"
              },
              {
                "Key": "grid-template-columns",
                "Value": "2"
              },
              {
                "Key": "justify-content",
                "Value": "space-evenly"
              },
              {
                "Key": "align-content",
                "Value": "space-evenly"
              },
              {
                "Key": "justify-items",
                "Value": "start"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 2,
            "order": 200
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-1",
            "componentID": 2,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "Enter some text!"
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 3,
            "order": 300
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-1",
            "componentID": 2,
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 4,
            "order": 400
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-1",
            "componentID": 2,
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 5,
            "order": 500
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-1",
            "componentID": 2,
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 6,
            "order": 600
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-2",
            "componentID": 2,
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "display",
                "Value": "flex"
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
            "ID": 7,
            "order": 700
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-1",
            "componentID": 7,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 8,
            "order": 800
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-2",
            "componentID": 7,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataExec",
                  "target": 2,
                  "terms": {
                    "sortby": "sort_field",
                    "direction": "sort_desc",
                    "id": "search_id",
                    "type": "search_type"
                  }
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Save"
              },
              {
                "SettingName": "variant",
                "SettingValue": "contained"
              },
              {
                "SettingName": "end",
                "SettingValue": "Save"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 9,
            "order": 900
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-3",
            "componentID": 7,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataReset",
                  "target": 2
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Cancel"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "end",
                "SettingValue": "Close"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 10,
            "order": 850
          },
          {
            "ComponentType": "Card",
            "ComponentName": "Card-1",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "padding",
                "Value": "Lg/1"
              },
              {
                "Key": "width",
                "Value": "500px"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "elevation",
                "SettingValue": 3
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 11,
            "order": 1000
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-1",
            "componentID": 11,
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
                "SettingValue": "subtitle2"
              },
              {
                "SettingName": "children",
                "SettingValue": "Contact Details"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 12,
            "order": 150
          },
          {
            "ComponentType": "Select",
            "ComponentName": "Select-1",
            "componentID": 2,
            "state": [],
            "styles": [
              {
                "Key": "width",
                "Value": "200px"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "filterOptions",
                "SettingValue": false
              },
              {
                "SettingName": "items",
                "SettingValue": "[{\"ID\":1,\"text\":\"critical\",\"value\":\"critical\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":2,\"text\":\"high\",\"value\":\"high\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":3,\"text\":\"low\",\"value\":\"low\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null}]"
              },
              {
                "SettingName": "multiple",
                "SettingValue": true
              },
              {
                "SettingName": "value",
                "SettingValue": "low"
              },
              {
                "SettingName": "label",
                "SettingValue": "Severity"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 13,
            "order": 650
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-5",
            "componentID": 2,
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 14,
            "order": 675
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-4",
            "componentID": 2,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": 16,
                  "open": true
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "Label",
                "SettingValue": "Options"
              },
              {
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "color",
                "SettingValue": "primary"
              },
              {
                "SettingName": "end",
                "SettingValue": "ExpandMore"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 15,
            "order": 687
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
                "SettingValue": "[{\"ID\":1,\"text\":\"contact\",\"value\":\"contact\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":2,\"text\":\"escalate\",\"value\":\"escalate\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":3,\"text\":\"create meeting\",\"value\":\"create meeting\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null}]"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 16,
            "order": 1100
          },
          {
            "ComponentType": "DataGrid",
            "ComponentName": "DataGrid-1",
            "state": [],
            "styles": [
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-top",
                "Value": "Md/0.75"
              }
            ],
            "events": [
              {
                "event": "onRowClick",
                "action": {
                  "type": "setState",
                  "target": "grid_index",
                  "value": "options.row"
                },
                "ID": 2
              },
              {
                "event": "onRowClick",
                "action": {
                  "type": "scriptRun",
                  "target": 4
                },
                "ID": 3
              }
            ],
            "settings": [
              {
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":2,\"bindings\":{\"Title\":\"Title\",\"Genre\":\"Genre\",\"artistName\":\"artistName\",\"albumName\":\"albumName\"}}"
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
                "SettingName": "truncate",
                "SettingValue": "75"
              },
              {
                "SettingName": "bound",
                "SettingValue": "selectedIndex"
              },
              {
                "SettingName": "target",
                "SettingValue": "grid_index"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 17,
            "order": 1200
          },
          {
            "ComponentType": "Pagination",
            "ComponentName": "Pagination-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onPageChange",
                "action": {
                  "type": "dataExec",
                  "target": 2,
                  "terms": {
                    "sortby": "sort_field",
                    "direction": "sort_desc",
                    "id": "options.page",
                    "type": "search_type"
                  }
                },
                "ID": 2
              },
              {
                "event": "onPageChange",
                "action": {
                  "type": "scriptRun",
                  "target": 1
                },
                "ID": 3
              }
            ],
            "settings": [
              {
                "SettingName": "count",
                "SettingValue": 10
              },
              {
                "SettingName": "defaultPage",
                "SettingValue": 1
              },
              {
                "SettingName": "bound",
                "SettingValue": "page"
              },
              {
                "SettingName": "target",
                "SettingValue": "search_id"
              },
              {
                "SettingName": "color",
                "SettingValue": "secondary"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 21,
            "order": 1150
          },
          {
            "ComponentType": "AudioPlayer",
            "ComponentName": "aux",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "controls",
                "SettingValue": true
              },
              {
                "SettingName": "bound",
                "SettingValue": "src"
              },
              {
                "SettingName": "target",
                "SettingValue": "media_url"
              },
              {
                "SettingName": "autoplay",
                "SettingValue": false
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 22,
            "order": 1300
          }
        ],
        "ID": 4,
        "state": [
          {
            "Key": "initial_search",
            "Value": "prince",
            "ID": 1
          },
          {
            "Key": "sort_field",
            "Value": "ID",
            "Type": "string",
            "ID": "lb41b1vnomufbjogsx"
          },
          {
            "Key": "sort_desc",
            "Value": "DESC",
            "Type": "string",
            "ID": "lb41b85giqy7u7mzc1"
          },
          {
            "Key": "search_id",
            "Value": 3,
            "Type": "number",
            "ID": "lb41bgfrdkmoi3trbvt"
          },
          {
            "Key": "search_type",
            "Value": "music",
            "Type": "string",
            "ID": "lb41bpordv2ltavu1n"
          },
          {
            "Key": "grid_index",
            "Value": "",
            "Type": "string",
            "ID": "lb475lhj01xjfdhmwz4"
          },
          {
            "Key": "media_url",
            "Value": "",
            "Type": "string",
            "ID": "lb47lcgnf3mh3yih0b"
          }
        ],
        "ThemeName": "plain",
        "scripts": [
          {
            "name": "test pager",
            "code": "function testPager (page, options) {\n  const { state, setState, data } = options; \n  setState(s => ({...s, search_id: data.page})) \n\n}\n",
            "ID": 1
          },
          {
            "name": "icon click",
            "code": "function testPager (page, options) {\n  const { state, setState, data } = options; \n  setState(s => ({...s, search_id: s.search_id + 1})) \n}\n",
            "ID": 2
          },
          {
            "name": "icon back",
            "code": "function testPager (page, options) {\n  const { state, setState, data } = options; \n  setState(s => ({...s, search_id: s.search_id - 1})) \n}\n",
            "ID": 3
          },
          {
            "name": "row click",
            "code": "function handleCardClick (page, options) {\n  const { api, setState, data } = options;  \n  const media_url = \"https://s3.amazonaws.com/box.import/\" + data.FileKey \n  \n  setState(value => ({...value,  \n    media_url \n  }));\n\n  setTimeout (() => {\n    const player = api.getRefByName('aux');   \n    !!player && player.play();\n  }, 888)\n\n}\n",
            "ID": 4
          }
        ]
      },
      {
        "PageName": "Advanced Search",
        "PagePath": "advanced-search",
        "appID": 1,
        "pageID": 3,
        "components": [],
        "ID": 5,
        "state": []
      },
      {
        "PageName": "Library",
        "PagePath": "library",
        "appID": 1,
        "pageID": 3,
        "components": [],
        "ID": 6
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
          "trackNumber",
          "artworkUrl100"
        ],
        "values": [
          {
            "key": "term"
          }
        ]
      },
      {
        "connectionID": 2,
        "name": "Search Request",
        "method": "GET",
        "columns": [
          "Title",
          "albumImage",
          "Genre",
          "discNumber",
          "trackNumber",
          "artistName",
          "albumName",
          "FileKey"
        ],

        "events": [
          {
            "ID": 1,
            "event": "dataLoaded",
            "action": {
              "type": "scriptRun",
              "target": 1
            },
          }, 
        ],


        "values": [
          {
            "key": "sortby"
          },
          {
            "key": "direction"
          },
          {
            "key": "id"
          },
          {
            "key": "type"
          }
        ],
        "path": "/request",
        "format": "rest",
        "ID": 2,
        "node": "records"
      }
    ],
    "connections": [
      {
        "ID": 1,
        "type": "rest",
        "root": "https://itunes.apple.com",
        "name": "iTunes Search API"
      },
      {
        "name": "Sky Tunes API",
        "type": "rest",
        "root": "https://u8m0btl997.execute-api.us-east-1.amazonaws.com",
        "ID": 2
      }
    ],
    "themes": [
      {
        "breakpoints": {
          "keys": [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
          ],
          "values": {
            "xs": 0,
            "sm": 600,
            "md": 900,
            "lg": 1200,
            "xl": 1536
          },
          "unit": "px"
        },
        "direction": "ltr",
        "components": {},
        "palette": {
          "mode": "light",
          "common": {
            "black": "#2e2929",
            "white": "#ebd8d8"
          },
          "primary": {
            "main": "#6a93c9",
            "light": "#a54d53",
            "dark": "#617b99",
            "contrastText": "#fff"
          },
          "secondary": {
            "main": "#9c27b0",
            "light": "#ba68c8",
            "dark": "#7b1fa2",
            "contrastText": "#fff"
          },
          "error": {
            "main": "#d32f2f",
            "light": "#ef5350",
            "dark": "#c62828",
            "contrastText": "#fff"
          },
          "warning": {
            "main": "#ed6c02",
            "light": "#ff9800",
            "dark": "#e65100",
            "contrastText": "#fff"
          },
          "info": {
            "main": "#0288d1",
            "light": "#03a9f4",
            "dark": "#01579b",
            "contrastText": "#fff"
          },
          "success": {
            "main": "#2e7d32",
            "light": "#4caf50",
            "dark": "#1b5e20",
            "contrastText": "#fff"
          },
          "grey": {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
            "A100": "#f5f5f5",
            "A200": "#eeeeee",
            "A400": "#bdbdbd",
            "A700": "#616161"
          },
          "contrastThreshold": 3,
          "tonalOffset": 0.2,
          "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.6)",
            "disabled": "rgba(0, 0, 0, 0.38)"
          },
          "divider": "rgba(0, 0, 0, 0.12)",
          "background": {
            "paper": "#fff",
            "default": "#fff"
          },
          "action": {
            "active": "rgba(0, 0, 0, 0.54)",
            "hover": "rgba(0, 0, 0, 0.04)",
            "hoverOpacity": 0.04,
            "selected": "rgba(0, 0, 0, 0.08)",
            "selectedOpacity": 0.08,
            "disabled": "rgba(0, 0, 0, 0.26)",
            "disabledBackground": "rgba(0, 0, 0, 0.12)",
            "disabledOpacity": 0.38,
            "focus": "rgba(0, 0, 0, 0.12)",
            "focusOpacity": 0.12,
            "activatedOpacity": 0.12
          }
        },
        "shape": {
          "borderRadius": 4
        },
        "mixins": {
          "toolbar": {
            "minHeight": 56,
            "@media (min-width:0px)": {
              "@media (orientation: landscape)": {
                "minHeight": 48
              }
            },
            "@media (min-width:600px)": {
              "minHeight": 64
            }
          }
        },
        "shadows": [
          "none",
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
          "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
          "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
          "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
          "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
          "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
          "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
          "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
          "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
          "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
          "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
          "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
          "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
          "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
          "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
          "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
          "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
          "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
          "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
          "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
        ],
        "typography": {
          "htmlFontSize": "12",
          "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
          "fontSize": 14,
          "fontWeightLight": 300,
          "fontWeightRegular": 400,
          "fontWeightMedium": 500,
          "fontWeightBold": 700,
          "h1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "6rem",
            "lineHeight": 1.167,
            "letterSpacing": "-0.01562em"
          },
          "h2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "3.75rem",
            "lineHeight": 1.2,
            "letterSpacing": "-0.00833em"
          },
          "h3": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "3rem",
            "lineHeight": 1.167,
            "letterSpacing": "0em"
          },
          "h4": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "2.125rem",
            "lineHeight": 1.235,
            "letterSpacing": "0.00735em"
          },
          "h5": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1.5rem",
            "lineHeight": 1.334,
            "letterSpacing": "0em"
          },
          "h6": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "1.25rem",
            "lineHeight": 1.6,
            "letterSpacing": "0.0075em"
          },
          "subtitle1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.00938em"
          },
          "subtitle2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.57,
            "letterSpacing": "0.00714em"
          },
          "body1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.5,
            "letterSpacing": "0.00938em"
          },
          "body2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.875rem",
            "lineHeight": 1.43,
            "letterSpacing": "0.01071em"
          },
          "button": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.02857em",
            "textTransform": "capitalize"
          },
          "caption": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 1.66,
            "letterSpacing": "0.03333em"
          },
          "overline": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 2.66,
            "letterSpacing": "0.08333em",
            "textTransform": "uppercase"
          }
        },
        "transitions": {
          "easing": {
            "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
            "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
            "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
            "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
          },
          "duration": {
            "shortest": 150,
            "shorter": 200,
            "short": 250,
            "standard": 300,
            "complex": 375,
            "enteringScreen": 225,
            "leavingScreen": 195
          }
        },
        "zIndex": {
          "mobileStepper": 1000,
          "fab": 1050,
          "speedDial": 1050,
          "appBar": 1100,
          "drawer": 1200,
          "modal": 1300,
          "snackbar": 1400,
          "tooltip": 1500
        },
        "name": "test theme",
        "ID": "lb20jfid86xqiiprpuc"
      },
      {
        "breakpoints": {
          "keys": [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
          ],
          "values": {
            "xs": 0,
            "sm": 600,
            "md": 900,
            "lg": 1200,
            "xl": 1536
          },
          "unit": "px"
        },
        "direction": "ltr",
        "components": {},
        "palette": {
          "mode": "light",
          "common": {
            "black": "#e94242",
            "white": "#fff"
          },
          "primary": {
            "main": "#d0021b",
            "light": "#905a2e",
            "dark": "#15c04f",
            "contrastText": "#fff"
          },
          "secondary": {
            "main": "#9c27b0",
            "light": "#ba68c8",
            "dark": "#7b1fa2",
            "contrastText": "#fff"
          },
          "error": {
            "main": "#d32f2f",
            "light": "#ef5350",
            "dark": "#c62828",
            "contrastText": "#fff"
          },
          "warning": {
            "main": "#ed6c02",
            "light": "#ff9800",
            "dark": "#e65100",
            "contrastText": "#fff"
          },
          "info": {
            "main": "#0288d1",
            "light": "#03a9f4",
            "dark": "#01579b",
            "contrastText": "#fff"
          },
          "success": {
            "main": "#2e7d32",
            "light": "#4caf50",
            "dark": "#1b5e20",
            "contrastText": "#fff"
          },
          "grey": {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
            "A100": "#f5f5f5",
            "A200": "#eeeeee",
            "A400": "#bdbdbd",
            "A700": "#616161"
          },
          "contrastThreshold": 3,
          "tonalOffset": 0.2,
          "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.6)",
            "disabled": "rgba(0, 0, 0, 0.38)"
          },
          "divider": "#d11616",
          "background": {
            "paper": "#fff",
            "default": "#fff"
          },
          "action": {
            "active": "rgba(0, 0, 0, 0.54)",
            "hover": "rgba(0, 0, 0, 0.04)",
            "hoverOpacity": 0.04,
            "selected": "rgba(0, 0, 0, 0.08)",
            "selectedOpacity": 0.08,
            "disabled": "rgba(0, 0, 0, 0.26)",
            "disabledBackground": "rgba(0, 0, 0, 0.12)",
            "disabledOpacity": 0.38,
            "focus": "rgba(0, 0, 0, 0.12)",
            "focusOpacity": 0.12,
            "activatedOpacity": 0.12
          }
        },
        "shape": {
          "borderRadius": 4
        },
        "mixins": {
          "toolbar": {
            "minHeight": 56,
            "@media (min-width:0px)": {
              "@media (orientation: landscape)": {
                "minHeight": 48
              }
            },
            "@media (min-width:600px)": {
              "minHeight": 64
            }
          }
        },
        "shadows": [
          "none",
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
          "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
          "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
          "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
          "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
          "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
          "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
          "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
          "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
          "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
          "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
          "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
          "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
          "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
          "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
          "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
          "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
          "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
          "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
          "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
        ],
        "typography": {
          "htmlFontSize": 16,
          "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
          "fontSize": 14,
          "fontWeightLight": 300,
          "fontWeightRegular": 400,
          "fontWeightMedium": 500,
          "fontWeightBold": 700,
          "h1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "6rem",
            "lineHeight": 1.167,
            "letterSpacing": "-0.01562em"
          },
          "h2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "3.75rem",
            "lineHeight": 1.2,
            "letterSpacing": "-0.00833em"
          },
          "h3": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "3rem",
            "lineHeight": 1.167,
            "letterSpacing": "0em"
          },
          "h4": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "2.125rem",
            "lineHeight": 1.235,
            "letterSpacing": "0.00735em"
          },
          "h5": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1.5rem",
            "lineHeight": 1.334,
            "letterSpacing": "0em"
          },
          "h6": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "1.25rem",
            "lineHeight": 1.6,
            "letterSpacing": "0.0075em"
          },
          "subtitle1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.00938em"
          },
          "subtitle2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.57,
            "letterSpacing": "0.00714em"
          },
          "body1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.5,
            "letterSpacing": "0.00938em"
          },
          "body2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.875rem",
            "lineHeight": 1.43,
            "letterSpacing": "0.01071em"
          },
          "button": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.02857em",
            "textTransform": "capitalize"
          },
          "caption": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 1.66,
            "letterSpacing": "0.03333em"
          },
          "overline": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 2.66,
            "letterSpacing": "0.08333em",
            "textTransform": "uppercase"
          }
        },
        "transitions": {
          "easing": {
            "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
            "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
            "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
            "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
          },
          "duration": {
            "shortest": 150,
            "shorter": 200,
            "short": 250,
            "standard": 300,
            "complex": 375,
            "enteringScreen": 225,
            "leavingScreen": 195
          }
        },
        "zIndex": {
          "mobileStepper": 1000,
          "fab": 1050,
          "speedDial": 1050,
          "appBar": 1100,
          "drawer": 1200,
          "modal": 1300,
          "snackbar": 1400,
          "tooltip": 1500
        },
        "name": "another theme",
        "ID": "lb212imt047uc9w8kg54"
      },
      {
        "breakpoints": {
          "keys": [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
          ],
          "values": {
            "xs": 0,
            "sm": 600,
            "md": 900,
            "lg": 1200,
            "xl": 1536
          },
          "unit": "px"
        },
        "direction": "ltr",
        "components": {},
        "palette": {
          "mode": "light",
          "common": {
            "black": "#000",
            "white": "#fff"
          },
          "primary": {
            "main": "#1976d2",
            "light": "#42a5f5",
            "dark": "#1565c0",
            "contrastText": "#eee6e6"
          },
          "secondary": {
            "main": "#9c27b0",
            "light": "#ba68c8",
            "dark": "#7b1fa2",
            "contrastText": "#fff"
          },
          "error": {
            "main": "#d32f2f",
            "light": "#ef5350",
            "dark": "#c62828",
            "contrastText": "#fff"
          },
          "warning": {
            "main": "#ed6c02",
            "light": "#ff9800",
            "dark": "#e65100",
            "contrastText": "#fff"
          },
          "info": {
            "main": "#0288d1",
            "light": "#03a9f4",
            "dark": "#01579b",
            "contrastText": "#fff"
          },
          "success": {
            "main": "#2e7d32",
            "light": "#4caf50",
            "dark": "#1b5e20",
            "contrastText": "#fff"
          },
          "grey": {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
            "A100": "#f5f5f5",
            "A200": "#eeeeee",
            "A400": "#bdbdbd",
            "A700": "#616161"
          },
          "contrastThreshold": 3,
          "tonalOffset": 0.2,
          "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.6)",
            "disabled": "rgba(0, 0, 0, 0.38)"
          },
          "divider": "rgba(0, 0, 0, 0.12)",
          "background": {
            "paper": "#fff",
            "default": "#fff"
          },
          "action": {
            "active": "rgba(0, 0, 0, 0.54)",
            "hover": "rgba(0, 0, 0, 0.04)",
            "hoverOpacity": 0.04,
            "selected": "rgba(0, 0, 0, 0.08)",
            "selectedOpacity": 0.08,
            "disabled": "rgba(0, 0, 0, 0.26)",
            "disabledBackground": "rgba(0, 0, 0, 0.12)",
            "disabledOpacity": 0.38,
            "focus": "rgba(0, 0, 0, 0.12)",
            "focusOpacity": 0.12,
            "activatedOpacity": 0.12
          }
        },
        "shape": {
          "borderRadius": 4
        },
        "mixins": {
          "toolbar": {
            "minHeight": 56,
            "@media (min-width:0px)": {
              "@media (orientation: landscape)": {
                "minHeight": 48
              }
            },
            "@media (min-width:600px)": {
              "minHeight": 64
            }
          }
        },
        "shadows": [
          "none",
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
          "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
          "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
          "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
          "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
          "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
          "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
          "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
          "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
          "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
          "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
          "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
          "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
          "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
          "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
          "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
          "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
          "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
          "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
          "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
        ],
        "typography": {
          "htmlFontSize": 16,
          "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
          "fontSize": 14,
          "fontWeightLight": 300,
          "fontWeightRegular": 400,
          "fontWeightMedium": 500,
          "fontWeightBold": 700,
          "h1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "6rem",
            "lineHeight": 1.167,
            "letterSpacing": "-0.01562em"
          },
          "h2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "3.75rem",
            "lineHeight": 1.2,
            "letterSpacing": "-0.00833em"
          },
          "h3": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "3rem",
            "lineHeight": 1.167,
            "letterSpacing": "0em"
          },
          "h4": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "2.125rem",
            "lineHeight": 1.235,
            "letterSpacing": "0.00735em"
          },
          "h5": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1.5rem",
            "lineHeight": 1.334,
            "letterSpacing": "0em"
          },
          "h6": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "1.25rem",
            "lineHeight": 1.6,
            "letterSpacing": "0.0075em"
          },
          "subtitle1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.00938em"
          },
          "subtitle2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.57,
            "letterSpacing": "0.00714em"
          },
          "body1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.5,
            "letterSpacing": "0.00938em"
          },
          "body2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.875rem",
            "lineHeight": 1.43,
            "letterSpacing": "0.01071em"
          },
          "button": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.02857em",
            "textTransform": "capitalize"
          },
          "caption": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 1.66,
            "letterSpacing": "0.03333em"
          },
          "overline": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 2.66,
            "letterSpacing": "0.08333em",
            "textTransform": "uppercase"
          }
        },
        "transitions": {
          "easing": {
            "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
            "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
            "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
            "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
          },
          "duration": {
            "shortest": 150,
            "shorter": 200,
            "short": 250,
            "standard": 300,
            "complex": 375,
            "enteringScreen": 225,
            "leavingScreen": 195
          }
        },
        "zIndex": {
          "mobileStepper": 1000,
          "fab": 1050,
          "speedDial": 1050,
          "appBar": 1100,
          "drawer": 1200,
          "modal": 1300,
          "snackbar": 1400,
          "tooltip": 1500
        },
        "name": "plain",
        "ID": "lb3frld53kyzzmqqsk3"
      }
    ],
    "Photo": "https://www.sky-tunes.com/assets/icon-72x72.png"
  },
  {
    "Name": "Another Application",
    "path": "another-application",
    "ID": 2,
    "pages": [
      {
        "PageName": "Home",
        "PagePath": "home",
        "appID": 2,
        "components": [
          {
            "ComponentType": "Box",
            "ComponentName": "Box-1",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 1,
            "order": 100
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-1",
            "componentID": 1,
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
            "ID": 2,
            "order": 200
          }
        ],
        "ID": 1
      }
    ],
    "connections": [
      {
        "name": "New Connection",
        "type": "rest",
        "root": "dsfs",
        "ID": 1
      }
    ],
    "resources": []
  },
  {
    "Name": "new application test",
    "path": "new-application-test",
    "ID": 2,
    "pages": [],
    "connections": [],
    "resources": []
  }
]