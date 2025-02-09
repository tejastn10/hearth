import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigService } from "./config.service";
import { allowedNodeEnvironmentFlags } from "process";

@Module({
	imports: [
		NestConfigModule.forRoot({
			validationOptions: {
				allowedNodeEnvironmentFlags,
			},
		}) as Promise<DynamicModule>,
	],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}
