import { useRouteError } from "react-router-dom";
const Error = () => {
  const err = useRouteError();
  console.log(err);
  const { status, statusText } = err;
  // const {}=useRouteError
  return (
    <>
      <h1>Error Page</h1>
      <h2>{`${status} : ${statusText}`}</h2>
    </>
  );
};
export default Error;
