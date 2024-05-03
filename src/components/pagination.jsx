import usePageStateStore from "./pageState";

const pageSets = [10, 20, 30, 40, 50];

export default function PageNavigation(props) {
  const { pageIndex, numberOfPages, isNextPossible, isPrevPossible } =
    usePageStateStore((state) => ({
      pageIndex: state.pageState.pageIndex,
      numberOfPages: state.pageState.numOfPages,
      isNextPossible: state.pageState.isNextPossible,
      isPrevPossible: state.pageState.isPrevPossible,
    }));

  return (
    <>
      <nav style={{ marginTop: "15px" }}>
        <ul className="pagination justify-content-center">
          <span style={{ marginTop: "6px", marginRight: "10px" }}>
            Showing&nbsp;
            <strong>
              {pageIndex + 1} of {numberOfPages}
            </strong>
            &nbsp;pages
          </span>
          <li className={`page-item ${!isPrevPossible ? "disabled" : ""}`}>
            <button
              disabled={!isPrevPossible}
              className="page-link"
              onClick={props.first}
            >
              &lt;&lt;
            </button>
          </li>
          <li className={`page-item ${!isPrevPossible ? "disabled" : ""}`}>
            <button
              disabled={!isPrevPossible}
              className="page-link"
              onClick={props.previous}
            >
              &lt;
            </button>
          </li>
          <li className={`page-item ${!isNextPossible ? "disabled" : ""}`}>
            <button
              disabled={!isNextPossible}
              className="page-link"
              onClick={props.next}
            >
              &gt;
            </button>
          </li>
          <li className={`page-item ${!isNextPossible ? "disabled" : ""}`}>
            <button
              disabled={!isNextPossible}
              className="page-link"
              onClick={props.last}
            >
              &gt;&gt;
            </button>
          </li>
          <div className="btn-group" style={{ marginLeft: "10px" }}>
            <button
              type="button"
              className="btn btn-success dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Number of records per page
            </button>
            <ul className="dropdown-menu">
              {pageSets.map((e) => (
                <li>
                  <button
                    className="dropdown-item"
                    key={e}
                    onClick={() => props.changePageSize(e)}
                  >
                    {e}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </nav>
    </>
  );
}
