"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { useEffect } from "react"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4",
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt("URL da imagem:")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const url = window.prompt("URL do link:")
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/20">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("bold") ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("italic") ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("heading", { level: 2 }) ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("heading", { level: 3 }) ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("bulletList") ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("orderedList") ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("blockquote") ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          Quote
        </button>
        <button
          type="button"
          onClick={setLink}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("link") ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          Link
        </button>
        <button type="button" onClick={addImage} className="px-3 py-1 text-sm rounded hover:bg-muted">
          Image
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 text-sm rounded ${
            editor.isActive("codeBlock") ? "bg-foreground text-background" : "hover:bg-muted"
          }`}
        >
          Code
        </button>
      </div>
      <EditorContent editor={editor} className="bg-background" />
    </div>
  )
}

