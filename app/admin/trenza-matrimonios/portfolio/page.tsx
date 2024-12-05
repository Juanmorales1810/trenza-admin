import { TrenzaMatrimoniosPortfolioModel } from "@/models/trenza";
import { connectMongoDB } from "@/lib/mongodb";
import CardBlog from "@/components/cardBlog";
import { cache } from "react";
import CardPortfolio from "@/components/cardPortfolio";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const dynamic = "force-dynamic";

const getItems = cache(async function loadMenu() {
    await connectMongoDB();
    const ListPortfolios = await TrenzaMatrimoniosPortfolioModel.find();
    return ListPortfolios.map(portfolio => {
        const obj = portfolio.toObject();
        obj._id = obj._id.toString(); // Convierte _id a una cadena
        return obj;
    }); // Usa .toObject() para convertir cada producto a un objeto JavaScript simple
})
export default async function page() {
    const portfolios = await getItems();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl gap-16 mx-auto ">
            {
                portfolios.length === 0 && (
                    <div className="w-full text-center">
                        <h1>No hay porfolios</h1>
                    </div>
                )
            }
            {portfolios.map((portfolio) => (
                <CardPortfolio
                    key={portfolio._id}
                    title={portfolio.title}
                    cardImage={portfolio.image}
                    date={format(portfolio.date, "PPP", { locale: es })}
                    location={portfolio.location}
                />
            ))
            }
        </div>
    )
}