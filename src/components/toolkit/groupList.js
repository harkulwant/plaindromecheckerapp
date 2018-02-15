// groupList.js

import React from 'react';
import PropTypes from 'prop-types';

const GroupList = (props) => {
  const { items, groupAndSort } = props;

  
  // https://codereview.stackexchange.com/questions/37028/grouping-elements-in-array-by-multiple-properties
  let groupBy = (arr) => {

    let signedItems = arr.map((x, i) => {
      let signature = x.value.replace(/[^A-Z0-9]/ig,'').toLowerCase();

      if(!groupAndSort)
        signature = signature + i;

      return {
        value: x.value,
        signature: signature,
      };
    });

    let groups = {};

    signedItems.forEach((signedItem) => {
      let group = signedItem.signature;
      groups[group] = groups[group] || [];
      groups[group].push(signedItem);
    });

    let groupByItems = Object.keys(groups).map(g => {
      let groupItems = groups[g];
      let count = groupItems.length;
      let latestAdded = groupItems.splice(-1, 1);

      return {
        key: g,
        value: latestAdded[0].value, // get the latest added item
        count: groupAndSort ? count : undefined,
        groups: groupItems.reverse(),
      };
    });

    if(!groupAndSort)
      return groupByItems.reverse();

    return groupByItems.sort((a,b) => {
      if(a.key < b.key)
        return -1;
      
      if (a.key > b.key)
        return 1;

      return 0;
    });

  };

  return(
    <ul className="list-group">
      { groupBy(items).map((item, index) => {
        return <li className="list-group-item justify-content-between" key={index}>{item.value}<span className="badge badge-pill badge-secondary float-right mt-2">{item.count}</span>
         <div className={"" + (item.count > 1 ? 'child-list' : 'child-list-hidden')}>
            <ul className="list-group">
              {item.groups.map((itemGroup,idx) => { 
                return <li key={item.signature+'.'+idx} className="list-group-item justify-content-between">{itemGroup.value}</li>; }) }
            </ul>
          </div>
        </li>;
      }) }
    </ul>
  );
};


GroupList.propTypes = {
  ...GroupList.propTypes
};

export default GroupList; 