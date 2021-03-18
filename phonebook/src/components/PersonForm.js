import React from "react"

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name:
      <input
        value={props.newName}
        onChange={props.handleAddPerson}
      />
    </div>
    <div>
      number:
      <input
        value={props.newNumber}
        onChange={props.handleAddNumber}
      />
    </div>
    <div><button type="submit">add</button></div>
  </form>
)

export default PersonForm