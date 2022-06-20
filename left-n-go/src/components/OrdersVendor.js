import React from 'react'

export default function OrdersVendor() {
    const checkList = ["Cai Fan", "Banana Cake", "Tea with Milk", "Coffee"];
    return (
    


    <div className="checkList">
        <div className="title"><strong>--</strong></div>
        <div className="list-container text-left">
        {checkList.map((item, index) => (
            <div key={index}>
               <span>{item} x1</span>
             </div>
        ))}
      </div>
    </div>

  );
}
