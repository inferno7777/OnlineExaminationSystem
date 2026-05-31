import axios from "axios";
import { useState } from "react";

export default function Admin() {

  const token = localStorage.getItem("token");

  const [topic, setTopic] = useState("");

  const [form, setForm] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  // ===== MANUAL QUESTION ADD =====
  const addQuestion = async () => {

    try {

      await axios.post(
        "http://localhost:5000/add-question",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Question Added Successfully");

      setForm({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      });

    } catch {

      alert("Error Adding Question");

    }

  };

  // ===== AI QUESTION GENERATOR =====
  const generateQuestions = async () => {

    const lowerTopic =
      topic.toLowerCase().trim();

    let questions = [];

    // ===== DBMS QUESTIONS =====
    if (lowerTopic === "dbms") {

      questions = [

        {
          question: "What does DBMS stand for?",
          option1: "Database Management System",
          option2: "Digital Base Management",
          option3: "Data Backup Machine",
          option4: "None",
          answer: "Database Management System"
        },

        {
          question: "Which language is used in DBMS?",
          option1: "SQL",
          option2: "HTML",
          option3: "CSS",
          option4: "Python",
          answer: "SQL"
        },

        {
          question: "Which key uniquely identifies records?",
          option1: "Primary Key",
          option2: "Foreign Key",
          option3: "Candidate Key",
          option4: "Super Key",
          answer: "Primary Key"
        }

      ];

    }

    // ===== JAVA QUESTIONS =====
    else if (lowerTopic === "java") {

      questions = [

        {
          question: "Java is a ?",
          option1: "Programming Language",
          option2: "Operating System",
          option3: "Browser",
          option4: "Database",
          answer: "Programming Language"
        },

        {
          question: "Who developed Java?",
          option1: "Google",
          option2: "Microsoft",
          option3: "Sun Microsystems",
          option4: "Apple",
          answer: "Sun Microsystems"
        },

        {
          question: "Which keyword is used to create object?",
          option1: "new",
          option2: "class",
          option3: "this",
          option4: "void",
          answer: "new"
        }

      ];

    }

    else {

      alert("Topic not available");

      return;

    }

    try {

      for (let q of questions) {

        await axios.post(
          "http://localhost:5000/add-question",
          q,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      }

      alert("AI Questions Generated Successfully");

    } catch {

      alert("Error Generating Questions");

    }

  };

  return (
    <div className="admin-container">

      <h1 className="admin-title">
        👑 Admin Panel
      </h1>

      {/* ===== AI SECTION ===== */}

      <input
        className="input"
        placeholder="Enter Topic (dbms / java)"
        value={topic}
        onChange={(e) =>
          setTopic(e.target.value)
        }
      />

      <button
        className="btn"
        onClick={generateQuestions}
      >
        🤖 Generate AI Questions
      </button>

      <br />
      <br />

      {/* ===== MANUAL SECTION ===== */}

      <input
        className="input"
        placeholder="Question"
        value={form.question}
        onChange={(e) =>
          setForm({
            ...form,
            question: e.target.value
          })
        }
      />

      <input
        className="input"
        placeholder="Option 1"
        value={form.option1}
        onChange={(e) =>
          setForm({
            ...form,
            option1: e.target.value
          })
        }
      />

      <input
        className="input"
        placeholder="Option 2"
        value={form.option2}
        onChange={(e) =>
          setForm({
            ...form,
            option2: e.target.value
          })
        }
      />

      <input
        className="input"
        placeholder="Option 3"
        value={form.option3}
        onChange={(e) =>
          setForm({
            ...form,
            option3: e.target.value
          })
        }
      />

      <input
        className="input"
        placeholder="Option 4"
        value={form.option4}
        onChange={(e) =>
          setForm({
            ...form,
            option4: e.target.value
          })
        }
      />

      <input
        className="input"
        placeholder="Correct Answer"
        value={form.answer}
        onChange={(e) =>
          setForm({
            ...form,
            answer: e.target.value
          })
        }
      />

      <button
        className="btn"
        onClick={addQuestion}
      >
        Add Question
      </button>

    </div>
  );
} 
