import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://lawyersverifyandcases.onrender.com";

const ApiTester = () => {
  const [formData, setFormData] = useState({
    selectedHighcourt: "",
    selectedBench: "",
    court_code: "",
    state_code: "",
    court_complex_code: "",
    captcha: "",
    petres_name: "",
    rgyear: "",
    caseStatusSearchType: "",
    f: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reusable API Call Function
  const apiRequest = async (endpoint, data) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/${endpoint}`,
        new URLSearchParams(data),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" }, withCredentials: true }
      );
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h2>working03:43</h2>

      {/* Input Fields for User to Enter Data */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input type="text" name="selectedHighcourt" placeholder="Enter Highcourt Code" value={formData.selectedHighcourt} onChange={handleChange} />
        <input type="text" name="selectedBench" placeholder="Enter Bench Code" value={formData.selectedBench} onChange={handleChange} />
        <input type="text" name="court_code" placeholder="Enter Court Code" value={formData.court_code} onChange={handleChange} />
        <input type="text" name="state_code" placeholder="Enter State Code" value={formData.state_code} onChange={handleChange} />
        <input type="text" name="court_complex_code" placeholder="Enter Court Complex Code" value={formData.court_complex_code} onChange={handleChange} />
        <input type="text" name="captcha" placeholder="Enter Captcha" value={formData.captcha} onChange={handleChange} />
        <input type="text" name="petres_name" placeholder="Enter Petitioner Name" value={formData.petres_name} onChange={handleChange} />
        <input type="text" name="rgyear" placeholder="Enter Registration Year" value={formData.rgyear} onChange={handleChange} />
        <input type="text" name="caseStatusSearchType" placeholder="Enter Case Status Search Type" value={formData.caseStatusSearchType} onChange={handleChange} />
        <input type="text" name="f" placeholder="Enter Status (Pending, etc.)" value={formData.f} onChange={handleChange} />
      </div>

      {/* Buttons to Make API Calls */}
      <button onClick={() => apiRequest("fetchBenches", { selectedHighcourt: formData.selectedHighcourt })} style={{ margin: "5px" }}>
        Fetch Benches
      </button>
      <button onClick={() => apiRequest("fetchCaptcha", { selectedBench: formData.selectedBench })} style={{ margin: "5px" }}>
        Fetch Captcha
      </button>
      <button
        onClick={() =>
          apiRequest("api/case", {
            court_code: formData.court_code,
            state_code: formData.state_code,
            court_complex_code: formData.court_complex_code,
            captcha: formData.captcha,
            petres_name: formData.petres_name,
            rgyear: formData.rgyear,
            caseStatusSearchType: formData.caseStatusSearchType,
            f: formData.f,
          })
        }
        style={{ margin: "5px" }}
      >
        Fetch Case Details
      </button>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Response Output */}
      <h3>Response:</h3>
      <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px", overflowX: "auto" }}>
        {response ? JSON.stringify(response, null, 2) : "No response yet"}
      </pre>

      {/* Error Display */}
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>Error:</strong> {JSON.stringify(error, null, 2)}
        </div>
      )}
    </div>
  );
};

export default ApiTester;