import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    popularRepos: [],
    apiStatus: apiStatusConstant.initial,
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeId} = this.state

    this.setState({apiStatus: apiStatusConstant.inProgress})

    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(githubReposApiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
      }))
      this.setState({
        popularRepos: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  repositoryId = activeId => {
    this.setState({activeId}, this.getPopularRepos)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryItem = () => {
    const {popularRepos} = this.state

    return (
      <ul className="repository-item">
        {popularRepos.map(eachRepos => (
          <RepositoryItem reposDetails={eachRepos} key={eachRepos.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="repository-item">
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
          alt="failure view"
          className="failure-img"
        />
        <h1 className="failure-heading">Something Went Wrong</h1>
      </div>
    </div>
  )

  renderAllList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderRepositoryItem()
      case 'IN_PROGRESS':
        return this.renderLoader()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {popularRepos, activeId} = this.state
    console.log(popularRepos)

    return (
      <div className="popular-repos-container">
        <h1 className="heading">Popular</h1>

        <ul className="language-data-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              itemDetails={each}
              key={each.id}
              isActive={each.id === activeId}
              repositoryId={this.repositoryId}
            />
          ))}
        </ul>

        {this.renderAllList()}
      </div>
    )
  }
}

export default GithubPopularRepos
