import React, { useEffect, useState } from "react";
import "./index.css";
import Input from "../../Components/input";

const Dashboard = () => {
  const contacts = [
    {
      name: "jay",
      status: "available",
      img: "../Assests/user.svg",
    },
    {
      name: "amit",
      status: "available",
      img: "../Assests/user.svg",
    },
    {
      name: "veeru",
      status: "available",
      img: "../Assests/user.svg",
    },
    {
      name: "adam",
      status: "available",
      img: "../Assests/user.svg",
    },
    {
      name: "alok",
      status: "available",
      img: "../Assests/user.svg",
    },
    {
      name: "hary",
      status: "available",
      img: "../Assests/user.svg",
    },
  ]



  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
    const fecthConversations = async() => {
      // if (!loggedInUser || !loggedInUser.id) return; 
      const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`,{
        method: "GET",
        headers: {
          'Content-type':'application/json',
        }
      });
      const resData = await res.json()
      console.log('resData', resData)
      setConversations(resData)
    }
    fecthConversations()
  },
[]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
  const [conversations, setConversations] = useState([])
  console.log('conversation', conversations)
  console.log('user', user)
  return (
    <div className="dsh-1">
      <div className="dsh-1_1">
        <div className="dash-1">
          <img src="../Assests/user.svg" alt="" id="img1" />
          <div className="dash-1_1">
            <span id="span1">
              <bold>{user?.fullName}</bold>
            </span>
            <span id="span2">My Account</span>
          </div>
        </div>
        <hr />
        <div>
          <div className="msgs">Messages</div>
          <div className="cntcts">
            {contacts.map(({ name, status, img }) => {
              return (
                <div className="dash-1">
                  <img src="../Assests/user.svg" alt="" id="img1" />
                  <div className="dash-1_1">
                    <span id="span1">
                      <bold>{name}</bold>
                    </span>
                    <span id="span2">{status}</span>
                    <br></br>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="dsh-1_2">
        <div className="tp1">
          <div className="cht-box">
            <img src="../Assests/user.svg" alt="" id="img1" />

            <span id="span1">
              <bold>Aniket Singh</bold>
            </span>
          </div>
        </div>
        <div className="cntr">
          <div className="cht-lt">
            this is dummy text this is dummy text and i know you vwery well
          </div>
          <div className="cht-rt">
            this is dummy text and i know you vwery well
          </div>
          <div className="cht-lt">
            this is dummy text this is dummy text and i know you vwery well
          </div>
          <div className="cht-rt">
            this is dummy text and i know you vwery well
          </div>
          <div className="cht-lt">
            this is dummy text this is dummy text and i know you vwery well
          </div>
          <div className="cht-rt">
            this is dummy text and i know you vwery well
          </div>
          <div className="cht-lt">
            this is dummy text this is dummy text and i know you vwery well
          </div>
          <div className="cht-rt">
            this is dummy text and i know you vwery well hello how are you ?
            this is dummy text and i know you vwery well hello how are you ?
          </div>
          <div className="cht-lt">
            this is dummy text this is dummy text and i know you vwery well
          </div>
          <div className="cht-rt">
            this is dummy text and i know you vwery well
          </div>
          <div className="cht-lt">
            this is dummy text this is dummy text and i know you vwery well
          </div>
          <div className="cht-rt">
            this is dummy text and i know you vwery well
          </div>
          <div className="cht-lt">
            this is dummy text this is dummy text and i know you vwery well
          </div>
          <div className="cht-rt">
            this is dummy text and i know you vwery well
          </div>
        </div>
        <div className="input-cht">
          <div className="aln">
            <input placeholder="Type a message..." id="txt-bx" />
            <img src="./assests/send-2.svg" alt="" id="newimg1" />
          </div>
        </div>
      </div>
      <div className="dsh-1_3"></div>
    </div>
  );
};

export default Dashboard;
