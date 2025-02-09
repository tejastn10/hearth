import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

import { Request, Response } from "express";

@Injectable()
export class RequestMiddleware implements NestMiddleware {
	constructor() {}

	private readonly logger = new Logger("Requests");

	private getDurationInMilliseconds(startTime: [number, number]): number {
		const NS_PER_SEC = 1e9;
		const NS_TO_MS = 1e6;
		const diff = process.hrtime(startTime);
		return Number(((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toFixed(2));
	}

	use(req: Request, res: Response, next: () => void): void {
		const { method, originalUrl } = req;
		const startTime = process.hrtime();

		res.on("finish", () => {
			const { statusCode } = res;
			const { ["content-length"]: contentLength, ["content-type"]: contentType } = res.getHeaders();

			const durationInMilliseconds = this.getDurationInMilliseconds(startTime);

			this.logger.debug(
				`${method} ${originalUrl} ${statusCode} \x1b[36m[${contentType}] - ${contentLength}b - \x1b[0m${durationInMilliseconds}ms`
			);
		});

		next();
	}
}
