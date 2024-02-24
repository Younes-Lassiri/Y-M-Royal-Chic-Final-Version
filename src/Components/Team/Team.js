import React, { useEffect, useState } from 'react'
import './Team.css'

export default function Team() {
    const [team, setTeam] = useState([])

    useEffect(() => {
        fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/users')
        .then((res) => res.json())
        .then((data) => {
            setTeam(data)
        })
    })
  return (
    <div className='team-section'>
                    <table>
                        <thead>
                            <tr>
                                <th>Admin Id</th>
                                <th>Admin Name</th>
                                <th>Admin Email</th>
                                <th>Admin Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team.map((team, i) => (
                                <tr key={i}>
                                    <td>{team.id}</td>
                                    <td>{team.name}</td>
                                    <td>{team.email}</td>
                                    <td>{team.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
  )
}
