import { HTTP_STATUS } from "../services/HTTP_STATUS_CODE/HTTP_STATUS_CODE";
import { BaseError } from "./BaseError";

export class Unouthorized extends BaseError {
	constructor(
		message: string = "não autorizado",
	){
		super(message, HTTP_STATUS.UNAUTHORIZED);
	}
}