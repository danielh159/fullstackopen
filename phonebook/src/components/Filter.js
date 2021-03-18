import React from "react"

const Filter = (props) => (
  <div>
    filter shown with
      <input
        value={props.personFilter}
        onChange={props.filterChange}
      />
  </div>
)

export default Filter