import './App.css'
import RenderNestedComments from './containers/RenderNestedComments/RenderNestedComments'
import RenderTreeNode from './containers/RenderTreeNode'

function App() {

  return (
    <div className="App">
        <section className='first-section'>
          <h1 className='heading'>Recursive Components 1 - Nested Folder Structure</h1>
          <RenderTreeNode />
          <h1 className='heading'>Recursive Components 2 - Nested Comments and replies</h1>
          <RenderNestedComments />
        </section>
    </div>
  )
}

export default App
