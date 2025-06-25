import React from "react";

const Hero = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <section className="bg-[url(/pharm_tool1.jpg)] bg-cover bg-top bg-no-repeat">
      <div className="bg-[#36337882]">
        <div className="container">
          <div className="py-32 text-center text-white max-w-[600px] mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
              {title}
            </h1>
            <p className="sm:text-lg md:text-xl sm:font-semibold w-4/5 mx-auto sm:w-full">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
