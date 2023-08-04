import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import 'highlight.js/styles/tokyo-night-light.css'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

export function Editor(){
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Escreva algo...',
        showOnlyWhenEditable: true,
        includeChildren: true
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),      
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      }
    },
    content: `
      <h1>Lorem Ipsum explanation</h1>
      <p>
        Em sua forma mais comum, o texto é como se segue:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing."
        Nos países de língua inglesa o texto apresenta-se em forma um pouco diferente, apresentada a seguir:     
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>
      
      <pre><code class="language-javascript">console.log('Hello World')</code></pre>
    `,
  })

  return(<>
      {editor && <FloatingMenu className='flex shadow-lg divide-x ' editor={editor} tippyOptions={{ duration: 100, placement: 'left' }}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </button>
  </FloatingMenu>}

      {editor && <BubbleMenu className='flex shadow-lg divide-x' editor={editor} tippyOptions={{ duration: 100 }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="p-1 gap-1.5 text-sm font-medium {editor.isActive('bold') ? 'is-active' : ''}"
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="p-1 gap-1 text-sm font-medium {editor.isActive('italic') ? 'is-active' : ''}"
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="p-1 gap-1.5 text-sm font-medium {editor.isActive('strike') ? 'is-active' : ''}"
        >
          strike
        </button>
      </BubbleMenu>}
      <EditorContent editor={editor} />  
    </>)
}

