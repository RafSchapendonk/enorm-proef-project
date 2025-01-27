import PropTypes from "prop-types";
import carImage from "../assets/car-images/brute-auto.jpg";

function Product({ make, price, model, year }) {
  return (
    <div className="flex flex-row gap-2 p-1.5 border border-gray-300 rounded-md mx-1.5">
      <img
        className="rounded-md object-contain flex max-h-36"
        src={carImage}
        alt="car"
      />

      <div className="flex flex-col gap-1.5">
        <h2 className="font-bold">Model: {model}</h2>
        <div className="flex flex-col divide-y-1 divide-gray-300">
          <p>Make: {make}</p>
          <p>Price: ${price}</p>
          <p>Year: {year}</p>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  make: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default Product;
