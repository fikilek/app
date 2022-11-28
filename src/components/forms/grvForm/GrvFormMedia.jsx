import React from "react";

const GrvFormMedia = ({mediaData}) => {
  return <div className="grvFormMedia">{mediaData && mediaData.map(item => {
    return (
      <div className="media-item" key={item.mediaId}>
        <div className="mediaUser" >{ item.user }</div>
        <div className="mediaUrl" >{ item.mediaUrl }</div>
        <div className="mediaDatetime" >{ item.datetime }</div>
      </div>
    )
  })}</div>;
};

export default GrvFormMedia;
