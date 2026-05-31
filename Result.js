import axios from "axios";
import { useEffect, useState } from "react";

export default function Result() {

  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get(
      "http://localhost:5000/results",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {

      setResults(res.data);

    });

  }, [token]);

  return (
    <div className="exam-container">

      <h1 className="title">
        📊 Exam Results
      </h1>

      {results.map((r) => {

        const percentage =
          ((r.score / r.total) * 100).toFixed(2);

        const status =
          percentage >= 40
            ? "PASS ✅"
            : "FAIL ❌";

        return (

          <div
            className="question-card"
            key={r.id}
          >

            <h2>
              Score: {r.score}/{r.total}
            </h2>

            <h2
              style={{
                marginTop: "15px"
              }}
            >
              Percentage: {percentage}%
            </h2>

            <h2
              style={{
                marginTop: "15px",
                color:
                  percentage >= 40
                    ? "#22c55e"
                    : "#ef4444"
              }}
            >
              {status}
            </h2>

          </div>

        );

      })}

    </div>
  );
}
