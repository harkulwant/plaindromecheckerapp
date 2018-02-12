// groupList.js

import React from 'react';
import PropTypes from 'prop-types';

const GroupList = (props) => {
  const { items, groupAndSort } = props;

  
  // https://codereview.stackexchange.com/questions/37028/grouping-elements-in-array-by-multiple-properties
  let groupBy = (arr) => {

    var signedItems = arr.map((x, i) => {
      var signature = x.value.replace(/[^A-Z0-9]/ig,'').toLowerCase();

      if(!groupAndSort)
        signature = signature + i;

      return {
        value: x.value,
        signature: signature
      };
    });

    var groups = {};

    signedItems.forEach((signedItem) => {
      var group = signedItem.signature;
      groups[group] = groups[group] || [];
      groups[group].push(signedItem);
    });

    var groupByItems = Object.keys(groups).map(g => {
      var groupItems = groups[g];
      var count = groupItems.length;
      return {
        key: g,
        value: groupItems[count - 1].value, // get the latest added item
        count: groupAndSort ? count : undefined,
        groups: groupItems,
      }
    });

    if(!groupAndSort)
      return groupByItems.reverse();

    return groupByItems.sort((a,b) => {
      if(a.value < b.value)
        return -1;
      
      if (a.value > b.value)
        return 1;

      return 0;
    });

  };

  let itemRow = (item, index) =>{
    return <li className="list-group-item justify-content-between" key={index}>{item.value}<span className="badge badge-pill badge-secondary float-right mt-2">{item.count}</span></li>;
  }

  return(
    <ul className="list-group">
      { groupBy(items).map(itemRow) }
    </ul>
  );
};

export default GroupList; 