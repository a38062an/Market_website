import React, { useState, useEffect } from "react";
import Countdown from "./AuctionCountdown";
import AuctionBidCount from "./AuctionBidCount";
import { Carousel, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import io from "socket.io-client";

import {
  getListing,
  getAuction,
  getListingImages,
  getAuctionImages,
  getSavedListing,
  getSavedAuction,
  postSavedListing,
  postSavedAuction,
  createMessageRoom,
} from "../api/items";

const socket = io("http://localhost:5000");

const ItemDetails = () => {
  // get params from the url, assign to itemType and itemId
  let { id } = useParams();
  const params = id.split("id");
  const itemType = params[0];
  const itemId = params[1];

  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isItemSaved, setItemSaved] = useState(null);
  const [error, setError] = useState(null);
  const [item_images, setImages] = useState([]);
  const isAuction = itemType === "auction";

  useEffect(() => {
    setIsLoading(true);

    const getItem =
      itemType === "listing"
        ? getListing
        : itemType === "auction"
        ? getAuction
        : null;
    const getImages =
      itemType === "listing"
        ? getListingImages
        : itemType === "auction"
        ? getAuctionImages
        : null;

    if (!getItem || !getImages) {
      setError(new Error("Invalid item type"));
      setIsLoading(false);
      return;
    }

    getItem(itemId)
      .then((data) => {
        setItem(data);
        return getImages(itemId); // Return the promise from getImages
      })
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [itemType, itemId]);

  useEffect(() => {
    const getSavedItem =
      itemType === "listing"
        ? getSavedListing
        : itemType === "auction"
        ? getSavedAuction
        : null;

    getSavedItem(itemId)
      .then((data) => {
        if (Array.isArray(data) && data.length === 0) {
          setItemSaved(false);
        } else {
          setItemSaved(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [itemId]);

  const handleSave = async (itemId) => {
    setIsSaving(true);
    if (!localStorage.getItem("token")) {
      alert("Please log in to save this item.");
      return;
    }
    await (itemType === "listing"
      ? postSavedListing(itemId)
      : postSavedAuction(itemId));
    setIsSaving(false);
    alert("Item saved!");
    setItemSaved(true);
  };

  if (isLoading) {
    return null; // makes it less jarring when the page loads
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error.message}</div>
      </div>
    );
  }

  const joinRoom = (id) => {
    socket.emit("joinRoom", id);
  };

  //This creates the message room between the user and the seller
  const createMessage = async () => {
    const sellerId = item.seller_id;
    try {
      const response = await createMessageRoom(sellerId); //This will add the room to the database
      const roomId = response.id; // Extract the room ID from the response
      joinRoom(roomId); // Join the room with the given ID
    } catch (error) {
      console.error("Failed to create and join room:", error);
    }
  };

  //function to submit a bid
  const submitBid = () => {
    console.log("submit bid");
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="row g-0">
          <div className="col">
            {/* carousel of images, all container inside the listing_image table */}
            <Carousel>
              {[{ image_path: item.image_path }, ...item_images].map(
                (image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 img-fluid rounded-start rounded-end"
                      src={image.image_path}
                      alt="Item"
                      style={{
                        objectFit: "contain",
                        maxHeight: "400px",
                        minHeight: "400px",
                      }}
                    />
                  </Carousel.Item>
                )
              )}
            </Carousel>
          </div>
          <div className="col col-5">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text fs-4">
                £{isAuction ? item.highest_bid : item.price} <br />
                <small className="text-muted fs-6">or Best Offer</small>
              </p>
              <div className="card-text">
                <small className="text-muted">
                  {isAuction ? (
                    <>
                      <Link
                        to="#"
                        style={{
                          textDecoration: "underline",
                          color: "black",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "grey")}
                        onMouseLeave={(e) => (e.target.style.color = "black")}
                      >
                        <AuctionBidCount auctionId={itemId} />
                      </Link>
                      <span className="mx-2">&bull;</span>
                      <Countdown
                        closingDate={item.closing_date}
                        isAuction={isAuction}
                      />
                    </>
                  ) : (
                    `Listed on ${new Date(item.created_at).toLocaleDateString(
                      "en-us",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}`
                  )}
                </small>
              </div>
              <p className="card-text">{item.description}</p>
              <div className="input-group d-flex flex-column justify-content-between mt-auto">
                <div>
                  {/*Changed this conditional so that we can distinguish functions for auctions and listings*/}
                  {/*submitBid needs a page so messages is used as place hoder*/}
                  {isAuction ? (
                    <Link
                      to={isLoading ? "#" : "/messages"}
                      className="text-decoration-none text-primary"
                      onClick={submitBid}
                    >
                      <Button variant="primary" className="mb-2 d-block w-100">
                        {isLoading ? "loading..." : "Submit Bid"}
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      to={isLoading ? "#" : "/messages"}
                      className="text-decoration-none text-primary"
                      onClick={createMessage}
                    >
                      <Button
                        variant="primary"
                        className="mb-2 d-block w-100"
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Make Offer"}
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline-primary"
                    className="mb-2 d-block w-100 text-primary"
                    style={{ backgroundColor: "white" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f2f2f2")
                    } // light gray
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "white")
                    }
                    onClick={() => handleSave(itemId)}
                    disabled={isSaving || isItemSaved}
                  >
                    <Link to="#" className="text-decoration-none text-primary">
                      {"\u2661"}{" "}
                      {isAuction
                        ? isItemSaved
                          ? "Auction Saved!"
                          : "Save this auction"
                        : isItemSaved
                        ? "Listing Saved!"
                        : "Save this listing"}
                    </Link>
                  </Button>
                </div>
                <div className="align-self-end">
                  <Button variant="danger" className="btn-sm">
                    <Link
                      to="#"
                      className="text-decoroom: ration-none text-white"
                    >
                      {isAuction ? "Report Auction" : "Report Listing"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
