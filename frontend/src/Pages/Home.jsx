// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";

// const multipliers = [
//   1.2, 1.5, 2.0, 2.5, 3.0, 3.6, 4.5, 5.2, 6.3, 7.1,
//   8.0, 9.2, 10.3, 12.0, 13.2, 15.4
// ];

// function App() {
//   const [currentStep, setCurrentStep] = useState(-1);
//   const [isRunning, setIsRunning] = useState(false);
//   const [crashIndex, setCrashIndex] = useState(null);
//   const [message, setMessage] = useState("");
//   const [betAmount, setBetAmount] = useState(1);
//   const intervalRef = useRef(null);

//   // Start Game
//   const handleGo = () => {
//     if (isRunning) return;

//     const randomCrash = Math.floor(Math.random() * multipliers.length);
//     setCrashIndex(randomCrash);
//     setCurrentStep(0);
//     setIsRunning(true);
//     setMessage("");

//     intervalRef.current = setInterval(() => {
//       setCurrentStep(prev => {
//         if (prev + 1 === randomCrash) {
//           clearInterval(intervalRef.current);
//           setIsRunning(false);
//           setMessage("💥 Crashed! You lost.");
//           return prev + 1;
//         }

//         if (prev + 1 >= multipliers.length) {
//           clearInterval(intervalRef.current);
//           setIsRunning(false);
//           setMessage("🏁 Reached the end! Auto cash-out.");
//           return prev + 1;
//         }

//         return prev + 1;
//       });
//     }, 1000);
//   };

//   // Cash out early
//   const handleCashOut = () => {
//     if (!isRunning || currentStep < 0) return;

//     clearInterval(intervalRef.current);
//     setIsRunning(false);

//     const profit = (multipliers[currentStep] * betAmount).toFixed(2);
//     setMessage(`✅ Cashed out at ${multipliers[currentStep]}x: +$${profit}`);
//   };

//   return (
//     <div className="app-container">
//       <div className="top-bar">
//         <div className="game-title">🐤 CHICKEN ROAD</div>
//         <div className="live-info">
//           <div>Online: 4658</div>
//           <div className="win-amount">+c908.00</div>
//         </div>
//       </div>

//       <div className="game-area">
//         {multipliers.map((mult, idx) => (
//           <div
//             key={idx}
//             className={`block ${idx === crashIndex ? 'crash' : ''} ${idx === currentStep ? 'active' : ''}`}
//           >
//             {mult.toFixed(1)}x
//           </div>
//         ))}
//         {currentStep >= 0 && currentStep < multipliers.length && (
//           <img src="https://www.pngkey.com/png/full/131-1316095_chicken-wing-calculator-cartoon-chicken.png" className="chicken" alt="chicken" style={{ left: `${currentStep * 90}px` }} />
//         )}
//       </div>

//       <div className="control-panel">
//         <div className="amount-bar">
//           <span>MIN</span>
//           <input type="number" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} />
//           <span>MAX</span>
//         </div>

//         <div className="amount-buttons">
//           {[0.5, 1, 2, 5].map((val) => (
//             <button key={val} onClick={() => setBetAmount(val)}>{val} $</button>
//           ))}
//         </div>

//         <div className="action-buttons">
//           <button className="cash-out" onClick={handleCashOut}>CASH OUT</button>
//           <button className="go" onClick={handleGo}>GO</button>
//         </div>

//         <div className="message">{message}</div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import axios from "axios";

// History of recent games

