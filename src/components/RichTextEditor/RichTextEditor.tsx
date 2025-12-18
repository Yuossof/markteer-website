/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import React, { useEffect, useState, useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Type,
  Palette,
  ALargeSmall,
} from "lucide-react";

// إضافة extension مخصص لحجم الخط
import { Extension } from '@tiptap/core';

const FontSize = Extension.create({
  name: 'fontSize',
  
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace('px', ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }: any) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run();
      },
      unsetFontSize: () => ({ chain }: any) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run();
      },
    };
  },
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const [customColor, setCustomColor] = useState("#000000");
  const [customFontSize, setCustomFontSize] = useState("");
  const fontSizeRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // إغلاق القوائم المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fontSizeRef.current && !fontSizeRef.current.contains(event.target as Node)) {
        setShowFontSize(false);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!editor) {
    return null;
  }

  const buttonClass = (isActive = false) =>
    `p-2 rounded hover:bg-gray-100 transition ${
      isActive ? "bg-gray-900 text-white hover:bg-gray-800" : "text-gray-700"
    }`;

  const colors = [
    "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#ff00ff", "#00ffff", "#ff8800", "#8800ff",
    "#888888", "#444444", "#ff4444", "#44ff44", "#4444ff",
  ];

  const fontSizes = [
    "8", "10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48", "64"
  ];

  const handleCustomFontSize = () => {
    const size = parseInt(customFontSize);
    if (size && size > 0 && size <= 200) {
      editor.chain().focus().setFontSize(customFontSize).run();
      setCustomFontSize("");
      setShowFontSize(false);
    }
  };

  return (
    <div className="bg-gray-50 border-b border-gray-300 p-2">
      <div className="flex flex-wrap gap-1 items-center">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={buttonClass(editor.isActive("strike"))}
          title="Strike"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={buttonClass(editor.isActive("code"))}
          title="Code"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <div className="relative" ref={fontSizeRef}>
          <button
            type="button"
            onClick={() => {
              setShowFontSize(!showFontSize);
              setShowColorPicker(false);
            }}
            className={buttonClass(showFontSize)}
            title="Font Size"
          >
            <ALargeSmall className="w-4 h-4" />
          </button>
          
          {showFontSize && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-3 min-w-[220px]">
              <div className="grid grid-cols-4 gap-1 mb-3">
                {fontSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setFontSize(size).run();
                      setShowFontSize(false);
                    }}
                    className="px-2 py-1 text-sm hover:bg-gray-100 text-black rounded transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <label className="text-xs text-gray-600 mb-1 block">Custom Size (1-200px)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={customFontSize}
                    onChange={(e) => setCustomFontSize(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCustomFontSize();
                      }
                    }}
                    placeholder="e.g., 18"
                    className="flex-1 px-2 py-1 text-black text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <button
                    type="button"
                    onClick={handleCustomFontSize}
                    className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowFontSize(false);
            }}
            className={buttonClass(showColorPicker)}
            title="Text Color"
          >
            <Palette className="w-4 h-4" />
          </button>

          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-3 min-w-[220px]">
              <div className="grid grid-cols-5 gap-2 mb-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColorPicker(false);
                    }}
                    className="w-7 h-7 rounded border-2 border-gray-300 hover:border-gray-500 transition"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              
              <div className="flex gap-2 items-center pt-2 border-t border-gray-200">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setColor(customColor).run();
                    setShowColorPicker(false);
                  }}
                  className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    setShowColorPicker(false);
                  }}
                  className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={buttonClass(editor.isActive("paragraph"))}
          title="Paragraph"
        >
          <Type className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 1 }))}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        {/* القوائم */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonClass(editor.isActive("blockquote"))}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={buttonClass()}
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`${buttonClass()} disabled:opacity-40 disabled:cursor-not-allowed`}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`${buttonClass()} disabled:opacity-40 disabled:cursor-not-allowed`}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle', 'heading', 'paragraph'],
      }),
      FontFamily,
      FontSize,
    ],
    immediatelyRender: false,
    content: value,
    editorProps: {
      attributes: {
        spellcheck: "false",
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4 text-gray-900",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden min-h-[300px]">
      <style jsx global>{`
        .tiptap-content h1,
        .tiptap-content h2,
        .tiptap-content h3 {
          color: inherit !important;
        }
      `}</style>
      <MenuBar editor={editor} />
      <div className="prose-content tiptap-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}