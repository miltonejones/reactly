
import React from 'react';

import { getSettings } from '../components/library/util';
import { AppStateContext, RepeaterContext } from "../context";

export const useRepeater = ({settings, ...props}) => {
  const { pageResourceState, setPageResourceState } = React.useContext(AppStateContext);
  const [dataRows, setDataRows] = React.useState([])
  const [dataBindings, setDataBindings] = React.useState(null)
  // const [resource, setResource] = React.useState(null)
  let resource;
  const args = getSettings(settings);
 
  const { row, index, selectedIndex, ID } = React.useContext(RepeaterContext);


  const selectionCompare = (source, comparedTo) => {
    if (Array.isArray(source)) {
      return source?.map(f => f.toString()).indexOf(comparedTo.toString()) > -1
    }
    return source?.toString() === comparedTo?.toString()
  }

  const isSelected = (row, i) => {
    try {
      if (args.use_id) {
        return selectionCompare(resource.records[i][args.selectedColumn], props.selectedID)
      }
      return selectionCompare(props.selectedIndex, i);
    } catch (e) {
      return false;
    }
  }

  const transformRow = (row, options) => {
    if (row) {
      Object.keys(row).map(boundTo => {
        const binding =  row[boundTo];
        const setting = binding.SettingName;
        const value = binding.record[boundTo];
        options = options?.find(f => f.SettingName === setting)
          ? options?.map(f => f.SettingName === setting ? {...f, SettingValue: value} : f)
          : (options||[]).concat( {SettingName: setting, SettingValue: value } )
      }) 
    }
    return options;
  }

  const changeDataRow = (source, index, key, value) => {
    if (!source) return console.log ('no resource', dataBindings)
    const { records: old } = source;
    const boundTo = Object.keys(dataBindings.bindings)
      .find(f => dataBindings[f].SettingName === key);

      console.log ({boundTo, key});
    if (boundTo) { 

      const records = old.map((record, i) => 
        i === index 
          ? {
              ...record,
              [boundTo]: value
            } 
          : record
        );
 

      setPageResourceState(state => {
        return state.map(res => 
          res.ID === dataBindings.resourceID 
            ? {
              ...res,
              records
            } 
            : res 
          )
      })
    }


  } ;



  const createDataRows = () => {
    if (args.bindings)  {
      const obj = JSON.parse(args.bindings); 
      const id = obj.resourceID;
      resource = pageResourceState.find(f => f.resourceID === id);
      
      // console.log ({ source })
      // setResource(source);
 
      if (resource?.records?.map) {
        setDataBindings(obj);
        setDataRows(resource.records.map(record => {
          return Object.keys(obj.bindings).reduce((items, res) => {
            items[res] = {
              ...obj.bindings[res],
              record
            }
            return items;
          }, {})
        })); 
      }
    }
  } 


  React.useEffect(() => {
    // if (!!dataBindings) return; // console.log(dataBindings);
    createDataRows();
  }, [createDataRows, dataBindings])



  if (row) {
    settings = transformRow(row, settings); 
  }

  return { 
    repeaterProps: {
      index, 
      selectedIndex,
      ID,
      ...row,
    }, 
    dataRows,
    resource,
    transformRow,
    isSelected,
    selectionCompare,
    settings: !row ? null : transformRow(row, settings),
    selected: !row ? false : isSelected(row, index),
    onChange: (key, value) => changeDataRow(resource, index, key, value)
  }
 


}
