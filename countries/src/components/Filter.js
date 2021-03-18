import React from 'react'

const Filter = (props) => (
  <form>
    <div>
      find countries
        <input
          value={props.countryFilter}
          onChange={props.filterChange}
        />
    </div>
  </form>
)

export default Filter