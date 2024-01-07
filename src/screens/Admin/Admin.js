// import React,{useEffect, useState} from 'react'
// import axios from 'axios';
// import Navbar from '../../components/Navbar'

// const Admin = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/auth/items');
//         setItems(response.data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     fetchItems();
//   }, []);


//   return (
//     <>
//     <Navbar/>
//     <div className='admin-panel'>
//     <h1>Admin Dashboard</h1>
//     <table border='1 px'>
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Category</th>
//             <th>Options</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index}>
//               <td>{item.name}</td>
//               <td>{item.category}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>


//     </>
//   )
// }

// export default Admin

import React from 'react';
import Navbar from '../../components/Navbar';

const Admin = () => {
  // Assuming foodData and foodCategory are available globally
  const items = global.foodData || [];
  const categories = global.foodCategory || [];

  return (
    <>
      <Navbar />
      <div className='admin-panel'>
        <h1>Admin Dashboard</h1>
        <table border='1 px'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{categories[item.category]}</td> {/* Assuming category is an index in foodCategory */}
                {/* Adjust this line based on the actual structure of your items and categories */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
