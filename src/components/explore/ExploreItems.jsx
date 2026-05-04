import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
const [items, setItems] = useState([]);
const [visibleItems, setVisibleItems] = useState(8);
const [loading, setLoading] = useState(true);
const [sort, setSort] = useState("");

useEffect(() => {
  async function fetchExploreItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setItems(data);
    setLoading(false);
  }
  fetchExploreItems();
}, []);

const sortedItems = [...items].sort((a, b) => {
  if (sort === "price_low_to_high") return a.price - b.price;
  if (sort === "price_high_to_low") return b.price - a.price;
  if (sort === "likes_high_to_low") return b.likes - a.likes;
  return 0;
});

const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 43 * 60 + 14);

useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 0) {
        clearInterval(interval);
        return 0;
      }

      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

const hours = Math.floor(timeLeft / 3600);
const minutes = Math.floor((timeLeft % 3600) / 60);
const seconds = timeLeft % 60;

return (
    <>      
      <div>
        <select id="filter-items" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {sortedItems.slice(0, visibleItems).map((item) => (       
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={'/author/${item.authorId}'}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">{hours}h {minutes}m {seconds}s</div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={'/item-details/${item.nftId}'}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
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
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};


export default ExploreItems;
