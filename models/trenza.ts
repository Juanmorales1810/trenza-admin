import BlogSchema from "./blogs";
import PortfolioSchema from "./portfolio";
import mongoose from "mongoose";

// Modelos para Trenza Fotos
export const TrenzaMatrimoniosBlogsModel =
    mongoose.models.TrenzaMatrimoniosBlogs ||
    mongoose.model("TrenzaMatrimoniosBlogs", BlogSchema);

export const TrenzaMatrimoniosPortfolioModel =
    mongoose.models.TrenzaMatrimoniosPortfolio ||
    mongoose.model("TrenzaMatrimoniosPortfolio", PortfolioSchema);

// Modelos para Trenza Comunicaciones
export const TrenzaComunicacionesBlogsModel =
    mongoose.models.TrenzaComunicacionesBlogs ||
    mongoose.model("TrenzaComunicacionesBlogs", BlogSchema);

export const TrenzaComunicacionesPortfolioModel =
    mongoose.models.TrenzaComunicacionesPortfolio ||
    mongoose.model("TrenzaComunicacionesPortfolio", PortfolioSchema);
