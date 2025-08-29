import { TerminusModule } from "@nestjs/terminus";
import { Test, type TestingModule } from "@nestjs/testing";

import { AppController } from "./app.controller";

describe("AppController", () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [TerminusModule],
			controllers: [AppController],
			providers: [],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe("root", () => {
		it("should return Machine Status", () => {
			const status = appController.main();

			expect(status).toEqual("Server running");
		});
	});
});
