import React from "react";

const Footer = () => {
  return (
    <div className="mt-auto">
      <div className="flex flex-col justify-center items-center">
        <img
          className="h-52 w-64  sm:w-50 sm:h-30"
          src="https://s3-alpha-sig.figma.com/img/068b/99c0/0830ee1a5638e2be2f69e29a65af3aea?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m82T6neWemt1r9UDoda~mtWL4iiUvM6llp7YtVWUdhQyrg~YiAsP67xu4cFr7i2n21Y8Itn2zbDuO1d9NbmoYFNVGQguYqFDm598sG6VlIDGEofj28BXesbhpWWVNKOoe4PLyWu8vF9PxkW0z~nOkupGXb970~T7o74w~JmbpbrRidjv9WKIn117xyEmVcKO059xzwRE1r5eFl9HJ3WoCJox16lnQhbqi6EqAR4iaMSbbH1j8ciNVrAs0tmgyTyyNM~w39fGIavhSN~vw2B-JFWtQnqHXnGLDE2d5wVSpY97-cTf44BVR6B7FLkvc22gLgW~VIWlSoGG4lbkyxsWbQ__"
          alt="img"
        />
      </div>
      <div className="text-black font-bold h-10 ">
        <hr className="border border-1.5 border-gray-800 mr-4 ml-4" />
      </div>

      <p className="flex flex-col justify-center items-center mb-6 mt-6 text-gray-500">
        @ 2024 Jutsa All right Reserved
      </p>
    </div>
  );
};

export default Footer;
