import { AppError, Monad } from "../../../../ddd-primitives";

import { Cms } from "../../domain/entities/cms/cms";
import { GenerateCmsError } from "./generateCmsError";

export type GenerateCmsResponse = Monad.Result<Cms, AppError.UnexpectedError>;
