"use client";

import { ALargeSmall, AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, ChevronDown, Code, Highlighter, ImageIcon, Italic, LinkIcon, List, ListOrdered, Loader2, Palette, Quote, SquareMinus, Strikethrough, Type, UnderlineIcon, UnlinkIcon, VideoIcon } from 'lucide-react';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { useEffect, useRef, useState } from 'react';
import YouTube from '@tiptap/extension-youtube';
import { Color } from '@tiptap/extension-color';
import { Button } from '@/components/ui/button';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Textarea } from './ui/textarea';
import { Editor } from '@tiptap/core';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFetch } from '@/hooks/useFetch';
import { useLoading } from "@/hooks/useLoading";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { blogValidationschema } from '@/validations/blogValidation';





export default function TextEditor() {
    const editorRef = useRef(null);
    const editorInstanceRef = useRef<Editor | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewCover, setPreviewCover] = useState<string | null>(null);

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
    const togglePharagraph = () => {
        editorInstanceRef.current?.chain().focus().setParagraph().run();
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

    //useLoading
    const { finishLoading, isLoading, startLoading } = useLoading()
    //useAuthFetch
    const authFetch = useFetch();

    // Reutilizamos handleImageChange para ambos inputs
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            if (type === 'image') {
                setPreviewImage(imageUrl); // Actualizamos la previsualización de la imagen
            } else if (type === 'cover') {
                setPreviewCover(imageUrl); // Actualizamos la previsualización del cover
            }
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        resolver: zodResolver(blogValidationschema),
    });


    //Enviar datos
    const onSubmit = handleSubmit(async ({ Titulo: titulo, Description: description, Slug: slug }) => {
        console.log("hola");

        startLoading()
        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("description", description);
        formData.append("slug", watch(slug));

        const imageFile = watch('Image') as FileList;
        if (imageFile && imageFile[0]) {
            formData.append("image", imageFile[0]);
        }

        const coverFile = watch('Cover') as FileList;
        if (coverFile && coverFile[0]) {
            formData.append("cover", coverFile[0]);
        }
        const saveContent =
            JSON.stringify(editorInstanceRef.current?.getJSON(), null, 2)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

        formData.append("content", saveContent);


        await authFetch({
            endpoint: 'blog',
            redirectRoute: '/admin/trenza-matrimonios/blog',
            formData: formData,
            options: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        })
        finishLoading()

    });


    return (
        <div className='w-full max-w-5xl'>
            <div className='flex flex-row justify-center items-start gap-10 my-16'>
                <form id='form-card' onSubmit={onSubmit} className='flex-1' action="/submit" >
                    <p className='text-xl my-2 text-center'>Datos de la card</p>
                    <Label>Titulo</Label>
                    <Input
                        type='text'
                        placeholder="Título de la publicación"
                        className="w-full mb-4 invalid:border-red-500"
                        aria-invalid={errors.Titulo ? "true" : "false"}
                        {...register('Titulo')}
                    />
                    {errors.Titulo?.message && <p className='text-red-500 text-xs relative -top-3 left-3'>{String(errors.Titulo.message)}</p>}
                    <Label>Descripción</Label>
                    <Textarea
                        placeholder='Descripción de la publicación'
                        className="w-full mb-4"
                        aria-invalid={errors.Description ? "true" : "false"}
                        {...register('Description')}
                    />
                    {errors.Description?.message && <p className='text-red-500 text-xs relative -top-3 left-3'>{String(errors.Description.message)}</p>}
                    <Label>Slug</Label>
                    <Input
                        type='text'
                        placeholder="slug-de-la-publicacion"
                        className="w-full mb-4 invalid:border-red-500"
                        aria-invalid={errors.Slug ? "true" : "false"}
                        {...register('Slug')}
                    />
                    {errors.Slug?.message && <p className='text-red-500 text-xs relative -top-3 left-3'>{String(errors.Slug.message)}</p>}
                    <Label>Imagen de la card (formato 1:1)</Label>
                    <Input
                        type="file"
                        placeholder="URL de la imagen"
                        className="w-full mb-4"
                        aria-invalid={errors.Image ? "true" : "false"}
                        {...register('Image')}
                        onChange={(e) => handleImageChange(e, 'image')}
                    />
                    {errors.Image?.message && <p className='text-red-500 text-xs relative -top-3 left-3'>{String(errors.Image.message)}</p>}
                    <Label>Imagen de portada del blog (formato 16:7)</Label>
                    <Input
                        type="file"
                        placeholder="URL de la imagen"
                        className="w-full mb-4"
                        aria-invalid={errors.Cover ? "true" : "false"}
                        {...register('Cover')}
                        onChange={(e) => handleImageChange(e, 'cover')}
                    />
                    {errors.Cover?.message && <p className='text-red-500 text-xs relative -top-3 left-3'>{String(errors.Cover.message)}</p>}
                </form>
                <div className='max-w-[550px]'>
                    <p className='text-xl my-2 text-center'>Vista previa</p>
                    <article className="flex bg-white transition hover:shadow-xl rounded-lg overflow-hidden">
                        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                            <time
                                dateTime="2022-10-10"
                                className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                            >
                                <span>2024</span>
                                <span className="w-px flex-1 bg-gray-900/10"></span>
                                <span>Oct 10</span>
                            </time>
                        </div>

                        <div className="hidden sm:block sm:basis-56">
                            <img
                                alt={watch('Titulo') || "Default Image"}
                                src={previewImage || "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"}
                                className="aspect-square h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                            <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                                <a href="#">
                                    <h3 className="font-bold uppercase text-gray-900">
                                        {watch('Titulo') ? watch('Titulo') : 'Título de la publicación'}
                                    </h3>
                                </a>

                                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                                    {watch('Description') ? watch('Description') : 'Descripción de la publicación'}
                                </p>
                            </div>

                            <div className="sm:flex sm:items-end sm:justify-end">
                                <a
                                    href="#"
                                    className="block bg-blue-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-blue-400"
                                >
                                    Ver más
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className="py-6 block">
                <img
                    alt={watch('Titulo') || "Default Image"}
                    src={previewCover || "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"}
                    className="aspect-[16/7] h-full w-full object-cover rounded-md"
                />
            </div>

            <div className="relative flex flex-col justify-center items-center">
                <div className="w-full px-3 py-2 border-b dark:border-zinc-700 rounded-t-lg bg-zinc-50 dark:bg-zinc-900 sticky z-50 top-0">
                    <div className="flex flex-wrap items-center">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
                            <ToggleGroup type="multiple">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={toggleBold} value="bold" aria-label="Toggle bold">
                                                <Bold className="w-5 h-5" />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Negrita</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={toggleItalic} value="italic" aria-label="Toggle italic">
                                                <Italic className="w-5 h-5" />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Cursiva</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={toggleUnderline} value="underline" aria-label="Toggle underline">
                                                <UnderlineIcon className="w-5 h-5" />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent >
                                            <span className="">Subrayado</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={toggleStrike} value="strike" aria-label="Toggle Strike">
                                                <Strikethrough className="w-5 h-5" />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Tachar</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </ToggleGroup>
                            <div className="px-1">
                                <span className="block w-px h-4 bg-zinc-300 dark:bg-zinc-600"></span>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button onClick={toggleHighlight} variant="ghost" value="highlight" aria-label="Highlight">
                                            <Highlighter className="w-5 h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className="">Destacar</span>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" onClick={toggleCode} value="code" aria-label="Code">
                                            <Code />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className="">Código</span>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" onClick={toggleLink} value="link" aria-label="Link">
                                            <LinkIcon />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className="">Link</span>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" onClick={removeLink} value="remove-link" aria-label="Remove link">
                                            <UnlinkIcon className="w-5 h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className="">Quitar link</span>
                                    </TooltipContent>
                                </Tooltip>

                                <div className='flex justify-center items-center gap-2'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" asChild>
                                                        <div>
                                                            <ALargeSmall />
                                                        </div>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <span className="">Tamaño del texto</span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Text size</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setFontSize("16px")}>
                                                <p data-text-size="16px" className="flex justify-between items-center w-full text-base rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">16px (Default)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("12px")}>
                                                <p data-text-size="12px" className="flex justify-between items-center w-full text-xs rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">12px (Tiny)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("14px")}>
                                                <p data-text-size="14px" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">14px (Small)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("18px")}>
                                                <p data-text-size="18px" className="flex justify-between items-center w-full text-lg rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">18px (Lead)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("24px")}>
                                                <p data-text-size="24px" className="flex justify-between items-center w-full text-2xl rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">24px (Large)
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontSize("36px")}>
                                                <p data-text-size="36px" className="flex justify-between items-center w-full text-4xl rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">36px (Huge)
                                                </p>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" asChild>
                                                        <div>
                                                            <Palette />
                                                        </div>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <span className="">Color del texto</span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Text color</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <div className="grid grid-cols-6 gap-2 group mb-3 items-center p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-600">
                                                <input onChange={(e) => setTextColor(e.target.value)} type="color" id="color" className="border-zinc-200 border bg-zinc-50 dark:bg-zinc-700 dark:border-zinc-600 rounded-md p-px px-1 hover:bg-zinc-50 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-700 w-full h-8 col-span-3" />
                                                <label htmlFor="color" className="text-zinc-500 dark:text-zinc-400 text-sm font-medium col-span-3 group-hover:text-zinc-900 dark:group-hover:text-white">Pick a color</label>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" asChild>
                                                        <div>
                                                            <Type />
                                                        </div>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <span className="">Fuente</span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Font Family</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setFontFamily("Inter, ui-sans-serif")}>
                                                <p data-font-family="Inter, ui-sans-serif" className="flex justify-between items-center w-full text-sm font-sans rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">Default
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("Arial, sans-serif")}>
                                                <p data-font-family="Arial, sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white" style={{ fontFamily: 'Arial, sans-serif' }}>Arial
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("'Courier New', monospace")}>
                                                <p data-font-family="'Courier New', monospace" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white" style={{ fontFamily: "'Courier New', monospace" }}>Courier New
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("Georgia, serif")}>
                                                <p data-font-family="Georgia, serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white" style={{ fontFamily: 'Georgia, serif' }}>Georgia
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("'Lucida Sans Unicode', sans-serif")}>
                                                <p data-font-family="'Lucida Sans Unicode', sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white" style={{ fontFamily: "'Lucida Sans Unicode', sans-serif" }}>Lucida Sans Unicode
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("Tahoma, sans-serif")}>
                                                <p data-font-family="Tahoma, sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white" style={{ fontFamily: 'Tahoma, sans-serif' }}>Tahoma </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("'Times New Roman', serif")}>
                                                <p data-font-family="'Times New Roman', serif;" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white" style={{ fontFamily: "'Times New Roman', serif" }}>Times New Roman
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("'Trebuchet MS', sans-serif")}>
                                                <p data-font-family="'Trebuchet MS', sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>Trebuchet MS
                                                </p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setFontFamily("Verdana, sans-serif")}>
                                                <p data-font-family="Verdana, sans-serif" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white" style={{ fontFamily: 'Verdana, sans-serif' }}>Verdana
                                                </p>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TooltipProvider>
                            <div className="px-1">
                                <span className="block w-px h-4 bg-zinc-300 dark:bg-zinc-600"></span>
                            </div>
                            <ToggleGroup type="single">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={() => setTextAlign("left")} value="aling-left" aria-label="Align left">
                                                <AlignLeft />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Alinear a la izquierda</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={() => setTextAlign("center")} value="aling-center" aria-label="Align center">
                                                <AlignCenter />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Alinear al centro</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={() => setTextAlign("right")} value="aling-right" aria-label="Align right">
                                                <AlignRight />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Alinear a la derecha</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={() => setTextAlign("justify")} value="aling-right" aria-label="Align right">
                                                <AlignJustify />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Justificado</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </ToggleGroup>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 flex-wrap">
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex gap-2 justify-center items-center'>
                                <Button variant="ghost" asChild>
                                    <div>
                                        Formato <ChevronDown />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='flex flex-col gap-2'>
                                <DropdownMenuLabel>Título</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={togglePharagraph} >
                                    Párrafo
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">0</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(1)}
                                >
                                    H1
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">1</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(2)}
                                >
                                    H2
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">2</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(3)}
                                >
                                    H3
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">3</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(4)}
                                >
                                    H4
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">4</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(5)}
                                >
                                    H5
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">5</kbd>
                                    </div>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => format(6)}
                                >
                                    H6
                                    <div className="space-x-1.5">
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Cmd</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">Alt</kbd>
                                        <kbd className="px-2 py-1 text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 rounded-lg dark:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-500">6</kbd>
                                    </div>

                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="ps-1.5">
                            <span className="block w-px h-4 bg-zinc-300 dark:bg-zinc-600"></span>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" onClick={addImage} value="add-image" aria-label="Add image">
                                        <ImageIcon />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span className="">Agregar imagen</span>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" onClick={addYouTube} value="add-video" aria-label="Add video">
                                        <VideoIcon />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span className="">Agregar video</span>
                                </TooltipContent>
                            </Tooltip>
                            <ToggleGroup type="single">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ToggleGroupItem onClick={toggleList} value="toggle-list" aria-label="Toggle list">
                                            <List />
                                        </ToggleGroupItem>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className="">Lista</span>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ToggleGroupItem onClick={toggleOrderedList} value="toggle-ordered-list" aria-label="Toggle ordered list">
                                            <ListOrdered />
                                        </ToggleGroupItem>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className="">Lista ordenada</span>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ToggleGroupItem onClick={toggleBlockquote} value="toggle-blockquote" aria-label="Toggle blockquote">
                                            <Quote size={20} />
                                        </ToggleGroupItem>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className="">Cita</span>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ToggleGroupItem onClick={toggleHorizontalRule} value="horizontal-rule" aria-label="Horizontal rule">
                                            <SquareMinus />
                                        </ToggleGroupItem>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className="">Separador horizontal</span>
                                    </TooltipContent>
                                </Tooltip>
                            </ToggleGroup>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="w-full px-4 py-2 bg-white rounded-b-lg dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-none">
                    <div ref={editorRef} id="wysiwyg-example" className="block w-full px-0 text-zinc-800 bg-white border-0 dark:bg-zinc-800 focus:ring-0 dark:text-white dark:placeholder-zinc-400 max-w-5xl"></div>
                </div>
                <Button
                    form='form-card'
                    type='submit'
                    // onClick={saveContent}
                    className="py-2 text-sm font-semibold text-white bg-blue-500 dark:bg-blue-600 rounded-b-lg mt-6 mx-auto"
                >
                    {isLoading &&
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Guardar contenido
                </Button>
            </div>
        </div>
    )
}
