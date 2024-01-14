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

      setTimeout(()=> {
        setLoading(false);
      }, 1500)

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">
              <div className="carousel-inner " id='carousel'>
                <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                  <div className=" d-flex justify-content-center">
                    <input
                      className="form-control me-2 w-50 bg-white text-dark"
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
                  <img src="https://cheers.com.np/uploads/banners/085371670808023255176239.jpg" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item active" >
                  <img src="https://cheers.com.np/uploads/banners/17311273094043477467413.jpg" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://cheers.com.np/uploads/banners/4399799185307625465550.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="https://cheers.com.np/uploads/banners/7130878260150909072610.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                {/* ... (carousel items) */}
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
                        foodItems.filter((items) => (
                          items.CategoryName === data.CategoryName &&
                          items.name.toLowerCase().includes(search.toLowerCase())
                        )).map(filterItems => (
                          <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodName={filterItems.name} item={filterItems}
                              options={filterItems.options[0]} ImgSrc={filterItems.img}></Card>
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
