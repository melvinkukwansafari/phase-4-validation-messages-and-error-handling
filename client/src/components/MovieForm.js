import { useState } from "react";
import styled from "styled-components";

function MovieForm() {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    length: "0",
    director: "",
    description: "",
    poster_url: "",
    category: "",
    discount: false,
    female_director: false,
  });
// make the function async to enable the await keyword
 async function handleSubmit(e) {
    e.preventDefault();
     // fetch returns a Promise, we must await it
  const response = await fetch("/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  // response.json() returns a Promise, we must await it
  const data = await response.json();
  if (response.ok) {
    console.log("Movie created:", data);
  } else {
    setErrors(data.errors);
  }
  }

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    });
  }

  return (
    <Wrapper>
    
    <form onSubmit={handleSubmit}>
        {/* form elements here... */}

        {/* show error messages if any */}
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <SubmitButton type="submit">Add Movie</SubmitButton>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 32px auto;
  padding: 32px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  background: blue;
  color: yellow;
  font-weight: bold;
  font-family: inherit;
  font-size: 1.2rem;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

export default MovieForm;
