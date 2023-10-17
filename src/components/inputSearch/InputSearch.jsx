import './style.scss'

export default function InputSearch({ value, onInputChange }) {
  return (
    <form>
      <input
        className="input-search"
        type="search"
        name=""
        id=""
        placeholder="Type to search..."
        value={value}
        onChange={onInputChange}
      />
    </form>
  )
}
