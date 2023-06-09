import React from "react";
import AlertElement from "../DashboardComponents/AlertElement";
import AvatarRounder from "../DashboardComponents/AvatarRounder";
import StatsCard from "../DashboardComponents/StatsCard";
import ProfileProjectCards from "../DashboardComponents/ProfileProjectCards";
import ProfileBlogCards from "../DashboardComponents/ProfileBlogCards";

const DashboardTestPage = () => {
  const increment = 55;
  return (
    <div className="flex flex-col align-middle mb-5 pb-5 gap-5 items-center">
      <AlertElement text="warning"></AlertElement>
      <AvatarRounder />
      <StatsCard
        icon="fa-solid fa-coins"
        text="Awesome Bhai"
        stats={` ${increment > 0 ? "+" : "-"}${increment}%`}
        number={`$${increment}`}
      />
      <ProfileProjectCards
        img="https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/02f351b28d7e9a266e968dfb8ab1c27f"
        title=" Hiii "
        description="lorem lorem "
        link="/"
      />
      <ProfileBlogCards />
    </div>
  );
};

export default DashboardTestPage;
