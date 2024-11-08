import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Loading from './Loading';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState('asc'); // Ascending by default
  const [showWelcome, setShowWelcome] = useState(true);

  const userName = localStorage.getItem('userName'); // Get userName from localStorage

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);

      setTimeout(() => {
        setLoading(false);
        setShowWelcome(false); // Hide welcome message after 3 seconds
      }, 3000);

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  // Function to sort items by price
  const sortItemsByPrice = (items) => {
    return items.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  return (
    <div>
      <div>
        <Navbar showWelcome={showWelcome} welcomeMessage={`Welcome, ${userName}!`} />
      </div>
      <br /> <br /> <br /> <br />
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-inner" id='carousel'>
                <div className="carousel-caption" style={{ zIndex: "9" }}>
                  <div className="d-flex justify-content-center">
                    <input
                      className="form-control me-1 w-50 bg-white text-dark"
                      type="search"
                      placeholder="Search in here..."
                      aria-label="Search"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value) }}
                    />
                    <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
                  </div>
                </div>
                <div className="carousel-item active" >
                  <img src="https://cheers.com.np/uploads/banners/085371670808023255176239.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://cheers.com.np/uploads/banners/17311273094043477467413.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://cheers.com.np/uploads/banners/4399799185307625465550.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://cheers.com.np/uploads/banners/7130878260150909072610.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* Sorting UI */}
            <div className="d-flex justify-content-end m-3">
              <select onChange={(e) => setSortDirection(e.target.value)} className="form-select w-25">
                <option value="def">Price :</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>

            <div className='container'>
              {foodCat !== [] ? (
                foodCat.map((data) => {
                  return (
                    <div className='row mb-3' key={data.id}>
                      <div className='fs-3 m-3'>{data.CategoryName}</div>
                      <hr id="hr-success" style={{
                        height: "4px",
                        backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))"
                      }} />
                      {foodItems !== [] ? (
                        sortItemsByPrice(
                          foodItems.filter((items) => (
                            items.CategoryName === data.CategoryName &&
                            items.name.toLowerCase().includes(search.toLowerCase())
                          ))
                        ).map(sortedItems => (
                          <div key={sortedItems.id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodName={sortedItems.name} item={sortedItems}
                              options={sortedItems.options[0]} ImgSrc={sortedItems.img}></Card>
                          </div>
                        ))
                      ) : (
                        <div>No Such Data</div>
                      )}
                    </div>
                  );
                })
              ) : (
                ""
              )}
            </div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}
