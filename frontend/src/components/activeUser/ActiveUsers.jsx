import { useEffect, useState } from "react";

const ActiveUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getUsersHandle = async () => {
    const response = await fetch("http://localhost:5000/act");
    const result = await response.json();
    // console.log(result);
    if (!response.ok) {
      setError("No User Found");
      setTimeout(() => {
        setError("");
      }, 200);
    } else {
      setError("");
      setData(result);
    }
    if (data == []) {
      setError("No User Found");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    getUsersHandle();
  }, []);
  return (
    <>
      <div className="container my-2">
        <h1>Active Users</h1>
        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}
        <div className="row">
          {data?.map((element) => (
            <div key={element._id} className="col-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {element.email}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {element.age}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActiveUsers;
