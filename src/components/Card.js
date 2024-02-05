
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
import './Card.css';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate()
  const [loading, setLoading] = useState(true); // New state for loading status
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  const [showMessage, setShowMessage] = useState(false);

  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length === 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })

        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 2000)
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)
    setShowMessage(true);

    // Hide the message after 2 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);

  }

  useEffect(() => {
    setSize(priceRef.current.value);
    // Simulate a delay to show the skeleton loader for a brief period
    const delayTimer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay time as needed (in milliseconds)

    // Clear the timer when the component unmounts or when the image is loaded
    return () => clearTimeout(delayTimer);
  }, [options]);
  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div className='mb-4'>
      <div className="card mt-3 d-flex flex-column" style={{ maxWidth: "18rem" }}>
        {/* Use a conditional rendering to show either the image or the skeleton loader */}
        {loading ? (
          <div className="skeleton-loader" style={{ height: "250px", width: "100%", backgroundColor: "#ccc" }}></div>
        ) : (
          <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "250px", objectFit: "contain" }} />
        )}
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">{props.foodName}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(10), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <div className='d-inline ms-2 h-100 w-20 fs-5'>
              Rs. {finalPrice}
            </div>
          </div>
          <br />
          <div className="d-flex flex-column align-items-center justify-content-center mt-auto">
            <button className={'btn btn-success'} onClick={handleAddToCart}>Add to Cart</button>
          </div>
          {showMessage && (
            <div className="added-to-cart-message">
              Added to Cart Successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}