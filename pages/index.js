import Head from "next/head";
import { useEffect, useState } from "react";
import Plus from "../assets/Plus.svg";

export default function Home() {



  const [todoItems, setTodoItems] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [item, setItem] = useState("");

  const [ShowEmptyPopUp, setShowEmptyPopUp] = useState(false);
  const [ShowSameItemPopUp, setShowSameItemPopUp] = useState(false);

  function EmptyPopUp() {
    return (
      <>
        <section className="shadow-2xl rounded-3xl">
          <div className="p-8 text-center sm:p-12">
            <h5 className="mt-6 text-3xl font-bold">Item cannot be empty.</h5>
  
            <a className="inline-block w-full py-4 mt-8 text-sm font-bold text-white bg-pink-600 rounded-full shadow-xl cursor-pointer"
            onClick={() => setShowEmptyPopUp(false)}>
              Close
            </a>
          </div>
        </section>
      </>
    );
  }
  

  function SameItem() {
    return (
      <>
        <section className="shadow-2xl rounded-3xl">
          <div className="p-8 text-center sm:p-12">
            <h5 className="mt-6 text-3xl font-bold">That item already exists</h5>
  
            <a className="inline-block w-full py-4 mt-8 text-sm font-bold text-white bg-pink-600 rounded-full shadow-xl cursor-pointer"
            onClick={() => setShowSameItemPopUp(false)}>
              Close
            </a>
          </div>
        </section>
      </>
    );
  }
  

  const handleSubmit = (request) => {
    if (request === "add") {
      console.log("ADD REQUEST")
      setClicked(true);
      AddItem();
    } else {
      console.log("REMOVE REQUEST")
      RemoveItem(request);
    }
  }

  function AddItem() {

    if (item === "") {
      setShowEmptyPopUp(true);
    }

    if (todoItems.includes(item)) {
      console.log("Item exists")
      setShowSameItemPopUp(true);
    }

    if (item != "" && !todoItems.includes(item) && clicked === true) {
      let temp = todoItems;
      temp.push(item);
      setTodoItems(temp);
      setItem("");
    }
  }

  function RemoveItem(task) {
    let temp = todoItems;
    temp = temp.filter(word => word != task);
    setTodoItems(temp);
    console.log(todoItems);
  }

  return (
    <>
      { ShowEmptyPopUp && <EmptyPopUp /> }
      { ShowSameItemPopUp && <SameItem /> }

      <div>
        <div className="max-w-lg mx-auto text-center mt-4">
          <h1 className="text-2xl font-bold sm:text-3xl">To-do App</h1>
        </div>

        <form className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div>
            <div className="relative">
              <input
                type="text"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm border-2 border-gray-500"
                placeholder="Add todo..."
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />

              <span
                className="absolute inset-y-0 inline-flex items-center right-5 w-4 cursor-pointer"
                onClick={() => handleSubmit("add")}
              >
                <Plus />
              </span>
            </div>
          </div>
        </form>
        <ul className="text-center pt-4">
          {todoItems.map((task) => {
            return (
              <li
                className="cursor-pointer hover:font-bold"
                onClick={() => handleSubmit(task)}
                key={todoItems.indexOf(task)}
              >
                {task}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
