import { Editor } from "./components/Editor"
import './index.css'

function App() {
  return (
    <>
      <div className="flex">
        <div className="flex-initial w-48 bg-gray-300/[.09]">
          Menu notion
        </div>
        <div className="max-w-[70%] m-12 prose prose-violet">
          <p>Página criada para ser editada</p>
          <Editor/>
        </div>
      </div>
    </>
  )
}

export default App
