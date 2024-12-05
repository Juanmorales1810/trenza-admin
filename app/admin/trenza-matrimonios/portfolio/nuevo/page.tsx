'use client';

import CardPortfolio from '@/components/cardPortfolio';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFetch } from '@/hooks/useFetch';
import { useLoading } from '@/hooks/useLoading';
import { porfolioValidationschema } from '@/validations/porfolioValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from 'date-fns/locale';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'


import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { z } from 'zod';

export default function Page() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewCover, setPreviewCover] = useState<string | null>(null);


    //useLoading
    const { finishLoading, isLoading, startLoading } = useLoading()
    //useAuthFetch
    const authFetch = useFetch();

    const form = useForm<z.infer<typeof porfolioValidationschema>>({
        resolver: zodResolver(porfolioValidationschema),
        defaultValues: {
            Titulo: '',
            Ubicacion: '',
            Slug: '',
            Folder: '',
        },
    })

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'cover') => {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]

            const reader = new FileReader()
            reader.onloadend = () => {
                if (field === 'image') {
                    setPreviewImage(reader.result as string)
                } else {
                    setPreviewCover(reader.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    //Enviar datos
    const onSubmit = async (values: z.infer<typeof porfolioValidationschema>) => {

        startLoading()
        const formData = new FormData();
        formData.append("titulo", values.Titulo);
        formData.append("ubicacion", values.Ubicacion);
        formData.append("date", values.Date?.toISOString() || '');
        formData.append("slug", values.Slug);
        formData.append("folder", values.Folder);

        const imageFile = form.watch('Image') as FileList;
        if (imageFile && imageFile[0]) {
            formData.append("image", imageFile[0]);
        }

        const coverFile = form.watch('Cover') as FileList;
        if (coverFile && coverFile[0]) {
            formData.append("cover", coverFile[0]);
        }

        await authFetch({
            endpoint: 'trenza-matrimonios/portfolio',
            redirectRoute: '/admin/trenza-matrimonios/portfolio',
            formData: formData,
            options: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        })
        finishLoading()

    };

    return (
        <div className='w-full max-w-5xl mx-auto'>
            <div className='flex flex-row justify-center items-start gap-10 my-16'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="Titulo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Título de la publicación" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Ubicacion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ubicación</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ubicación de la publicación" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Fecha del evento</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: es })
                                                    ) : (
                                                        <span>Selecciona un dia</span>
                                                    )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                                locale={es}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="slug-de-la-publicacion" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Folder"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de la carpeta de fotos</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre de la carpeta" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <p className="text-sm text-muted-foreground">
                                        Link para subir la carpera con las imágenes <a className="text-primary hover:underline" href="https://cloudinary.com/users/login" target="_blank" rel="noopener noreferrer">aquí</a>
                                    </p>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imagen de la card (formato 1:1)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                handleImageChange(e, 'image')
                                                field.onChange(e.target.files)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Cover"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imagen de portada del Porfolio (formato 16:7)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                handleImageChange(e, 'cover')
                                                field.onChange(e.target.files)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </form>
                </Form>
                <div className='w-full max-w-[350px]'>
                    <CardPortfolio
                        title={form.watch('Titulo') || 'Título'}
                        location={form.watch('Ubicacion') || 'Ubicación'}
                        date={form.watch('Date') ? format(form.watch('Date'), "PPP", { locale: es }) : "Fecha"}
                        cardImage={previewImage || 'https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'}
                    />
                </div>
            </div>
            {previewCover && <img src={previewCover} alt="Preview" />}
        </div>
    )
}


