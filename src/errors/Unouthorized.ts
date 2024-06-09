import { BaseError } from "./BaseError";

export class Unouthorized extends BaseError {
	constructor(
		message: string = "não autorizado",
	){
		super(message, 401);
	}
}