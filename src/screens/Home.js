import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS

// Merge Sort implementation
const mergeSort = (arr, compareFn) => {
  if (arr.length <= 1) return arr; // Base case: Single element is already sorted.

  const mid = Math.floor(arr.length / 2); // Find the middle index
  const left = arr.slice(0, mid); // Split the array into left half
  const right = arr.slice(mid); // Split the array into right half

  // Recursively split and merge the array.
  return merge(mergeSort(left, compareFn), mergeSort(right, compareFn), compareFn);
};

const merge = (left, right, compareFn) => {
  let result = []; // Array to store merged elements.
  let leftIndex = 0;
  let rightIndex = 0;

  // Merge the two arrays based on the comparison function.
  while (leftIndex < left.length && rightIndex < right.length) {
    if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex]); // Take from left if it is smaller or equal.
      leftIndex++;
    } else {
      result.push(right[rightIndex]); // Take from right if it is smaller.
      rightIndex++;
    }
  }

  // Append remaining elements from left and right (if any).
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
};

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState(false); // State to track sorting process

  const fetchFoodData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const [foodData] = await response.json();

      setFoodItems(foodData);
      setSortedItems(foodData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSort = () => {
    if (!sortOrder) {
      setSortedItems([...foodItems]); // Reset to original order
      return;
    }

    setSorting(true); // Start showing the loading screen

    // Simulate a delay for sorting (for better user experience)
    setTimeout(() => {
      const compareFn = (a, b) => {
        const priceA = parseFloat(a.options[0]?.['330ML'] || 0);
        const priceB = parseFloat(b.options[0]?.['330ML'] || 0);

        if (sortOrder === 'lowToHigh') {
          return priceA - priceB;
        } else if (sortOrder === 'highToLow') {
          return priceB - priceA;
        }
        return 0;
      };

      const sortedData = mergeSort(foodItems, compareFn);
      setSortedItems(sortedData);

      setSorting(false); // Stop showing the loading screen
    }, 500); // Optional: Add a delay for smoother experience
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  useEffect(() => {
    handleSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  return (
    <div>
      <Navbar />
      <br /> <br /> <br /> <br />
      <div>
        {loading || sorting ? ( // Show skeleton when fetching or sorting
          <div className="container">
            <div className="row">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-3">
                  <Skeleton height={200} />
                  <Skeleton height={20} className="mt-2" />
                  <Skeleton height={20} width="60%" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Carousel */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-inner" id="carousel">
                <div className="carousel-item active">
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

            {/* Sorting Dropdown UI */}
            <div className="container mt-4 mb-3">
              <div className="d-flex justify-content-end">
                <select
                  className="form-select w-25"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>
            </div>

            {/* Display Sorted Items */}
            <div className="container">
              <div className="row">
                {sortedItems.map((item) => (
                  <div key={item._id} className="col-12 col-md-6 col-lg-3">
                    <Card
                      foodName={item.name}
                      item={item}
                      price={item.options[0]?.['330ML']}
                      ImgSrc={item.img}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}
