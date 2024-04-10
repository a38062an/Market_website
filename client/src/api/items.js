const BASE_URL = `http://${
  process.env.REACT_APP_SERVER_HOST || "localhost"
}:5000/api`;

//GET item requests

export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings/`);
  return await res.json();
}

export async function getListingsByUser(user_id) {
  const res = await fetch(`${BASE_URL}/listings/user/${user_id}`);
  return await res.json();
}

export async function getListing(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}`);
  return await res.json();
}

export async function getListingImages(id) {
  const res = await fetch(`${BASE_URL}/listing_images/listing/${id}`);
  return await res.json();
}

export async function getAuctions() {
  const res = await fetch(`${BASE_URL}/auctions/`);
  return await res.json();
}

export async function getAuctionsByUser(user_id) {
  const res = await fetch(`${BASE_URL}/auctions/user/${user_id}`);
  return await res.json();
}

export async function getAuction(id) {
  const res = await fetch(`${BASE_URL}/auctions/${id}`);
  return await res.json();
}

export async function getAuctionImages(id) {
  const res = await fetch(`${BASE_URL}/auction_images/auction/${id}`);
  return await res.json();
}

export async function getAuctionBids(auctionId) {
  const res = await fetch(`${BASE_URL}/bids/auction/${auctionId}`);
  return await res.json();
}

export async function getAuctionBidCount(auctionId) {
  const res = await fetch(`${BASE_URL}/bids/auction/${auctionId}/count`);
  return await res.json();
}
//JWT Requests to get all savedauctions and saved listings

//get all saved auctions
export async function getSavedAuctions() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/get/auctions/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}
//get all saved listings
export async function getSavedListings() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/get/listings/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

//Delete saved listing
export async function deleteSavedListing(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/delete/listings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

//Delete saved auctions
export async function deleteSavedAuction(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/delete/auctions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

//messages requests

// This will take in user2 (the person to message) and feed in this information to the backend
// this will not only create a room if one does not exist.
// if one does exist, it will return it as usual, so it can be used as a get request as well
// can be used as a 2 in 1 function
export async function createMessageRoom(user2) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/messages/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      user2_id: user2,
    }),
  });
  return await res.json();
}

export async function getMessageRoomsOfUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/messages/room/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

export async function getMessageRoom(id) {
  const res = await fetch(`${BASE_URL}/messages/room/${id}`);
  return await res.json();
}

export async function getAllMessageRooms() {
  const res = await fetch(`${BASE_URL}/messages/room`);
  return await res.json();
}

//JWT Requests

export async function getSavedListing(listingID) {
  const token = localStorage.getItem("token"); //
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/get/listing/${listingID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

export async function postSavedListing(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/listing/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

export async function getSavedAuction(auctionID) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/get/auction/${auctionID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

export async function postSavedAuction(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/saved_items/auction/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

// Auction POST requests

export async function postAuctionBid(auctionId, bidAmount) {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/bids/auction/${auctionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      amount: bidAmount,
    }),
  });
  return await res.json();
}

// app_user requests
// get logged in user

export async function getLoggedInUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return await res.json();
}

// get specific user
export async function getUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  return await res.json();
}

// GET reviews requests

// get the number of reviews for a user
export async function getReviewCount(user_id) {
  const res = await fetch(`${BASE_URL}/reviews/count/${user_id}`);
  return await res.json();
}

// avatar upload route

export async function uploadAvatar(formData) {
  const res = await fetch(`${BASE_URL}/image_upload/avatar`, {
    method: "POST",
    body: formData,
  });
  return await res.json();
}

// update user bio route

export async function updateUserBio(user_id, newBio) {
  const res = await fetch(`${BASE_URL}/users/${user_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bio: newBio }),
  });
  return await res.json();
}