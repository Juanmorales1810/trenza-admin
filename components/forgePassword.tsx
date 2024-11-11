"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { forgetSchema } from '@/validations/forgetValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "./mode-toggle"
import { useForm } from 'react-hook-form'
import Link from "next/link";
import * as z from 'zod'



type ForgetFormValues = z.infer<typeof forgetSchema>

export default function ForgetForm() {

    const form = useForm<ForgetFormValues>({
        resolver: zodResolver(forgetSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(data: ForgetFormValues) {
        console.log(data)
        // Aquí iría la lógica para enviar los datos al servidor
    }


    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
                <CardDescription>Ingresa tus correo para validar tu usuario</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="tu@ejemplo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Recuperar contraseña</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href="/" className="text-sm text-blue-600 hover:underline">
                    Iniciar sesión
                </Link>
                <ModeToggle />
            </CardFooter>
        </Card>
    )
}