import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [time, setTime] = useState(Date.now()); // 👈 forces countdown updates

  async function fetchItems() {
    setLoading(true);

    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );

      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  }
  
   
  useEffect(() => {
    fetchItems();
  }, []);

  // 👇 countdown updater (runs every second)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  function getTimeRemaining(expiryDate) {
  const total = expiryDate - Date.now();

  if (total <= 0) return "Expired";

  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}

  function sortItems(filter) {
    setSort(filter);

    const sortedItems = [...items];

    if (filter === "price_low_to_high") {
      sortedItems.sort((a, b) => a.price - b.price);
    }

    if (filter === "price_high_to_low") {
      sortedItems.sort((a, b) => b.price - a.price);
    }

    if (filter === "likes_high_to_low") {
      sortedItems.sort((a, b) => b.likes - a.likes);
    }

    setItems(sortedItems);
  }

  return (
    <>
      <div className="col-md-12">
        <select
          id="filter-items"
          value={sort}
          onChange={(event) => sortItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>

                <div className="de_countdown">
                  <Skeleton width="90px" height="24px" borderRadius="5px" />
                </div>

                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="250px" borderRadius="10px" />
                </div>

                <div className="nft__item_info">
                  <Skeleton width="100px" height="20px" borderRadius="5px" />
                  <div className="nft__item_price">
                    <Skeleton width="60px" height="20px" borderRadius="5px" />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                      <Skeleton width="30px" height="20px" borderRadius="5px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : items.slice(0, visibleItems).map((item) => (
            <div
              key={item.nftId}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {/* ✅ FIXED COUNTDOWN */}
                {item.expiryDate && (
                  <div className="de_countdown">
                    {getTimeRemaining(item.expiryDate)}
                  </div>
                )}

                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {!loading && visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems(visibleItems + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
