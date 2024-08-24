import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./counterButton.module.css";
import LoaderTow from "../loaderTow/LoaderTow";

const CounterButton = ({
  btnNumber,
  setCurrentPage,
  currentPage,
  isLoading,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const handleLoadMore = (index) => {
    setCurrentPage(index);

    // Calculate the new start and end values for the pagination buttons
    const newStart = Math.floor((index - 1) / 5) * 5;
    const newEnd = Math.min(newStart + 5, btnNumber);

    // Update the start and end values
    setStart(newStart);
    setEnd(newEnd);

    // Update the URL with the new page number
    navigate(`${location.pathname}?page=${index}`);
  };

  const handleLoadLess = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      const newStart = Math.floor((newPage - 1) / 5) * 5;
      const newEnd = Math.min(newStart + 5, btnNumber);

      setCurrentPage(newPage);
      setStart(newStart);
      setEnd(newEnd);

      // Update the URL with the new page number
      navigate(`${location.pathname}?page=${newPage}`);
    }
  };

  const handleLoadMoreSet = () => {
    if (currentPage < btnNumber) {
      const newPage = currentPage + 1;
      const newStart = Math.floor((newPage - 1) / 5) * 5;
      const newEnd = Math.min(newStart + 5, btnNumber);

      setCurrentPage(newPage);
      setStart(newStart);
      setEnd(newEnd);

      // Update the URL with the new page number
      navigate(`${location.pathname}?page=${newPage}`);
    }
  };

  const allButtons = Array.from({ length: btnNumber }, (_, index) => (
    <button
      key={index}
      onClick={() => handleLoadMore(index + 1)}
      style={
        currentPage === index + 1
          ? { backgroundColor: "#DE9248", border: "1px solid #de9248" }
          : {}
      }
    >
      {index + 1}
    </button>
  ));

  const paginationButtons = allButtons.slice(start, end);

  return (
    <>
      {isLoading && <LoaderTow />}
      <div className={styles.btn_load_more}>
        <button onClick={handleLoadLess}>
          <FontAwesomeIcon
            icon={faLessThan}
            style={{ fontSize: "10px", marginBottom: "2px" }}
          />
        </button>
        {paginationButtons}
        <button onClick={handleLoadMoreSet}>
          <FontAwesomeIcon
            icon={faGreaterThan}
            style={{ fontSize: "10px", marginBottom: "2px" }}
          />
        </button>
      </div>
    </>
  );
};

export default CounterButton;
