import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";



const TopSellers = () => {
const [topsellers, setTopsellers] = React.useState([]);
const [loading, setLoading] = React.useState(true);

useEffect(() => {
  async function fetchTopSellers() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      console.log(data);
      setTopsellers(data);
    } catch (error) {
      console.error("Error fetching top sellers:", error);
    } finally {
      setLoading(false);
    }
  }
  fetchTopSellers();
}, []);

return (
<section id="section-popular" className="pb-5">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="text-center">
          <h2>Top Sellers</h2>
          <div className="small-border bg-color-2"></div>
        </div>
      </div>   
      <div className="col-md-12">
        <ol className="author_list">
          {loading
          ?   
          new Array(12).fill(0).map((_, index) => (
            <div className="newitems" key={index}>
                    <div className="topsellers__nftImage--skeleton"></div>
                    <div className="topsellers__authorImage--skeleton"></div>
                    <div className="topsellers__title--skeleton"></div>                    
                    <div className="topsellers__code--skeleton"></div>                    
                  </div>
          ))
          : (topsellers.map((item, index) => (<li key={index}>
              <div className="author_list_pp">
                <Link to={`/author/${topsellers.AuthorImage}`}>
                  <img
                    className="lazy pp-author"
                    src={item.AuthorImage}
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="author_list_info">
                <Link to="/author">Monica Lucas</Link>
                <span>2.1 ETH</span>
              </div>
            </li>
          )))}
        </ol>
      </div>
    </div>
  </div>
</section>
);
};

export default TopSellers;
