import { BaseError } from "./BaseError";

export class BadRequest extends BaseError {
	constructor(
		message: string = "Desculpe, houve um problema com a sua solicitação",
	){
		super(message, 400);
	}
}