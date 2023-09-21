import React, { useState } from 'react'
import './returnBill.css';
import Axios from 'axios';
import { useEffect } from 'react';

import Bill_view from '../../components/bill_view/bill_view';

export default function ReturnBill() {

    const[billData, setBillData] = useState({
        bill_id:"",
        payment_date:"",
        total_amount:"",
        customer_name:""
        
    })

    //get all bills
    const[bills,setBills] = React.useState([]);
    const getBills = async () => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/bills`);
        console.log(res.data.result);
        setBills(res.data.result);
    }
    useEffect(() => {
        getBills();
    }
    ,[])

    const[billItems, setBillitems] = useState([])
    const SelecBill = (id,customer,date,amount)=>async(e) => {
        setBillData({
            bill_id:id,
            payment_date:date,
            total_amount:amount,
            customer_name:customer})

        console.log(id)
        const res =await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/bills/billitems/?billId=${id}`);
        console.log(res.data);
        setBillitems(res.data);

    }

    const[returnBill, setReturnBill] = useState([])
    const[returnBillItems, setReturnBillItems] = useState([])
    const ConfirmHandler = ()=>{
        console.log(billData)
        setReturnBill(billData)
        console.log(billItems)
        setReturnBillItems(billItems)
    
    

        }

        // In your component's state and handlers
        const initialEditedReturnBillItems = billItems.map(item => ({ ...item })); // Create a copy of billItems

const [editedReturnBillItems, setEditedReturnBillItems] = useState(initialEditedReturnBillItems);

const saveChangesHandler = () => {
    // Update the original returnBillItems with the edited data
    setReturnBillItems(editedReturnBillItems);
    
    // TODO: Prepare data to send to backend
    console.log(editedReturnBillItems);

};

    

  return (
    <div>
        <div class="return-parent">
            <div class="return-div1">
                <h1 className='return-bill-view-title'>Return Bill</h1>
                <div className='return-bill-view-search-div'>
                <input className='return-bill-view-search' type="text" placeholder='Enter Bill ID'/>
                </div>
                <div className='return-bill-view-div'>
                    {
                        bills.map((bill,index) => (
                            <a onClick={SelecBill(bill.bill_id,bill.customer_name,bill.payment_date ,bill.total_amount)}>
                                <Bill_view
                             key={index}
                              billId={bill.bill_id}
                               date={bill.payment_date }
                                amount={bill.total_amount}
                                 customer={bill.customer_name}/>
                            </a>
                             
                        
                        ))
                    }
                    
                </div>
                
                
            </div>
            <div class="return-div2">
                <div className='return-bill-items-div1'>
                    <div className='return-bill-items-subdiv1'>
                       <div className='return-bill-items-bill'>
                          <p className='return-bill-info'>bill Id </p>
                          <p className='return-bill-info'>: {billData.bill_id}</p>
                     </div>
                     <div className='return-bill-items-bill'>
                         <p className='return-bill-info'>Customer  </p>
                         <p className='return-bill-info'>:  { billData.customer_name}</p>
                      </div>

                    </div>
                    <div  className='return-bill-items-subdiv1'>
                      <div className='return-bill-items-bill'>
                          <p className='return-bill-info'>date </p>
                          <p className='return-bill-info'>: {billData.payment_date}</p>
                      </div>
                      <div className='return-bill-items-bill'>
                          <p className='return-bill-info'>Total Amount </p>
                          <p className='return-bill-info'>: {billData.total_amount}</p>
                      </div>

                    </div>
                    
                    
                </div>
                <div className='return-bill-items-div2'>
                    
                    
                            <table className='table'>
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                <th scope="col">sub total</th>
                              </tr>
                            </thead>
                            {billItems.map((billitem,index) => (
                            <tbody>
                              <tr>
                                <th scope="row">{index+1}</th>
                                <td>{billitem.item}</td>
                                <td>{billitem.item_price}</td>
                                <td>{billitem.qty}</td>
                                <td>{billitem.total}</td>
                              </tr>
                              {/* More rows... */}
                            </tbody>
                            ))}
                                          </table>
                   
                </div>
                <button className='return-bill-confirm' onClick={ConfirmHandler}>confirm</button>
            </div>
            <div class="return-div3">
                <h1 className='return-bill-add'>return bill</h1>
                <div>
                    <div className='return-bill-items-add-subdiv_1'>
                        <p>bill Id :</p>
                        <p>{returnBill.bill_id}</p>
                    </div>
                    <div className='return-bill-items-add-subdiv_1'>
                        <p>return bill Id :</p>
                        <p>R-{returnBill.bill_id}</p>
                    </div>
                    <div className='return-bill-items-add-subdiv_1'>
                        <p>add to store again :</p>
                        <p>yes</p>
                    </div>
                </div>
                <div>
    <div className='return-bill-items-add-subdiv1'>
        {editedReturnBillItems.map((billitem, index) => (
            <div className='return-bill-items-add-subdiv2' key={index}>
                <p>{billitem.item}</p>
                <input
                    value={billitem.qty}
                    type="text"
                    placeholder='qty'
                    onChange={(e) => {
                        const updatedEditedReturnBillItems = [...editedReturnBillItems];
                        updatedEditedReturnBillItems[index].qty = e.target.value;
                        setEditedReturnBillItems(updatedEditedReturnBillItems);
                    }}
                />
                <input
                    value={billitem.item_price}
                    type="text"
                    placeholder='price'
                    onChange={(e) => {
                        const updatedEditedReturnBillItems = [...editedReturnBillItems];
                        updatedEditedReturnBillItems[index].item_price = e.target.value;
                        setEditedReturnBillItems(updatedEditedReturnBillItems);
                    }}
                />
            </div>
        ))}
        <button onClick={saveChangesHandler}>Save Changes</button>
    </div>
</div>

            
            </div>
        </div>
    </div>
  )
}
