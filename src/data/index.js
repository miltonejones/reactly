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
            ],
            "boundProps": [],
            "settings": []
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
            ],
            "boundProps": []
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
            ],
            "boundProps": [
              {
                "attribute": "value",
                "boundTo": "search_type",
                "ID": "lb5jz6bo0tgv9m7k4dge"
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
            "order": 250,
            "boundProps": [
              {
                "attribute": "label",
                "boundTo": "search_state",
                "ID": "lb5jz6bp448is6si36g"
              }
            ]
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
            "componentID": 11,
            "boundProps": []
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
            "order": 800,
            "boundProps": []
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
            "order": 900,
            "boundProps": []
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
            "order": 1100,
            "boundProps": []
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
            "order": 150,
            "boundProps": []
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
            "order": 1200,
            "boundProps": []
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
            "componentID": 22,
            "boundProps": [
              {
                "attribute": "icon",
                "boundTo": "icon_name",
                "ID": "lb5jz6bp7ey5uadia7j"
              }
            ]
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
            "order": 1400,
            "boundProps": []
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
            "order": 1600,
            "boundProps": []
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
            "order": 87,
            "boundProps": []
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
            "order": 1700,
            "boundProps": []
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
            "order": 1050,
            "boundProps": [
              {
                "attribute": "in",
                "boundTo": "collapsed",
                "ID": "lb5jz6bp8yxe1sdlr46"
              }
            ]
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
            "componentID": 36,
            "boundProps": []
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
            "order": 1025,
            "boundProps": []
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
            "order": 1800,
            "boundProps": []
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
            "componentID": null,
            "boundProps": []
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
            "order": 150,
            "boundProps": []
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
            "order": 1900,
            "boundProps": []
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
            "order": 2000,
            "boundProps": []
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
            "order": 2100,
            "boundProps": []
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
            "order": 91,
            "boundProps": []
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
            "order": 2400,
            "boundProps": [
              {
                "attribute": "value",
                "boundTo": "search_type",
                "ID": "lb5jz6bp90ng7lgx2wd"
              }
            ]
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
            "order": 2500,
            "boundProps": []
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
            "order": 600,
            "boundProps": []
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
            "order": 700,
            "boundProps": []
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
            "order": 900,
            "boundProps": []
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
            "order": 1000,
            "boundProps": [
              {
                "attribute": "value",
                "boundTo": "search_param",
                "ID": "lb5jz6bqh555wfgwjyh"
              }
            ]
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
            "order": 1100,
            "boundProps": []
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
            "order": 1200,
            "boundProps": []
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
            "order": 1300,
            "boundProps": [
              {
                "attribute": "selectedIndex",
                "boundTo": "selected_row",
                "ID": "lb5jz6bqiq3vpkbctfr"
              }
            ]
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
            "order": 1400,
            "boundProps": []
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
            "order": 1500,
            "boundProps": []
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
            "order": 1600,
            "boundProps": []
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
            "order": 1700,
            "boundProps": []
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
            "order": 1800,
            "boundProps": []
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
            "order": 1900,
            "boundProps": []
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
            "order": 2000,
            "boundProps": [
              {
                "attribute": "src",
                "boundTo": "media_url",
                "ID": "lb5jz6bqcueh8jlnhhl"
              }
            ]
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
            "order": 2100,
            "boundProps": []
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
            "order": 100,
            "boundProps": []
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
            "order": 200,
            "boundProps": [
              {
                "attribute": "value",
                "boundTo": "search_param",
                "ID": "lb5jz6bqd6j5xuppcvw"
              }
            ]
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
            "order": 300,
            "boundProps": []
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
            "componentID": 18,
            "boundProps": [
              {
                "attribute": "selectedIndex",
                "boundTo": "selected_index",
                "ID": "lb5jz6br91ksretc8si"
              }
            ]
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
            "order": 500,
            "boundProps": [
              {
                "attribute": "src",
                "boundTo": "player_url",
                "ID": "lb5jz6brm5513ogccu"
              }
            ]
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
            "order": 600,
            "boundProps": []
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
            "componentID": 17,
            "boundProps": [
              {
                "attribute": "selectedIndex",
                "boundTo": "selected_index",
                "ID": "lb5jz6brl954os6vegp"
              }
            ]
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
            "order": 1200,
            "boundProps": []
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
            "order": 150,
            "boundProps": []
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
            "order": 175,
            "boundProps": []
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
            "order": 187,
            "boundProps": []
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
            "order": 1300,
            "boundProps": [
              {
                "attribute": "in",
                "boundTo": "repeater_expanded",
                "ID": "lb5jz6brouxuwlt4879"
              }
            ]
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
            "order": 1400,
            "boundProps": [
              {
                "attribute": "in",
                "boundTo": "grid_expanded",
                "ID": "lb5jz6brra874o5kwg"
              }
            ]
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
            "order": 1700,
            "boundProps": []
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
            "order": 1800,
            "boundProps": [
              {
                "attribute": "value",
                "boundTo": "menu_value",
                "ID": "lb5jz6brhh9d7vnqj74"
              }
            ]
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
                "SettingValue": "[{\"ID\":1,\"text\":\"Babymetal\",\"value\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/75/90/c5/7590c5ea-0431-c6ab-fafa-9888ee6fb827/source/1200x630sr.jpg\",\"src\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/75/90/c5/7590c5ea-0431-c6ab-fafa-9888ee6fb827/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":2,\"text\":\"James Brown\",\"value\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/b8/bc/bb/b8bcbbf6-7f86-1329-e302-f195388a3483/source/1200x630sr.jpg\",\"src\":\"https://is5-ssl.mzstatic.com/image/thumb/Music/v4/b8/bc/bb/b8bcbbf6-7f86-1329-e302-f195388a3483/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":3,\"text\":\"Peter Gabriel\",\"value\":\"https://is1-ssl.mzstatic.com/image/thumb/Music/v4/eb/5f/86/eb5f86d4-0ec7-3330-2e51-d6017f0ce4ba/source/1200x630sr.jpg\",\"src\":\"https://is1-ssl.mzstatic.com/image/thumb/Music/v4/eb/5f/86/eb5f86d4-0ec7-3330-2e51-d6017f0ce4ba/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":4,\"text\":\"Sade\",\"value\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/9b/b6/ac/9bb6ac34-2ed4-e3d6-b32d-3c1b3e111c19/source/1200x630sr.jpg\",\"src\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/9b/b6/ac/9bb6ac34-2ed4-e3d6-b32d-3c1b3e111c19/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":5,\"text\":\"Pat Benatar\",\"value\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/29/c2/eb/29c2ebac-dd71-447c-1fcc-d179d4a06815/source/1200x630sr.jpg\",\"src\":\"https://is2-ssl.mzstatic.com/image/thumb/Music/v4/29/c2/eb/29c2ebac-dd71-447c-1fcc-d179d4a06815/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":6,\"text\":\"Parliament\",\"value\":\"https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/19/60/91/19609166-bd55-fdc3-b121-a1cdb6e7aea8/source/1200x630sr.jpg\",\"src\":\"https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/19/60/91/19609166-bd55-fdc3-b121-a1cdb6e7aea8/source/1200x630sr.jpg\",\"startIcon\":null,\"endIcon\":null,\"subtext\":null},{\"ID\":7,\"src\":\"https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/f7/e7/f2/f7e7f25a-1e4d-7a10-cdc8-f5a2f0ac31d6/pr_source.png/1200x630cw.png\"},{\"ID\":8,\"src\":\"https://is2-ssl.mzstatic.com/image/thumb/Music6/v4/cb/c5/f8/cbc5f8fc-fd7f-fda1-0416-fd4672cd924d/source/1200x630sr.jpg\",\"text\":\"Tupac\"},{\"ID\":9,\"src\":\"https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/2e/d8/02/2ed8027a-7f78-4d2c-41e7-c18a85ea46f0/source/1200x630sr.jpg\",\"text\":\"Eminem\"},{\"ID\":10,\"src\":\"https://is4-ssl.mzstatic.com/image/thumb/Music111/v4/cb/44/9a/cb449aab-5d52-2201-edf4-0a6486b04126/source/1200x630cw.png\",\"text\":\"Joyner Lucas\"}]"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 23,
            "order": 1250,
            "componentID": 24,
            "boundProps": []
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
            "order": 550,
            "boundProps": [
              {
                "attribute": "in",
                "boundTo": "carousel_expanded",
                "ID": "lb5jz6bsi407pcygtt"
              }
            ]
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
            "order": 1900,
            "boundProps": [
              {
                "attribute": "icon",
                "boundTo": "collapse_icon",
                "ID": "lb5jz6bs0u44tbp6dl4q"
              }
            ]
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
            "order": 575,
            "boundProps": [
              {
                "attribute": "in",
                "boundTo": "show_reset",
                "ID": "lb5jz6bskhho86tyw5"
              }
            ]
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
            "order": 2000,
            "boundProps": [
              {
                "attribute": false,
                "boundTo": "NO TARGET FOR THIS FIELD",
                "ID": "lb5jz6bsy5kldpbt8l"
              }
            ]
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
            "order": 2300,
            "boundProps": []
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
            "order": 125,
            "boundProps": []
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
            "order": 2400,
            "boundProps": []
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
            "order": 2350,
            "boundProps": []
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
            "order": 2375,
            "boundProps": []
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
            "order": 2500,
            "boundProps": []
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
            "order": 2325,
            "boundProps": []
          },
          {
            "ComponentType": "ToggleButtons",
            "ComponentName": "ToggleButtons-1",
            "componentID": 1,
            "children": true,
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "scriptRun",
                  "target": 10
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "color",
                "SettingValue": "secondary"
              },
              {
                "SettingName": "orientation",
                "SettingValue": "horizontal"
              },
              {
                "SettingName": "value",
                "SettingValue": "grid"
              },
              {
                "SettingName": "exclusive",
                "SettingValue": true
              },
              {
                "SettingName": "fullWidth",
                "SettingValue": false
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7o9wvxhymk70muvsn",
            "order": 2600,
            "boundProps": [
              {
                "boundTo": "menu_value",
                "attribute": "value"
              }
            ]
          },
          {
            "ComponentType": "ToggleButton",
            "ComponentName": "ToggleButton-1",
            "componentID": "lb7o9wvxhymk70muvsn",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "use_icon",
                "SettingValue": true
              },
              {
                "SettingName": "icon",
                "SettingValue": "FormatListBulleted"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "value",
                "SettingValue": "View as list"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7ooofzx4p4015huz8",
            "order": 2700
          },
          {
            "ComponentType": "ToggleButton",
            "ComponentName": "ToggleButton-2",
            "componentID": "lb7o9wvxhymk70muvsn",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "use_icon",
                "SettingValue": true
              },
              {
                "SettingName": "icon",
                "SettingValue": "TableView"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              },
              {
                "SettingName": "value",
                "SettingValue": "View as grid"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7oosb4iadtwc8f73",
            "order": 2800
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
          },
          {
            "name": "test data",
            "code": "function testData (page, options) {\n  const { state, setState , api, data} = options; \n  api.Alert(JSON.stringify(data));\n}\n",
            "ID": 9
          },
          {
            "name": "button group click",
            "code": "function buttonGroupClick (page, options) {\n  const { state, setState } = options; \n  console.log ({options})\n}\n",
            "ID": 10
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
            "order": 100,
            "boundProps": []
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
            "order": 200,
            "boundProps": []
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
            "order": 300,
            "boundProps": []
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
            "order": 400,
            "boundProps": []
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
            "order": 500,
            "boundProps": []
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
            "order": 600,
            "boundProps": []
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
            "order": 700,
            "boundProps": []
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
            "order": 800,
            "boundProps": []
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
            "order": 900,
            "boundProps": []
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
            "order": 850,
            "boundProps": []
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
            "order": 1000,
            "boundProps": []
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
            "order": 150,
            "boundProps": []
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
            "order": 650,
            "boundProps": []
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
            "order": 675,
            "boundProps": []
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
            "order": 687,
            "boundProps": []
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
            "order": 1100,
            "boundProps": []
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
            "order": 1200,
            "boundProps": [
              {
                "attribute": "selectedIndex",
                "boundTo": "grid_index",
                "ID": "lb5jz6bs0xp2qgccjatg"
              }
            ]
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
            "order": 1150,
            "boundProps": [
              {
                "attribute": "page",
                "boundTo": "search_id",
                "ID": "lb5jz6bsa6p7d2fdkqf"
              }
            ]
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
            "order": 1300,
            "boundProps": [
              {
                "attribute": "src",
                "boundTo": "media_url",
                "ID": "lb5jz6bsyk9pqay8f7"
              }
            ]
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
        "components": [
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
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":2,\"bindings\":{\"Title\":\"Title\",\"discNumber\":\"Disc\",\"Genre\":\"Genre\",\"trackNumber\":\"Track\",\"artistName\":\"Artist\"}}"
              },
              {
                "SettingName": "truncate",
                "SettingValue": "55"
              },
              {
                "SettingName": "nowrap",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 2,
            "order": 200,
            "boundProps": [
              {
                "boundTo": "selected_index",
                "attribute": "selectedIndex"
              }
            ]
          },
          {
            "ComponentType": "AudioPlayer",
            "ComponentName": "aux",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onProgress",
                "action": {
                  "type": "scriptRun",
                  "target": 2
                },
                "ID": 1
              },
              {
                "event": "onPlayerStart",
                "action": {
                  "type": "modalOpen",
                  "target": 5,
                  "open": true
                },
                "ID": 2
              },
              {
                "event": "onPlayerStop",
                "action": {
                  "type": "modalOpen",
                  "target": 5,
                  "open": false
                },
                "ID": 3
              },
              {
                "event": "onPlayerStart",
                "action": {
                  "type": "scriptRun",
                  "target": 4
                },
                "ID": 4
              }
            ],
            "settings": [
              {
                "SettingName": "controls",
                "SettingValue": false
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 3,
            "order": 300,
            "boundProps": [
              {
                "boundTo": "player_url",
                "attribute": "src"
              }
            ]
          },
          {
            "ComponentType": "LinearProgress",
            "ComponentName": "LinearProgress-1",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "variant",
                "SettingValue": "determinate"
              },
              {
                "SettingName": "color",
                "SettingValue": "secondary"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 4,
            "order": 150,
            "boundProps": [
              {
                "boundTo": "player_progress",
                "attribute": "value"
              }
            ],
            "componentID": 5
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "Collapse-1",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": 5,
            "order": 125
          },
          {
            "ComponentType": "Pagination",
            "ComponentName": "Pagination-1",
            "state": [],
            "styles": [
              {
                "Key": "margin-free",
                "Value": false
              },
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-top",
                "Value": "Sm/0.5"
              }
            ],
            "events": [
              {
                "event": "onPageChange",
                "action": {
                  "type": "dataExec",
                  "target": 2,
                  "terms": {
                    "sortby": "search_sort",
                    "direction": "search_direction",
                    "id": "data.page",
                    "type": "search_type"
                  }
                },
                "ID": 1
              },
              {
                "event": "onPageChange",
                "action": {
                  "type": "setState",
                  "target": "current_page",
                  "value": "data.page"
                },
                "ID": 2
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
                "SettingName": "color",
                "SettingValue": "secondary"
              },
              {
                "SettingName": "shape",
                "SettingValue": "rounded"
              },
              {
                "SettingName": "showFirstButton",
                "SettingValue": true
              },
              {
                "SettingName": "showLastButton",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": 6,
            "order": 175,
            "boundProps": [
              {
                "boundTo": "current_page",
                "attribute": "page"
              },
              {
                "boundTo": "page_count",
                "attribute": "count"
              }
            ],
            "componentID": "lb76c3i5uq7anhmfk5h"
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-1",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "padding",
                "Value": "Xxs/0.125"
              },
              {
                "Key": "background-color",
                "Value": "{\"name\":\"Background - Secondary\",\"value\":\"rgb(246,246,248)\"}"
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
                "Key": "gap",
                "Value": "8px"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb755kcl796naf42rux",
            "order": 50
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-1",
            "componentID": "lb755kcl796naf42rux",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onImageLoad",
                "action": {
                  "type": "dataExec",
                  "target": 2,
                  "terms": {
                    "sortby": "search_sort",
                    "direction": "search_direction",
                    "id": "search_page",
                    "type": "search_type"
                  }
                },
                "ID": 1
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb755ycc796xl0y328",
            "order": 400
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-1",
            "componentID": "lb755kcl796naf42rux",
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
            "ID": "lb758s7ajtafqv3jbll",
            "order": 500
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-2",
            "componentID": "lb76c3i5uq7anhmfk5h",
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
                "SettingValue": "body1"
              },
              {
                "SettingName": "children",
                "SettingValue": "{row_count} found, page {current_page} "
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb766r7hy09272rfh3f",
            "order": 187
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-2",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "display",
                "Value": "flex"
              },
              {
                "Key": "justify-content",
                "Value": "flex-start"
              },
              {
                "Key": "align-items",
                "Value": "center"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb76c3i5uq7anhmfk5h",
            "order": 163
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-1",
            "componentID": "lb76c3i5uq7anhmfk5h",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb76d4qorst4uh5et5",
            "order": 187
          }
        ],
        "ID": 5,
        "state": [
          {
            "Key": "search_sort",
            "Value": "ID",
            "Type": "string",
            "ID": "lb72vynfxio2kf2gimp"
          },
          {
            "Key": "search_direction",
            "Value": "DESC",
            "Type": "string",
            "ID": "lb72w5060pewievs1sx"
          },
          {
            "Key": "search_page",
            "Value": "1",
            "Type": "string",
            "ID": "lb72wiheclyx4ccvhe"
          },
          {
            "Key": "search_type",
            "Value": "music",
            "Type": "string",
            "ID": "lb72x7lrcb4sy6h1kwa"
          },
          {
            "Key": "selected_index",
            "Value": "",
            "Type": "string",
            "ID": "lb733f0dmre30iwtzc"
          },
          {
            "Key": "player_url",
            "Value": "",
            "Type": "string",
            "ID": "lb7341qvacux1wo8wve"
          },
          {
            "Key": "player_progress",
            "Value": 10,
            "Type": "number",
            "ID": "lb73i5mwrsczemuxero"
          },
          {
            "Key": "page_count",
            "Value": 10,
            "Type": "number",
            "ID": "lb74bmemg0vr077gxbl"
          },
          {
            "Key": "current_page",
            "Value": 1,
            "Type": "number",
            "ID": "lb7697to0ovfrfyfo2k"
          },
          {
            "Key": "row_count",
            "Value": "",
            "Type": "number",
            "ID": "lb769k14p2bg76foj4"
          },
          {
            "Key": "json",
            "Value": "",
            "Type": "string",
            "ID": "lb76jmzjjpu9qv6yegl"
          }
        ],
        "scripts": [
          {
            "name": "on list click",
            "code": "function handleListClick (page, options) {\n  const { state, setState, data , api} = options;  \n  setState(value => ({...value, \n    selected_index: data.row,\n    player_url: \"https://s3.amazonaws.com/box.import/\" + data.FileKey\n  }));\n\n\n  setTimeout (() => {\n    const player = api.getRefByName('aux');  \n    !!player && player.play();\n  }, 888)\n\n  const { selected_index, json } = state;\n  if (!json) return api.Alert('No JSON!');\n  const { records }  = json;\n  const row = data.row + 1\n  api.Alert (JSON.stringify (records[row]));\n}\n",
            "ID": 1
          },
          {
            "name": "set progress",
            "code": "function setProgress (page, options) {\n  const { state, setState, data } = options; \n  !!data?.progress && setState(s => ({...s, player_progress: data.progress * 100}))\n  // add your code here\n  // console.log({options})\n}\n",
            "ID": 2
          },
          {
            "name": "data is loaded",
            "code": "function dataIsLoaded (page, options) {\n  const { state, setState, data } = options; \n  !!data?.count && setState(s => ({...s, \n     page_count: Math.ceil(data.count / 100),\n     row_count: data.count,\n     json: data\n  }))\n console.log({data})\n}\n",
            "ID": 3
          },
          {
            "name": "on play ended",
            "code": "function onPlayEnded (page, options) {\n  const { state , setState, data, api } = options; \nconsole.log ({ state })\n}\n",
            "ID": 4
          }
        ]
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
        ],
        "events": []
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
            "event": "dataLoaded",
            "action": {
              "type": "scriptRun",
              "target": 3
            },
            "ID": "lb74azqxvl4sfzet9eq"
          }
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
            "fontFamily": "\"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": "600",
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
            "order": 200,
            "boundProps": []
          },
          {
            "ComponentType": "IconButton",
            "ComponentName": "IconButton-1",
            "componentID": 1,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7q8kmkafric7r9l5q",
            "order": 300
          },
          {
            "ComponentType": "Box",
            "ComponentName": "toolbar",
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
                "Value": "12px"
              },
              {
                "Key": "background-color",
                "Value": "{\"name\":\"Background - Secondary\",\"value\":\"rgb(246,246,248)\"}"
              },
              {
                "Key": "padding",
                "Value": "Xs/0.25"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7q8s3pdym60yxgnkf",
            "order": 400,
            "ComponentCustomName": "Searchbar"
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-2",
            "componentID": "lb7q8s3pdym60yxgnkf",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onImageLoad",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "sortby": "search_sort",
                    "direction": "search_direction",
                    "id": "search_page",
                    "type": "search_type"
                  }
                },
                "ID": 1
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7q8xk8oxx51961onf",
            "order": 500
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-1",
            "componentID": "lb7q8s3pdym60yxgnkf",
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
            "ID": "lb7q9sn1517tvo4gg58",
            "order": 600
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-1",
            "componentID": "lb7q8s3pdym60yxgnkf",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7qj0yhsg5s97unmti",
            "order": 700
          },
          {
            "ComponentType": "DataGrid",
            "ComponentName": "all",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onCellClick",
                "action": {
                  "type": "scriptRun",
                  "target": 1
                },
                "ID": 2
              }
            ],
            "settings": [
              {
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":1,\"bindings\":{\"Title\":\"Title\",\"trackNumber\":\"Track\",\"Genre\":\"Genre\",\"albumName\":\"Album\",\"artistName\":\"Artist\"}}"
              },
              {
                "SettingName": "truncate",
                "SettingValue": "50"
              },
              {
                "SettingName": "nowrap",
                "SettingValue": true
              },
              {
                "SettingName": "stickyHeader",
                "SettingValue": true
              },
              {
                "SettingName": "use_id",
                "SettingValue": true
              },
              {
                "SettingName": "selectedColumn",
                "SettingValue": "ID"
              },
              {
                "SettingName": "selectedID",
                "SettingValue": "2"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7qjamnseh8l6iww88",
            "order": 900,
            "boundProps": [
              {
                "boundTo": "selected_index",
                "attribute": "selectedIndex"
              },
              {
                "boundTo": "selected_id",
                "attribute": "selectedID"
              }
            ],
            "componentID": "lb8nsoqfjgzig8q4gy"
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "waiting",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7rfc2edas9zl7iul",
            "order": 850
          },
          {
            "ComponentType": "LinearProgress",
            "ComponentName": "LinearProgress-1",
            "componentID": "lb7rfc2edas9zl7iul",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "value",
                "SettingValue": ""
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7rfhwteeohgurdlwb",
            "order": 1000,
            "boundProps": []
          },
          {
            "ComponentType": "Box",
            "ComponentName": "all pages",
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
                "Key": "margin",
                "Value": "Sm/0.5"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7rh4y6h5tz23gv2qh",
            "order": 875,
            "componentID": "lb8nsoqfjgzig8q4gy"
          },
          {
            "ComponentType": "Pagination",
            "ComponentName": "Pagination-1",
            "componentID": "lb7rh4y6h5tz23gv2qh",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onPageChange",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "sortby": "search_sort",
                    "direction": "search_direction",
                    "id": "data.page",
                    "type": "search_type"
                  }
                },
                "ID": 1
              },
              {
                "event": "onPageChange",
                "action": {
                  "type": "setState",
                  "target": "current_page",
                  "value": "data.page"
                },
                "ID": 2
              },
              {
                "event": "onPageChange",
                "action": {
                  "type": "setState",
                  "target": "search_page",
                  "value": "data.page"
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7rh9lq74tm4b1ibkj",
            "order": 1100,
            "boundProps": [
              {
                "boundTo": "search_page",
                "attribute": "page"
              },
              {
                "boundTo": "page_count",
                "attribute": "count"
              }
            ]
          },
          {
            "ComponentType": "AudioPlayer",
            "ComponentName": "aux",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onPlayerStart",
                "action": {
                  "type": "setState",
                  "target": "play_button_icon",
                  "value": "PauseCircle"
                },
                "ID": 1
              },
              {
                "event": "onPlayerStop",
                "action": {
                  "type": "setState",
                  "target": "play_button_icon",
                  "value": "PlayCircle"
                },
                "ID": 2
              },
              {
                "event": "onProgress",
                "action": {
                  "type": "scriptRun",
                  "target": 4
                },
                "ID": 3
              },
              {
                "event": "onPlayerStart",
                "action": {
                  "type": "modalOpen",
                  "target": "lb7u6v4s2vyu5wf2bp9",
                  "open": true
                },
                "ID": 4
              },
              {
                "event": "onPlayerStop",
                "action": {
                  "type": "modalOpen",
                  "open": false,
                  "target": "lb7u6v4s2vyu5wf2bp9"
                },
                "ID": 5
              },
              {
                "event": "onPlayerStart",
                "action": {
                  "type": "modalOpen",
                  "target": "lb7vz6nyjkfjhqg5xvs",
                  "open": true
                },
                "ID": 6
              },
              {
                "event": "onPlayerStop",
                "action": {
                  "type": "modalOpen",
                  "target": "lb7vz6nyjkfjhqg5xvs",
                  "open": false
                },
                "ID": 7
              },
              {
                "event": "onPlayerEnded",
                "action": {
                  "type": "scriptRun",
                  "target": 5
                },
                "ID": 8
              },
              {
                "event": "onPlayerStart",
                "action": {
                  "type": "modalOpen",
                  "target": "lb8j0h0w97fajll8j7i",
                  "open": true
                },
                "ID": 9
              }
            ],
            "settings": [
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":1,\"bindings\":{\"FileKey\":\"FileKey\"}}"
              },
              {
                "SettingName": "url",
                "SettingValue": "https://s3.amazonaws.com/box.import"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7rlyxy2k6ftwoyfra",
            "order": 1200,
            "boundProps": [
              {
                "boundTo": "player_url",
                "attribute": "src"
              },
              {
                "boundTo": "selected_index",
                "attribute": "selectedIndex"
              }
            ]
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-2",
            "componentID": "lb7rh4y6h5tz23gv2qh",
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
                "SettingValue": "caption"
              },
              {
                "SettingName": "children",
                "SettingValue": " {row_count}  tracks in your library"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7tj0g7n6p8upd6i5f",
            "order": 1300
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-2",
            "componentID": "lb7rh4y6h5tz23gv2qh",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7tkaydl29tr1dm337",
            "order": 1250
          },
          {
            "ComponentType": "IconButton",
            "ComponentName": "IconButton-2",
            "componentID": "lb7q8s3pdym60yxgnkf",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "scriptRun",
                  "target": 3
                },
                "ID": 1
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": "lb8l70yli7umajuzfzd",
                  "open": true
                },
                "ID": 2
              }
            ],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7tq87j32e9ebtchdy",
            "order": 1400,
            "boundProps": [
              {
                "boundTo": "play_button_icon",
                "attribute": "icon"
              }
            ]
          },
          {
            "ComponentType": "LinearProgress",
            "ComponentName": "aux_prog",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "variant",
                "SettingValue": "determinate"
              },
              {
                "SettingName": "color",
                "SettingValue": "secondary"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7u0n39qmkgyuwdy8",
            "order": 775,
            "boundProps": [
              {
                "boundTo": "player_progress",
                "attribute": "value"
              }
            ],
            "componentID": "lb7vz6nyjkfjhqg5xvs"
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "playhead",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7u6v4s2vyu5wf2bp9",
            "order": 813
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-3",
            "componentID": "lb7u6v4s2vyu5wf2bp9",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "display",
                "Value": "grid"
              },
              {
                "Key": "align-items",
                "Value": "end"
              },
              {
                "Key": "grid-template-columns",
                "Value": "1"
              },
              {
                "Key": "justify-content",
                "Value": "space-between"
              },
              {
                "Key": "grid-template-rows",
                "Value": "1"
              },
              {
                "Key": "gap",
                "Value": "4px"
              },
              {
                "Key": "gap-free",
                "Value": true
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
                "Value": "{\"name\":\"Background - Secondary\",\"value\":\"rgb(246,246,248)\"}"
              },
              {
                "Key": "border-radius",
                "Value": "Md/0.75"
              },
              {
                "Key": "margin",
                "Value": "Md/0.75"
              },
              {
                "Key": "background-color",
                "Value": "{\"name\":\"Background - Tertiary\",\"value\":\"rgb(228,230,234)\"}"
              },
              {
                "Key": "padding",
                "Value": "Sm/0.5"
              },
              {
                "Key": "justify-items",
                "Value": "stretch"
              },
              {
                "Key": "padding-edges",
                "Value": true
              },
              {
                "Key": "padding-top",
                "Value": "Sm/0.5"
              },
              {
                "Key": "padding-bottom",
                "Value": "Sm/0.5"
              },
              {
                "Key": "padding-right",
                "Value": "Md/0.75"
              },
              {
                "Key": "padding-left",
                "Value": "Md/0.75"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7u8pjot70fpzusi2",
            "order": 1500
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-3",
            "componentID": "lb7ukjcjcudltp2ifem",
            "state": [],
            "styles": [
              {
                "Key": "padding-edges",
                "Value": true
              },
              {
                "Key": "padding-right",
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
                "SettingValue": "caption"
              },
              {
                "SettingName": "children",
                "SettingValue": "{player_progress_formatted}  / {player_duration} "
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7u9wjmv25yns2ohvi",
            "order": 1600
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-4",
            "componentID": "lb7u8pjot70fpzusi2",
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
            "ID": "lb7ukjcjcudltp2ifem",
            "order": 1700
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-3",
            "componentID": "lb7ukjcjcudltp2ifem",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7ul1l2c1ho6pzl8zi",
            "order": 1550
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-4",
            "componentID": "lb7uvw8rcu8vwwi4njf",
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
                "SettingValue": " {track_name} "
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7unjgvjgx7ez6gdzr",
            "order": 1525
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-3",
            "componentID": "lb7ukjcjcudltp2ifem",
            "state": [],
            "styles": [
              {
                "Key": "width",
                "Value": "60px"
              },
              {
                "Key": "height",
                "Value": "60px"
              }
            ],
            "events": [],
            "settings": [
              {
                "SettingName": "children",
                "SettingValue": "MJ"
              },
              {
                "SettingName": "variant",
                "SettingValue": "rounded"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7usjd155gzg3a4gkh",
            "order": 1513,
            "boundProps": [
              {
                "boundTo": "album_image",
                "attribute": "src"
              }
            ]
          },
          {
            "ComponentType": "Box",
            "ComponentName": "info",
            "componentID": "lb7ukjcjcudltp2ifem",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "display",
                "Value": "flex"
              },
              {
                "Key": "flex-direction",
                "Value": "column"
              },
              {
                "Key": "align-items",
                "Value": "flex-start"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7uvw8rcu8vwwi4njf",
            "order": 1538
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-5",
            "componentID": "lb7uvw8rcu8vwwi4njf",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "openLink",
                  "params": {
                    "artistname": "artist_name"
                  },
                  "target": "lb8ze9w2fnicvqn2hed"
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
                "SettingValue": "caption"
              },
              {
                "SettingName": "children",
                "SettingValue": " {artist_name} "
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7uwjj739gyg54k8wf",
            "order": 1800
          },
          {
            "ComponentType": "CircularProgress",
            "ComponentName": "CircularProgress-1",
            "componentID": "lb7v94pe2sesmw1jqxn",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "thickness",
                "SettingValue": 3.6
              },
              {
                "SettingName": "size",
                "SettingValue": 40
              },
              {
                "SettingName": "value",
                "SettingValue": 0
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7v8pcngg37byf9qrh",
            "order": 1900
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "progress",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb7vz6nyjkfjhqg5xvs",
            "order": 794
          },
          {
            "ComponentType": "Fab",
            "ComponentName": "Fab-1",
            "componentID": "lb7ukjcjcudltp2ifem",
            "state": [],
            "styles": [
              {
                "Key": "padding-edges",
                "Value": false
              },
              {
                "Key": "padding-right",
                "Value": "null"
              },
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-right",
                "Value": "Md/0.75"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "scriptRun",
                  "target": 3
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "color",
                "SettingValue": "secondary"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb7w3ydw5m7yluh7dnh",
            "order": 2100,
            "boundProps": [
              {
                "boundTo": "play_button_icon",
                "attribute": "icon"
              }
            ]
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-6",
            "componentID": "lb8ir48ccen5y3kdazm",
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
                "SettingValue": "caption"
              },
              {
                "SettingName": "children",
                "SettingValue": " {row_count} tracks found"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8irw88omomz6svmi",
            "order": 2200
          },
          {
            "ComponentType": "Snackbar",
            "ComponentName": "Snackbar-1",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "vertical",
                "SettingValue": "top"
              },
              {
                "SettingName": "horizontal",
                "SettingValue": "left"
              },
              {
                "SettingName": "autoHideDuration",
                "SettingValue": "5000"
              },
              {
                "SettingName": "message",
                "SettingValue": "{track_name}: {artist_name}"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8j0h0w97fajll8j7i",
            "order": 2300,
            "boundProps": []
          },
          {
            "ComponentType": "Tab",
            "ComponentName": "Tab-1",
            "componentID": "lb8k49wqcf0ype0q2cr",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "Tab one"
              },
              {
                "SettingName": "value",
                "SettingValue": "1"
              },
              {
                "SettingName": "icon",
                "SettingValue": "AccessTimeFilled"
              },
              {
                "SettingName": "iconPosition",
                "SettingValue": "start"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8k4grmiglgeftevtq",
            "order": 2400
          },
          {
            "ComponentType": "Tab",
            "ComponentName": "Tab-2",
            "componentID": "lb8k49wqcf0ype0q2cr",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "Tab 2"
              },
              {
                "SettingName": "value",
                "SettingValue": "2"
              },
              {
                "SettingName": "icon",
                "SettingValue": "Accessible"
              },
              {
                "SettingName": "iconPosition",
                "SettingValue": "start"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8k901r3e6ra62yf4",
            "order": 2500
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "search",
            "componentID": "lb7q8s3pdym60yxgnkf",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onEnterPress",
                "action": {
                  "type": "openLink",
                  "target": "lbb3z5v12nx08l94bhs",
                  "params": {
                    "param": "search_param"
                  }
                },
                "ID": 1
              },
              {
                "event": "onChange",
                "action": {
                  "type": "setState",
                  "target": "button_on",
                  "value": true
                },
                "ID": 2
              }
            ],
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8lv1jqzzfjqrb4q1k",
            "order": 1350,
            "boundProps": [
              {
                "boundTo": "search_param",
                "attribute": "value"
              }
            ]
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-1",
            "componentID": "lb7q8s3pdym60yxgnkf",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "openLink",
                  "target": "lbb3z5v12nx08l94bhs",
                  "params": {
                    "param": "search_param"
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8lw93wiy5xxawfihq",
            "order": 1375,
            "boundProps": [
              {
                "boundTo": "button_on",
                "attribute": "disabled"
              }
            ]
          },
          {
            "ComponentType": "DataGrid",
            "ComponentName": "search grid",
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
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":2,\"bindings\":{\"Title\":\"Title\",\"Genre\":\"Genre\",\"trackTime\":\"time\",\"artistName\":\"artist\",\"albumName\":\"album\"}}"
              },
              {
                "SettingName": "nowrap",
                "SettingValue": true
              },
              {
                "SettingName": "truncate",
                "SettingValue": "55"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8lxvx2i2g9uqwkqk",
            "order": 894,
            "boundProps": [
              {
                "boundTo": "selected_index",
                "attribute": "selectedIndex"
              }
            ],
            "componentID": "lb8nvaqnoogfgfrpzd"
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "show all",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb8nsoqfjgzig8q4gy",
            "order": 885
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "show search",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb8nvaqnoogfgfrpzd",
            "order": 2600
          },
          {
            "ComponentType": "Pagination",
            "ComponentName": "Pagination-2",
            "componentID": "lb8ogvvt8i3i5352oce",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onPageChange",
                "action": {
                  "type": "dataExec",
                  "target": 2,
                  "terms": {
                    "page": "event.page",
                    "type": "search_type",
                    "param": "search_param"
                  }
                },
                "ID": 1
              },
              {
                "event": "onPageChange",
                "action": {
                  "type": "setState",
                  "target": "search_page",
                  "value": "data.page"
                },
                "ID": 2
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
                "SettingName": "showFirstButton",
                "SettingValue": true
              },
              {
                "SettingName": "showLastButton",
                "SettingValue": true
              },
              {
                "SettingName": "hideone",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8o7nd9ke9isyoh988",
            "order": 890,
            "boundProps": [
              {
                "boundTo": "page_count",
                "attribute": "count"
              },
              {
                "boundTo": "search_page",
                "attribute": "page"
              }
            ]
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-6",
            "componentID": "lb8nvaqnoogfgfrpzd",
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
                "Key": "margin",
                "Value": "Sm/0.5"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb8ogvvt8i3i5352oce",
            "order": 892
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-4",
            "componentID": "lb8ogvvt8i3i5352oce",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb8oim0k466winhes4q",
            "order": 2650
          },
          {
            "ComponentType": "Link",
            "ComponentName": "Link-2",
            "componentID": "lb8ogvvt8i3i5352oce",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataExec",
                  "target": 1,
                  "terms": {
                    "sortby": "search_sort",
                    "direction": "search_direction",
                    "id": "{1}",
                    "type": "search_type"
                  }
                },
                "ID": 1
              },
              {
                "event": "onClick",
                "action": {
                  "type": "setState",
                  "target": "search_param"
                },
                "ID": 2
              },
              {
                "event": "onClick",
                "action": {
                  "type": "setState",
                  "target": "search_page",
                  "value": "1"
                },
                "ID": 3
              }
            ],
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
                "SettingValue": "Back to librarry"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8opromq2s7bm2y1hq",
            "order": 2800
          },
          {
            "ComponentType": "IconButton",
            "ComponentName": "IconButton-3",
            "componentID": "lb8ogvvt8i3i5352oce",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "icon",
                "SettingValue": "ChevronRight"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb8puuz74ke0lfsgy3r",
            "order": 2900
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-4",
            "componentID": "lbb71cvlyiravfxqiw",
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
            "ID": "lbb71sbw02ab0zhx55xm",
            "order": 2900,
            "boundProps": [
              {
                "boundTo": "album_image",
                "attribute": "src"
              }
            ]
          }
        ],
        "ID": 1,
        "state": [
          {
            "Key": "search_sort",
            "Value": "ID",
            "Type": "string",
            "ID": "lb7qhz76f3xcp5bgwji"
          },
          {
            "Key": "search_direction",
            "Value": "DESC",
            "Type": "string",
            "ID": "lb7qi69xhows6g3l2g"
          },
          {
            "Key": "search_page",
            "Value": "1",
            "Type": "string",
            "ID": "lb7qibrmnf0x7myveip"
          },
          {
            "Key": "search_type",
            "Value": "music",
            "Type": "string",
            "ID": "lb7qihcjdvwauxocj76"
          },
          {
            "Key": "current_page",
            "Value": 1,
            "Type": "number",
            "ID": "lb7ri9sjt4sgr40h8sp"
          },
          {
            "Key": "player_url",
            "Value": "",
            "Type": "string",
            "ID": "lb7rmd3psi1ghg9xguc"
          },
          {
            "Key": "selected_index",
            "Value": "",
            "Type": "string",
            "ID": "lb7rp8zkb5oaccsj84w"
          },
          {
            "Key": "page_count",
            "Value": "",
            "Type": "string",
            "ID": "lb7tg6foq10cu44b5q"
          },
          {
            "Key": "row_count",
            "Value": "",
            "Type": "string",
            "ID": "lb7tg6fodvypicm6pgb"
          },
          {
            "Key": "records",
            "Value": "",
            "Type": "object",
            "ID": "lb7tg6foednfm2okjg"
          },
          {
            "Key": "play_button_icon",
            "Value": "PlayCircle",
            "Type": "string",
            "ID": "lb7tqugdxto1zkjp7v7"
          },
          {
            "Key": "player_progress",
            "Value": "",
            "Type": "string",
            "ID": "lb7tz2q29udv9ibis9i"
          },
          {
            "Key": "player_duration",
            "Value": "",
            "Type": "string",
            "ID": "lb7ugvptt85vqz8ugsd"
          },
          {
            "Key": "track_name",
            "Value": "",
            "Type": "string",
            "ID": "lb7umbphl24dot8wkg"
          },
          {
            "Key": "album_image",
            "Value": "",
            "Type": "string",
            "ID": "lb7urbu5tyl7mmjkaih"
          },
          {
            "Key": "artist_name",
            "Value": "",
            "Type": "string",
            "ID": "lb7ux8fl5pa3551fgfp"
          },
          {
            "Key": "player_progress_formatted",
            "Value": "",
            "Type": "string",
            "ID": "lb7vmmhs77vr6ba07cu"
          },
          {
            "Key": "tab_index",
            "Value": "0",
            "Type": "string",
            "ID": "lb8km0n97j0iplkitf"
          },
          {
            "Key": "search_param",
            "Value": "",
            "Type": "string",
            "ID": "lb8lqt7orutqx6o5y8"
          },
          {
            "Key": "selected_id",
            "Value": "",
            "Type": "string",
            "ID": "lb8wo5lnjlltjis478"
          },
          {
            "Key": "button_on",
            "Value": "",
            "Type": "boolean",
            "ID": "lbb4fdnkc0l8bvql0sl"
          }
        ],
        "scripts": [
          {
            "name": "Handle list click",
            "code": "function handleListClick (page, options) {\n  const { state, setState, data , api} = options;  \n  setState(value => ({...value, \n    selected_index: data.row,\n    selected_id: data.ID,\n    player_url: \"https://s3.amazonaws.com/box.import/\" + data.FileKey,\n    track_name: data.Title,\n    album_image: data.albumImage,\n    artist_name: data.artistName\n  }));\n\nconsole.log({data})\n  setTimeout (() => {\n    api.execRefByName('aux', player => {\n      !!player && player.play();\n    }) \n  }, 888)\n \n}\n",
            "ID": 1
          },
          {
            "name": "Handle data loaded",
            "code": "function handleDataLoaded (page, options) {\n  const { state, setState, data } = options; \n  !!data?.count && setState(s => ({...s, \n     page_count: Math.ceil(data.count / 100),\n     row_count: data.count,\n     records: data.records\n  }))\n}\n",
            "ID": 2
          },
          {
            "name": "Handle play click",
            "code": "function handlePlayClick (page, options) {\n  const { state, setState, api } = options; \n  const player = api.getRefByName('aux');  \n  if (!player) return api.Alert('No player!'); \n  if (player.paused) return player.play()\n  player.pause(); \n}\n",
            "ID": 3
          },
          {
            "name": "Set player progress",
            "code": "function setPlayerProgress (page, options) {\n  const { state, setState, data, api } = options; \n  if (!data?.progress) return;\n  const formatted = api.moment.utc(data.duration*1000).format('mm:ss');\n  const progress = api.moment.utc(data.currentTime * 1000).format('mm:ss');\n\n  !!data?.progress && setState(s => ({...s, \n     player_progress: Math.round(data.progress * 100),\n     player_progress_formatted: progress,\n     player_duration:  formatted \n})) \n}\n",
            "ID": 4
          },
          {
            "name": "handle end track",
            "code": "function handleEndTrack (page, options) {\n  const { state, setState, api } = options; \n  console.log(options)\n  setState(value => {\n    const { records } = value;\n    const selected_index = value.selected_index - (-1);\n    const next_record = records[selected_index];\n    const selected_id = next_record.ID;\n    const player_url = \"https://s3.amazonaws.com/box.import/\" + next_record.FileKey;\n    console.log({ value });\n    return {\n      ...value, \n      selected_index ,\n      selected_id,\n      player_url\n    }\n  });\n\n  const player = api.execRefByName('aux', player => {\n  // player.pause()\n     setTimeout (() => { \n        !!player && player.play();\n     }, 888)\n  }); \n}\n",
            "ID": 5
          },
          {
            "name": "handle slider change",
            "code": "function handleSliderChange (page, options) {\n  const { state, setState , data} = options; \n\n  setState(s => {\n    console.log({ my: s})\n    return s;\n  })\n  console.log({options})\n}\n",
            "ID": 6
          }
        ],
        "ThemeName": "plain",
        "parameters": {}
      },
      {
        "PageName": "Artist Search",
        "PagePath": "artist-search",
        "pageID": 1,
        "components": [
          {
            "ComponentType": "DataGrid",
            "ComponentName": "DataGrid-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onRowClick",
                "action": {
                  "type": "openLink",
                  "params": {
                    "artist_id": "event.ID"
                  },
                  "target": "lb97fg4snqudtrhx1ut"
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":3,\"bindings\":{\"Name\":\"Name\",\"Thumbnail\":\"Thumbnail\"}}"
              },
              {
                "SettingName": "use_id",
                "SettingValue": true
              },
              {
                "SettingName": "selectedColumn",
                "SettingValue": "ID"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb916vigg81ofvo7swd",
            "order": 300
          },
          {
            "ComponentType": "InfoCard",
            "ComponentName": "InfoCard-1",
            "componentID": "lb919jkwhgf29jm8ire",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "1"
              },
              {
                "SettingName": "subtext",
                "SettingValue": ""
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
                "SettingValue": "4"
              },
              {
                "SettingName": "below_image",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb919nuuds78atd62eg",
            "order": 500
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onImageLoad",
                "action": {
                  "type": "dataExec",
                  "target": 3,
                  "terms": {
                    "page": "page",
                    "type": "type",
                    "param": "parameters.artistname"
                  }
                },
                "ID": 1
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb95gpxdbyqoig9hpso",
            "order": 50,
            "componentID": "lb9dsgw47k27tpzdb6v"
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-1",
            "state": [],
            "styles": [
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-top",
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
                "SettingValue": "Search results for \"{parameters.artistname}\""
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9dqdxlyv36qtwjx8",
            "order": 250
          },
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
                "Key": "align-items",
                "Value": "center"
              },
              {
                "Key": "background-color",
                "Value": "{\"name\":\"Background - Secondary\",\"value\":\"rgb(246,246,248)\"}"
              },
              {
                "Key": "padding",
                "Value": "Xs/0.25"
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
            "ID": "lb9dsgw47k27tpzdb6v",
            "order": 25
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-2",
            "componentID": "lb9dsgw47k27tpzdb6v",
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
            "ID": "lb9dt3xeag9zis1kwnd",
            "order": 600
          }
        ],
        "appID": 2,
        "ID": "lb8ze9w2fnicvqn2hed",
        "parameters": {
          "artistname": "bob"
        },
        "scripts": [],
        "state": [
          {
            "Key": "page",
            "Value": "1",
            "Type": "string",
            "ID": "lb90wlizhv5183cspz"
          },
          {
            "Key": "type",
            "Value": "artist",
            "Type": "string",
            "ID": "lb90wlj08odnqb5erfb"
          }
        ]
      },
      {
        "PageName": "Artists",
        "PagePath": "artists",
        "pageID": 1,
        "components": [
          {
            "ComponentType": "DataGrid",
            "ComponentName": "DataGrid-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onRowClick",
                "action": {
                  "type": "openLink",
                  "params": {
                    "artist_id": "event.ID"
                  },
                  "target": "lb97fg4snqudtrhx1ut"
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":5,\"bindings\":{\"Name\":\"Name\",\"Thumbnail\":\"Thumbnail\",\"TrackCount\":\"TrackCount\"}}"
              },
              {
                "SettingName": "truncate",
                "SettingValue": "55"
              },
              {
                "SettingName": "nowrap",
                "SettingValue": true
              },
              {
                "SettingName": "use_id",
                "SettingValue": true
              },
              {
                "SettingName": "selectedColumn",
                "SettingValue": "ID"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9796t9rhznxvven6b",
            "order": 100,
            "componentID": "lb9epf3ke7316uwh929"
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onImageLoad",
                "action": {
                  "type": "dataExec",
                  "target": 5,
                  "terms": {
                    "sort": "sort",
                    "direction": "direction",
                    "page": "page",
                    "type": "type"
                  }
                },
                "ID": 1
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb99lnmxxd955lndnn",
            "order": 25,
            "componentID": "lb9dflx1w8us3zu0jaj"
          },
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
                "Key": "align-items",
                "Value": "center"
              },
              {
                "Key": "gap",
                "Value": "8px"
              },
              {
                "Key": "background-color",
                "Value": "{\"name\":\"Background - Secondary\",\"value\":\"rgb(246,246,248)\"}"
              },
              {
                "Key": "padding",
                "Value": "Xs/0.25"
              },
              {
                "Key": "margin",
                "Value": "null"
              },
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-bottom",
                "Value": "Sm/0.5"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb9dflx1w8us3zu0jaj",
            "order": 13
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-1",
            "componentID": "lb9dflx1w8us3zu0jaj",
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
            "ID": "lb9dftbvptjaemr4pp",
            "order": 200
          },
          {
            "ComponentType": "Pagination",
            "ComponentName": "Pagination-1",
            "state": [],
            "styles": [
              {
                "Key": "margin",
                "Value": "Sm/0.5"
              }
            ],
            "events": [
              {
                "event": "onPageChange",
                "action": {
                  "type": "dataExec",
                  "target": 5,
                  "terms": {
                    "sort": "sort",
                    "direction": "direction",
                    "page": "event.page",
                    "type": "type"
                  }
                },
                "ID": 1
              },
              {
                "event": "onPageChange",
                "action": {
                  "type": "setState",
                  "target": "page",
                  "value": "event.page"
                },
                "ID": 2
              },
              {
                "event": "onPageChange",
                "action": {
                  "type": "dataExec",
                  "target": 5,
                  "terms": {
                    "sort": "sort",
                    "direction": "direction",
                    "page": "event.page",
                    "type": "type"
                  }
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
                "SettingName": "variant",
                "SettingValue": "outlined"
              },
              {
                "SettingName": "color",
                "SettingValue": "secondary"
              },
              {
                "SettingName": "shape",
                "SettingValue": "rounded"
              },
              {
                "SettingName": "size",
                "SettingValue": "small"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9dhs4qzxaylft2dgo",
            "order": 63,
            "boundProps": [
              {
                "boundTo": "page",
                "attribute": "page"
              },
              {
                "boundTo": "page_count",
                "attribute": "count"
              }
            ],
            "componentID": "lb9elsmucmrti62a2nl"
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-1",
            "componentID": "lb9dflx1w8us3zu0jaj",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb9dlo0vp6nx69bjt8",
            "order": 300
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-1",
            "componentID": "lb9dflx1w8us3zu0jaj",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onEnterPress",
                "action": {
                  "type": "openLink",
                  "target": "lb8ze9w2fnicvqn2hed",
                  "params": {
                    "artistname": "artist_search"
                  }
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "Artist search"
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
            "ID": "lb9dlvvnvzd6a6i4dm",
            "order": 400,
            "boundProps": [
              {
                "boundTo": "artist_search",
                "attribute": "value"
              }
            ]
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-1",
            "componentID": "lb9dflx1w8us3zu0jaj",
            "state": [],
            "styles": [
              {
                "Key": "top",
                "Value": ""
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "openLink",
                  "params": {
                    "artistname": "artist_search"
                  },
                  "target": "lb8ze9w2fnicvqn2hed"
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9dn5vngxxhl1qpkzm",
            "order": 500
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
                "Value": 5
              },
              {
                "Key": "gap",
                "Value": "4px"
              },
              {
                "Key": "grid-template-rows",
                "Value": "null"
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
                "SettingValue": "{\"resourceID\":5,\"bindings\":{\"Name\":{\"title\":\"InfoCard-1.label\",\"componentID\":\"lb9e3e7c73iquscy98b\",\"SettingName\":\"label\"},\"Thumbnail\":{\"title\":\"InfoCard-1.image\",\"componentID\":\"lb9e3e7c73iquscy98b\",\"SettingName\":\"image\"}}}"
              },
              {
                "SettingName": "use_id",
                "SettingValue": true
              },
              {
                "SettingName": "selectedColumn",
                "SettingValue": "ID"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9e396iqhuz8k4x5",
            "order": 82,
            "componentID": "lb9eoqqucwwl01uxz7f"
          },
          {
            "ComponentType": "InfoCard",
            "ComponentName": "InfoCard-1",
            "componentID": "lb9e396iqhuz8k4x5",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onCardClick",
                "action": {
                  "type": "openLink",
                  "params": {
                    "artist_id": "event.ID"
                  },
                  "target": "lb97fg4snqudtrhx1ut"
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "label",
                "SettingValue": "x"
              },
              {
                "SettingName": "use_image",
                "SettingValue": true
              },
              {
                "SettingName": "image",
                "SettingValue": "y"
              },
              {
                "SettingName": "below_image",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9e3e7c73iquscy98b",
            "order": 600
          },
          {
            "ComponentType": "Box",
            "ComponentName": "Box-2",
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
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb9elsmucmrti62a2nl",
            "order": 44
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-2",
            "componentID": "lb9elsmucmrti62a2nl",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb9emeh8twuozn7knxj",
            "order": 700
          },
          {
            "ComponentType": "Link",
            "ComponentName": "Link-1",
            "componentID": "lb9etp7lk3ghb7m1sg",
            "state": [],
            "styles": [
              {
                "Key": "white-space",
                "Value": "nowrap"
              },
              {
                "Key": "text-overflow",
                "Value": "ellipsis"
              },
              {
                "Key": "overflow",
                "Value": "hidden"
              },
              {
                "Key": "cursor",
                "Value": "pointer"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": "lb9epf3ke7316uwh929",
                  "open": true
                },
                "ID": 1
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": "lb9eoqqucwwl01uxz7f",
                  "open": false
                },
                "ID": 2
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "open": true,
                  "target": "lb9euevu4jxc2xjyu6"
                },
                "ID": 3
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": "lb9etp7lk3ghb7m1sg",
                  "open": false
                },
                "ID": 4
              }
            ],
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
                "SettingValue": "View as list"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9eo16omr21o8x2q8i",
            "order": 800
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "grid",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb9eoqqucwwl01uxz7f",
            "order": 73
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "Collapse-2",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb9epf3ke7316uwh929",
            "order": 91
          },
          {
            "ComponentType": "Link",
            "ComponentName": "Link-2",
            "componentID": "lb9euevu4jxc2xjyu6",
            "state": [],
            "styles": [
              {
                "Key": "margin-edges",
                "Value": true
              },
              {
                "Key": "margin-left",
                "Value": "Lg/1"
              },
              {
                "Key": "white-space",
                "Value": "nowrap"
              },
              {
                "Key": "text-overflow",
                "Value": "ellipsis"
              },
              {
                "Key": "overflow",
                "Value": "hidden"
              },
              {
                "Key": "cursor",
                "Value": "pointer"
              }
            ],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": "lb9eoqqucwwl01uxz7f",
                  "open": true
                },
                "ID": 1
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "open": false,
                  "target": "lb9epf3ke7316uwh929"
                },
                "ID": 2
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "target": "lb9etp7lk3ghb7m1sg",
                  "open": true
                },
                "ID": 3
              },
              {
                "event": "onClick",
                "action": {
                  "type": "modalOpen",
                  "open": false,
                  "target": "lb9euevu4jxc2xjyu6"
                },
                "ID": 4
              }
            ],
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
                "SettingValue": "View as grid"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9er68cz6o934k3ban",
            "order": 900
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "listbtn",
            "componentID": "lb9elsmucmrti62a2nl",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "orientation",
                "SettingValue": "horizontal"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9etp7lk3ghb7m1sg",
            "order": 1000
          },
          {
            "ComponentType": "Collapse",
            "ComponentName": "gridbtn",
            "componentID": "lb9elsmucmrti62a2nl",
            "children": true,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "orientation",
                "SettingValue": "horizontal"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9euevu4jxc2xjyu6",
            "order": 1100
          },
          {
            "ComponentType": "Carousel",
            "ComponentName": "Carousel-1",
            "state": [],
            "styles": [
              {
                "Key": "cursor",
                "Value": "pointer"
              }
            ],
            "events": [
              {
                "event": "onCarouselClick",
                "action": {
                  "type": "scriptRun",
                  "target": "lbbac22auz9kyw42w7q"
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "speed",
                "SettingValue": 10
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lbba7q7ctfovqjxh02s",
            "order": 35,
            "boundProps": [
              {
                "boundTo": "image_list",
                "attribute": "images"
              }
            ]
          }
        ],
        "appID": 2,
        "ID": "lb96vttztfceczevxjd",
        "state": [
          {
            "Key": "sort",
            "Value": "Name",
            "Type": "string",
            "ID": "lb97bd8eub9i59za1y"
          },
          {
            "Key": "direction",
            "Value": "ASC",
            "Type": "string",
            "ID": "lb97bd8fgr6kygtd329"
          },
          {
            "Key": "page",
            "Value": "1",
            "Type": "string",
            "ID": "lb97bd8ffh8o3gpi11b"
          },
          {
            "Key": "type",
            "Value": "artist",
            "Type": "string",
            "ID": "lb97bd8fn456il7kf5"
          },
          {
            "Key": "artist_search",
            "Value": "",
            "Type": "string",
            "ID": "lb9dmilne951igr3weg"
          },
          {
            "Key": "page_count",
            "Value": "",
            "Type": "string",
            "ID": "lb9zyou6gfggomwxm1e"
          },
          {
            "Key": "row_count",
            "Value": "",
            "Type": "string",
            "ID": "lb9zyou6x4dkx40rcp"
          },
          {
            "Key": "image_list",
            "Value": "",
            "Type": "string",
            "ID": "lbb9aonqlv8s4ys44lb"
          },
          {
            "Key": "records",
            "Value": "",
            "Type": "array",
            "ID": "lbbai9e1jjeeikulrsr"
          }
        ],
        "ThemeName": "plain",
        "scripts": [
          {
            "name": "data loaded",
            "code": "function handleDataLoaded (page, options) {\n  const { state, setState, data } = options; \n  !!data?.count && setState(s => ({...s, \n     page_count: Math.ceil(data.count / 100),\n     row_count: data.count,\n     records: data.records\n  }))\n}\n",
            "ID": "lb9zx6gyprgdnqkbjia"
          },
          {
            "name": "populate images",
            "code": "function setImageList (page, options) {\n  const { state, setState, data } = options; \n  const image_list = data.records\n  .filter(f => !!f.TrackCount)\n  .map(i => ({\n    src: i.imageLg,\n    text: i.Name,\n    subtext: `${i.TrackCount} tracks in your library`\n  })).filter(f => !!f.src )\n  console.log(data)\n  setState(s => ({...s, image_list}));\n}\n",
            "ID": "lbb9bir3f3k9yoawpz"
          },
          {
            "name": "carousel_click",
            "code": "function carousel_click (page, options) {\n  const { state, setState, data , api} = options; \n  console.log ({options});\n  setState(s => {\n    console.log ('************',s.records);\n    const q = s.records?.find(e => e.imageLg === data.src)\n    alert(q.ID)\n    api.openPath('artist', {\n       artist_id: 'event.key'\n    }, {key: q.ID})\n    return s;\n  })\n}\n",
            "ID": "lbbac22auz9kyw42w7q"
          }
        ]
      },
      {
        "PageName": "Artist",
        "PagePath": "artist",
        "pageID": "lb96vttztfceczevxjd",
        "components": [
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
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":6,\"bindings\":{\"Title\":\"Title\",\"Genre\":\"Genre\",\"trackTime\":\"trackTime\",\"albumName\":\"albumName\",\"trackNumber\":\"trackNumber\"}}"
              },
              {
                "SettingName": "truncate",
                "SettingValue": "50"
              },
              {
                "SettingName": "nowrap",
                "SettingValue": true
              },
              {
                "SettingName": "use_id",
                "SettingValue": true
              },
              {
                "SettingName": "selectedColumn",
                "SettingValue": "ID"
              },
              {
                "SettingName": "row-color",
                "SettingValue": "secondary"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb97foqka19544aqer8",
            "order": 223,
            "boundProps": [
              {
                "boundTo": "selected_id",
                "attribute": "selectedID"
              }
            ],
            "componentID": "lba5auvwyz03ugpfi58"
          },
          {
            "ComponentType": "AudioPlayer",
            "ComponentName": "aux2",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onPlayerEnded",
                "action": {
                  "type": "scriptRun",
                  "target": "lb9z7am8qe57w35jkxa"
                },
                "ID": 1
              }
            ],
            "settings": [
              {
                "SettingName": "controls",
                "SettingValue": false
              },
              {
                "SettingName": "autoplay",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb98sr287lm6agi4fri",
            "order": 200,
            "boundProps": [
              {
                "boundTo": "player_url",
                "attribute": "src"
              }
            ]
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onImageLoad",
                "action": {
                  "type": "dataExec",
                  "target": 6,
                  "terms": {
                    "fields": "fields",
                    "direction": "direction",
                    "page": "page",
                    "type": "type",
                    "id": "parameters.artist_id"
                  }
                },
                "ID": 1
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb993db05mj6d8y7zea",
            "order": 25,
            "componentID": "lb9ddn97kouxbwngl4s"
          },
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
                "Key": "align-items",
                "Value": "center"
              },
              {
                "Key": "padding",
                "Value": "Xs/0.25"
              },
              {
                "Key": "background-color",
                "Value": "{\"name\":\"Background - Secondary\",\"value\":\"rgb(246,246,248)\"}"
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
            "ID": "lb9ddn97kouxbwngl4s",
            "order": 44
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-1",
            "componentID": "lb9ddn97kouxbwngl4s",
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
            "ID": "lb9ddvvc6z0sl4r4ajj",
            "order": 300
          },
          {
            "ComponentType": "Box",
            "ComponentName": "caption",
            "componentID": "lb9f68hq2ney8nzi0zv",
            "children": true,
            "state": [],
            "styles": [
              {
                "Key": "position",
                "Value": "absolute"
              },
              {
                "Key": "top",
                "Value": "200px"
              },
              {
                "Key": "left",
                "Value": "60px"
              }
            ],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lb9f715vea9agq3m8wt",
            "order": 400
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-2",
            "componentID": "lb9f715vea9agq3m8wt",
            "state": [],
            "styles": [
              {
                "Key": "color",
                "Value": "{\"name\":\"Background - Primary\",\"value\":\"rgb(255,255,255)\"}"
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
                "SettingValue": "h3"
              },
              {
                "SettingName": "children",
                "SettingValue": " {artist_name} "
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9f7e5h26aic2ra6s3",
            "order": 500
          },
          {
            "ComponentType": "Typography",
            "ComponentName": "Typography-3",
            "componentID": "lb9f715vea9agq3m8wt",
            "state": [],
            "styles": [
              {
                "Key": "color",
                "Value": "{\"name\":\"Background - Primary\",\"value\":\"rgb(255,255,255)\"}"
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
                "SettingValue": "body1"
              },
              {
                "SettingName": "children",
                "SettingValue": " {track_count} tracks in your library"
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lb9fo51mg09pb73tt9o",
            "order": 600
          },
          {
            "ComponentType": "ScrollCouple",
            "ComponentName": "ScrollCouple-1",
            "children": 1,
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lba5auvwyz03ugpfi58",
            "order": 700
          },
          {
            "ComponentType": "Image",
            "ComponentName": "Image-2",
            "componentID": "lba5auvwyz03ugpfi58",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lbb1ocn8fwmsfa0gdv8",
            "order": 54,
            "boundProps": [
              {
                "boundTo": "image_large",
                "attribute": "src"
              }
            ]
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-1",
            "componentID": "lb9ddn97kouxbwngl4s",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onEnterPress",
                "action": {
                  "type": "openLink",
                  "target": "lb8ze9w2fnicvqn2hed",
                  "params": {
                    "artistname": "artist_param"
                  }
                },
                "ID": 1
              }
            ],
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
            "ID": "lbbbroounbexo548qfi",
            "order": 700,
            "boundProps": [
              {
                "boundTo": "artist_param",
                "attribute": "value"
              }
            ]
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-1",
            "componentID": "lb9ddn97kouxbwngl4s",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lbbbsm6xfkcaynuwp9r",
            "order": 650
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-1",
            "componentID": "lb9ddn97kouxbwngl4s",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "openLink",
                  "target": "lb8ze9w2fnicvqn2hed",
                  "params": {
                    "artistname": "artist_param"
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lbbbxq4sexcflfq9o86",
            "order": 800
          }
        ],
        "appID": 2,
        "ID": "lb97fg4snqudtrhx1ut",
        "parameters": {
          "artist_id": "151"
        },
        "state": [
          {
            "Key": "fields",
            "Value": "albumFk, discNumber, trackNumber",
            "Type": "string",
            "ID": "lb98p7conhqai60fn8"
          },
          {
            "Key": "direction",
            "Value": "ASC",
            "Type": "string",
            "ID": "lb98p7coyv1n0hg8ch"
          },
          {
            "Key": "page",
            "Value": "1",
            "Type": "string",
            "ID": "lb98p7co5jkom7vabzh"
          },
          {
            "Key": "type",
            "Value": "artist",
            "Type": "string",
            "ID": "lb98p7cp4f7ka8km2ao"
          },
          {
            "Key": "id",
            "Value": "",
            "Type": "string",
            "ID": "lb98p7cplg0lej9tetd"
          },
          {
            "Key": "selected_index",
            "Value": "",
            "Type": "string",
            "ID": "lb98vbga3q37cbplhg7"
          },
          {
            "Key": "selected_id",
            "Value": "",
            "Type": "string",
            "ID": "lb98vbga1lojjn2lh3r"
          },
          {
            "Key": "player_url",
            "Value": "",
            "Type": "string",
            "ID": "lb98vbgbcrkz1l8bq4r"
          },
          {
            "Key": "track_name",
            "Value": "",
            "Type": "string",
            "ID": "lb98vbgbv2kjcu9z94d"
          },
          {
            "Key": "album_image",
            "Value": "",
            "Type": "string",
            "ID": "lb98vbgb0m5wp6w91b9"
          },
          {
            "Key": "artist_name",
            "Value": "",
            "Type": "string",
            "ID": "lb98vbgcs1yx4jfw0zk"
          },
          {
            "Key": "image_large",
            "Value": "",
            "Type": "string",
            "ID": "lb9a6qti5s0xkqr468s"
          },
          {
            "Key": "track_count",
            "Value": "",
            "Type": "string",
            "ID": "lb9fl6cvppb9fonnd5f"
          },
          {
            "Key": "artist_param",
            "Value": "",
            "Type": "string",
            "ID": "lbbbz67u3xxj6pdz5e9"
          }
        ],
        "scripts": [
          {
            "name": "on list click",
            "code": "function handleListClick (page, options) {\n  const { state, setState, data , api} = options;  \n  setState(value => ({...value, \n    selected_index: data.row,\n    selected_id: data.ID,\n    player_url: \"https://s3.amazonaws.com/box.import/\" + data.FileKey,\n    track_name: data.Title,\n    album_image: data.albumImage,\n    artist_name: data.artistName\n  }));\n\nconsole.log({data})\n  setTimeout (() => {\n    api.execRefByName('aux2', player => {\n      !!player && player.play();\n    }) \n  }, 888)\n \n}\n",
            "ID": 1
          },
          {
            "name": "data loaded",
            "code": "function onDataLoaded (page, { data, setState }) {\n   if (data.row?.length) {\n      \n      const info = data.row[0];\n      if (!info) return;\n      const { imageLg, Name: artist_name, TrackCount: track_count } = info;\n      setState(old => ({\n         ...old,\n         image_large: imageLg,\n         artist_name,\n         track_count, \n         records: data.related.records\n      }))\n   }\n \n}",
            "ID": "lb9z73gls96mf0d0z8j"
          },
          {
            "name": "play end",
            "code": "function handleEndTrack (page, options) {\n  const { state, setState, api } = options; \n  console.log(options)\n  setState(value => {\n    const { records } = value;\n    const selected_index = value.selected_index - (-1);\n    const next_record = records[selected_index];\n    const selected_id = next_record.ID;\n    const player_url = \"https://s3.amazonaws.com/box.import/\" + next_record.FileKey;\n    console.log({ value });\n    return {\n      ...value, \n      selected_index ,\n      selected_id,\n      player_url\n    }\n  });\n\n  const player = api.execRefByName('aux2', player => {\n  // player.pause()\n     setTimeout (() => { \n        !!player && player.play();\n     }, 888)\n  }); \n}",
            "ID": "lb9z7am8qe57w35jkxa"
          }
        ],
        "ThemeName": "plain"
      },
      {
        "PageName": "Music Search",
        "PagePath": "music-search",
        "pageID": 1,
        "components": [
          {
            "ComponentType": "DataGrid",
            "ComponentName": "DataGrid-1",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [
              {
                "SettingName": "emptyMessage",
                "SettingValue": "No records to display."
              },
              {
                "SettingName": "bindings",
                "SettingValue": "{\"resourceID\":2,\"bindings\":{\"Title\":\"Title\",\"Genre\":\"Genre\",\"trackNumber\":\"trackNumber\",\"trackTime\":\"trackTime\",\"artistName\":\"artistName\",\"albumName\":\"albumName\"}}"
              },
              {
                "SettingName": "truncate",
                "SettingValue": "55"
              },
              {
                "SettingName": "nowrap",
                "SettingValue": true
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lbb414rgzg253mdjrlb",
            "order": 100
          },
          {
            "ComponentType": "Avatar",
            "ComponentName": "Avatar-1",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onImageLoad",
                "action": {
                  "type": "dataExec",
                  "target": 2,
                  "terms": {
                    "page": "page",
                    "type": "type",
                    "param": "parameters.param"
                  }
                },
                "ID": 1
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
              }
            ],
            "scripts": [],
            "data": [],
            "ID": "lbb47mmv0d0jd1dr9dv",
            "order": 50,
            "componentID": "lbb4j0982qyq5h5fvik"
          },
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
                "Key": "align-items",
                "Value": "center"
              },
              {
                "Key": "gap",
                "Value": "8px"
              },
              {
                "Key": "padding",
                "Value": "Xs/0.25"
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
            "ID": "lbb4j0982qyq5h5fvik",
            "order": 75
          },
          {
            "ComponentType": "Textbox",
            "ComponentName": "Textbox-1",
            "componentID": "lbb4j0982qyq5h5fvik",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onEnterPress",
                "action": {
                  "type": "dataExec",
                  "target": 2,
                  "terms": {
                    "page": "page",
                    "type": "type",
                    "param": "param_text"
                  }
                },
                "ID": 1
              }
            ],
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
            "ID": "lbb4kgqa3b752r68xmi",
            "order": 200,
            "boundProps": [
              {
                "boundTo": "param_text",
                "attribute": "value"
              }
            ]
          },
          {
            "ComponentType": "Spacer",
            "ComponentName": "Spacer-1",
            "componentID": "lbb4j0982qyq5h5fvik",
            "state": [],
            "styles": [],
            "events": [],
            "settings": [],
            "scripts": [],
            "data": [],
            "ID": "lbb4kqn7fsla0li5mla",
            "order": 150
          },
          {
            "ComponentType": "Button",
            "ComponentName": "Button-1",
            "componentID": "lbb4j0982qyq5h5fvik",
            "state": [],
            "styles": [],
            "events": [
              {
                "event": "onClick",
                "action": {
                  "type": "dataExec",
                  "target": 2,
                  "terms": {
                    "page": "page",
                    "type": "type",
                    "param": "param_text"
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
            "ID": "lbb4ndf5f2svm0s5b67",
            "order": 300
          }
        ],
        "appID": 2,
        "ID": "lbb3z5v12nx08l94bhs",
        "state": [
          {
            "Key": "page",
            "Value": "1",
            "Type": "string",
            "ID": "lbb42psd29njw36ezke"
          },
          {
            "Key": "type",
            "Value": "music",
            "Type": "string",
            "ID": "lbb42vjvmw4gu1sg4u"
          },
          {
            "Key": "param_text",
            "Value": "",
            "Type": "string",
            "ID": "lbb4lnc42hoxljy5q2w"
          }
        ],
        "parameters": {
          "param": "love"
        },
        "ThemeName": "plain"
      }
    ],
    "connections": [
      {
        "name": "iTunes Search API",
        "type": "rest",
        "root": "https://itunes.apple.com",
        "ID": 1
      },
      {
        "name": "Sky Tunes API",
        "type": "rest",
        "root": "https://u8m0btl997.execute-api.us-east-1.amazonaws.com",
        "ID": 2
      }
    ],
    "resources": [
      {
        "connectionID": 2,
        "name": "Load all tracks",
        "method": "GET",
        "columns": [
          "Title",
          "FileKey",
          "albumImage",
          "artistName",
          "albumName",
          "Genre",
          "trackNumber",
          "discNumber",
          "ID"
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
        "ID": 1,
        "node": "records",
        "events": [
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "target": "lb7rfc2edas9zl7iul",
              "open": false
            },
            "ID": "lb7rgebdupm3omtgd6"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "scriptRun",
              "target": 2
            },
            "ID": "lb7th1qyvr707w2b28"
          },
          {
            "event": "loadStarted",
            "action": {
              "type": "modalOpen",
              "open": true,
              "target": "lb7rfc2edas9zl7iul"
            },
            "ID": "lb7u416hyz13k0vp5i8"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "target": "lb8nsoqfjgzig8q4gy",
              "open": true
            },
            "ID": "lb8nwbn6g5la5uhjblo"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "target": "lb8nvaqnoogfgfrpzd",
              "open": false
            },
            "ID": "lb8nwlziouo0ugaei4"
          }
        ]
      },
      {
        "connectionID": 2,
        "name": "Music Search",
        "method": "GET",
        "columns": [
          "FileKey",
          "Title",
          "albumImage",
          "Genre",
          "discNumber",
          "trackTime",
          "trackNumber",
          "artistName",
          "albumName"
        ],
        "values": [
          {
            "key": "page"
          },
          {
            "key": "type"
          },
          {
            "key": "param"
          }
        ],
        "path": "/search",
        "format": "rest",
        "node": "records",
        "ID": 2,
        "events": [
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "open": true,
              "target": "lb8nvaqnoogfgfrpzd"
            },
            "ID": "lb8nxdvc9x0dr88fnap"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "open": false,
              "target": "lb8nsoqfjgzig8q4gy"
            },
            "ID": "lb8nxkcotv7bhcqkk0e"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "open": false,
              "target": "lb7rfc2edas9zl7iul"
            },
            "ID": "lb8o173dy4ko7y9i8es"
          },
          {
            "event": "loadStarted",
            "action": {
              "type": "modalOpen",
              "open": true,
              "target": "lb7rfc2edas9zl7iul"
            },
            "ID": "lb8o1frs4dgdvq25qh"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "scriptRun",
              "target": 2
            },
            "ID": "lb8o9vfttoqwk55vru"
          }
        ]
      },
      {
        "connectionID": 2,
        "name": "Artist Search",
        "method": "GET",
        "columns": [
          "ID",
          "Name",
          "Thumbnail",
          "imageLg",
          "TrackCount"
        ],
        "values": [
          {
            "key": "page",
            "value": "1"
          },
          {
            "key": "type",
            "value": "artist"
          },
          {
            "key": "param",
            "value": "zaz"
          }
        ],
        "ID": 3,
        "format": "rest",
        "path": "/search",
        "node": "records"
      },
      {
        "connectionID": 2,
        "name": "Artist List",
        "method": "GET",
        "columns": [
          "Name",
          "ID",
          "Thumbnail",
          "imageLg",
          "TrackCount"
        ],
        "values": [
          {
            "key": "sort",
            "value": "Name"
          },
          {
            "key": "direction",
            "value": "ASC"
          },
          {
            "key": "page",
            "value": "1"
          },
          {
            "key": "type",
            "value": "artist"
          }
        ],
        "path": "/request",
        "format": "rest",
        "ID": 5,
        "node": "records",
        "events": [
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "target": "lb9eoqqucwwl01uxz7f",
              "open": true
            },
            "ID": "lb9evbua1mfbj4i3hmg"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "target": "lb9etp7lk3ghb7m1sg",
              "open": true
            },
            "ID": "lb9evkz2356iacxaqqb"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "open": false,
              "target": "lb9euevu4jxc2xjyu6"
            },
            "ID": "lb9ezcbu17nmfhgz8ulj"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "modalOpen",
              "target": "lb9epf3ke7316uwh929",
              "open": false
            },
            "ID": "lb9f08f7vf26us66jzi"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "scriptRun",
              "target": "lb9zx6gyprgdnqkbjia"
            },
            "ID": "lb9zzv3tcvk1jpyx9j"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "scriptRun",
              "target": "lbb8hm0r7eoypplz4c6"
            },
            "ID": "lbb8k90cwk54qswp8mr"
          },
          {
            "event": "dataLoaded",
            "action": {
              "type": "scriptRun",
              "target": "lbb9bir3f3k9yoawpz"
            },
            "ID": "lbb9cbc4fvi0kdngz3p"
          }
        ]
      },
      {
        "connectionID": 2,
        "name": "Artist Detail",
        "method": "GET",
        "columns": [
          "Title",
          "FileKey",
          "albumImage",
          "Genre",
          "discNumber",
          "trackTime",
          "artistName",
          "trackNumber",
          "albumName",
          "ID"
        ],
        "values": [
          {
            "key": "fields",
            "value": "albumFk, discNumber, trackNumber"
          },
          {
            "key": "direction",
            "value": "ASC"
          },
          {
            "key": "page",
            "value": "1"
          },
          {
            "key": "type",
            "value": "artist"
          },
          {
            "key": "id",
            "value": "151"
          }
        ],
        "path": "/request",
        "ID": 6,
        "format": "rest",
        "node": "related.records",
        "events": [
          {
            "event": "dataLoaded",
            "action": {
              "type": "scriptRun",
              "target": "lb9z73gls96mf0d0z8j"
            },
            "ID": "lb9z8emerpi90yki9qt"
          }
        ]
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
            "black": "#000",
            "white": "#fff"
          },
          "primary": {
            "main": "#1976d2",
            "light": "#42a5f5",
            "dark": "#1565c0",
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
        "ID": "lb8o2lss0t9v67cvab9j"
      }
    ],
    "components": [
      {
        "ComponentType": "Button",
        "ComponentName": "Button-1",
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
        "ID": "lbb6894h2cq4pgp2spw",
        "order": 0
      }
    ],
    "Photo": "https://www.sky-tunes.com/assets/icon-72x72.png"
  }
]