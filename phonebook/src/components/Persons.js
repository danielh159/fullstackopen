import React from "react"

const Persons = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number} <button onClick={deletePerson}>delete</button>
  </div>
)

export default Persons