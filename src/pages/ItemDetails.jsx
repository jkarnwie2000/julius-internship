import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
const { id } = useParams();
const [itemdetails, setItemdetails] = React.useState(null);
const [loading, setLoading] = React.useState(true);

useEffect(() => {
  async function fetchItemDetails() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    const selectedItem = data.find((item) => item.id === Number(id));

    setItemdetails(selectedItem);
    setLoading(false);
  }
  fetchItemDetails();
  window.scrollTo(0, 0);
}, [id]);
return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading
              ? new Array(4).fill(0).find((_, index) => (
                  <div className="itemdetails" key={index}>
                    <div className="itemdetails__nftImage--skeleton"></div>
                    <div className="itemdetails__authorImage--skeleton"></div>
                    <div className="itemdetails__title--skeleton"></div>                    
                    <div className="itemdetails__code--skeleton"></div>                    
                  </div>
                )) : !loading && itemdetails && (
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Link to={`/item-details/${itemdetails.id}`}>
                <img
                  src={itemdetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
                </Link>
              </div>              
              <div className="col-md-6">
                <div className="item_info">
                  <h2>Rainbow Style #194</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      74
                    </div>
                  </div>
                  <p>
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img className="lazy" src={itemdetails.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">Monica Lucas</Link>
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
                          <Link to="/author">
                            <img className="lazy" src={itemdetails.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">Monica Lucas</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                    <Link to={`/item-details/${itemdetails.id}`}>  
                      <img src={itemdetails.ethImage} alt="" />
                      <span>1.85</span>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>) }
      </div>
    </div>
  );
};

export default ItemDetails;
