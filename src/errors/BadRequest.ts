import { HTTP_STATUS } from "../services/HTTP_STATUS_CODE/HTTP_STATUS_CODE";
import { BaseError } from "./BaseError";

export class BadRequest extends BaseError {
	constructor(
		message: string = "Desculpe, houve um problema com a sua solicitação",
	){
		super(message, HTTP_STATUS.BAD_REQUEST);
	}
}