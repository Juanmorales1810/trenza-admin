"use client";

import HorizontalRule from '@tiptap/extension-horizontal-rule';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import YouTube from '@tiptap/extension-youtube';
import { Color } from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect, useRef } from 'react';
import { Editor } from '@tiptap/core';
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function TextEditor() {
    const editorRef = useRef(null);
    const editorInstanceRef = useRef<Editor | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            const FontSizeTextStyle = TextStyle.extend({
                addAttributes() {
                    return {
                        fontSize: {
                            default: null,
                            parseHTML: element => element.style.fontSize,
                            renderHTML: attributes => {
                                if (!attributes.fontSize) {
                                    return {};
                                }
                                return { style: `font-size: ${attributes.fontSize}` };
                            },
                        },
                    };
                },
            });

            // Inicializar TipTap Editor
            editorInstanceRef.current = new Editor({
                element: editorRef.current,
                extensions: [
                    StarterKit,
                    Highlight,
                    Underline,
                    Link.configure({
                        openOnClick: false,
                        autolink: true,
                        defaultProtocol: 'https',
                    }),
                    TextAlign.configure({
                        types: ['heading', 'paragraph'],
                    }),
                    HorizontalRule,
                    Image,
                    YouTube,
                    TextStyle,
                    FontSizeTextStyle,
                    Color,
                    FontFamily,
                ],
                content: '<p>Este es el contenido inicial del editor.</p>',
                editorProps: {
                    attributes: {
                        class: 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
                    },
                },
            });

            return () => {
                // Limpieza cuando el componente se desmonte
                editorInstanceRef.current?.destroy();
            };
        }
    }, []);

    const toggleBold = () => {
        editorInstanceRef.current?.chain().focus().toggleBold().run();
    };
    const toggleItalic = () => {
        editorInstanceRef.current?.chain().focus().toggleItalic().run();
    }
    const toggleUnderline = () => {
        editorInstanceRef.current?.chain().focus().toggleUnderline().run();
    }
    const toggleStrike = () => {
        editorInstanceRef.current?.chain().focus().toggleStrike().run();
    }
    const toggleHighlight = () => {
        editorInstanceRef.current?.chain().focus().toggleHighlight().run();
    }
    const toggleCode = () => {
        editorInstanceRef.current?.chain().focus().toggleCodeBlock().run();
    }
    const toggleLink = () => {
        const url = prompt('Enter image URL:', 'https://flowbite.com');;
        if (url) {
            editorInstanceRef.current?.chain().focus().toggleLink({ href: url }).run();
        }
    }
    const removeLink = () => {
        editorInstanceRef.current?.chain().focus().unsetLink().run();
    }
    const setFontSize = (size: string) => {
        editorInstanceRef.current?.chain().focus().setMark('textStyle', { fontSize: size }).run();
    }
    const setTextColor = (color: string) => {
        editorInstanceRef.current?.chain().focus().setColor(color).run();
    }
    const setFontFamily = (font: string) => {
        editorInstanceRef.current?.chain().focus().setFontFamily(font).run();
    }
    const setTextAlign = (align: string) => {
        editorInstanceRef.current?.chain().focus().setTextAlign(align).run();
    }
    const format = (type: 1 | 2 | 3 | 4 | 5 | 6) => {
        editorInstanceRef.current?.chain().focus().toggleHeading({ level: type }).run();
    }
    const addImage = () => {
        const url = prompt('Ingrese URL de la imagen:');
        if (url) {
            editorInstanceRef.current?.chain().focus().setImage({ src: url }).run();
        }
    };
    const addYouTube = () => {
        const url = prompt('Enter YouTube URL:', 'https://www.youtube.com/watch?v=KaLxCiilHns');
        if (url) {
            editorInstanceRef.current?.chain().focus().setYoutubeVideo({
                src: url,
                width: 640,
                height: 480,
            }).run();
        }
    };
    const toggleList = () => {
        editorInstanceRef.current?.chain().focus().toggleBulletList().run();
    }
    const toggleOrderedList = () => {
        editorInstanceRef.current?.chain().focus().toggleOrderedList().run();
    }
    const toggleBlockquote = () => {
        editorInstanceRef.current?.chain().focus().toggleBlockquote().run();
    }
    const toggleHorizontalRule = () => {
        editorInstanceRef.current?.chain().focus().setHorizontalRule().run();
    }

    return (
        <div>
            <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-3 py-2 border-b dark:border-gray-600">
                    <div className="flex flex-wrap items-center">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
                            <ToggleGroup type="multiple">
                                <ToggleGroupItem onClick={toggleBold} value="bold" aria-label="Toggle bold">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6" />
                                    </svg>
                                    <span className="sr-only">Bold</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={toggleItalic} value="italic" aria-label="Toggle italic">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18" />
                                    </svg>
                                    <span className="sr-only">Italic</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={toggleUnderline} value="underline" aria-label="Toggle underline">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4" />
                                    </svg>
                                    <span className="sr-only">Underline</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={toggleStrike} value="strike" aria-label="Toggle Strike">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477" />
                                    </svg>
                                    <span className="sr-only">Strike</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={toggleHighlight} value="highlight" aria-label="Highlight">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 19.2H5.5c-.3 0-.5-.2-.5-.5V16c0-.2.2-.4.5-.4h13c.3 0 .5.2.5.4v2.7c0 .3-.2.5-.5.5H18m-6-1 1.4 1.8h.2l1.4-1.7m-7-5.4L12 4c0-.1 0-.1 0 0l4 8.8m-6-2.7h4m-7 2.7h2.5m5 0H17" />
                                    </svg>
                                    <span className="sr-only">Highlight</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={toggleCode} value="code" aria-label="Code">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14" />
                                    </svg>
                                    <span className="sr-only">Code</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={toggleLink} value="link" aria-label="Link">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                                    </svg>
                                    <span className="sr-only">Link</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={removeLink} value="remove-link" aria-label="Remove link">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M13.2 9.8a3.4 3.4 0 0 0-4.8 0L5 13.2A3.4 3.4 0 0 0 9.8 18l.3-.3m-.3-4.5a3.4 3.4 0 0 0 4.8 0L18 9.8A3.4 3.4 0 0 0 13.2 5l-1 1m7.4 14-1.8-1.8m0 0L16 16.4m1.8 1.8 1.8-1.8m-1.8 1.8L16 20" />
                                    </svg>
                                    <span className="sr-only">Remove link</span>
                                </ToggleGroupItem>
                                <div className='flex justify-center items-center gap-2'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3" />
                                            </svg>
                                            <span className="sr-only">Text size</span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Text size</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setFontSize("16px")}>
                                                <p data-text-size="16px" className="flex justify-between items-center w-full text-base rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">16px (Default)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("12px")}>
                                                <p data-text-size="12px" className="flex justify-between items-center w-full text-xs rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">12px (Tiny)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("14px")}>
                                                <p data-text-size="14px" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">14px (Small)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("18px")}>
                                                <p data-text-size="18px" className="flex justify-between items-center w-full text-lg rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">18px (Lead)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("24px")}>
                                                <p data-text-size="24px" className="flex justify-between items-center w-full text-2xl rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">24px (Large)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("36px")}>
                                                <p data-text-size="36px" className="flex justify-between items-center w-full text-4xl rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">36px (Huge)
                                                </p>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m6.532 15.982 1.573-4m-1.573 4h-1.1m1.1 0h1.65m-.077-4 2.725-6.93a.11.11 0 0 1 .204 0l2.725 6.93m-5.654 0H8.1m.006 0h5.654m0 0 .617 1.569m5.11 4.453c0 1.102-.854 1.996-1.908 1.996-1.053 0-1.907-.894-1.907-1.996 0-1.103 1.907-4.128 1.907-4.128s1.909 3.025 1.909 4.128Z" />
                                            </svg>
                                            <span className="sr-only">Text color</span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Text color</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <div className="grid grid-cols-6 gap-2 group mb-3 items-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input onChange={(e) => setTextColor(e.target.value)} type="color" id="color" className="border-gray-200 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-md p-px px-1 hover:bg-gray-50 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 w-full h-8 col-span-3" />
                                                <label htmlFor="color" className="text-gray-500 dark:text-gray-400 text-sm font-medium col-span-3 group-hover:text-gray-900 dark:group-hover:text-white">Pick a color</label>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.6 19 4.298-10.93a.11.11 0 0 1 .204 0L19.4 19m-8.8 0H9.5m1.1 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.985h4.4M3.021 16l1.567-3.985m0 0L7.32 5.07a.11.11 0 0 1 .205 0l2.503 6.945h-5.44Z" />
                                            </svg>
                                            <span className="sr-only">Font family</span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Font Family</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setFontFamily("Inter, ui-sans-serif")}>
                                                <p data-font-family="Inter, ui-sans-serif" className="flex justify-between items-center w-full text-sm font-sans rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">Default
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("Arial, sans-serif")}>
                                                <p data-font-family="Arial, sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: 'Arial, sans-serif' }}>Arial
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("'Courier New', monospace")}>
                                                <p data-font-family="'Courier New', monospace" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: "'Courier New', monospace" }}>Courier New
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("Georgia, serif")}>
                                                <p data-font-family="Georgia, serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: 'Georgia, serif' }}>Georgia
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("'Lucida Sans Unicode', sans-serif")}>
                                                <p data-font-family="'Lucida Sans Unicode', sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: "'Lucida Sans Unicode', sans-serif" }}>Lucida Sans Unicode
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("Tahoma, sans-serif")}>
                                                <p data-font-family="Tahoma, sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: 'Tahoma, sans-serif' }}>Tahoma </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("'Times New Roman', serif")}>
                                                <p data-font-family="'Times New Roman', serif;" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: "'Times New Roman', serif" }}>Times New Roman
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("'Trebuchet MS', sans-serif")}>
                                                <p data-font-family="'Trebuchet MS', sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>Trebuchet MS
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("Verdana, sans-serif")}>
                                                <p data-font-family="Verdana, sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white" style={{ fontFamily: 'Verdana, sans-serif' }}>Verdana
                                                </p>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </ToggleGroup>

                            <div className="px-1">
                                <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                            </div>
                            <ToggleGroup type="single">
                                <ToggleGroupItem onClick={() => setTextAlign("left")} value="aling-left" aria-label="Align left">

                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6h8m-8 4h12M6 14h8m-8 4h12" />
                                    </svg>
                                    <span className="sr-only">Align left</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={() => setTextAlign("center")} value="aling-center" aria-label="Align center">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h8M6 10h12M8 14h8M6 18h12" />
                                    </svg>
                                    <span className="sr-only">Align center</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem onClick={() => setTextAlign("right")} value="aling-right" aria-label="Align right">

                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6h-8m8 4H6m12 4h-8m8 4H6" />
                                    </svg>
                                    <span className="sr-only">Align right</span>

                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 flex-wrap">
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex gap-2 justify-center items-center'>

                                Format <svg className="-me-0.5 ms-1.5 h-3.5 w-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                </svg>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='flex flex-col gap-2'>
                                <DropdownMenuLabel>Heading</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem >
                                    Paragraph
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">0</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(1)}
                                >
                                    Heading 1
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">1</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(2)}
                                >
                                    Heading 2
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">2</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(3)}
                                >
                                    Heading 3
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">3</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(4)}
                                >
                                    Heading 4
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">4</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(5)}
                                >
                                    Heading 5
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">5</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(6)}
                                >
                                    Heading 6
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">6</kbd>
                                    </div>

                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="ps-1.5">
                            <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                        </div>
                        <ToggleGroup type="single">
                            <ToggleGroupItem onClick={addImage} value="add-image" aria-label="Add image">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Add image</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem onClick={addYouTube} value="add-video" aria-label="Add video">

                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-2 4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2Zm0 2h2v2H9v-2Zm7.965-.557a1 1 0 0 0-1.692-.72l-1.268 1.218a1 1 0 0 0-.308.721v.733a1 1 0 0 0 .37.776l1.267 1.032a1 1 0 0 0 1.631-.776v-2.984Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Add video</span>

                            </ToggleGroupItem>
                            <ToggleGroupItem onClick={toggleList} value="toggle-list" aria-label="Toggle list">

                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
                                </svg>
                                <span className="sr-only">Toggle list</span>

                            </ToggleGroupItem>
                            <ToggleGroupItem onClick={toggleOrderedList} value="toggle-ordered-list" aria-label="Toggle ordered list">

                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4" />
                                </svg>
                                <span className="sr-only">Toggle ordered list</span>

                            </ToggleGroupItem>
                            <ToggleGroupItem onClick={toggleBlockquote} value="toggle-blockquote" aria-label="Toggle blockquote">

                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Toggle blockquote</span>

                            </ToggleGroupItem>
                            <ToggleGroupItem onClick={toggleHorizontalRule} value="horizontal-rule" aria-label="Horizontal rule">

                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                                    <path stroke="currentColor" strokeLinecap="round" d="M6 9.5h12m-12 9h12M6 7.5h12m-12 9h12M6 5.5h12m-12 9h12" />
                                </svg>
                                <span className="sr-only">Toggle Horizontal Rule</span>

                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <div ref={editorRef} id="wysiwyg-example" className="w-full px-0 text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"></div>
                </div>
            </div>
        </div>
    )
}
