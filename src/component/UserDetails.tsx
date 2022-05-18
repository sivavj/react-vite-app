import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToggleOn, ToggleOff } from "react-bootstrap-icons";
import Spinner from "./Spinner";
import { ThemeContext } from "./theme-context";

interface UserInterface {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
const url = "https://gorest.co.in/public/v2/users";

export const UserDetails: React.FC = () => {
  const [apiValue, setApiValue] = useState<UserInterface[]>([]);
  const [filteredData, setFilteredData] = useState<UserInterface[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme, dark, toggle } = useContext(ThemeContext);
  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      axios
        .get(url)
        .then((response) => {
          setApiValue(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error message", error);
          setIsLoading(false);
        });
    }, 500);
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredData(apiValue);
    } else {
      let filteredValue = apiValue.filter((val) =>
        val.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredValue);
    }
  }, [searchValue, apiValue]);

  const NoDataRow = () => {
    return (
      <tr>
        <td colSpan={5}>No Data Found.</td>
      </tr>
    );
  };

  const TableRow = ({ rowData }: { rowData: UserInterface }) => {
    return (
      <Fragment>
        <tr>
          <td>{rowData.id}</td>
          <td>{rowData.name}</td>
          <td>{rowData.gender}</td>
          <td>{rowData.email}</td>
          <td className="h3">
            {rowData.status === "active" ? (
              <ToggleOn className="text-success" />
            ) : (
              <ToggleOff className="text-danger" />
            )}
          </td>
        </tr>
      </Fragment>
    );
  };
  const handleSearch = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
      <div className="container">
        <h2 className="my-3">User Details</h2>
        {/* SearchValue Button */}
        <form className="d-flex col-4 my-3 float-end ">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Name"
            aria-label="Search"
            onChange={handleSearch}
          />
          {/* SearchValue Button end */}
        </form>
        <table
          className="table"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
          }}
        >
          <thead className="table-danger">
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          {isLoading ? (
            <Spinner />
          ) : (
            <tbody>
              {filteredData.length === 0 && <NoDataRow />}
              {filteredData.map((val) => {
                return <TableRow key={val.id} rowData={val} />;
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
