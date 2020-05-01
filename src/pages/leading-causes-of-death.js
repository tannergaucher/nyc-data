import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function LeadingCausesOfDeath() {
  const [year, setYear] = useState("2014")
  const [sex, setSex] = useState("M")
  const [ethnicity, setEthnicity] = useState("White Non-Hispanic")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const url = `https://data.cityofnewyork.us/resource/jb7j-dtam.json?year=${year}&race_ethnicity=${ethnicity}&sex=${sex}`
        const res = await fetch(url)
        const data = await res.json()
        // formatDeaths
        formatData(data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setLoading(false)
    }

    fetchData()
  }, [year, sex, ethnicity])

  function formatData(data) {
    // sort array by data.deaths

    const formattedData = data.sort((a, b) => b.deaths - a.deaths)
    setData(formattedData)
  }

  if (error) return <h2>Error!</h2>

  return (
    <Layout>
      <SEO title="NYC Leading Causes of Death" />
      <article className="page padding">
        <h1 className="title">Leading Causes of death</h1>
        <hr />
        <form>
          <label htmlFor="race">
            <h4>Race / Ethnicity</h4>
          </label>
          <select
            id="race"
            onChange={e => {
              setEthnicity(e.target.value)
            }}
          >
            <option value="White Non-Hispanic">White Non-Hispanic</option>
            <option value="Black Non-Hispanic">Black Non-Hispanic</option>
            <option value="Hispanic">Hispanic</option>
            <option value="Asian and Pacific Islander">
              Asian and Pacific Islander
            </option>
            <option value="Not Stated/Unknown">Not Stated/Unknown</option>
          </select>
          <br />
          <label htmlFor="sex">
            <h4>Sex</h4>
          </label>
          <select id="sex" onChange={e => setSex(e.target.value)}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <br />
          <label htmlFor="year">
            <h4>Year</h4>
          </label>
          <select id="year" onChange={e => setYear(e.target.value)}>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
          </select>
        </form>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="content-grid">
            {data &&
              data.map(death => (
                <div className="card padding" key={death}>
                  <h2 className="card-title">
                    {death.leading_cause}: {death.deaths}
                  </h2>
                  <h4 className="card-text">Sex: {death.sex}</h4>
                  <h4 className="card-text">Race: {death.race_ethnicity}</h4>
                </div>
              ))}
          </div>
        )}
      </article>
    </Layout>
  )
}
