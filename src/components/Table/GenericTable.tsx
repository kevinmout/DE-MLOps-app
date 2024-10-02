import { Badge, Checkbox, Table } from "@mantine/core";
import { useState } from "react";

interface Props {
  data: any[];
  columns: string[];
  disableProperties?: string[];
  setAllSelection: (selection: any) => void;
}

/*
 * This is a generic table component.
 ** The main features of this table are:
 ** 1. The table is based on the data and columns passed in
 ** 2. The table has a checkbox to select/select all rows or select/deselect specific rows
 ** 3. The table returns the selected rows in the setAllSelection function
 ** 4. The table can remove certain properties from the data
 */
export const GenericTable = (props: Props): JSX.Element => {
  const [selection, setSelection] = useState([] as string[]);

  // Summary:
  //     Updates the selection of rows
  //     If the row is already selected, remove it from the selection
  //     Else, add it to the selection
  //     Also, update the selection in the parent component
  const toggleSpecificRow = (id: string) => {
    const updatedSelection = selection.includes(id)
      ? selection.filter((item) => item !== id)
      : [...selection, id];

    setSelection(updatedSelection);
    props.setAllSelection(
      props.data.filter((item) =>
        updatedSelection.includes(item[Object.keys(item)[0]])
      )
    );
  };

  // Summary:
  //     Updates the selection of rows
  //     If all rows are selected, remove all rows from the selection
  //     Else, add all rows to the selection
  //     Also, update the selection in the parent component
  const toggleAll = () => {
    const updatedSelection =
      selection.length === props.data.length
        ? []
        : props.data.map((item) => item[Object.keys(item)[0]]);

    setSelection(updatedSelection);
    props.setAllSelection(
      props.data.filter((item) =>
        updatedSelection.includes(item[Object.keys(item)[0]])
      )
    );
  };

  // Summary:
  //     If data is undefined, return an empty div
  //     Else, return a table with the data
  // TODO:
  //     Add a loading spinner
  if (props.data === undefined) {
    return <></>;
  }

  // Summary:
  //     Creates a checkbox to select all rows
  const selectAll = () => {
    return (
      <th>
        <Checkbox
          // checked is true if all rows are selected
          checked={selection.length === props.data.length}
          // onChange is called when the checkbox is clicked
          onChange={toggleAll}
          // indeterminate is true if there are some selected rows
          // and not all rows are selected
          indeterminate={
            selection.length > 0 && selection.length !== props.data.length
          }
        />
      </th>
    );
  };

  // Summary:
  //     This creates a checkbox for each row
  const selectRow = (item: any) => {
    return (
      <td>
        <Checkbox
          // checked is true if the id of the row is in the selection array
          checked={selection.includes(item[Object.keys(item)[0]])}
          // onChange is called when the checkbox is clicked
          onChange={() => toggleSpecificRow(item[Object.keys(item)[0]])}
        />
      </td>
    );
  };

  // Summary:
  //     Renders a custom display for the table cell
  // Parent:
  //     rows
  // Example:
  //    An active device will have a green badge with the text 'enabled'
  function renderCustomDisplay(item: any, prop: string, index: number) {
    // Row cell value
    const value = item[prop];
    if (value === "enabled" || value === "connected") {
      return <Badge fullWidth>{value}</Badge>;
    } else if (value === "disabled" || value === "Disconnected") {
      return <Badge color="gray">{value}</Badge>;
    }
    return item[prop];
  }

  // Summary:
  //     Gets the properties of the first object in the data array
  // Parent:
  //     rows
  // Example:
  //    data = [{name: 'John', age: 20}, {name: 'Jane', age: 21}]
  //    propsOfObj = ['name', 'age']
  const propsOfObj = Object.keys(props.data[0]).map((key) => key.toString());

  // Summary:
  //     Creates a table row for each object in the data array
  // Example:
  //    data = [{name: 'John', age: 20}, {name: 'Jane', age: 21}]
  //    rows = [<tr key={0}><td>John</td><td>20</td></tr>, <tr key={1}><td>Jane</td><td>21</td></tr>]
  const rows = props.data?.map((item: any) => {
    // if the property is in the disableProperties array, remove it from the propsOfObj array
    const newProperties = propsOfObj.filter(
      (prop) => !props.disableProperties?.includes(prop)
    );

    console.log(newProperties);

    return (
      <tr key={item[Object.keys(item)[0]]}>
        {/* this is for row selection */}
        {selectRow(item)}
        {/* <StockItem key={item.id} stock={item} /> */}
        {/* this is for the table cells */}
        {/* {newProperties.map((prop, index) => (
          <td key={index}>{renderCustomDisplay(item, prop, index)}</td>
        ))} */}
      </tr>
    );
  });

  // Summary:
  //     Creates a table header with the columns
  // Example:
  //    columns = ['Name', 'Age']
  //    columns = [<th key={0}>Name</th>, <th key={1}>Age</th>]
  const columns = props.columns.map((item, index) => (
    <th key={index}>{item}</th>
  ));

  return (
    <Table>
      <thead>
        <tr>
          {selectAll()}
          {columns}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
