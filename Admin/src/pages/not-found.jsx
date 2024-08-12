import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation()
  return (
    <div>
      <title>404 - Jutsa</title>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500">We can't find that page.</p>

          <Link
            to={ pathname.includes("/dashboard") ? "/dashboard" : "/" }
            className="mt-6 inline-block rounded bg-customGreen px-5 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
