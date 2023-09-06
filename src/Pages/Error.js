import { BiSolidErrorCircle } from "react-icons/bi";
export function Error({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div className="error" role="alert">
      <p>
        Something went wrong{" "}
        <BiSolidErrorCircle
          style={{ display: "inline-block", fontSize: "1.5rem" }}
        />{" "}
        :
      </p>
      {error.message == "Network Error" ? (
        <p style={{ color: "#ff3333" }}>
          Please check your internet connection
        </p>
      ) : (
        <p style={{ color: "#ff3333" }}>{error.response.data.message}</p>
      )}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
