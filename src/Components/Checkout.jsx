import { useLocation, useNavigate } from "react-router-dom";

const ingredientComponents = {
  lettuce: (
    <div className="w-[350px] h-[20px] my-2 mx-auto rounded-[20px] bg-gradient-to-b from-green-600 to-green-500"></div>
  ),
  bacon: (
    <div className="w-[80%] h-[10px] my-2 mx-auto bg-gradient-to-b from-red-900 to-red-700"></div>
  ),
  cheese: (
    <div className="w-[350px] h-[15px] my-2 mx-auto rounded-[20px] bg-gradient-to-b from-yellow-300 to-yellow-500"></div>
  ),
  meat: (
    <div className="w-[350px] h-[25px] my-2 mx-auto rounded-[15px] bg-gradient-to-b from-orange-800 to-red-950"></div>
  ),
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ingredientsOrder = location.state?.ingredientsOrder || [];
  const totalPrice = location.state?.totalPrice || "0.00";

  const goToContactInfo = () => {
    navigate("/checkout/contactinfo", {
      state: { ingredientsOrder },
    });
  };

  const goBackToBurger = () => {
    navigate("/", { state: { ingredientsOrder } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 text-center font-sans">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        We hope it tastes well!
      </h2>

      <div className="flex flex-col pt-[20px] items-center w-[360px]">
        <div className="relative bg-gradient-to-r from-yellow-700 bg-yellow-600 to-yellow-600 w-full h-[80px] rounded-t-[40px] block rounded-tl-[50%] rounded-tr-[50%]">
          <div className="absolute w-[45px] h-[15px] bg-white left-[5%] top-[40%] rotate-[30deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]"></div>
          <div className="absolute w-[45px] h-[15px] bg-white left-[20%] top-[30%] rotate-[-20deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]"></div>
          <div className="absolute w-[45px] h-[15px] bg-white left-[60%] top-[27%] rotate-[20deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]"></div>
          <div className="absolute w-[45px] h-[15px] bg-white left-[40%] top-[28%] rotate-[-60deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]"></div>
          <div className="absolute w-[45px] h-[15px] bg-white left-[80%] top-[30%] rotate-[-20deg] shadow-[inset_-2px_-3px_rgb(201,201,201)] rounded-[40%]"></div>
        </div>

        {ingredientsOrder.length === 0 ? (
          <p className="py-4 text-gray-500 font-medium">No Ingredients</p>
        ) : (
          ingredientsOrder.map((type, index) => (
            <div key={index} className="w-full">
              {ingredientComponents[type]}
            </div>
          ))
        )}

        <div className="bg-amber-900 w-full h-[52px] rounded-b-[30px]"></div>
      </div>

      <p className="mt-6 font-bold text-lg">Total Price: ${totalPrice}</p>

      <div className="flex gap-8 mt-10">
        <button
          onClick={goBackToBurger}
          className="text-red-700 font-bold text-lg"
        >
          CANCEL
        </button>
        <button
          onClick={goToContactInfo}
          className="text-green-700 font-bold text-lg"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default Checkout;
