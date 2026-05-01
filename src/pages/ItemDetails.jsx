import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const collectionsResponse = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        );
        const newItemsResponse = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        );
        const allItems = [...collectionsResponse.data, ...newItemsResponse.data];
        const selectedItem = allItems.find((item) => item.id === Number(id));
        setItemDetails(selectedItem);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width="250px" height="40px" />
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          <Skeleton width="30px" height="20px" />
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          <Skeleton width="30px" height="20px" />
                        </div>
                      </div>
                      <Skeleton width="100%" height="80px" />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width="100px" height="20px" />
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
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width="100px" height="20px" />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton width="80px" height="20px" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                itemDetails && (
                  <>
                    <div className="col-md-6 text-center">
                      <img
                        src={itemDetails.nftImage.replace(/`|\s/g, "")}
                        className="img-fluid img-rounded mb-sm-30 nft-image"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="item_info">
                        <h2>{itemDetails.title}</h2>
                        <div className="item_info_counts">
                          <div className="item_info_views">
                            <i className="fa fa-eye"></i>
                            {itemDetails.views || 242}
                          </div>
                          <div className="item_info_like">
                            <i className="fa fa-heart"></i>
                            {itemDetails.likes || 16}
                          </div>
                        </div>
                        <p>
                          {itemDetails.description ||
                            "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                        </p>
                        <div className="d-flex flex-row">
                          <div className="mr40">
                            <h6>Owner</h6>
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Link
                                  to={`/author/${itemDetails.ownerId || itemDetails.authorId}`}
                                >
                                  <img
                                    className="lazy"
                                    src={itemDetails.ownerImage || itemDetails.authorImage}
                                    alt=""
                                  />
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link
                                  to={`/author/${itemDetails.ownerId || itemDetails.authorId}`}
                                >
                                  {itemDetails.ownerName || itemDetails.title}
                                </Link>
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
                                <Link to={`/author/${itemDetails.authorId}`}>
                                  <img
                                    className="lazy"
                                    src={itemDetails.authorImage}
                                    alt=""
                                  />
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/${itemDetails.authorId}`}>
                                  {itemDetails.authorName || "Karla Sharp"}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="spacer-40"></div>
                          <h6>Price</h6>
                          <div className="nft-item-price">
                            <img src={EthImage} alt="" />
                            <span>{itemDetails.price || 0.77}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;