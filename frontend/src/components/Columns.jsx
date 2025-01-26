

const Columns = ({category,children}) => {
  return (
    <div className='Columns-container' style={{display:"flex",flexDirection:"column", rowGap:"2rem"}}>
        <h3>{category}</h3>
        {children}
    </div>
  )
}

export default Columns