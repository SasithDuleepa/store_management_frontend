import React, { useState } from 'react';
import './email.css';
import Axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Email() {
    const [mailData, setMailData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); // New state for selected items

    const EmailDateHandler = async (e) => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/bills/billaccpaymentdate/?payment_date=${e.target.value}`);
        setMailData(res.data);
    }

    const selectHandler = (item) => (e) => {
        // console.log(item)
        const itemId = item.id; // Assuming each item has a unique ID
        if (e.target.checked) {
            setSelectedItems([...selectedItems, itemId]);
        } else {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        }
    }

    const selectAllHandler = (e) => {
       
        setSelectAll(e.target.checked);
        if (e.target.checked) {
            const allItemIds = mailData.map(item => item.id);
            setSelectedItems(allItemIds);
            // console.log(mailData)
        } else {
            setSelectedItems([]);
        }
    }

    //send mail

    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");

    const SubjectHandler = (e) => {
        // console.log(e.target.value)
        setSubject(e.target.value)
    }
    const TextHandler = (e) => {
        // console.log(e.target.value)
        setText(e.target.value)
    }

    const SendmailHandler = async () => {
        console.log(subject)
        console.log(text)
        console.log(selectedItems)

        const res = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/email`,{
            subject:subject,
            text:text,
            selectedItems:selectedItems
        });


    }
    


    const [emailContent, setEmailContent] = useState('');

    const handleEmailChange = content => {
        setEmailContent(content);
    };

    const handleSendEmail = () => {
        // Use emailContent to send the email, e.g., via an API request
        // Note: You would need to handle the backend part that sends the email.
    };
    

    return (
        <div className="parent-email">
            <div className="div1-email">
                <h1 className="email-view-title">Email</h1>
                <div className='email-view-date-div-main'>
                  <div className='email-view-date-div'>
                       <p className='email-view-date-p'>Date :</p>
                      <input className='email-view-date-input' type="date" onChange={(e) => EmailDateHandler(e)} />
                  </div>
                </div>
                <div className='email-view-list-div-main'>
                <div className='email-view-data-div'>
                    <label className='email-view-checked'>
                        <input
                            onChange={selectAllHandler}
                            type='checkbox'
                            checked={selectAll}
                        />
                      
                    </label>

                    <p className='email-view-data-customer'>customer</p>
                    <p className='email-view-data-email'>email</p>
                    <p className='email-view-data-amount'>amount</p>
                    <p className='email-view-data-date'>date</p>
                </div>
                <div>
                    {mailData.map((item, index) => (
                        <div className='email-view-data-div' key={index}>
                            <input
                                className='email-view-checked-list'
                                onChange={selectHandler(item)}
                                type='checkbox'
                                checked={selectedItems.includes(item.id)}
                            />
                            <p className='email-view-data-customer-list'>{item.customer_name}</p>
                            <p className='email-view-data-email-list'>{item.email}</p>
                            <p className='email-view-data-amount-list'>{item.total_amount}</p>
                            <p className='email-view-data-date-list'>{item.payment_date}</p>
                        </div>
                    ))}
                </div>

                </div>

                
                <button className='email-view-send-button' onClick={SendmailHandler}>Send Email</button>
            </div>
            {/* <div className="div2-email">
                <h1>send mail</h1>
                <div>
                    <div>
                        <p>subject</p>
                        <input type="text" onChange={(e)=>SubjectHandler(e)} value={subject} />
                    </div>
                    <div>
                        <p>text</p>
                        <input type="text" onChange={(e)=>TextHandler(e)} value={text} />   
                    </div>
                    <div>
            <h1>Email Editor</h1>
            <ReactQuill value={emailContent} onChange={handleEmailChange} />
            <button onClick={handleSendEmail}>Send Email</button>
        </div>
                    <button onClick={SendmailHandler}>send mail   </button>
                </div>
            </div> */}
        </div>
    );
}
