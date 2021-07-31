// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {teams: [], isLoading: true}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedData = data.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageURL: team.team_image_url,
    }))

    this.setState({teams: updatedData, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state
    return (
      <div className="bg">
        <div className="teams-container">
          <div className="heading-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl-logo"
              className="image"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            <div testid="loader" className="loader">
              <Loader type="Oval" color="#ffffff" height={80} width={80} />
            </div>
          ) : (
            <ul className="teams-list">
              {teams.map(team => (
                <TeamCard teamData={team} key={team.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
