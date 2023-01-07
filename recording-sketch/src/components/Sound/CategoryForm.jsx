export default function CategoryForm(props){

  return (
    <form className="CategoryForm">
             <h2>Add a Sound Category</h2>
             <input type="text" name="category" placeholder="Enter a new category!" />
             <button>Add Category</button>
          </form>
  )
}