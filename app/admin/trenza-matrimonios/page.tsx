import Link from "next/link";

export default function page() {
    return (
        <div>

            <div className="flex space-x-6">
                <Link href="/admin/trenza-matrimonios/blog">
                    <article className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Blogs</h5>
                        <p className="font-normal text-gray-700">Mira tus últimos blogs creados</p>
                    </article>
                </Link>
                <Link href="/admin/trenza-matrimonios/portfolio">
                    <article className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Portfolio</h5>
                        <p className="font-normal text-gray-700">Explora tu portafolio</p>
                    </article>
                </Link>
            </div>
        </div>
    )
}