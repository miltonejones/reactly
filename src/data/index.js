export const AppData = [
  {
  Name: 'Demo Application',
  path: 'demo-application',
  ID: 1,
  pages: [
    {
      ID: 1,
      PageName: 'Home',
      PagePath: 'home',

      components: [
        {
          ID: 11,
          ComponentType: 'Box',
          ComponentName: 'Box 1',
          children: true,
          styles: [
            {
              Key: 'display',
              Value: 'flex'
            },
            {
              Key: 'gap',
              Value: 8
            }, 
            {
              Key: 'padding',
              Value: 8
            }, 
            {
              Key: 'margin',
              Value: 8
            }, 

          ], 
        },


        {
          ComponentType: 'Button',
          ComponentName: 'Button 1',
          ID: 14,
          componentID: 11,
          settings: [
            {
              SettingName: 'Label',
              SettingValue: 'Button'
            },

            {
              SettingName: 'variant',
              SettingValue: 'outlined'
            }
          ]
        },


        {
          ComponentType: 'Textbox',
          ComponentName: 'Textbox 1',
          componentID: 11,
          ID: 15,
          settings: [ 
            {
              SettingName: 'size',
              SettingValue: 'small'
            },
            {
              SettingName: 'variant',
              SettingValue: 'outlined'
            },
            {
              SettingName: 'value',
              SettingValue: 'Textbox'
            },
            {
              SettingName: 'label',
              SettingValue: 'Enter Text'
            },
            {
              SettingName: 'placeholder',
              SettingValue: 'Placeholder Text'
            }
          ]
        }
      ],

      state: [
        {
          ID: 1,
          Key: 'search_param' 
        },
        {
          ID: 2,
          Key: 'search_type' ,
          Value: 'song'
        }
      ],

      scripts: [],
      data: []

    } ,
    {
      PageName: 'Album List',
      PagePath: 'album-list',
      ID: 2,
      pageID: 1,

      components: [
        {
          ComponentType: 'Box',
          ComponentName: 'Box 1',
          ID: 12,
          children: true,
          styles: [
            {
              Key: 'display',
              Value: 'flex'
            }
          ],
          components: [
          ], 
        },


        {
          ID: 13,
          ComponentType: 'Button',
          ComponentName: 'Button 1',
          componentID: 12,
          settings: [
            {
              SettingName: 'Label',
              SettingValue: 'Button'
            },

            {
              SettingName: 'variant',
              SettingValue: 'outlined'
            }
          ]
        }
      ],

      state: [],
      scripts: [],
      data: []

    }
  ]
},

{

  Name: 'Another Application',
  path: 'another-application',
  ID: 2,
  pages: []
}

]