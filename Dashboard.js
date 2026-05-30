export default function Dashboard({ setPage }) {

  const role = localStorage.getItem("role");

  return (
    <div className="dashboard">

      <h1>
        🚀 Online Examination Dashboard
      </h1>

      <div className="dashboard-buttons">

        <button
          className="btn"
          onClick={() =>
            setPage("exam")
          }
        >
          Start Exam
        </button>

        <button
          className="btn"
          onClick={() =>
            setPage("result")
          }
        >
          View Results
        </button>

        {role === "admin" && (
          <button
            className="btn"
            onClick={() =>
              setPage("admin")
            }
          >
            Admin Panel
          </button>
        )}

      </div>

    </div>
  );
}
