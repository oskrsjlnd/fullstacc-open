import { useSelector, useDispatch } from "react-redux"
import { set_filter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const filterStyle = {
    marginBottom: '10px'
  }
  const changeFilter = (newValue) => {
    dispatch(set_filter(newValue))
  }
  return (
    <>
    filter: <input style={filterStyle} value={filter} type="text" onChange={e => changeFilter(e.target.value)}/>
    </>
  )
}

export default Filter