import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Exam({ setPage }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/exam")
      .then(res => setQuestions(res.data));
  }, []);

  const submit = async () => {
    const res = await axios.post("http://localhost:5000/submit", {
      answers
    });
    alert(`Score: ${res.data.score}/${res.data.total}`);
    setPage("dashboard");
  };

  return (
    <div>
      <h2>Exam</h2>

      {questions.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          <input onChange={(e) => {
            let temp = [...answers];
            temp[i] = e.target.value;
            setAnswers(temp);
          }} />
        </div>
      ))}

      <button onClick={submit}>Submit</button>
    </div>
  );
}