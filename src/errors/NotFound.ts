import { HTTP_STATUS } from "../services/HTTP_STATUS_CODE/HTTP_STATUS_CODE";
import { BaseError } from "./BaseError";

export class NotFound extends BaseError {
	constructor(
		message: string = "Recurso não encontrado, por favor tente novamente!",
	){
		super(message, HTTP_STATUS.NOT_FOUND);
	}
}