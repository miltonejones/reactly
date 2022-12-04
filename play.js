const obj = {
  row: {
    ID: 123,
    Name: 'top row'
  },
  related: {
    count: 50,
    records: [
      {
        ID: 1,
        title: 'eureka!'
      },
      {
        ID: 2,
        title: 'eureka!'
      },
      {
        ID: 3,
        title: 'eureka!'
      },
      {
        ID: 4,
        title: 'eureka!'
      },
    ]
  }
}



const drillPath = (object, path) => {
  const arr = path.split('.');
  const first = arr.shift(); 
  const node = object[first] 

  if (arr.length) {
    return drillPath(node, arr.join('.'))
  }

  return node;
}

console.log(JSON.stringify(drillPath(obj, 'related.records'), 0, 2))
 