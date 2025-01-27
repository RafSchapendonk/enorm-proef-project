import { useState, useEffect } from "react";
import "./App.css";
import Product from "../components/product.jsx";
import Dropdown from "../components/dropdown.jsx";
import SearchButton from "../components/searchButton.jsx";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [makeOptions, setMakeOptions] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    fetch("https://site--cars-express-app--gbmmwqlm6cfw.code.run/cars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);

        const makes = [...new Set(data.data.map((item) => item.make))];
        setMakeOptions(makes);

        const models = [...new Set(data.data.map((item) => item.model))];
        setModelOptions(models);

        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleMakeDropdownChange = (e) => {
    setSelectedMake(e.target.value);
  };

  const handleModelDropdownChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleSearch = () => {
    const baseUrl =
      "https://site--cars-express-app--gbmmwqlm6cfw.code.run/cars";
    const url = new URL(baseUrl);
    const params = new URLSearchParams();

    if (selectedMake) {
      params.append("make", selectedMake);
    }
    if (selectedModel) {
      params.append("model", selectedModel);
    }

    console.log(selectedMake);
    console.log(selectedModel);

    url.search = params.toString();

    console.log(url.toString());

    fetch(url.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center p-2">
        Danny&apos;s autopaleis
      </h1>

      <div className="flex flex-col md:flex-row p-1.5 gap-1.5">
        <Dropdown options={makeOptions} onChange={handleMakeDropdownChange} />
        <Dropdown options={modelOptions} onChange={handleModelDropdownChange} />
        <SearchButton onSearch={handleSearch} />
      </div>
      <div className="grid md:grid-cols-2 gap-0.5">
        {data.data &&
          data.data.map((car, index) => (
            <Product
              key={index}
              make={car.make}
              price={car.price}
              model={car.model}
              year={car.year}
            />
          ))}
      </div>
    </>
  );
}

export default App;
