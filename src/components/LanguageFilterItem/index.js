// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, repositoryId, isActive} = props
  const {id, language} = itemDetails

  const btnClassName = isActive ? 'active-btn' : 'lang-button'
  const onClickButton = () => {
    repositoryId(id)
  }

  return (
    <li className="lists">
      <button type="button" onClick={onClickButton} className={btnClassName}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
