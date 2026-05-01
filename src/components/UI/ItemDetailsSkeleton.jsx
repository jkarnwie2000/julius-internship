import React from "react";
import Skeleton from "./Skeleton";

const itemDetailsSkeleton = () => {
return (
<>
<div className="col-md-6 text-center">
    <Skeleton width="100%" height="100%" />
</div>
<div className="col-md-6">
    <div className="item_info">
     <Skeleton width="300px" height="40px" />    
     <div className="item_info_counts">
     <Skeleton width="80px" height="30px" />
     <Skeleton width="80px" height="30px" />
     </div>
     <Skeleton width="100%" height="80px" />
     <div className="d-flex flex-row">
        <div className="mr40">
            <h6>Owner</h6>
            <div className="item_author">
                <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>                
                </div>
                <div className="author_list_info">
                    <Skeleton width="125px" height="20px" />                
                </div>
            </div>
        </div>
        <div></div>
     </div>    
     <div className="de_tab tab_simple">
    <div className="de_tab_content">
        <h6>Creator</h6>
        <div className="item_author">
            <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <i className="fa fa-check"></i>            
            </div>
            <div className="author_list_info">
                <Skeleton width="125px" height="20px" />
            </div>
        </div>
    </div>
    <div className="spacer-40"></div>
      <h6>Price</h6>
      <div className="nft-item-price"> 
        <Skeleton width="75px" height="20px" />
      </div>
    </div>
  </div>
</div>
</>    
);
};