function Home() {



  const [isAuthenticated, setIsAuthenticated] = useState(false); // null = unknown, true/false = known
  console.log(isAuthenticated, "is authenticated");
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/auth");
      return;
    }

    axios
      .get(`${apiUrl}/user/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data, "User is authenticated");
        setIsAuthenticated(true);
        // navigate("/play");
      })
      .catch((err) => {
        console.warn("Token invalid:", err.response?.data?.message);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  }, []);




  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [crashIndex, setCrashIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [pop, setPop] = useState(false);
  const [pop2, setPop2] = useState(false);

  const [betAmount, setBetAmount] = useState(100);
  const [cashOutValue, setCashOutValue] = useState("0.00");
  const [balance, setBalance] = useState(1000.0);
  const [autoCashout, setAutoCashout] = useState(0);
  const [recentWins, setRecentWins] = useState([]);
  const intervalRef = useRef(null);
  const gameAreaRef = useRef(null);

  const [selected, setSelected] = useState("Easy"); // default selection

  const difficulties = ["Easy", "Medium", "Hard", "Hardcore"];

  // console.log(selected, "seleected step ");

  const multipliersMap = {
    Easy: [
      0.0, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5,
      8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0,
    ],
    Medium: [
      0.0, 2.0, 3.5, 5.0, 6.5, 8.0, 9.5, 11.0, 12.5, 14.0, 15.5, 17.0, 18.5,
      20.0, 21.5, 23.0, 24.5, 26.0, 27.5, 29.0, 30.5, 32.0, 33.5, 35.0, 36.5,
    ],
    Hard: [
      0.0, 3.0, 5.0, 7.0, 9.0, 11.0, 13.0, 15.0, 17.0, 19.0, 21.0, 23.0, 25.0,
      27.0, 29.0, 31.0, 33.0, 35.0, 37.0, 39.0, 41.0, 43.0, 45.0, 47.0, 49.0,
      51.0,
    ],
    Hardcore: [
      0.0, 4.0, 7.5, 11.0, 14.5, 18.0, 21.5, 25.0, 28.5, 32.0, 35.5, 39.0, 42.5,
      46.0, 49.5, 53.0, 56.5, 60.0, 63.5, 67.0, 70.5, 74.0, 77.5, 81.0, 84.5,
      88.0,
    ],
  };

  const multipliers = multipliersMap[selected];

  const history = [
    { multiplier: 1.5, result: "win" },
    { multiplier: 2.8, result: "win" },
    { multiplier: 1.1, result: "crash" },
    { multiplier: 3.2, result: "win" },
    { multiplier: 1.3, result: "crash" },
    { multiplier: 4.1, result: "win" },
    { multiplier: 1.2, result: "crash" },
    { multiplier: 2.4, result: "win" },
  ];

  // Start the game
  // const startGame = () => {
  //   if (isRunning || balance < betAmount) return;

  //   // Reset game state
  //   setCurrentStep(0);
  //   setCrashIndex(null);
  //   setMessage('');
  //   setIsRunning(true);
  //   setCashOutValue((betAmount * multipliers[0]).toFixed(2));

  //   // Deduct bet from balance
  //   setBalance(prev => prev - betAmount);

  //   // Generate random crash point
  //   const randomCrash = Math.floor(Math.random() * (multipliers.length - 5)) + 5;
  //   setCrashIndex(randomCrash);

  //   // Start animation
  //   let step = 0;
  //   intervalRef.current = setInterval(() => {
  //     step++;

  //     // Update current position and cashout value
  //     setCurrentStep(step);
  //     setCashOutValue((betAmount * multipliers[step]).toFixed(2));

  //     // Check if we've reached auto-cashout
  //     if (autoCashout > 0 && multipliers[step] >= autoCashout) {
  //       cashOut();
  //       return;
  //     }

  //     // Check for crash or end of road
  //     if (step >= randomCrash || step >= multipliers.length - 1) {
  //       clearInterval(intervalRef.current);
  //       setIsRunning(false);

  //       if (step >= randomCrash) {
  //         setMessage('💥 Crashed! You lost your bet.');
  //       } else {
  //         const profit = (betAmount * multipliers[step]).toFixed(2);
  //         setMessage(`🏁 Reached the end! Auto cash-out: +$${profit}`);
  //         setBalance(prev => prev + (betAmount * multipliers[step]));

  //         // Add to recent wins
  //         setRecentWins(prev => [
  //           { multiplier: multipliers[step], profit: profit },
  //           ...prev.slice(0, 4)
  //         ]);
  //       }
  //     }
  //   }, 1000);
  // };

  const [started, setStarted] = useState(false);
  const [jumpClass, setJumpClass] = useState("");
  const [firstJump, setFristJump] = useState(true);
  const [menu, setShowmenu] = useState(false);

  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/get-num`);
        // console.log("Fetched number:", res);
        setNumber(res.data.number);
      } catch (error) {
        console.error("Failed to fetch number:", error);
      }
    };

    fetchNumber(); // initial call immediately

    const interval = setInterval(fetchNumber, 1000); // call every 1 second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const prevNumberRef = useRef(null);
  const crashWasRandomRef = useRef(false);

  useEffect(() => {
    if (
      isRunning &&
      number !== null &&
      prevNumberRef.current === null &&
      crashWasRandomRef.current
    ) {
      // First number just arrived during game, and original crash was random
      const updatedCrash = currentStep + 1;
      console.log("Updating crash value mid-game:", updatedCrash);
      setCrashIndex(updatedCrash);
      crashWasRandomRef.current = false;
    }
  
    prevNumberRef.current = number; // always update for next cycle
  }, [number]);
  


  const startGame = () => {
    console.log(isRunning, balance, betAmount);
    if (isRunning || balance < betAmount) return;

    setJumpClass("chicken-jump");
    setTimeout(() => {
      setJumpClass(""); // remove to allow retriggering
    }, 300);

    const numMap = {
      Easy: 12,
      Medium: 7,
      Hard: 5,
      Hardcore: 2,
    };

    const num = numMap[selected];


  

    const prevNumber = prevNumberRef.current;
    let randomCrash;



    // const randomCrash = Math.floor(Math.random() * (multipliers.length - 1)); // as of moultiplie length
    // const randomCrash = Math.floor(Math.random() * num) + 1; // for mobile
    // // const randomCrash = Math.floor(Math.random() * 30) + 1; // for desktop

    // if(number){
    //   const randomCrash = currentStep + 1;
    // }


    if (number === null) {
      randomCrash = Math.floor(Math.random() * num) + 1;
      crashWasRandomRef.current = true;
    } else {
      if (prevNumber === null) {
        randomCrash = currentStep + 1;
      } else {
        randomCrash = number;
      }
      crashWasRandomRef.current = false;
    }
    prevNumberRef.current = number; // update after logic

    console.log(randomCrash, "random crash");


    setCrashIndex(randomCrash);
    setCurrentStep(0);
    setIsRunning(true);
    setStarted(true);
    setMessage("");
    setCashOutValue((betAmount * multipliers[0]).toFixed(2));
    setBalance((prev) => prev - betAmount);
  };

  const goStep = () => {
    if (!started || !isRunning) return;
    setFristJump(false);
    setJumpClass("chicken-jump");
    setTimeout(() => {
      setJumpClass(""); // remove to allow retriggering
    }, 300);

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setCashOutValue((betAmount * multipliers[nextStep]).toFixed(2));

    if (autoCashout > 0 && multipliers[nextStep] >= autoCashout) {
      cashOut();
      return;
    }
    console.log(nextStep, crashIndex, "next", "crsdh");
    if (nextStep === crashIndex) {
      setMessage("💥 Crashed! You lost your bet.");
      setPop(true);

      setIsRunning(false);
      setStarted(false);
    } else if (nextStep >= multipliers.length - 1) {
      const profit = (betAmount * multipliers[nextStep]).toFixed(2);
      setMessage(`🏁 Reached the end! Auto cash-out: +$${profit}`);
      setBalance((prev) => prev + parseFloat(profit));
      setIsRunning(false);
      setStarted(false);
    }
  };

  // Cash out manually
  const cashOut = () => {
    if (!isRunning || currentStep < 0) return;

    clearInterval(intervalRef.current);
    setIsRunning(false);

    const profit = (multipliers[currentStep] * betAmount).toFixed(2);
    setMessage(
      `✅ Cashed out at ${multipliers[currentStep].toFixed(2)}x: +₹ ${profit}`
    );
    setPop2(true);
    setBalance((prev) => parseFloat((prev + parseFloat(profit)).toFixed(2)));

    // Add to recent wins
    setRecentWins((prev) => [
      { multiplier: multipliers[currentStep], profit: profit },
      ...prev.slice(0, 4),
    ]);
  };

  // Reset game
  const resetGame = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setCurrentStep(-1);
    setMessage("");
    setCashOutValue("0.00");
  };

  // Set bet amount with validation
  const handleSetBet = (amount) => {
    if (isRunning) return;
    setBetAmount(Math.min(amount, balance));
  };

  // Set auto cashout
  const handleSetAutoCashout = (value) => {
    if (isRunning) return;
    setAutoCashout(value);
  };

  // Initialize recent wins
  useEffect(() => {
    setRecentWins([
      { multiplier: 9.2, profit: "4.60" },
      { multiplier: 7.1, profit: "3.55" },
      { multiplier: 5.2, profit: "2.60" },
      { multiplier: 3.6, profit: "1.80" },
    ]);
  }, []);

  const navigate = useNavigate();

  const stepMap = {
    1: 100,
    2: 120,
    3: 138,
    4: 152,
    5: 169,
    6: 183,
    7: 201,
    8: 229,
    9: 235,
    10: 257,
    11: 275,
    12: 291,
    13: 308,
    14: 323,
    15: 342,
    16: 353,
    17: 373,
    18: 387,
    19: 411,
    20: 424,
    21: 440,
    22: 458,
    23: 472,
    24: 490,
  };

  const translateX = stepMap[currentStep] || 50;

  const [num, setNum] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 7) + 1;
      setNum(random);

      // Reset number after 1 second
      setTimeout(() => {
        setNum(null);
      }, 1000);
    }, 3000); // Call every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // console.log(num, "num");

  const getButtonClass = (label) => {
    return `btn w-100 py-1  fw-semibold ${
      selected === label ? "text-white" : "text-white"
    }`;
  };

  const getButtonStyle = (label) => {
    return {
      backgroundColor: selected === label ? "#1e283ccc" : "transparent",
      borderRadius: "0.375rem",
      transition: "background-color 0.3s",
    };
  };




  

  return (
    <div className="app-container">
      <div className="container-fluid d-none top-bar py-2 shadow-sm">
        <div className="row align-items-center">
          {/* Main Header Section (Logo, Login, and 10000 div) */}
          <div className="col-12 d-flex justify-content-between align-items-center gap-1">
            {/* Game Title Section with Logo */}
            <div className="d-flex align-items-center">
              <img
                src="https://chicken-road.inout.games/static/svg/logo_mobile.57d4dc22.svg"
                className="me-2 fs-3"
                alt="Game Logo"
                style={{ maxHeight: "30px" }} // Optional: Limit the logo size
              />
            </div>

            {/* Login Button */}
            <button
              className="btn btn-sm text-light bg-success btn-sm px-2 py-1"
              onClick={() => navigate("/auth")}
            >
              Login
            </button>

            <div className="d-flex gap-3 justify-content-center">
              {/* ₹10000 Stat Box */}
              <div
                className="d-flex justify-content-center align-items-center px-2 py-1 gap-2 rounded"
                style={{
                  minWidth: "100px",
                  // width: '180px',
                  height: "33px",
                  whiteSpace: "nowrap",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                ₹10000
              </div>

              {/* Balance Stat Box */}
              <div
                className="d-flex justify-content-center align-items-center px-2 py-1 gap-2 rounded"
                style={{
                  minWidth: "100px",
                  // width: '180px',
                  height: "33px",
                  whiteSpace: "nowrap",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                ₹{balance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between px-2 px-sm-5 bg-dark text-white overflow-auto w-100">
        <h1
          className="fw-bold fs-4 fs-md-3 fs-xl-1 text-nowrap"
          style={{ cursor: "pointer" }}
        >
          CHICKEN <span className="text-warning">R</span>
          <span
            className="d-inline-block bg-warning rounded-circle mx-1"
            style={{ width: "1rem", height: "1rem" }}
          ></span>
          AD
        </h1>

        <div className="d-flex align-items-center gap-2 gap-sm-3 justify-content-end small">
          {/* How to play button */}
          <button className="d-none d-md-flex px-3 py-1 align-items-center rounded bg-secondary text-white border-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="me-1"
              width="16"
              height="16"
              viewBox="0 0 1024 1024"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              <path d="M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" />
            </svg>
            <span className="d-none d-sm-inline">How to play?</span>
          </button>

          {/* Balance */}
          <button className="px-3 py-1 d-flex align-items-center rounded bg-secondary text-white border-0">
            <span
              className="me-1 d-flex align-items-center justify-content-center bg-white text-black rounded-circle"
              style={{ width: "16px", height: "16px", fontSize: "10px" }}
            >
              ₹
            </span>
            {balance.toFixed(2)}
          </button>

          {/* Refresh Button */}
          <button className="bg-secondary d-none d-lg-bloc rounded p-2 border-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="12"
              height="12"
              viewBox="0 0 1024 1024"
            >
              <path d="M685.904 383.184l275.264-273.572..." />{" "}
              {/* You can keep full path here */}
            </svg>
          </button>

          {/* Menu Icon */}
          <button
            onClick={() => setShowmenu(!menu)}
            className="bg-transparent border-0 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              />
            </svg>
          </button>

          {menu ? (
            <div>
              <UserMenu menu={menu} onClose2={() => setShowmenu(!menu)} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        ref={gameAreaRef}
        className="game-area"
        style={
          {
            // transform: `translateX(-${currentStep * 85}px)`,
            // transition: "transform 0.5s ease",
            // display: 'flex'
          }
        }
      >
        {/* <div className="road-line"></div>
        <div className="dashed-line">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="dash"></div>
          ))}
        </div> */}

        {/* Multiplier markers */}
        {/* <div className="multiplier-markers">
          {multipliers.map((mult, idx) => (
            <div 
              key={idx}
              className={`marker ${crashIndex === idx ? 'crash' : ''} ${
                currentStep >= idx ? 'passed' : ''
              } ${idx === currentStep ? 'current' : ''}`}
            >
              {mult.toFixed(1)}x
            </div>
          ))}
        </div> */}

        {/* Chicken character */}

        {/* History of recent games */}
        {/* <div className="game-history">
          {history.map((game, idx) => (
            <>
            <div 
              key={idx}
              className={`history-item ${game.result}`}
            >
              {game.multiplier.toFixed(1)}x
            </div>
            <div><div>
            </>
          ))}
        </div> */}
        {/* <div className ="gate"> */}
        {/* </div> */}
        <div
          className="game-history"
          style={{
            transform: `translateX(-${currentStep * 85}px)`,
            transition: "transform 0.5s ease",
            display: "flex",
          }}
        >
          <img src="/images/gatee.png" className="gate-img"></img>

          {multipliers?.slice(1).map((game, idx) => (
            <div key={idx} className="history-wrapper">
              {idx < currentStep - 1 ? (
                <div className={``}>
                  <img className="history-item22" src="/images/coin.png" />
                </div>
              ) : (
                <div
                  className={`history-item ff ${game} ${
                    idx === currentStep - 1 ? "bg-successc" : "bg-secondar"
                  }`}
                >
                  {game.toFixed(1)}x
                </div>
              )}

              {idx === num && (
                <img
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "10px",
                    width: "100px",
                  }}
                  src="/images/firrr.gif"
                  alt="fire"
                />
              )}
            </div>
          ))}

          <div>
            <img
              src="https://chicken-road.zone/assets/golden_egg_wall-CinxxCUn.png"
              style={{ height: "400px" }}
              className="gate-img"
            ></img>
            <div
              className="fw-bold position-absolute text-white text-center"
              style={{
                top: "47%",
                transform: "translate(-50%, -50%)",
                fontSize: "40px",
                textShadow: "0 0 5px rgb(255, 215, 0)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                marginLeft: "74px",
              }}
            >
              {selected === "Easy"
                ? "50x"
                : selected === "Medium"
                ? "250x"
                : selected === "Hard"
                ? "1250x"
                : "11100x"}
            </div>
          </div>
        </div>

        {/* {currentStep >=  0 && (
          <div
            className="chicken-container"
            style={{
              left: `${(currentStep / (multipliers.length - 1)) * 95}%`,
            }}
          >
            <div className="chicken-character">
              <div className="chicken"><img src='/images/Chickenone.png' className='chicken-img flip-horizontal'/></div>
            </div>
          </div>
         )}
          */}

        {currentStep >= 0 && (
          // <div
          //   className="chicken-container"
          //   style={{
          //     transform: `translateY(${currentStep % 2 === 0 ? '10px' : '0px'})`
          //   }}
          // >
          //   <div className="chicken-character">
          //     <div className="chicken"><img src='/images/Chickenone.png' className='chicken-img flip-horizontal' /></div>
          //   </div>
          // </div>
          <div className={`chicken-container ${jumpClass}`}>
            <div className="chicken-character">
              <div className="chicken">
                {message ? (
                  <img
                    loading="lazy"
                    src={"/images/fried.png"}
                    className={`chicken-img flip-horizontal ${
                      message ? "d-block" : "d-none"
                    }`}
                    style={{
                      // left: firstJump ? '70px' : '0px',
                      transform: `scaleX(1) translateX(${translateX}px) translateY(6px)`,
                      // transform: scaleX(0),
                      transition: "transform 0.5s ease",
                      width: "100px",
                      height: "auto",
                      filter: "brightness(0.9) contrast(1) saturate(0.8)",
                      // left: "-45px",
                    }}
                  />
                ) : (
                  <img
                    src={`/images/chickk.gif`}
                    className="chicken-img flip-horizontal"
                    style={{
                      // left: firstJump ? '70px' : '0px',

                      transform: `scaleX(1) translateX(${translateX}px)`,
                      // transform: scaleX(0),
                      transition: "transform 0.5s ease",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recent wins */}
        {/* <div className="recent-wins">
          <div className="wins-header">Recent Wins</div>
          <div className="wins-list">
            {recentWins.map((win, idx) => (
              <div key={idx} className="win-item">
                <span className="multiplier">{win.multiplier.toFixed(2)}x</span>
                <span className="profit">+${win.profit}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <div className="control-panel">
        {/* Bet Amount Controls */}
        <div className="bet-controls">
          <div className="bet-range">
            <span>MIN ₹0.10</span>
            <span>MAX ₹{balance.toFixed(2)}</span>
          </div>

          <div className="bet-input-container">
            <button
              className="bet-adjust"
              onClick={() => handleSetBet(Math.max(0.1, betAmount - 0.5))}
              disabled={isRunning}
            >
              -
            </button>

            <input
              type="number"
              className="bet-display text-dark text-center"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  handleSetBet(Math.max(0.1, Math.min(balance, value))); // Ensure value is within bounds
                } else {
                  handleSetBet(""); // Optional: Allow empty input temporarily
                }
              }}
              value={betAmount}
            />

            <button
              className="bet-adjust"
              onClick={() => handleSetBet(Math.min(balance, betAmount + 0.5))}
              disabled={isRunning}
            >
              +
            </button>
          </div>

          <div className="quick-bets">
            {[100, 200, 500, 1000].map((val) => (
              <button
                key={val}
                className={`quick-bet ${betAmount === val ? "active" : ""}`}
                onClick={() => handleSetBet(val)}
                disabled={isRunning}
              >
                ₹{val}
              </button>
            ))}
          </div>
        </div>

        <div className="w-100 mt-1 mt-md-0 d-flex flex-column justify-content-between h-100 gap-5">
          {/* Header row (visible on md and up) */}
          <div className="d-none d-md-flex text-light small w-100 justify-content-between">
            <p className="mb-0">Difficulty</p>
            <p className="mb-0">Chance of Collision</p>
          </div>

          {/* Buttons (desktop only) */}
          <div className=" d-flex  text-white bg-secondary rounded overflow-hidden  pt-0 pb-0 gap-1">
            {difficulties?.map((label) => (
              <button
                key={label}
                className={getButtonClass(label)}
                style={getButtonStyle(label)}
                onClick={() => setSelected(label)}
                disabled={isRunning}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Button */}

          
          
        </div>

        {/* Auto Cashout */}
        <div className="auto-cashout ">
          <div className="auto-cashout-header d-none">
            <span>Auto Cashout</span>
            <span>
              {autoCashout > 0 ? `${autoCashout.toFixed(2)}x` : "OFF"}
            </span>
          </div>

          <div className="auto-cashout-buttons d-none">
            {[0, 2, 5, 10].map((val) => (
              <button
                key={val}
                className={`cashout-option ${
                  autoCashout === val ? "active" : ""
                }`}
                onClick={() => handleSetAutoCashout(val)}
                disabled={isRunning}
              >
                {val > 0 ? `${val}x` : "OFF"}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className={`cash-out py-1 ${isRunning ? "" : "disabled"}`}
            onClick={cashOut}
            disabled={!isRunning}
          >
            <div className="cash-out-label">CASH OUT</div>
            <div className="cash-out-value">₹{cashOutValue}</div>
          </button>

          <button
            className={`go-button ${
              !isRunning && balance < betAmount ? "disabled" : "go"
            }`}
            onClick={isRunning ? goStep : startGame}
            disabled={!isRunning && balance < betAmount}
          >
            {isRunning ? "GO" : "START"}
          </button>
        </div>

        {/* Status Message */}
        {pop2 && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 9999,
            }}
          >
            <div
              className="position-relative text-white p-5 rounded-4 shadow-lg"
              style={{
                backgroundColor: "#2c2f4a",
                backgroundImage: "url('/images/winn.jpg')",
                backgroundPosition: "center",
                backgroundSize: "500px auto",
                backgroundRepeat: "no-repeat",
                minWidth: "400px",
                maxWidth: "90%",
                width: "500px",
                textAlign: "center",
                border: "2px solid #4e4e91",
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.1)",
              }}
            >
              <button
                onClick={() => setPop2(false)}
                className="btn-close position-absolute"
                style={{
                  top: "1rem",
                  right: "1rem",
                  backgroundColor: "white",
                  padding: "0.75rem",
                  borderRadius: "50%",
                }}
              ></button>

              <h2
                className="mb-3"
                style={{ fontWeight: 600, fontSize: "1.75rem" }}
              ></h2>

              <img
                src="/images/winn.jpg"
                style={{ width: "40px", height: "auto" }}
              />

              <div
                className={`status-message ${
                  message.includes("lost")
                    ? "error"
                    : message.includes("+$")
                    ? "success"
                    : "info"
                }`}
              >
                {message}
              </div>

              <button
                className="btn btn-light mt-4 px-4 py-2 fw-bold"
                onClick={() => setPop2(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="instructions">
        <h3>How to Play:</h3>
        <ul>
          <li>Set your bet amount and click GO to start the game</li>
          <li>
            The chicken will start moving along the road with increasing
            multiplier
          </li>
          <li>
            Cash out before the chicken crashes to win your bet multiplied by
            the current multiplier
          </li>
          <li>If you don't cash out before the crash, you lose your bet</li>
          <li>
            Set Auto Cashout to automatically cash out at a specific multiplier
          </li>
        </ul>
      </div>

      {pop && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
          }}
        >
          <div
            className="position-relative text-white p-5 rounded-4 shadow-lg"
            style={{
              backgroundColor: "#2c2f4a",
              minWidth: "400px",
              maxWidth: "90%",
              width: "500px",
              textAlign: "center",
              border: "2px solid #4e4e91",
              boxShadow: "0 0 25px rgba(255, 255, 255, 0.1)",
            }}
          >
            <button
              onClick={() => setPop(false)}
              className="btn-close position-absolute"
              style={{
                top: "1rem",
                right: "1rem",
                backgroundColor: "white",
                padding: "0.75rem",
                borderRadius: "50%",
              }}
            ></button>

            <h2
              className="mb-3"
              style={{ fontWeight: 600, fontSize: "1.75rem" }}
            >
              🚨 Alert
            </h2>

            <p style={{ fontSize: "1.2rem", lineHeight: 1.5 }}>{message}</p>

            <button
              className="btn btn-light mt-4 px-4 py-2 fw-bold"
              onClick={() => setPop(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
