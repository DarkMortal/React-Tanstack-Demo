import {
  useMemo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import columnDef from "./columnDef";
import data from "./user_data.json";
import usePageStateStore from "./pageState";

function Table(_, passedRef) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => savePageState(), []);

  //const [visibleColumns, setColumnVisibility] = useState({});
  const updatePageState = usePageStateStore((state) => state.updateState);

  const userData = useMemo((_) => data, []);
  const columnDefinition = useMemo((_) => columnDef, []);
  const tableInstance = useReactTable({
    columns: columnDefinition,
    data: userData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: pagination },
    onPaginationChange: setPagination,
  });

  const savePageState = () =>
    updatePageState(
      tableInstance.options.state.pagination.pageIndex,
      tableInstance.getPageCount(),
      tableInstance.getCanNextPage(),
      tableInstance.getCanPreviousPage()
    );

  useImperativeHandle(passedRef, () => {
    return {
      totalPages: tableInstance.getPageCount(),
      nextPage: async function () {
        await tableInstance.nextPage();
        savePageState();
      },
      prevPage: async function () {
        await tableInstance.previousPage();
        savePageState();
      },
      firstPage: async function () {
        await tableInstance.setPageIndex(0);
        savePageState();
      },
      lastPage: async function () {
        await tableInstance.setPageIndex(tableInstance.getPageCount() - 1);
        savePageState();
      },
      updatePageSize: async function (num) {
        await tableInstance.setPageSize(num);
        await tableInstance.setPageIndex(0);
        savePageState();
      },
    };
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          columnGap: "10px",
          width: "fit-content",
          margin: "auto",
          marginBottom: "10px",
        }}
      >
        {tableInstance.getAllLeafColumns().map((column) => (
          <div key={column.id}>
            <label>
              <input
                style={{ marginRight: "5px" }}
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.columnDef.header}
            </label>
          </div>
        ))}
      </div>
      <table
        className="table"
        style={{
          color: "white",
          overflow: "auto",
          whiteSpace: "nowrap",
          maxWidth: "80vw",
          margin: "auto",
          height: "20px !important",
        }}
      >
        <thead style={{ position: "sticky", top: 0 }}>
          {tableInstance.getHeaderGroups().map((headerElm) => {
            return (
              <tr key={headerElm.id}>
                {headerElm.headers.map((columnElm) => {
                  return (
                    <th
                      key={columnElm.id}
                      style={{ backgroundColor: "#1971c2" }}
                    >
                      {flexRender(
                        columnElm.column.columnDef.header,
                        columnElm.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowElm) => {
            return (
              <tr key={rowElm.id} style={{ backgroundColor: "#101826" }}>
                {rowElm.getVisibleCells().map((cellElm) => {
                  return (
                    <td key={cellElm.id}>
                      {flexRender(
                        cellElm.column.columnDef.cell,
                        cellElm.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default forwardRef(Table);
