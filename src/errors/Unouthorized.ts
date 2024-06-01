import { BaseError } from "./BaseError";

export class Unouthorized extends BaseError {
	constructor(
		message: string = "autenticação falhou, verifique os dados informados e tente novamente",
	){
		super(message, 401);
	}
}