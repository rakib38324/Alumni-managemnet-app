import React, { useEffect, useState } from "react";
import DisplayCharity from "./DisplayCharity";

const ShowCharity = () => {
  const [showCharity, setShowCharity] = useState([]);

  useEffect(() => {
    fetch("https://alumni-managemnet-app-server.vercel.app/charity")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowCharity(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(showCharity);

  return (
    <div className="w-9/12 mx-auto my-16">
      <div className="grid lg:grid-cols-2 gap-10 ">
        {showCharity?.map((charity) => (
          <DisplayCharity charity={charity} key={charity._id}></DisplayCharity>
        ))}
      </div>
    </div>
  );
};

export default ShowCharity;