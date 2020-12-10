import {TodoApp} from '../components/TodoApp'
const IndexPage = () => (
    <div className="App">
      <section className="todoapp">
        <TodoApp/>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="http://github.com/petehunt/">petehunt</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>

)

export default IndexPage
