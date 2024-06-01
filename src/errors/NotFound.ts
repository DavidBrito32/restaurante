import { BaseError } from "./BaseError";

export class NotFound extends BaseError {
	constructor(
		message: string = "Recurso não encontrado, por favor tente novamente!",
	){
		super(message, 404);
	}
}