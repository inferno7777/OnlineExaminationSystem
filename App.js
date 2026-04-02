import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/exam")
      .then(res => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Online Examination System</h1>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        questions.map((q, index) => (
          <div key={index}>
            <h3>{q.question}</h3>
            <input type="text" placeholder="Your answer" />
          </div>
        ))
      )}
    </div>
  );
}

export default App;