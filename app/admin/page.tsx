import Link from "next/link"

export default function page() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Bienvenido al Admin de Trenza</h1>
            <p className="text-gray-500 mb-2">Aca podrás gestionar tus paginas</p>
            <p className="text-gray-500">Haz click en selecciona la empresa para poder continuar o click en las siguientes opciones</p>
            <div className="flex gap-4 py-8">
                <Link href="/admin/page/create">
                    <article className="bg-cyan-600 w-72 h-20 ring-1 ring-zinc-200 rounded-xl px-4 py-2 hover:bg-cyan-800 transition-colors">
                        <main>
                            <p className="font-semibold text-xl">
                                Tranza Matrimonios
                            </p>
                        </main>
                        <footer>
                            <span className="text-sm text-end text-zinc-300">Empresa</span>
                        </footer>
                    </article>
                </Link>
                <Link href="/admin/page/create">
                    <article className="bg-zinc-600 w-72 h-20 ring-1 ring-zinc-200 rounded-xl px-4 py-2 hover:bg-zinc-800 transition-colors">
                        <main>
                            <p className="font-semibold text-xl">
                                Tranza Estudio
                            </p>
                        </main>
                        <footer>
                            <span className="text-sm text-end text-zinc-300">Empresa</span>
                        </footer>
                    </article>
                </Link>
            </div>
        </div>
    )
}

