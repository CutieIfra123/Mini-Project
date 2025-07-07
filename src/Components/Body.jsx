import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Body = ({ Price }) => {
  const [ingredientsOrder, setIngredientsOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const lettuceCount = ingredientsOrder.filter(
    (item) => item === "lettuce"
  ).length;
  const baconCount = ingredientsOrder.filter((item) => item === "bacon").length;
  const cheeseCount = ingredientsOrder.filter(
    (item) => item === "cheese"
  ).length;
  const meatCount = ingredientsOrder.filter((item) => item === "meat").length;

  const totalPrice =
    Price +
    lettuceCount * 0.5 +
    baconCount * 0.7 +
    cheeseCount * 0.4 +
    meatCount * 1.3;

  const addIngredient = (type) => {
    setIngredientsOrder((prevOrder) => [...prevOrder, type]);
  };

  const removeIngredient = (type) => {
    setIngredientsOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      const indexToRemove = newOrder.lastIndexOf(type);
      if (indexToRemove > -1) {
        newOrder.splice(indexToRemove, 1);
      }
      return newOrder;
    });
  };

  const ingredientComponents = {
    lettuce: (
      <div className="w-[350px] h-[20px] my-2 mx-auto rounded-[20px] bg-gradient-to-b from-green-600 to-green-500"></div>
    ),
    bacon: (
      <div className="w-[350px] h-[10px] my-2 mx-auto bg-gradient-to-b from-red-900 to-red-700"></div>
    ),
    cheese: (
      <div className="w-[350px] h-[15px] my-2 mx-auto rounded-[20px] bg-gradient-to-b from-yellow-300 to-yellow-500"></div>
    ),
    meat: (
      <div className="w-[350px] h-[25px] my-2 mx-auto rounded-[15px] bg-gradient-to-b from-orange-800 to-red-950"></div>
    ),
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white rounded p-6 w-[400px] shadow-lg text-black">
            <h2 className="text-xl font-bold mb-4">Your Order Summary:</h2>
            <ul className="list-disc pl-6 mb-4">
              {lettuceCount > 0 && <li>Lettuce: {lettuceCount}</li>}
              {baconCount > 0 && <li>Bacon: {baconCount}</li>}
              {cheeseCount > 0 && <li>Cheese: {cheeseCount}</li>}
              {meatCount > 0 && <li>Meat: {meatCount}</li>}
            </ul>
            <p className="font-bold mb-4">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <p className="mb-4">Continue to Checkout?</p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowModal(false)}
                className="text-red-700 font-bold"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/checkout", {
                    state: {
                      ingredientsOrder,
                      totalPrice: totalPrice.toFixed(2),
                    },
                  });
                }}
                className="text-green-700 font-bold"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-[430px] flex justify-center items-start">
        <div className="flex flex-col pt-[40px] items-center w-[360px]">
          <div className="relative bg-gradient-to-r from-yellow-700 bg-yellow-600 to-yellow-600 w-full h-[80px] rounded-t-[40px] block rounded-tl-[50%] rounded-tr-[50%]">
            <div className="absolute w-[45px] h-[15px] bg-white left-[5%] top-[40%] rotate-[30deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]" />
            <div className="absolute w-[45px] h-[15px] bg-white left-[20%] top-[30%] rotate-[-20deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]" />
            <div className="absolute w-[45px] h-[15px] bg-white left-[60%] top-[27%] rotate-[20deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]" />
            <div className="absolute w-[45px] h-[15px] bg-white left-[40%] top-[28%] rotate-[-60deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]" />
            <div className="absolute w-[45px] h-[15px] bg-white left-[80%] top-[30%] rotate-[-20deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]" />
          </div>

          {ingredientsOrder.length === 0 ? (
            <p className="text-center text-dark font-bold py-4 text-lg">
              No Ingredients Added
            </p>
          ) : (
            ingredientsOrder.map((ingredientType, index) => (
              <div key={`${ingredientType}-${index}`} className="w-full">
                {ingredientComponents[ingredientType]}
              </div>
            ))
          )}

          <div className="bg-amber-900 w-full h-[52px] rounded-b-[30px]" />
        </div>
      </div>

      <footer className="bg-yellow-700 min-h-[339px] text-white px-6 py-6">
        <p className="text-center text-xl font-bold py-4">
          Current Price: {totalPrice.toFixed(2)}$
        </p>

        <div className="flex justify-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <p>Lettuce</p>
            <p>Bacon</p>
            <p>Cheese</p>
            <p>Meat</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => removeIngredient("lettuce")}
              disabled={lettuceCount === 0}
              className={`px-4 py-1 rounded ${
                lettuceCount === 0
                  ? "bg-gray-400 text-gray-300"
                  : "bg-yellow-600"
              }`}
            >
              Less
            </button>
            <button
              onClick={() => removeIngredient("bacon")}
              disabled={baconCount === 0}
              className={`px-4 py-1 rounded ${
                baconCount === 0 ? "bg-gray-400 text-gray-300" : "bg-yellow-600"
              }`}
            >
              Less
            </button>
            <button
              onClick={() => removeIngredient("cheese")}
              disabled={cheeseCount === 0}
              className={`px-4 py-1 rounded ${
                cheeseCount === 0
                  ? "bg-gray-400 text-gray-300"
                  : "bg-yellow-600"
              }`}
            >
              Less
            </button>
            <button
              onClick={() => removeIngredient("meat")}
              disabled={meatCount === 0}
              className={`px-4 py-1 rounded ${
                meatCount === 0 ? "bg-gray-400 text-gray-300" : "bg-yellow-600"
              }`}
            >
              Less
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => addIngredient("lettuce")}
              style={{ backgroundColor: "#8F5E1E" }}
              className="px-4 py-1 rounded text-white"
            >
              More
            </button>
            <button
              onClick={() => addIngredient("bacon")}
              style={{ backgroundColor: "#8F5E1E" }}
              className="px-4 py-1 rounded text-white"
            >
              More
            </button>
            <button
              onClick={() => addIngredient("cheese")}
              style={{ backgroundColor: "#8F5E1E" }}
              className="px-4 py-1 rounded text-white"
            >
              More
            </button>
            <button
              onClick={() => addIngredient("meat")}
              style={{ backgroundColor: "#8F5E1E" }}
              className="px-4 py-1 rounded text-white"
            >
              More
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            disabled={ingredientsOrder.length === 0}
            onClick={() => setShowModal(true)}
            className={`px-6 py-2 font-bold rounded ${
              ingredientsOrder.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-amber-300"
            }`}
          >
            ORDER NOW
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Body;
