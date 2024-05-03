import { useRef } from "react";
import "./styles.css";
import Table from "./components/table";
import PageNavigation from "./components/pagination";

export default function App() {
  var tableRef = useRef();

  return (
    <div className="App">
      <h2 style={{ width: "fit-content", margin: "auto", padding: "5px" }}>
        React Tanstack Table
      </h2>
      <Table ref={tableRef} />
      <PageNavigation
        first={() => tableRef.current.firstPage()}
        last={() => tableRef.current.lastPage()}
        previous={() => tableRef.current.prevPage()}
        next={() => tableRef.current.nextPage()}
        changePageSize={(num) => tableRef.current.updatePageSize(num)}
      />
    </div>
  );
}
