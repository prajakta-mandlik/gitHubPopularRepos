// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {reposDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = reposDetails

  return (
    <li className="list_container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="name">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="stars_count">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="stars_count">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="stars_count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
