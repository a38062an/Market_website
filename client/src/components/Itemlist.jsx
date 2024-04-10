import { useNavigate, useParams } from "react-router-dom";
import { getAuctionsBySearchQuery, getListings, getListingsBySearchQuery } from "../api/items";
import { getAuctions } from "../api/items";
import { getListingsByUser } from "../api/items";
import { getAuctionsByUser } from "../api/items";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const Itemlist = ({ user_id }) => {

  let { option, query } = useParams();

  const [page, setPage] = useState(0);

  const [data, setData] = useState([]); // store both items and auctions
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    let fetchListings = [], fetchAuctions = [];

    if (query) {
      switch (option) {
        case "0": // all items
          fetchListings = getListingsBySearchQuery(page, query);
          fetchAuctions = getAuctionsBySearchQuery(page, query);
          break;
        case "1": // fixed price
          fetchListings = getListingsBySearchQuery(page, query);
          break;
        case "2": // auctions
          fetchAuctions = getAuctionsBySearchQuery(page, query);
          break;
        default:
          throw "Invalid Option.";
      }
    }
    else {
      fetchListings = (user_id ? getListingsByUser(page, user_id) : getListings(page));
      fetchAuctions = (user_id ? getAuctionsByUser(page, user_id) : getAuctions(page));
    }
    Promise.all([fetchListings, fetchAuctions]) // fetch both items and auctions
      .then(([items, auctions]) => {
        const mergedData = [...items, ...auctions]; // merge items and auctions
        mergedData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ); // sort by created_at
        setData(mergedData); // set data
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, option, query]);

  const handleCardClick = (key) => {
    navigate(`/item/${key}`);
  };

  if (isLoading) {
    return <div className="container text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error.message}</div>
      </div>
    );
  }

  if(data.length === 0) {
    return (
      <div className="container">
        <div className="text-center text-muted">You've reached the end.</div>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        {data.map((item) => {
          const key = (item.price ? "listing" : "auction") + "id" + item.id;
          return (
            <Col
              onClick={() => handleCardClick(key)}
              key={item.id}
              md={4}
              className="mb-4"
            >
              <Card>
                <Card.Img
                  src={item.image_path}
                  alt={item.name}
                  style={{
                    width: "100%",
                    maxHeight: "275px",
                    border: "1px solid #ccc", // Grey border
                  }}
                />
                <Card.Body>
                  <Card.Title className="mb-0">
                    £{item.price || item.highest_bid}
                  </Card.Title>
                  <Card.Text className="mt-1">{item.name}</Card.Text>
                  <Button variant="outline-success" className="mt-auto w-100">
                    View Listing
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {
        data.length > 0 ? 
        (
          <Row>
            <Col>
              <Button 
                disabled={page==0}
                variant="outline-success" 
                onClick={()=>{ console.log(page) ; setPage(page - 1) }} >
                Previous Page
              </Button>

              <Button 
                variant="outline-success" 
                onClick={()=>{ console.log(page) ; setPage(page + 1) }} >
                Next Page
              </Button>
            </Col>
          </Row>
        )
        : null
      }
    </Container>
  );
};

export default Itemlist;
