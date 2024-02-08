import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useNavigate } from "react-router-dom";

function Reviews({ type, id }) {
  const [reviews, setReviews] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(2); // Initially show 2 reviews
  const reviewsToAdd = 2; // Number of reviews to add each time "Show More" is clicked
  const navigate = useNavigate();
  const [isReviews, setIsReviews] = useState(false);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const auth = localStorage.getItem("token");

  const getData = () => {
    // *************** Reviews *************************************
    let reviewUrl;
    if (type === "movie") {
      reviewUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    } else if (type === "tv") {
      reviewUrl = `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    }
    fetch(reviewUrl)
      .then((res) => res.json())
      .then((data1) => {
        setReviews(data1.results);
        if (data1.results.length === 0) {
          setIsReviews(true);
        }
      });
  };

  const handleShowMore = () => {
    // setVisibleReviews(
    //   (prevVisibleReviews) => prevVisibleReviews + reviewsToAdd
    // );
    navigate(`/MoreReviews/${type}/${id}`);
  };
  const toggleFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  console.log(reviews);

  return (
    <>
      {isReviews ? (
        <p>No Reviews Found</p>
      ) : (
        <div className="review-div">
          {reviews.slice(0, visibleReviews).map((item, index) => (
            <div className="review-sec" key={index}>
              <div className="line-1">
                <div className="line-1-1">
                  <img
                    src={
                      item.author_details.avatar_path
                        ? `${item.url + item.author_details.avatar_path}`
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
                    }
                    alt="User Image"
                  />
                  <p>{item.author}</p>
                </div>
                <p>{new Date(item.created_at).toISOString().split("T")[0]}</p>
              </div>
              <div className="user-rating">
                {item.author_details.rating ? (
                  <p>{item.author_details.rating}/10</p>
                ) : (
                  <p>No Rating</p>
                )}
              </div>
              <div className="content">
                {/* <p>{item.content}</p> */}
                <p>
                  {showFullContent
                    ? item.content
                    : `${item.content.split(" ").slice(0, 50).join(" ")}...`}
                </p>
                {!showFullContent && (
                  <div className="review-show">
                    <p onClick={toggleFullContent}>Show More</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          {reviews.length > visibleReviews && (
            <div className="review-showMore-btn">
              <button onClick={handleShowMore}>
                {reviews.length - 2} More{" "}
                {reviews.length > 3 ? "Reviews" : "Review"}{" "}
                <span>
                  <i class="fas fa-arrow-right"></i>
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Reviews;
