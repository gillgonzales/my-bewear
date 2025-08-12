"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    name: z.string().trim().min(1, 'Nome é obrigatório.'),
    email: z.email('E-mail inválido.'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
    passwordConfirmation: z.string()
        .min(8, 'Confirmação de senha deve ter pelo menos 8 caracteres')
})
    .refine(data => {
        return data.password === data.passwordConfirmation;
    }, {
        error: 'As senhas não coincidem.',
        path: ['passwordConfirmation'],
    });

type FormValue = z.infer<typeof formSchema>;

const SignUpForm = () => {
    const form = useForm<FormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
    });

    function onSubmit(values: FormValue) {
        console.log('SignUp Form submitted:', values);
    }

    return (
        <>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Crie a sua conta para continuar !!!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o seu nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o seu e-mail" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite a sua senha" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Repita a mesma senha" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Criar Conta</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </>
    )
}

export default SignUpForm